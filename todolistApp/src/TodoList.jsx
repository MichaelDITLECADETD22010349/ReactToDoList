import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
    render() {
        return (
            <ul>
                {this.props.todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        toggleCompleted={this.props.toggleCompleted}
                        editTodo={this.props.editTodo}
                        deleteTodo={this.props.deleteTodo}
                        toggleSelect={this.props.toggleSelect}
                    />
                ))}
            </ul>
        );
    }
}

export default TodoList;
