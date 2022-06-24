import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import repository from './data/repository';

const app: Application = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

const BASE_PATH_TODOLISTS = '/v1/todolists';

//routes todo LIST
app.get(BASE_PATH_TODOLISTS, async (_req: Request, res: Response) => {
    console.log('i am GET ALL');
    const todoLists = await repository.getAllTodoList();
    res
        .json(todoLists)
        .status(200);
});

app.get(`${BASE_PATH_TODOLISTS}/:id`, async (req: Request, res: Response) => {
    console.log('I am GET BY ID');
    const todoList = await repository.getTodoListById(req.params.id);
    res
        .json(todoList)
        .status(200);
});

app.post(BASE_PATH_TODOLISTS, async (req: Request, res: Response) => {
    console.log('i am POST todo_list');
    const newTodoList = await repository.addTodoList(req.body);
    res
        .set('Location', `${BASE_PATH_TODOLISTS}${newTodoList}`)
        .set('Access-Control-Expose-Headers', '*')
        .json(newTodoList)
        .status(201);
});

app.delete(`${BASE_PATH_TODOLISTS}/:id`, async (req: Request, res: Response) => {
    console.log('i DELETE');
    await repository.deleteTodoList(req.params.id)
    res
        .status(204)
        .end();
});

//routes todo
app.get(`${BASE_PATH_TODOLISTS}/:id/todo`, async (req: Request, res: Response) => {
    console.log('i am get TODO');
    const todos = await repository.getAllTodoByTodoListId(req.params.id);
    res
        .json(todos)
        .status(200);
});

app.get(`${BASE_PATH_TODOLISTS}/:id/todo/isdone`, async (req: Request, res: Response) => {
    console.log('filter is Done');
    const todosByIsDone = await repository.getAllTodoByIsDone(req.params.id, req.body.isDone);
    res 
        .json(todosByIsDone)
        .status(200);
});

app.post(`${BASE_PATH_TODOLISTS}/:id/todo`, async (req: Request, res: Response) => {
    console.log('i am post TODO');
    const newTodo = await repository.addTodo(req.body);
    res
        .set('Location', `${BASE_PATH_TODOLISTS}/:id/todo`)
        .set('Access-Control-Expose-Headers', '*')
        .json(newTodo)
        .status(201);
});

app.delete('/v1/todos/:id', async (req: Request, res: Response) => {
    console.log('i delete TODO');
    await repository.deleteTodo(req.params.id);
    res 
        .status(204)
        .end();
});

app.put('/v1/todos/:id', async (req: Request, res: Response) => {
    console.log('I update TODO');
    const updatedTodo = await repository.updateTodo(req.params.id);
    res
        .json(updatedTodo)
        .status(200);
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

export default app;