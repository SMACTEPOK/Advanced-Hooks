import React, { useRef, useEffect, useState } from 'react';

export function ChartCanvas() {
  const canvasRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [scale, setScale] = useState(1);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  // Малювання нескінченного графіку
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    
    // Сітка, що рухається разом з графіком
    ctx.strokeStyle = '#383838';
    ctx.lineWidth = 1;
    const gridSize = 40 * scale;
    const startX = offset % gridSize;
    
    for (let x = startX; x < w; x += gridSize) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Малюємо нескінченну синусоїду
    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let x = 0; x < w; x++) {
      // Обчислюємо "реальну" координату X з урахуванням зсуву та масштабу
      const realX = (x - offset) / scale;
      // Генеруємо значення Y математично (синусоїда)
      const realY = Math.sin(realX * 0.05) * 50 + 100; 
      const y = h - (realY * scale); // Інвертуємо вісь Y та масштабуємо
      
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

  }, [offset, scale]);

  // Блокування прокрутки сторінки при наведенні на Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    
    const handleWheel = (e) => {
      e.preventDefault(); // Зупиняє скрол сторінки
      e.stopPropagation();
      setScale(prev => Math.max(0.2, Math.min(5, prev - e.deltaY * 0.001)));
    };

    // Використовуємо { passive: false }, щоб дозволити preventDefault
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    e.target.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastX.current;
    setOffset(prev => prev + dx);
    lastX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    isDragging.current = false;
    e.target.style.cursor = 'grab';
  };

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">ІНДИВІДУАЛЬНЕ / Canvas-графік (useRef)</h2>
      <p style={{ fontSize: '12px', color: 'var(--color-muted)' }}>
        Колесо мишки = масштаб (сторінка не скролиться). Затисніть та тягніть для панорамування.
      </p>
      
      <canvas
        ref={canvasRef}
        width={800}
        height={300}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ border: '3px solid var(--color-border)', background: 'var(--color-background)', cursor: 'grab', width: '100%', display: 'block' }}
      />
    </div>
  );
}
