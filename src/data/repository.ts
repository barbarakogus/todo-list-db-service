import db from './db';
import type { TodoList, Todo } from '../types';

export default {
    getAllTodoList: async () => {
        const { rows } = await db.query(db.GET_TODO_LIST);
        return rows;
    },
    getTodoListById: async (id: any) => {
        const { rows } = await db.query(db.GET_TODO_LIST_BY_ID, [id]);
        return rows;
    },
    addTodoList: async (data: TodoList) => {
        const { rows } = await db.query(db.POST_TODO_LIST, [data.name]);
        return rows[0];
    },
    deleteTodoList: async (id: any) => {
        const { rows } = await db.query(db.DELETE_TODO_LIST, [id]);
        return rows;
    },

    getAllTodoByTodoListId: async (todoListId: any) => {
        const { rows } = await db.query(db.GET_ALL_TODO_BY_TODO_LIST_ID, [todoListId]);
        return rows;
    },
    getAllTodoByIsDone: async (todoListId: any, isDone: boolean) => {
        const { rows } = await db.query(db.GET_ALL_TODO_BY_ISDONE, [todoListId, isDone]);
        return rows; 
    },
    addTodo: async (data: Todo) => {
        const { rows } = await db.query(db.POST_TODO, [data.todoListId, data.name, data.description, data.isDone]);
        return rows;
    },
    deleteTodo: async (id: any) => {
        const { rows } = await db.query(db.DELETE_TODO, [id]);
        return rows;
    },
    updateTodo: async (id: any) => {
        const { rows } = await db.query(db.UPDATE_TODO, [id]);
        return rows;
    }
}