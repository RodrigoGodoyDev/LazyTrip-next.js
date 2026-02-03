# Backend Setup & Infraestructura

## Base de Datos (Supabase)

### Tablas Fundacionales

#### 1. `profiles`

Tabla pública que extiende la información de `auth.users`.

- **PK:** `id` (uuid, referencia a auth.users)
- **Campos:** `email`, `full_name`, `avatar_url`, `role`
- **Trigger:** Se crea automáticamente cuando un usuario se registra (Auth Hook).

### Seguridad (RLS Policies)

- **SELECT:** Usuarios pueden ver sus propios datos.
- **UPDATE:** Usuarios pueden editar sus propios datos.
- **INSERT:** Gestionado por el trigger de Auth.

## Autenticación

- Proveedor: Supabase Auth (Email/Password)
- Middleware: Protege rutas privadas (`/dashboard`) y redirige si no hay sesión.

## Cliente Supabase

- `@/lib/supabase/client.ts`: Para componentes de cliente (Client Components).
- `@/lib/supabase/server.ts`: Para componentes de servidor (Server Components) y Server Actions.
