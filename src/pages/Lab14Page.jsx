import React from 'react';
import { LibraryManager } from '../components/LibraryManager';
import { SalesAnalytics } from '../components/SalesAnalytics';
import { TaskList } from '../components/TaskList';
import { RegistrationForm } from '../components/RegistrationForm';
import { ModalDemo } from '../components/ReusableModal';
import { ChartCanvas } from '../components/ChartCanvas';
import './Lab14Page.css';

export default function Lab14Page() {
  return (
    <div className="lab-page">
      <header className="lab-header">
        <h1 className="lab-title">OPTIMIZATION</h1>
        <p className="lab-subtitle">Розширені хуки для масштабування</p>
      </header>
      <main className="lab-main">
        <LibraryManager />
        <SalesAnalytics />
        <TaskList />
        <RegistrationForm />
        <ModalDemo />
        <ChartCanvas />
      </main>
    </div>
  );
}
