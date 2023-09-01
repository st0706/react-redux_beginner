import React from "react";
import AddTodo from "./AddTodo";
import './ListTodo.scss';
import { toast } from 'react-toastify';
class ListTodo extends React.Component {
    state = {
        listTodos: [
            { id: 1, title: "Sleeping" },
            { id: 2, title: "Playing sports" },
            { id: 3, title: "Playing games" }
        ],
        editTodo: {}
    }
    addNewTodo = (todo) => {
        this.setState({
            listTodos: [...this.state.listTodos, todo]
        })
        toast.success("Successfully added to todo list!")
    }
    handleDeleteTitle = (todoId) => {
        let { listTodos } = this.state
        listTodos = listTodos.filter(item => {
            return (item.id !== todoId)
        })
        this.setState({ listTodos: listTodos })
        toast.success("Successfully deleted!")
    }
    handleEditTodo = (item) => {
        let { listTodos, editTodo } = this.state
        let isEmptyObj = Object.keys(editTodo).length === 0
        if (isEmptyObj === false && editTodo.id === item.id) {
            let listTodosCopy = [...listTodos]
            let objIndex = listTodosCopy.findIndex((obj => obj.id === item.id))
            listTodosCopy[objIndex].title = editTodo.title
            this.setState({ listTodos: listTodosCopy, editTodo: {} })
            toast.success("Successfully edited!")
            return
        }
        this.setState({ editTodo: item })

    }
    handleOnChangeEditTodo = (event) => {
        let editTodoCopy = this.state.editTodo
        editTodoCopy.title = event.target.value
        this.setState({ editTodo: editTodoCopy })
    }
    render() {
        let { listTodos, editTodo } = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0
        return (
            <>
                <p>
                    Simple TODO Apps
                </p>
                <div className="list-todo-container">
                    <AddTodo
                        addNewTodo={this.addNewTodo}
                    />
                    <div className="list-todo-content">
                        {listTodos && listTodos.length > 0 &&
                            listTodos.map((item, index) => {
                                return (
                                    <div className="todo-child" key={item.id}>
                                        {isEmptyObj === true
                                            ?
                                            <span> {index + 1} - {item.title} </span>
                                            :
                                            <>
                                                {item.id === editTodo.id ?
                                                    <span>{index + 1} - <input value={editTodo.title}
                                                        onChange={(event) => this.handleOnChangeEditTodo(event)} /></span>
                                                    :
                                                    <span> {index + 1} - {item.title} </span>
                                                }
                                            </>
                                        }
                                        <button className="edit"
                                            onClick={() => {
                                                this.handleEditTodo(item)
                                            }}>
                                            {isEmptyObj === false && item.id === editTodo.id ?
                                                'Save'
                                                :
                                                'Edit'
                                            }
                                        </button>

                                        <button className="delete" onClick={() => this.handleDeleteTitle(item.id)
                                        }>Delete</button>
                                    </div>
                                )
                            })

                        }
                    </div>
                </div>
            </>
        )
    }
}

export default ListTodo;