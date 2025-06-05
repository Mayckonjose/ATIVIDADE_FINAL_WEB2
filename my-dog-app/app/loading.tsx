// app/loading.tsx
import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner size="lg" color="primary" />
      <p className="ml-4 text-lg">Carregando...</p>
    </div>
  );
}