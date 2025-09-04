import './globals.css';
import React from 'react';

export const metadata = {
  title: 'EIA Matrix Studio',
  description: 'Herramienta educativa para matrices de Impacto Ambiental (Leopold, Conesa, Battelle)'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-black antialiased">
        <div className="min-h-screen">
          <header className="border-b py-4 px-6">
            <h1 className="text-2xl font-bold">EIA Matrix Studio</h1>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
