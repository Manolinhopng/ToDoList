import React, { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8 animate-slide-up">
      <div className={`todo-form-wrapper ${focused ? 'focused' : ''}`}>
        <div className="todo-form-inner">
          <div className="todo-form-icon">
            <Sparkles size={18} />
          </div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="¿Qué tienes planeado para hoy?"
            className="todo-form-input"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="todo-form-btn"
          >
            <Plus size={22} strokeWidth={2.5} />
            <span>Añadir</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
