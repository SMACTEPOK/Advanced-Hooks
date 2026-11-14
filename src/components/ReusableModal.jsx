import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { createPortal } from 'react-dom';

export const ReusableModal = forwardRef(function ReusableModal(props, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('Модальне вікно');
  const [content, setContent] = useState('Вміст...');

  useImperativeHandle(ref, () => ({
    open: (newContent) => {
      if (newContent) setContent(newContent);
      setIsOpen(true);
    },
    close: () => setIsOpen(false),
    setTitle: (newTitle) => setTitle(newTitle),
    getState: () => ({ isOpen, title, content: typeof content === 'string' ? content : 'React Component' })
  }));

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="btn btn--small btn--danger" onClick={() => setIsOpen(false)}>✕</button>
        </div>
        <div className="modal-body">
          {content}
        </div>
      </div>
    </div>,
    document.body
  );
});

export function ModalDemo() {
  const modalRef = React.useRef(null);

  // Створюємо компонент з кнопками, які будуть всередині модалки
  const ModalControls = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ margin: 0 }}>Це динамічний вміст. Кнопки нижче викликають імперативні методи батьківського компонента через ref.</p>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button className="btn btn--small" onClick={() => modalRef.current.setTitle('Заголовок змінено зсередини!')}>
          Змінити заголовок
        </button>
        <button className="btn btn--small" onClick={() => alert(JSON.stringify(modalRef.current.getState(), null, 2))}>
          Отримати стан
        </button>
        <button className="btn btn--small btn--danger" onClick={() => modalRef.current.close()}>
          Закрити вікно
        </button>
      </div>
    </div>
  );

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">05 / Модальне вікно (useImperativeHandle)</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button className="btn" onClick={() => modalRef.current.open(<ModalControls />)}>
          Відкрити модальне вікно
        </button>
      </div>
      <ReusableModal ref={modalRef} />
    </div>
  );
}
