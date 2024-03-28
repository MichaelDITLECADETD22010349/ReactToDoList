import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import Calendar from "react-calendar";

class TodoItem extends Component {
    state = {
        showCalendar: false
    };

    toggleCalendar = () => {
        this.setState(prevState => ({ showCalendar: !prevState.showCalendar }));
    };

    handleDateChange = (date) => {
        this.setState({ showCalendar: false });
        this.props.setDate(id, date);
    };
    render() {
        const {id, title, completed, isSelected, dueDate} = this.props.todo;
        const { showCalendar } = this.state;

        return (
            <li style={{
                textDecoration: completed ? 'line-through' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
        <span>
          <input
              type="checkbox"
              checked={completed}
              onChange={() => this.props.toggleCompleted(id)}
          />
            {title}
            {dueDate && <div style={{ fontSize: '0.75em' }}>Échéance: {dueDate.toLocaleDateString()}</div>}
        </span>

                <span>
                    {showCalendar && (
                        <Calendar
                            onChange={this.handleDateChange}
                            value={dueDate || new Date()}
                        />
                    )}
          <button onClick={this.toggleCalendar}
                  style={{border: 'none', background: 'none', marginRight: '10px'}}>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </button>
          <button onClick={() => this.props.editTodo(id)}
                  style={{border: 'none', background: 'none', marginRight: '10px'}}>
            <FontAwesomeIcon icon={faPencilAlt}/>
          </button>
          <button onClick={() => this.props.deleteTodo(id)} style={{border: 'none', background: 'none'}}>
            <FontAwesomeIcon icon={faTrash}/>
          </button>
              <input
                  id="deleteAll"
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => this.props.toggleSelect(id)}
                  style={{marginLeft: '2vw'}}
              />
                </span>
            </li>
        );
    }
}

export default TodoItem;
