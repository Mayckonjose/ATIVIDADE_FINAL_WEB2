// app/racas/[raca]/page.tsx
import { Image, Button, Card, CardBody } from '@nextui-org/react'; // Adicionado Card e CardBody
import Link from 'next/link';
import { notFound } from 'next/navigation'; // Para lidar com raças não encontradas

interface DogImagesByBreed {
  message: string[]; // Array de URLs de imagens
  status: string;
}

interface BreedPageProps {
  params: {
    raca: string; // O nome da raça virá como string
  };
}

async function getDogImagesByBreed(breed: string): Promise<string[]> {
  const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
  if (!res.ok) {
    // Se a raça não for encontrada ou houver outro erro na API
    if (res.status === 404) {
      notFound(); // Ativa o not-found.tsx (se você o tiver)
    }
    throw new Error(`Falha ao buscar imagens para a raça: ${breed}`);
  }
  const data: DogImagesByBreed = await res.json();
  return data.message;
}

// Metadata dinâmica para a página de raça específica
export async function generateMetadata({ params }: BreedPageProps) {
  const breedName = params.raca.replace(/-/g, ' '); // Formata para exibir no título
  return {
    title: `Fotos de ${breedName.charAt(0).toUpperCase() + breedName.slice(1)} - Dog Viewer`,
    description: `Veja diversas fotos da raça de cães ${breedName}.`,
  };
}

export default async function BreedPage({ params }: BreedPageProps) {
  const breedImages = await getDogImagesByBreed(params.raca);
  // Formata o nome da raça para exibição (ex: "golden-retriever" para "Golden Retriever")
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
        {/* Limita a 20 imagens para não sobrecarregar a página */}
        {breedImages.slice(0, 20).map((imageUrl, index) => (
          <Card key={index} className="py-4 w-full h-72">
            <CardBody className="overflow-hidden p-0 flex justify-center items-center">
              {/* O componente Image do NextUI é ótimo para otimização, mas a Dog API
                  fornece URLs diretas, então a tag <img> ou o componente Image
                  do NextUI funcionarão bem. Certifique-se de que o src esteja correto. */}
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