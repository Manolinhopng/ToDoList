import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { ListTodo, CheckCircle2, Circle, Layout } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all'); // all, pending, completed

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'pending') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const pendingCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="app-root">
      {/* Decorative blobs */}
      <div className="app-blob app-blob--top" />
      <div className="app-blob app-blob--bottom" />

      <div className="app-container">
        {/* Header */}
        <header className="app-header animate-fade-in">
          <div className="header-icon mx-auto">
            <ListTodo size={44} />
          </div>
          <h1 className="app-title">
            ToDo<span className="text-gradient">Persist</span>
          </h1>
          <p className="app-subtitle">
            Tu centro de productividad minimalista con almacenamiento inteligente.
          </p>
        </header>

        {/* Filters + Badge row */}
        <div className="filter-row animate-slide-up">
          <div className="filter-bar">
            {[
              { id: 'all',       label: 'Todas',      icon: Layout      },
              { id: 'pending',   label: 'Pendientes', icon: Circle      },
              { id: 'completed', label: 'Hechas',     icon: CheckCircle2 },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`filter-btn ${filter === f.id ? 'filter-btn--active' : ''}`}
              >
                <f.icon size={16} />
                {f.label}
              </button>
            ))}
          </div>

          <div className="pending-badge">
            <span className="pending-badge__dot" />
            <span className="pending-badge__text">
              <span className="pending-badge__count">{pendingCount}</span> tareas por completar
            </span>
          </div>
        </div>

        {/* Main Content */}
        <main className="app-main">
          <TodoForm addTodo={addTodo} />
          <div className="mt-6">
            <TodoList
              todos={filteredTodos}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          </div>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <div className="app-footer__divider" />
          <p className="app-footer__text">
            <span>&copy; {new Date().getFullYear()} ToDoPersist</span>
            <span className="app-footer__dot" />
            <span>Built for Excellence</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
