import React from 'react';
import TodoItem from './TodoItem';
import { AnimatePresence } from 'framer-motion';
import { ClipboardList } from 'lucide-react';

const TodoList = ({ todos, toggleComplete, deleteTodo, editTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="todo-empty-state animate-fade-in">
        <div className="todo-empty-icon">
          <ClipboardList size={36} />
        </div>
        <p className="todo-empty-title">Todo despejado</p>
        <p className="todo-empty-sub">Añade una tarea arriba para empezar tu día con energía.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <AnimatePresence mode="popLayout">
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            index={index}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
