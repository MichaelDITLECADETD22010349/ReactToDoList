import React from 'react';

class EditTask extends React.Component {
    state = { isEditing: false, newTitle: '' };

    handleEdit = () => {
        this.setState({ isEditing: true, newTitle: this.props.taskTitle });
    };

    handleChange = (event) => {
        this.setState({ newTitle: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onEditTask(this.props.taskId, this.state.newTitle);
        this.setState({ isEditing: false });
    };

    renderEditForm() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.newTitle}
                    onChange={this.handleChange}
                />
                <button type="submit">Modifier</button>
            </form>
        );
    }

    render() {
        return this.state.isEditing ? this.renderEditForm() : <button onClick={this.handleEdit}>Modifier</button>;
    }
}

export default EditTask;
