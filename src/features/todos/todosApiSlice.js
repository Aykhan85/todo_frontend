import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const todosAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = todosAdapter.getInitialState();

export const todosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedTodos = responseData.map((todo) => {
          todo.id = todo._id;
          return todo;
        });
        return todosAdapter.setAll(initialState, loadedTodos);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Todo", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Todo", id })),
          ];
        } else {
          return [{ type: "Todo", id: "LIST" }];
        }
      },
    }),

    addNewTodo: builder.mutation({
      query: (initialTodoData) => ({
        url: "/todos",
        method: "POST",
        body: initialTodoData,
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Todo", id: arg.id }],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: "/todos",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Todo", id: arg.id }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddNewTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApiSlice;

export const selectTodosResult = todosApiSlice.endpoints.getTodos.select();

const seletTodosData = createSelector(
  selectTodosResult,
  (todosResult) => todosResult.data
);

export const {
  selectAll: selectAllTodos,
  selectById: seletTodoById,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors((state) => seletTodosData(state) ?? initialState);
