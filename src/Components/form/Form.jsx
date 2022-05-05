import { React, Component } from 'react';
class Form extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        id: undefined,
        name: '',
        status: 0,
    };

    handleChange(e) {
        this.setState({
            ...this.state,
            name: e.target.value,
        });
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.check !== this.props.check){
            this.setState({
                ...this.state,
                id: this.props.todo.id,
                name:this.props.todo.name,
                status: this.props.todo.status,
            })
        }
    }

    handleChangeFormToSave(){
        this.setState({
            id: undefined,
            name:'',
            status: 0,
        });
    }

    render() {
        return (
            <div className='todo-form'>
                {this.state.id&&(
                <button
                    className='edit-tag'
                    onClick={()=>this.handleChangeFormToSave()}>
                    EDIT: {this.state.name}
                </button>
                )}
                <form
                onSubmit={(e) => {
                    e.preventDefault();
                    this.props.handleSaveTodo(this.state);
                }}>
                    <input 
                    type='text' 
                    value={this.state.name}
                    placeholder=' ' 
                    name='name'
                    onChange={(e) => {
                        this.handleChange(e);
                    }}
                    />
                    <button
                        className='todo-save'
                        placeholder='Input todo'
                        type='submit'
                    >
                        SAVE
                    </button>
                </form>
                </div>
        );
    }
}
 
export default Form;
