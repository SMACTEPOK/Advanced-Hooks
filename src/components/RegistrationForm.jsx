import React, { useRef, useState, useEffect } from 'react';

export function RegistrationForm() {
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const attemptsRef = useRef(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
    startTimeRef.current = Date.now();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    attemptsRef.current += 1;
    
    const newErrors = {};
    if (!form.email.includes('@')) newErrors.email = 'Некоректний email';
    if (form.password.length < 6) newErrors.password = 'Мінімум 6 символів';
    if (form.password !== form.confirm) newErrors.confirm = 'Паролі не співпадають';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Фокусуємось на першому полі з помилкою
      if (newErrors.email) emailRef.current.focus();
      else if (newErrors.password) passwordRef.current.focus();
      else if (newErrors.confirm) confirmRef.current.focus();
      return;
    }

    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
    alert(`Успіх!\nСпроб: ${attemptsRef.current}\nЧас: ${timeSpent} сек.`);
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">04 / Форма (useRef)</h2>
      
      <div style={{ marginBottom: '15px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>
        Спроби: {attemptsRef.current}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="form-field">
          <label>Email</label>
          <input ref={emailRef} type="email" className={`lab-input ${errors.email ? 'input-error' : ''}`} value={form.email} onChange={handleChange('email')} />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        
        <div className="form-field">
          <label>Пароль</label>
          <input ref={passwordRef} type="password" className={`lab-input ${errors.password ? 'input-error' : ''}`} value={form.password} onChange={handleChange('password')} />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="form-field">
          <label>Підтвердження</label>
          <input ref={confirmRef} type="password" className={`lab-input ${errors.confirm ? 'input-error' : ''}`} value={form.confirm} onChange={handleChange('confirm')} />
          {errors.confirm && <span className="error-text">{errors.confirm}</span>}
        </div>

        <button type="submit" className="btn">Зареєструватися</button>
      </form>
    </div>
  );
}
