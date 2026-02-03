// src/lib/config.ts

/**
 * Centralización de variables de entorno.
 * IMPORTANTE: Next.js requiere acceso directo a process.env.NEXT_PUBLIC_*
 * para inyectarlas en el cliente (navegador).
 */

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Validación en tiempo de ejecución
if (typeof window === 'undefined') {
  // Validaciones del lado del servidor
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Advertencia: Faltan variables de Supabase en el servidor.');
  }
} else {
  // Validaciones del lado del cliente
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      '❌ Error Crítico: Las variables NEXT_PUBLIC_ de Supabase no están disponibles en el navegador.'
    );
  }
}
