# Architecture Specifications - LazyTrip

**Versión:** 1.0
**Fecha:** 2026-02-02

---

## System Architecture (C4 Level 2)

```
┌──────────────────────────────────────────────────────────┐
│                   USER DEVICE (Mobile/Desktop)           │
│                   [Browser - PWA Next.js]                │
└────────────────────────────┬─────────────────────────────┘
                             │ HTTPS / JSON
                             ▼
┌──────────────────────────────────────────────────────────┐
│                   VERCEL (Hosting Platform)              │
│                                                          │
│   ┌──────────────────────────────────────────────────┐   │
│   │              NEXT.JS APPLICATION                 │   │
│   │                                                  │   │
│   │  ┌──────────────┐     ┌───────────────────────┐  │   │
│   │  │  React UI    │     │   API Routes / SA     │  │   │
│   │  │ (Client Comp)│◄───►│   (Server Logic)      │  │   │
│   │  └──────────────┘     └─────┬─────┬─────┬─────┘  │   │
│   └─────────────────────────────┼─────┼─────┼────────┘   │
└─────────────────────────────────┼─────┼─────┼────────────┘
                                  │     │     │
          ┌───────────────────────┘     │     └────────────────────────┐
          │ (SQL / Rest)                │ (HTTPS)                      │ (HTTPS)
          ▼                             ▼                              ▼
┌───────────────────────┐    ┌───────────────────────┐    ┌─────────────────────────┐
│       SUPABASE        │    │      OPENAI API       │    │   TRAVEL DATA APIs      │
│ ┌───────────────────┐ │    │ (GPT-4o-mini)         │    │ (Skyscanner/Amadeus)    │
│ │ Postgres DB       │ │    └───────────────────────┘    │ (Google Maps Platform)  │
│ │ (Auth, Data, RLS) │ │                                 │ (OpenWeatherMap)        │
│ └───────────────────┘ │                                 └─────────────────────────┘
└───────────────────────┘
```

---

## Database Design (ERD)

```
┌──────────────┐       ┌──────────────┐
│ public.users │◀──1:1─│ profiles     │
│ (Supabase)   │       │ id (PK, FK)  │
└──────────────┘       │ full_name    │
       ▲               │ nationality  │
       │               │ preferences  │
       │               └──────────────┘
       │1:N
       │
┌──────────────┐       ┌──────────────┐      ┌──────────────┐
│ trips        │◀──1:N─│ trip_days    │◀──1:N│ trip_pois    │
│ id (PK)      │       │ id (PK)      │      │ id (PK)      │
│ user_id (FK) │       │ trip_id (FK) │      │ day_id (FK)  │
│ destination  │       │ date         │      │ google_place_id
│ budget       │       │ order_index  │      │ name         │
│ start_date   │       └──────────────┘      │ lat, lng     │
│ end_date     │                             │ type         │
│ status       │                             └──────────────┘
└──────┬───────┘
       │
       │1:N
       │
┌──────▼───────┐
│ packing_list │
│ id (PK)      │
│ trip_id (FK) │
│ item_name    │
│ category     │
│ is_checked   │
└──────────────┘
```

---

## Tech Stack Justification

| Componente             | Tecnología                   | Justificación                                                                                   |
| ---------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------- |
| **Frontend Framework** | **Next.js 15 (App Router)**  | Renderizado híbrido (Server/Client) para performance SEO en landing y dinamismo en app.         |
| **Styling**            | **Tailwind CSS + Shadcn/ui** | Velocidad de desarrollo y componentes accesibles listos para usar (MVP rápido).                 |
| **Database & Auth**    | **Supabase**                 | Backend-as-a-Service completo. Ahorra semanas de setup de Auth y DB. Capa gratuita generosa.    |
| **Maps**               | **Google Maps JS API**       | Estándar de industria. Indispensable para Places Autocomplete y mapas visuales confiables.      |
| **AI Logic**           | **OpenAI (GPT-4o-mini)**     | Balance perfecto costo/inteligencia para tareas de clasificación (packing) y clustering simple. |

---

## Security Architecture

### Authorization (RLS)

Todas las tablas tendrán Row Level Security habilitado.

```sql
-- Ejemplo Policy
CREATE POLICY "Users can only see their own trips"
ON public.trips
FOR SELECT USING (auth.uid() = user_id);
```

### Environment Variables

Secretos críticos (OpenAI Key, Supabase Service Role, Google Maps Server Key) residirán **solo** en el servidor (Vercel Env Vars), nunca en el bundle JS del cliente.
