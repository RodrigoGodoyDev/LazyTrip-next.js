// src/app/dashboard/page.tsx
import { createServer } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Shield } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = await createServer();

  // 1. Verificar usuario (Seguridad)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // 2. Obtener datos de perfiles
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching data:', error);
    return (
      <div className="container py-8 mx-auto px-4">
        <div className="p-4 text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
          Error al cargar los datos de perfiles.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 mx-auto px-4 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard de Usuarios</h1>
        <p className="text-muted-foreground">
          Bienvenido, <span className="font-medium text-foreground">{user.email}</span>. Aquí tienes
          un resumen de los perfiles registrados en LazyTrip.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {profiles && profiles.length > 0 ? (
          profiles.map(profile => (
            <Card key={profile.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="bg-muted/30 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {profile.full_name || 'Usuario sin nombre'}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {profile.email}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>
                    Rol:{' '}
                    <span className="font-medium text-foreground capitalize">
                      {profile.role || 'user'}
                    </span>
                  </span>
                </div>
                <div className="mt-4 text-[10px] text-muted-foreground uppercase tracking-widest">
                  ID: {profile.id.substring(0, 8)}...
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg">
            No se encontraron perfiles registrados.
          </div>
        )}
      </div>
    </div>
  );
}
