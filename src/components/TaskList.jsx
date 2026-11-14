import React, { useState, useCallback, memo } from 'react';

const TaskItem = memo(({ task, onToggle, onDelete }) => {
  console.log(`Рендер TaskItem: ${task.id}`);
  return (
    <div className="list-item" style={{ background: task.done ? 'var(--color-concrete)' : 'transparent' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
        <span style={{ textDecoration: task.done ? 'line-through' : 'none', color: task.done ? 'var(--color-muted)' : 'var(--color-white)' }}>
          {task.text}
        </span>
      </div>
      <button className="btn btn--small btn--danger" onClick={() => onDelete(task.id)}>✕</button>
    </div>
  );
});

export function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Вивчити useReducer', done: false },
    { id: 2, text: 'Оптимізувати компоненти', done: false },
    { id: 3, text: 'Написати тести', done: true },
  ]);
  const [input, setInput] = useState('');
  const [count, setCount] = useState(0); // Нерелевантний стан для перевірки оптимізації

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  // useCallback для стабільних посилань
  const toggleTask = useCallback((id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">03 / Оптимізований список (useCallback)</h2>
      
      <div style={{ marginBottom: '20px', padding: '10px', background: 'var(--color-background)', border: '2px dashed var(--color-border)' }}>
        <button className="btn" onClick={() => setCount(c => c + 1)}>
          Змінити нерелевантний стан (Лічильник: {count})
        </button>
        <p style={{ margin: '10px 0 0', fontSize: '11px', color: 'var(--color-muted)' }}>
          * Подивіться в консоль. При натисканні на цю кнопку <b>жоден TaskItem не перерендериться</b> завдяки useCallback.
        </p>
      </div>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input className="lab-input" value={input} onChange={e => setInput(e.target.value)} placeholder="Нове завдання..." />
        <button type="submit" className="btn">Додати</button>
      </form>

      <div className="list">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
        ))}
      </div>
    </div>
  );
}
