import React from 'react';

class AddTask extends React.Component {
    state = { input: '' };

    handleChange = (event) => {
        this.setState({ input: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onAddTask(this.state.input);
        this.setState({ input: '' });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.input}
                    onChange={this.handleChange}
                    placeholder="Ajouter une nouvelle tâche"
                />
                <button type="submit">Ajouter</button>
            </form>
        );
    }
}

export default AddTask;
