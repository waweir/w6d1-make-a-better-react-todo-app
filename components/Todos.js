import React, { Component } from 'react'
import TodoItem from './TodoItem'

class Todos extends Component {
    constructor(props) {
        super(props)
        // if  you add your own method that isn't render or constructon, have to add this.method.bind(this)
        this.typing = this.typing.bind(this)
        this.enter = this.enter.bind(this)
        this.addTask = this.addTask.bind(this)
        this.clearInput = this.clearInput.bind(this)
        this.markDone = this.markDone.bind(this)
        this.removeTask = this.removeTask.bind(this)
        // metadata on itself
        // whatever is not added to state is not retained
        this.state = {
            newTodo: '',
            todos: []
        }
    }

    typing(e) {
        // every time setState runs, render() gets recalled
        this.setState({
            newTodo: e.target.value
        })
    }
    enter(e) {
        if (e.key === 'Enter') {
            let updatedTodos = this.state.todos
            if (e.target.value !== '') {
                updatedTodos.push({
                    text: e.target.value,
                    done: false,
                    remove: false,
                })
            }
            this.setState({
                newTodo: '',
                todos: updatedTodos
            })
            localStorage.setItem('todos', JSON.stringify(updatedTodos))
        }
    }
    addTask() {
        let updatedTodos = this.state.todos
        if (this.state.newTodo !== '') {
            updatedTodos.push({
                text: this.state.newTodo,
                done: false
            })
        }
        this.setState({
            newTodo: '',
            todos: updatedTodos
        })
        localStorage.setItem('todos', JSON.stringify(updatedTodos))
    }
    clearInput() {
        this.setState({
            newTodo: ''
        })
    }
    markDone(currentTodoIndex) {
        let updatedTodos = this.state.todos
        updatedTodos[currentTodoIndex].done = !updatedTodos[currentTodoIndex].done
        this.setState({
            todos: updatedTodos
        })
        localStorage.setItem('todos', JSON.stringify(updatedTodos))
    }
    removeTask(currentTodoIndex) {
        let updatedTodos = this.state.todos
        updatedTodos[currentTodoIndex].remove = true
        this.setState({
            todos: updatedTodos
        })
        localStorage.setItem('todos', JSON.stringify(updatedTodos))
    }
    componentDidMount() {
        var todos = JSON.parse(localStorage.getItem('todos'))
        if (todos) {
            this.setState({
                todos: todos
            })
        }
    }

    // have to have a render method. that is what makes it a Component. render has to return JSX code
    render() {
        var items = this.state.todos.map((item, i) => {
            return <TodoItem data={item} key={i} markDone={() => this.markDone(i)} removeTask={() => this.removeTask(i)} />
        })

        return <div className="row">
          <div className="col-sm-12 flex newTask">
            <input type="text" className="form-control" placeholder="Add a new task" value={this.state.newTodo} onChange={this.typing} onKeyPress={this.enter}/>
            <div className="btn taskButton" title="Add" onClick={this.addTask}><img src="img/plus.svg" alt="" /></div>
            <div className="btn taskButton" title="Clear" onClick={this.clearInput}><img src="img/cancel.svg" alt="" /></div>
          </div>
            <div> {items} </div>
        </div>
    }
}

export default Todos
