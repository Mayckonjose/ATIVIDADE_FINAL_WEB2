// app/layout.tsx
import './globals.css'; // Importe seus estilos globais
import { Inter } from 'next/font/google'; // Exemplo de importação de fonte
import AppNavbar from '@/components/Navbar'; // Importe seu Navbar
import { Providers } from './providers'; // Importe seu provedor de contexto/NextUI

const inter = Inter({ subsets: ['latin'] }); // Configuração da fonte Inter

export const metadata = {
  title: 'Dog Viewer',
  description: 'Explore diversas raças de cães e suas fotos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="light"> {/* Pode ser "dark" ou "light" dependendo do seu tema padrão */}
      <body className={inter.className}>
        <Providers> {/* Envolve toda a sua aplicação com o provedor do NextUI */}
          <AppNavbar /> {/* Seu componente de navegação global */}
          {children} {/* Aqui serão renderizadas as páginas da sua aplicação */}
        </Providers>
      </body>
    </html>
  );
}