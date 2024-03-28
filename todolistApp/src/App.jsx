import React, { Component } from 'react';
import TodoList from './TodoList';

class App extends Component {
  state = {
    todos: [],
    newTodoTitle: '',
  };

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.setState({ todos });
  }

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  toggleCompleted = (id) => {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  };

  setDate = (id, date) => {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, dueDate: date };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  };

  editTodo = (id, newTitle) => {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  };

  deleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id),
    });
  };

  toggleSelect = (id) => {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isSelected: !todo.isSelected };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  };

  deleteSelectedTodos = () => {
    this.setState({
      todos: this.state.todos.filter(todo => !todo.isSelected),
    });
  };

  addTodo = (event) => {
    event.preventDefault();
    const newTodo = {
      id: Date.now(),
      title: this.state.newTodoTitle,
      completed: false,
      isSelected: false,
    };
    if (newTodo.title.trim()) {
      this.setState(prevState => ({
        todos: [...prevState.todos, newTodo],
        newTodoTitle: '',
      }));
    }
  };

  handleTitleChange = (event) => {
    this.setState({ newTodoTitle: event.target.value });
  };

  render() {
    const anySelected = this.state.todos.some(todo => todo.isSelected);

    return (
        <div>
          <h1>TodoList</h1>
          <form onSubmit={this.addTodo}>
            <input
                type="text"
                placeholder="Ajouter une nouvelle tâche"
                value={this.state.newTodoTitle}
                onChange={this.handleTitleChange}
                required
            />
            <button type="submit">Ajouter</button>
          </form>
          <TodoList
              todos={this.state.todos}
              toggleCompleted={this.toggleCompleted}
              editTodo={this.editTodo}
              deleteTodo={this.deleteTodo}
              toggleSelect={this.toggleSelect}
              setDate={this.setDate}
          />
          {anySelected && (
              <button onClick={this.deleteSelectedTodos} style={{ marginTop: '20px' }}>
                Supprimer tout
              </button>
          )}
        </div>
    );
  }
}

export default App;
