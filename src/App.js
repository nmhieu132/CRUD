import { Component, React } from 'react';
import './App.scss';
import './Components/form/form.scss'
import './Components/list/list.scss'
import Form from './Components/form/Form';
import List from './Components/list/List';
import todoApi from './apis/todoApi';
class App extends Component {
  constructor(props) {
    super(props);
    this.handleSaveTodo=this.handleSaveTodo.bind(this);
    this.handlePrepareEdit=this.handlePrepareEdit.bind(this);
    this.handleDelete=this.handleDelete.bind(this);
  }
  initTodo = { id: undefined, name: '', status: undefined };
  state = {
      todos: [this.initTodo],
      todo: this.initTodo,
  };
  renderData() {
    const response = todoApi.GET();
    this.setState({
        ...this.state,
        todos: response,
    });
  }
  componentDidMount() {
    this.renderData();
  }

  handleSaveTodo(todo){
    todoApi.SAVE({...todo, status: todo.status ?? 0});
    this.renderData({...this.initTodo})
    console.log(todo)
  }

  handlePrepareEdit(todo){
    this.setState({
      ...this.state,
      todo:todo,
    })
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.check !== this.props.check){
        this.setState({
            ...this.state,
            id: this.props.todo.id,
            name:this.props.todo.name,
            status:this.props.todo.status,

        })
    }
  }
  handleDelete(id){
    todoApi.DELETE(id);
    this.renderData()
  }

  render() {
      console.log(this.state);
      return (
          <div className='App'>
              <div className='title'>
                  Todo <strong>list</strong>
              </div>
              <div className='todo-list'>
                  <Form handleSaveTodo={this.handleSaveTodo} todo={this.state.todo} check={Math.random()} />
                  <List todos={this.state.todos} handleSaveTodo={this.handleSaveTodo} handlePrepareEdit={this.handlePrepareEdit} handleDelete={this.handleDelete} />
              </div>
          </div>
      );
  }
}
 
export default App;
