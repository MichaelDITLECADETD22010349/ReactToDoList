import React, { Component } from 'react';
import TodoList from './TodoList';
import AddTask from "./AddTask.jsx";

class App extends Component {
  state = {
    todos: [
    ],
  };

  toggleCompleted = (id) => {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  };

  setDate = (id, date) => {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.dueDate = date;
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  };

  editTodo = (id) => {
    console.log('Editing todo with id:', id);
    // Logique d'édition à implémenter
  };

  deleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id),
    });
  };

  toggleSelect = (id) => {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.isSelected = !todo.isSelected;
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
    event.preventDefault(); // Empêche le formulaire de recharger la page
    const newTodo = {
      id: Date.now(), // Un identifiant unique pour chaque tâche
      title: this.state.newTodoTitle,
      completed: false,
      isSelected: false,
    };
    if (newTodo.title.trim()) {
      this.setState({
        todos: [...this.state.todos, newTodo],
        newTodoTitle: '', // Réinitialiser le champ après l'ajout
      });
    }
  };

  handleTitleChange = (event) => {
    this.setState({ newTodoTitle: event.target.value });
  };

  render() {
    const anySelected = this.state.todos.some(todo => todo.isSelected);

    return (
        <div><p>date:</p>
          <h1>Ma Liste de Tâches</h1>
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