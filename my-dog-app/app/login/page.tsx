// app/login/page.tsx
'use client'; // Mantenha esta diretiva, pois você usa useState e useRouter

import React, { useState } from 'react';
import { Input, Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

// REMOVA ESTE BLOCO COMPLETO:
// export const metadata = {
//   title: 'Dog Viewer - Login',
//   description: 'Faça login para acessar recursos exclusivos.',
// };

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'user' && password === 'password') {
      console.log('Login bem-sucedido!');
      router.push('/');
    } else {
      setError('Nome de usuário ou senha inválidos.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-4">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex justify-center">
          <h1 className="text-3xl font-bold">Login</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              label="Nome de Usuário"
              placeholder="Digite seu nome de usuário"
              value={username}
              onValueChange={setUsername}
              isClearable
              color="primary"
            />
            <Input
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onValueChange={setPassword}
              isClearable
              color="primary"
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" color="primary" className="mt-4">
              Entrar
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}