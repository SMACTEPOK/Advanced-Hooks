import React from 'react';
import Lab14Page from './pages/Lab14Page';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          <span className="app__brand-mark">✱</span>
          CRAFTMARKET
          <span className="app__brand-tag">LAB 14</span>
        </div>
      </header>
      <main className="app__main">
        <Lab14Page />
      </main>
      <footer className="app__footer">
        <p>© 2026 CRAFTMARKET · Лабораторна робота 14 · Optimization</p>
      </footer>
    </div>
  );
}
export default App;
