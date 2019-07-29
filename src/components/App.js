import React from 'react';
import { getId } from '../utils';
import { TodoAdder } from './TodoAdder';
import { TodoList } from './TodoList';

/**
 * interface Todo {
 *   id: number;
 *   title: string;
 *   completed: boolean;
 * }
 */

const TODOS = [
  { id: getId(), title: 'Get up in time', completed: true },
  { id: getId(), title: 'Eat at Meatbar', completed: true },
  { id: getId(), title: 'Learn ReactJS', completed: false },
];

function EmptyState() {
  return (
    <h3>
      Nothing to do! <code>goto</code> the beach!
    </h3>
  );
}

export class App extends React.Component {
  state = { todos: TODOS };

  get todos() {
    return this.state.todos;
  }

  set todos(newTodos) {
    this.setState({ todos: newTodos });
  }

  deleteTodo = todo => {
    this.todos = this.todos.filter(t => t.id !== todo.id);
  };

  toggleTodo = todo => {
    this.todos = this.todos.map(t => {
      if (t.id === todo.id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return t;
    });
  };

  addTodo = text => {
    this.todos = [
      { id: getId(), title: text, completed: false },
      ...this.todos,
    ];
  };

  render() {
    const { greeting = 'Hello', username } = this.props;
    const { todos } = this;
    return (
      <div className="container">
        <h1>
          <span>{username ? `${greeting}, ${username}` : greeting}</span>
        </h1>
        <TodoAdder onAddTodo={this.addTodo} />
        {todos && todos.length ? (
          <TodoList
            todos={todos}
            onToggleTodo={this.toggleTodo}
            onDeleteTodo={this.deleteTodo}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    );
  }
}
