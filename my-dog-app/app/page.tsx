// app/page.tsx
import { Card, CardHeader, CardBody, Divider, Button } from '@nextui-org/react';
import Link from 'next/link';

interface BreedsList {
  message: { [key: string]: string[] }; // Objeto onde a chave é a raça, e o valor é um array de sub-raças
  status: string;
}

async function getDogBreeds(): Promise<string[]> {
  const res = await fetch('https://dog.ceo/api/breeds/list/all');
  if (!res.ok) {
    throw new Error('Falha ao buscar raças de cães');
  }
  const data: BreedsList = await res.json();
  return Object.keys(data.message); // Retorna apenas as raças principais
}

// Metadata específica para esta página
export const metadata = {
  title: 'Dog Viewer - Raças de Cães',
  description: 'Explore diversas raças de cães e suas fotos.',
};

export default async function HomePage() {
  const breeds = await getDogBreeds();

  return (
    <main className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-4xl font-bold text-center my-8">Raças de Cães</h1>
      <Divider className="my-6" />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {breeds.map((breed) => (
          <Link href={`/racas/${breed}`} key={breed} passHref>
            <Card isPressable className="py-4 w-full h-40 flex flex-col justify-center items-center hover:bg-default-100 transition-colors">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                {/* Formata o nome da raça para exibição (ex: "golden-retriever" para "Golden Retriever") */}
                <h4 className="font-bold text-large capitalize">{breed.replace(/-/g, ' ')}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <p className="text-small text-default-500">Ver fotos</p>
              </CardBody>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  );
}