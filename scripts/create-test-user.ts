import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Faltan variables de entorno SUPABASE_URL o SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createTestUser() {
  const email = 'demo@lazytrip.com';
  const password = 'LazyTrip2026!';
  const fullName = 'Demo User';

  console.log(`Creando usuario de prueba: ${email}...`);

  // 1. Crear usuario en Auth
  const { data: user, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });

  if (createError) {
    console.error('Error creando usuario:', createError.message);
    return;
  }

  console.log('✅ Usuario Auth creado ID:', user.user.id);

  // 2. Crear perfil en public.profiles (si la tabla existe)
  // Intentamos insertar, si falla asumimos que el trigger de auth lo hizo o la tabla no existe
  const { error: profileError } = await supabase.from('profiles').upsert({
    id: user.user.id,
    email: email,
    full_name: fullName,
    role: 'user',
  });

  if (profileError) {
    console.warn(
      '⚠️ No se pudo crear el perfil automáticamente (quizás falta la tabla o trigger):',
      profileError.message
    );
  } else {
    console.log('✅ Perfil creado/actualizado.');
  }
}

createTestUser();
