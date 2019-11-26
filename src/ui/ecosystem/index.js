import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Title } from 'ui/atoms';
import { TodoList, TodoAdder } from 'ui/mols';
import { Home } from 'ui/organisms'

let _id = 0;
const getId = () => _id++;

const TODOS = [
  { id: getId(), title: 'Eat lunch', completed: true },
  { id: getId(), title: 'Drink third double espresso', completed: false },
];

export class App extends Component {
  state = { todos: TODOS };

  toggleTodo = todoId => {
    const newTodos = this.state.todos.map(todo => {
      if (todo.id === todoId) {
        // todo.completed = !todo.completed;
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    this.setState({
      todos: newTodos,
    });
  };

  deleteTodo = todoId => {
    const newTodos = this.state.todos.filter(todo => {
      return todo.id !== todoId;
    });
    this.setState({
      todos: newTodos,
    });
  };

  addTodo = title => {
    const todo = { id: getId(), title, completed: false };
    this.setState({ todos: [todo, ...this.state.todos] });
  };

  render() {
    const { titleColor = 'blue' } = this.props;
    const { todos } = this.state;
    return (
      <div className="container">
        <Title color={titleColor}>Hello world!</Title>
        <Route
          path="/"
          exact
          component={Home}
        />
        <TodoAdder
          key={todos.length}
          initialText={`Todo #${todos.length + 1}`}
          onAdd={this.addTodo}
        />
        <TodoList
          todos={todos}
          onToggle={this.toggleTodo}
          onDelete={this.deleteTodo}
        />
        <button>Click me!</button>
      </div>
    );
  }
}
