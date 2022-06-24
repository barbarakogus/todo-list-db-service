export interface TodoList {
    id: bigint
    name: string
}

export interface Todo {
    id: bigint
    todoListId: bigint
    name: string
    description: string
    isDone: boolean
}