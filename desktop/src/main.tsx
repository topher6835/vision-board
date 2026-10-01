import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  return <main className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center">
    <section className="text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Vision Board</p>
      <h1 className="mt-4 text-3xl font-medium">A calm space for the things you find.</h1>
      <p className="mt-3 text-neutral-400">Desktop scaffold ready. Media collection is not implemented yet.</p>
    </section>
  </main>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
