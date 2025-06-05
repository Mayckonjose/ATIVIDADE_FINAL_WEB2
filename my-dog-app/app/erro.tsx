// app/error.tsx
'use client'; // Error components must be Client Components

import { Button } from '@nextui-org/react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center p-4">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Algo deu errado!</h2>
      <p className="text-gray-600 mb-6">{error.message}</p>
      <Button onClick={() => reset()} color="primary">
        Tentar Novamente
      </Button>
    </div>
  );
}