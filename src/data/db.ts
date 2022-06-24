import { Pool } from 'pg';

const pool = new Pool({
    host: 'localhost',
    database: 'postgres',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 2000,
    user: 'postgres',
    password: 'postgres'
});

const connectToDB = async () => {
    try {
        await pool.connect();
    } catch (err) {
        console.log(err)
    }
}

connectToDB(); 

export default {
    query: async (text: any, params?: any) => await pool.query(text, params),
    GET_TODO_LIST: 'SELECT id, name FROM "todo_list"',
    GET_TODO_LIST_BY_ID: 'SELECT id, name FROM "todo_list" WHERE id = $1',
    POST_TODO_LIST: 'INSERT INTO "todo_list" ("name") VALUES ($1) RETURNING id',
    DELETE_TODO_LIST: 'DELETE FROM "todo_list" WHERE id = $1',
    GET_ALL_TODO_BY_TODO_LIST_ID: 'SELECT id, todo_list_id AS "todoListId", name, description, is_done AS "isDone" FROM "todo" WHERE todo_list_id = $1 ORDER BY is_done, id', 
    GET_ALL_TODO_BY_ISDONE: 'SELECT id, todo_list_id AS "todoListId", name, description, is_done AS "isDone" FROM "todo" WHERE todo_list_id = $1 AND is_done = $2', 
    POST_TODO: 'INSERT INTO "todo" ("todo_list_id", name, description, is_done) VALUES ($1, $2, $3, $4) RETURNING id',
    DELETE_TODO: 'DELETE FROM "todo" WHERE id = $1',
    UPDATE_TODO: 'UPDATE "todo" SET is_done = NOT is_done where id = $1'
};