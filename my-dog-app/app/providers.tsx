// app/providers.tsx (Exemplo de como deve ser)
'use client'; // Necessário para componentes do lado do cliente no App Router

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation'; // Importar useRouter do Next.js para navegação

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter(); // Inicializar useRouter

  return (
    <NextUIProvider navigate={router.push}> {/* Passar a função navigate para o NextUIProvider */}
      {children}
    </NextUIProvider>
  );
}