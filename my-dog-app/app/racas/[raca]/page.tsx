// app/racas/[raca]/page.tsx
import { Image, Button, Card, CardBody } from '@nextui-org/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface DogImagesByBreed {
  message: string[]; // Array de URLs de imagens
  status: string;
}

// Uma interface auxiliar para os parâmetros de rota.
// Não é o PageProps completo, mas foca apenas nos params esperados.
interface RouteParams {
  raca: string;
}

async function getDogImagesByBreed(breed: string): Promise<string[]> {
  const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error(`Falha ao buscar imagens para a raça: ${breed}`);
  }
  const data: DogImagesByBreed = await res.json();
  return data.message;
}

// Metadata dinâmica para a página de raça específica
// Usamos { params } e tipificamos diretamente aqui.
export async function generateMetadata({ params }: { params: RouteParams }) {
  const breedName = params.raca.replace(/-/g, ' ');
  return {
    title: `Fotos de ${breedName.charAt(0).toUpperCase() + breedName.slice(1)} - Dog Viewer`,
    description: `Veja diversas fotos da raça de cães ${breedName}.`,
  };
}

// Para o componente da página, também tipificamos diretamente as props.
export default async function BreedPage({ params }: { params: RouteParams }) {
  const breedImages = await getDogImagesByBreed(params.raca);
  const formattedBreedName = params.raca.replace(/-/g, ' ').charAt(0).toUpperCase() + params.raca.replace(/-/g, ' ').slice(1);

  if (breedImages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
        <h2 className="text-2xl font-bold mb-4">Nenhuma imagem encontrada para esta raça.</h2>
        <Link href="/" passHref>
          <Button color="primary">Voltar para a lista de Raças</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <Link href="/" passHref>
        <Button auto color="secondary" className="mb-6">
          Voltar para as Raças
        </Button>
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-center">Imagens de {formattedBreedName}</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {breedImages.slice(0, 20).map((imageUrl, index) => (
          <Card key={index} className="py-4 w-full h-72">
            <CardBody className="overflow-hidden p-0 flex justify-center items-center">
              <Image
                alt={`${formattedBreedName} ${index + 1}`}
                className="object-cover w-full h-full"
                src={imageUrl}
              />
            </CardBody>
          </Card>
        ))}
      </section>
    </div>
  );
}