import React, { useState, useMemo } from 'react';

// Генерація 1000 фейкових транзакцій
const transactions = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  date: new Date(2026, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  amount: Math.floor(Math.random() * 5000) + 100,
  category: ['Їжа', 'Техніка', 'Одяг', 'Книги'][Math.floor(Math.random() * 4)],
  customer: `Клієнт ${Math.floor(Math.random() * 50) + 1}`
}));

export function SalesAnalytics() {
  const [categoryFilter, setCategoryFilter] = useState('Всі');
  const [minAmount, setMinAmount] = useState(0);

  const filteredTransactions = useMemo(() => {
    console.log('Фільтрація транзакцій...');
    return transactions.filter(t => 
      (categoryFilter === 'Всі' || t.category === categoryFilter) && 
      t.amount >= minAmount
    );
  }, [categoryFilter, minAmount]);

  const stats = useMemo(() => {
    console.log('Обчислення статистики...');
    const total = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
    return {
      count: filteredTransactions.length,
      total,
      average: filteredTransactions.length ? total / filteredTransactions.length : 0
    };
  }, [filteredTransactions]);

  const topClients = useMemo(() => {
    console.log('Розрахунок топ-клієнтів...');
    const clientSums = filteredTransactions.reduce((acc, t) => {
      acc[t.customer] = (acc[t.customer] || 0) + t.amount;
      return acc;
    }, {});
    return Object.entries(clientSums).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [filteredTransactions]);

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">02 / Аналітика продажів (useMemo)</h2>
      <p style={{ color: 'var(--color-muted)', fontSize: '12px', marginBottom: '20px' }}>
        * Відкрийте консоль, щоб побачити, що важкі обчислення не запускаються при зміні не пов'язаного стану (наприклад, введенні тексту).
      </p>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <select className="lab-input" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="Всі">Всі категорії</option>
          <option value="Їжа">Їжа</option>
          <option value="Техніка">Техніка</option>
          <option value="Одяг">Одяг</option>
          <option value="Книги">Книги</option>
        </select>
        <input type="number" className="lab-input" value={minAmount} onChange={e => setMinAmount(Number(e.target.value))} placeholder="Мін. сума" />
      </div>

      <div className="stats-grid" style={{ marginBottom: '20px' }}>
        <div className="stat-box"><h3>Транзакцій</h3><p className="stat-number">{stats.count}</p></div>
        <div className="stat-box"><h3>Сума</h3><p className="stat-number">{stats.total} ₴</p></div>
        <div className="stat-box"><h3>Середній чек</h3><p className="stat-number">{stats.average.toFixed(0)} ₴</p></div>
      </div>

      <h3 style={{ color: 'var(--color-white)', marginBottom: '10px' }}>Топ-5 клієнтів:</h3>
      <div className="list">
        {topClients.map(([client, sum], idx) => (
          <div key={idx} className="list-item">
            <span style={{ color: 'var(--color-white)' }}>{idx + 1}. {client}</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-success)' }}>{sum} ₴</span>
          </div>
        ))}
      </div>
    </div>
  );
}
