import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Map, Wallet, Brain } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center py-24 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Viaja más, <span className="text-primary">planifica menos</span>.
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Descubre destinos ajustados a tu presupuesto y automatiza toda la logística de tu
              viaje con LazyTrip.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 min-w-[200px]">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                Empezar gratis
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8">
                Ver demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24 px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Features Core
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            Todo lo que necesitas para tu próxima aventura.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Brain className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Smart Hunter</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Motor de búsqueda inversa: Dinos tu presupuesto y fechas, nosotros encontramos el
                destino ideal.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Wallet className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Visa Check</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Semáforo de requisitos de visado basado en tu nacionalidad. Evita sorpresas
                desagradables.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Map className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Itinerary Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Agrupación geográfica inteligente de puntos de interés para optimizar tus días de
                viaje.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
