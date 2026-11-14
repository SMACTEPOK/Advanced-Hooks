import React, { useReducer, useState } from 'react';

const ACTIONS = { ADD: 'ADD', REMOVE: 'REMOVE', TOGGLE: 'TOGGLE', FILTER: 'FILTER' };

const initialBooks = [
  { id: 1, title: '1984', author: 'Дж. Оруелл', category: 'Антиутопія', available: true },
  { id: 2, title: 'Гаррі Поттер', author: 'Дж. Роулінг', category: 'Фентезі', available: false },
  { id: 3, title: 'Дюна', author: 'Ф. Герберт', category: 'Фантастика', available: true },
  { id: 4, title: 'Тіні забутих предків', author: 'М. Коцюбинський', category: 'Класика', available: true },
];

function libraryReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD: {
      const newBook = { ...action.payload, id: Date.now(), available: true };
      return { ...state, books: [...state.books, newBook] };
    }
    case ACTIONS.REMOVE: return { ...state, books: state.books.filter(b => b.id !== action.payload) };
    case ACTIONS.TOGGLE: return { ...state, books: state.books.map(b => b.id === action.payload ? { ...b, available: !b.available } : b) };
    case ACTIONS.FILTER: return { ...state, filter: action.payload };
    default: return state;
  }
}

export function LibraryManager() {
  const [state, dispatch] = useReducer(libraryReducer, { books: initialBooks, filter: 'Всі' });
  const [form, setForm] = useState({ title: '', author: '', category: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.category) return;
    dispatch({ type: ACTIONS.ADD, payload: form });
    setForm({ title: '', author: '', category: '' });
  };

  const categories = ['Всі', ...new Set(state.books.map(b => b.category))];
  const filteredBooks = state.filter === 'Всі' ? state.books : state.books.filter(b => b.category === state.filter);
  
  const stats = {
    total: state.books.length,
    available: state.books.filter(b => b.available).length,
    unavailable: state.books.filter(b => !b.available).length
  };

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">01 / Бібліотека (useReducer)</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`btn ${state.filter === cat ? 'btn--active' : ''}`}
            onClick={() => dispatch({ type: ACTIONS.FILTER, payload: cat })}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', background: 'var(--color-background)', padding: '15px', border: '2px solid var(--color-border)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
        <span>Всього: <b>{stats.total}</b></span>
        <span style={{ color: 'var(--color-success)' }}>Доступно: <b>{stats.available}</b></span>
        <span style={{ color: 'var(--color-danger)' }}>Видано: <b>{stats.unavailable}</b></span>
      </div>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input className="lab-input" placeholder="Назва" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
        <input className="lab-input" placeholder="Автор" value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
        <input className="lab-input" placeholder="Категорія" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
        <button type="submit" className="btn">Додати книгу</button>
      </form>

      <div className="list">
        {filteredBooks.map(book => (
          <div key={book.id} className="list-item">
            <div>
              <strong style={{ color: book.available ? 'var(--color-white)' : 'var(--color-muted)' }}>{book.title}</strong>
              <div style={{ fontSize: '11px', color: 'var(--color-muted)' }}>{book.author} | {book.category}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn--small" onClick={() => dispatch({ type: ACTIONS.TOGGLE, payload: book.id })}>
                {book.available ? 'Видати' : 'Повернути'}
              </button>
              <button className="btn btn--small btn--danger" onClick={() => dispatch({ type: ACTIONS.REMOVE, payload: book.id })}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
