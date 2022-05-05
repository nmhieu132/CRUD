class todoApi {
    todos = [
        {
            id: 1,
            status: 0,
            name: 'Học JS',
        },
        {
            id: 2,
            status: 1,
            name: 'Học React',  
        },
        {
            id: 3,
            status: 2,
            name: 'Học Redux saga',
        },
        {
            id: 3,
            status: 2,
            name: 'Học Redux saga',
        },
        {
            id: 3,
            status: 2,
            name: 'Học Redux saga',
        },
    ];
    GET(id = false) {
        if (!id) {
            return this.todos;
        }
        return this.todos.find((t) => t.id === id);
    }
    SAVE(todo) {
        if (todo.id === undefined) {

            const ids = this.todos.map((todo) => {
                return todo.id;
            });
 
            const lastestId = Math.max(...ids);
 
            todo = {
                ...todo,
                id: lastestId + 1,
            };
 
            this.todos.push(todo);
 
            return todo;
        } else {
            this.todos = this.todos.map((oldTodo) =>
                oldTodo.id === todo.id ? todo : oldTodo
            );
            return todo;
        }
    }
    
    DELETE(id){
        this.todos=this.todos.filter((todo)=>todo.id!==id)
    }

}
 
export default new todoApi();