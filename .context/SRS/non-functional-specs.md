# Non-Functional Specifications - LazyTrip

**Versión:** 1.0
**Fecha:** 2026-02-02

---

## 1. Performance

### Web Vitals (Core)

| Métrica | Target MVP | Notas                                             |
| ------- | ---------- | ------------------------------------------------- |
| **LCP** | < 2.5s     | Crítico para retención en Mobile.                 |
| **CLS** | < 0.1      | Importante para evitar clicks erróneos en listas. |
| **FID** | < 100ms    | La UI debe sentirse "snappy".                     |

### API & AI Latency

- **Búsqueda Vuelos:** < 5s (Asíncrono/Streaming UI preferible).
- **Generación AI (Packing/Rutas):** < 10s.
  - _Estrategia:_ Mostrar Skeleton Screens y mensajes de "Pensando..." divertidos ("Doblando camisetas...", "Revisando mapas...").
- **DB Queries Simples:** < 100ms.

---

## 2. Security

### Authentication

- **Provider:** Supabase Auth (GoTrue).
- **Métodos:** Solo OAuth (Google) para MVP. Reduce riesgo de manejo de passwords.
- **Session:** JWT con expiración corta (1h) y Refresh Token seguro.

### Data Protection

- **RLS (Row Level Security):** Obligatorio en PostgreSQL.
  - _Política:_ `Users can only SELECT/INSERT/UPDATE their own trips`.
- **API Keys:** Keys de servicios terceros (OpenAI, Amadeus) almacenadas en variables de entorno servidor (`.env.local`), NUNCA expuestas al cliente.

---

## 3. Scalability

### Arquitectura

- **Frontend:** Vercel (Edge Network) para servir estáticos rapidísimo globalmente.
- **Backend:** Serverless Functions (Next.js API Routes). Escalan a cero y a infinito automáticamente.
- **Database:** Supabase (Tier Pro). Capaz de manejar miles de usuarios concurrentes.

---

## 4. Reliability

- **Uptime:** Dependencia de Vercel/Supabase (SLA 99.9%).
- **Fallbacks:**
  - Si falla API Vuelos: Mostrar mensaje "Buscadores ocupados, intenta en 1 min" (Graceful degradation).
  - Si falla AI: Tener listas predefinidas ("Pack Básico") como fallback.

---

## 5. Accessibility

- **WCAG 2.1 AA:** Contraste de colores adecuado (especialmente en mapas).
- **Touch Targets:** Botones de mínimo 44x44px para dedos en móvil.
- **Screen Readers:** Etiquetas `aria-label` en iconos de mapa y botones de acción.
