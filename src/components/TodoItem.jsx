import React, { useState } from 'react';
import { Check, Trash2, Edit2, X, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const TodoItem = ({ todo, toggleComplete, deleteTodo, editTodo, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    if (editedText.trim()) {
      editTodo(todo.id, editedText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleEdit();
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedText(todo.text);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, scale: 0.95 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className={`todo-item ${todo.completed ? 'todo-item--done' : ''}`}
    >
      {/* Left accent bar */}
      <div className={`todo-item-accent ${todo.completed ? 'todo-item-accent--done' : ''}`} />

      {/* Checkbox */}
      <button
        onClick={() => toggleComplete(todo.id)}
        className={`todo-checkbox ${todo.completed ? 'todo-checkbox--done' : ''}`}
        aria-label={todo.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
      >
        <motion.div
          initial={false}
          animate={{ scale: todo.completed ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <Check size={13} strokeWidth={3.5} />
        </motion.div>
      </button>

      {/* Text / Input */}
      <div className="todo-item-body">
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="todo-edit-input"
            autoFocus
          />
        ) : (
          <span className={`todo-item-text ${todo.completed ? 'todo-item-text--done' : ''}`}>
            {todo.text}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="todo-actions">
        {isEditing ? (
          <>
            <button
              onClick={handleEdit}
              className="todo-action-btn todo-action-btn--save"
              aria-label="Guardar"
            >
              <Save size={15} />
            </button>
            <button
              onClick={() => { setIsEditing(false); setEditedText(todo.text); }}
              className="todo-action-btn todo-action-btn--cancel"
              aria-label="Cancelar"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="todo-action-btn todo-action-btn--edit"
              aria-label="Editar"
            >
              <Edit2 size={15} />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="todo-action-btn todo-action-btn--delete"
              aria-label="Eliminar"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default TodoItem;
