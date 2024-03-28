import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';

class TodoItem extends Component {
    state = {
        showCalendar: false,
        isEditing: false,
        editText: this.props.todo.title
    };

    toggleCalendar = () => {
        this.setState(prevState => ({ showCalendar: !prevState.showCalendar }));
    };

    handleDateChange = (date) => {
        this.setState({ showCalendar: false });
        this.props.setDate(this.props.todo.id, date);
    };

    toggleEdit = () => {
        this.setState(prevState => ({ isEditing: !prevState.isEditing }));
    };

    handleEditChange = (event) => {
        this.setState({ editText: event.target.value });
    };

    handleSubmitEdit = (event) => {
        event.preventDefault();
        this.props.editTodo(this.props.todo.id, this.state.editText);
        this.setState({ isEditing: false });
    };

    render() {
        const { id, completed, isSelected, dueDate } = this.props.todo;
        const { showCalendar, isEditing, editText } = this.state;

        return (
            <li style={{ textDecoration: completed ? 'line-through' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <form onSubmit={this.handleSubmitEdit} style={{ flexGrow: 1 }}>
                    {isEditing ? (
                        <input type="text" value={editText} onChange={this.handleEditChange} onBlur={this.handleSubmitEdit} />
                    ) : (
                        <span onDoubleClick={this.toggleEdit}>
              <input type="checkbox" checked={completed} onChange={() => this.props.toggleCompleted(id)} />
                            {editText}
            </span>
                    )}
                </form>

                <span>
          {showCalendar && <Calendar onChange={this.handleDateChange} value={dueDate || new Date()} />}
                    <button onClick={this.toggleCalendar} style={{ border: 'none', background: 'none', marginRight: '10px' }}>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </button>
          <button onClick={this.toggleEdit} style={{ border: 'none', background: 'none', marginRight: '10px' }}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
          <button onClick={() => this.props.deleteTodo(id)} style={{ border: 'none', background: 'none' }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <input id="deleteAll" type="checkbox" checked={isSelected} onChange={() => this.props.toggleSelect(id)} style={{ marginLeft: '2vw' }} />
                    {dueDate && <p style={{ fontSize: '0.75em' }}>Échéance: {new Date(dueDate).toLocaleDateString()}</p>}
        </span>
            </li>
        );
    }
}

export default TodoItem;
