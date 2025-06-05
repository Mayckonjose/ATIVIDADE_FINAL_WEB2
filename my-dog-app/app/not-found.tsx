// app/not-found.tsx
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Página Não Encontrada</h1>
      <p className="text-lg text-gray-600 mb-6">Ops! Parece que você se perdeu. A página ou raça de cão que você procura não existe.</p>
      <Link href="/" passHref>
        <Button color="primary">Voltar para a Home</Button>
      </Link>
    </div>
  );
}