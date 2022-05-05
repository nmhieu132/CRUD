import {React, Component} from 'react'
import status from '../../Constant/status';
import Item from './Item';
class List extends Component {
    constructor(props) {
        super(props);
        this.handleCloseContextMenu=this.handleCloseContextMenu.bind(this)
        this.handleShowContextMenu=this.handleShowContextMenu.bind(this)
    }
    state = {         
        top: 0,
        left: 0,
        visibility: 'hidden',
        todo: {
            id: undefined,
            status: undefined,
            name: '',
        },
    };

    handleShowContextMenu(e, todo) {
        console.log(this)
        this.setState({
            top: e.clientY,
            left: e.clientX,
            visibility: 'visible',
            todo: {
                ...this.state.todo,
                ...todo,
            },
        });
    };

    handleCloseContextMenu(e,todo){
        this.setState({
            visibility: 'hidden',
            todo: {
                ...this.state.todo,
                ...todo,
            },
        });
    }

    async handleSaveStatusTodo(status) {
        await this.setState({
            ...this.state,
            visibility: 'visible',
            todo: {
                ...this.state.todo,
                status: status,
            },
        });
        this.props.handleSaveTodo(this.state.todo);
    }

    render() {
        const {todos}=this.props;
        console.log('todos',todos)
        return (
            <>
                <ul>
                {todos.map((todo, key) => {
                    return (
                            <Item 
                                todo={todo} 
                                key={key} 
                                handlePrepareEdit={this.props.handlePrepareEdit}
                                handleDelete={this.props.handleDelete}
                                handleShowContextMenu={
                                    this.handleShowContextMenu
                                }
                            />
                    )
                })}
                <div
                    className={`status-context-cover ${this.state.visibility}`}
                    onClick={() => {
                        this.handleCloseContextMenu();
                    }}
                ></div>
                <div
                    className={`status-context-menu ${this.state.visibility}`}
                    style={{
                        top: `${this.state.top}px`,
                        left: `${this.state.left}px`,
                        transform: `${
                            window.innerHeight - this.state.top <= 150
                                ? 'translateY(-100%)'
                                : ''
                        }`,
                    }}
                >
                    <button 
                        className={`todo-status todo`}
                        onClick={(e)=>{
                            this.handleSaveStatusTodo(status.TODO)}}
                        >
                            Todo
                    </button>
                    <button 
                        className={`todo-status process`}
                        onClick={(e)=>{
                            this.handleSaveStatusTodo(status.PROCESS)
                        }}
                    >
                        Processing
                    </button>
                    <button 
                        className={`todo-status completed`}
                        onClick={(e)=>{
                            this.handleSaveStatusTodo(status.COMPLETED)
                        }}
                    >
                        Completed
                    </button>
                </div>
                </ul>
            </>
        );
    }
}
export default List;
