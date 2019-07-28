import React from 'react';
import { getId } from './utils';

/**
 * interface Todo {
 *   id: number;
 *   title: string;
 *   completed: boolean;
 * }
 */

const NOOP = () => null;

const TODOS = [
  { id: getId(), title: 'Get up in time', completed: true },
  { id: getId(), title: 'Eat at Meatbar', completed: true },
  { id: getId(), title: 'Learn ReactJS', completed: false },
];

// window.todos = TODOS;

function Todo({ todo, onToggleTodo = NOOP, onDeleteTodo = NOOP }) {
  const style = todo.completed ? { textDecoration: 'line-through' } : {};
  return (
    <li
      style={style}
      onClick={e => {
        if (e.ctrlKey || e.metaKey) {
          return onDeleteTodo(todo);
        }
        onToggleTodo(todo);
      }}
    >
      {todo.title}
    </li>
  );
}

function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  return (
    <ul>
      {todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}

function EmptyState() {
  return (
    <h3>
      Nothing to do! <code>goto</code> the beach!
    </h3>
  );
}

export class App2 extends React.Component {
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

  render() {
    const { greeting = 'Hello', username } = this.props;
    const { todos } = this;
    return (
      <div className="container">
        <h1>
          <span>{username ? `${greeting}, ${username}` : greeting}</span>
        </h1>
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

export function App({ greeting = 'Hello', username }) {
  return (
    <div className="container">
      <h1>
        <span>{username ? `${greeting}, ${username}` : greeting}</span>
      </h1>
      {TODOS && TODOS.length ? <TodoList todos={TODOS} /> : <EmptyState />}
    </div>
  );
}
