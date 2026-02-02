# Functional Specifications - LazyTrip

**Versión:** 1.0
**Fecha:** 2026-02-02

---

## EPIC-001: Authentication & User Profile

### FR-001: Registro/Login con Google (US-1.1)

**Prioridad:** Must Have

**Input**

- Token OAuth de Google (provisto por Supabase Auth).

**Processing**

1.  Invocar `supabase.auth.signInWithOAuth()`.
2.  Recibir callback.
3.  Verificar si el usuario existe en `public.users`.
4.  Si no existe, crear registro copiando `email`, `full_name`, `avatar_url` de metadata.
5.  Crear sesión JWT.

**Output (Success)**

- Sesión activa.
- Redirección a Dashboard.

### FR-002: Actualizar Nacionalidad (US-1.2)

**Prioridad:** Must Have

**Input**
| Campo | Tipo | Validación |
|-------|------|------------|
| nationality | string (ISO 3166-1 alpha-2) | Requerido. Debe ser código país válido (ej: 'ES', 'MX'). |

**Processing**

1.  Validar formato ISO.
2.  Actualizar tabla `profiles` para el `user_id` actual.

**Output**

- JSON con perfil actualizado.

---

## EPIC-002: Smart Hunter (Discovery)

### FR-003: Búsqueda por Presupuesto (US-2.1)

**Prioridad:** Must Have

**Input**
| Campo | Tipo | Validación |
|-------|------|------------|
| budget | number | > 50, < 10000 |
| origin | string (IATA) | Código aeropuerto válido (ej: 'MAD') |
| month | string (YYYY-MM) | Mes futuro válido |

**Processing**

1.  Consultar API de Vuelos (ej: Skyscanner/Amadeus) con "Everywhere" search.
2.  Filtrar resultados donde `precio_vuelo < budget * 0.7` (dejando 30% para estadía estimativa).
3.  Consultar DB interna/AI para costo vida estimado por día en destinos hallados.
4.  Retornar lista filtrada y ordenada por precio ascendente.

**Output**

```json
{
  "results": [
    {
      "destination": "London",
      "flightPrice": 45,
      "estimatedStay": 150,
      "total": 195,
      "image": "url..."
    }
  ]
}
```

---

## EPIC-003: Smart Prep (Logistics)

### FR-004: Consultar Estado de Visado (US-3.1)

**Prioridad:** Must Have

**Input**
| Campo | Tipo |
|-------|------|
| destination_country | string (ISO code) |

**Processing**

1.  Obtener `nationality` del perfil del usuario.
2.  Consultar Base de Datos de Reglas de Visado (o API externa/AI Cacheada).
3.  Determinar estado: "Visa Required", "Visa Free", "E-Visa".

**Output**

```json
{ "status": "GREEN", "description": "Visa Free for 90 days" }
```

### FR-005: Generar Lista de Equipaje (US-3.2)

**Prioridad:** Should Have

**Input**

- `destination` (lat/long o ciudad)
- `dates` (start, end)
- `trip_type` (business/leisure)

**Processing**

1.  Obtener pronóstico del tiempo histórico/actual para las fechas y lugar (OpenWeatherMap).
2.  Construir prompt para LLM: "Genera lista de equipaje para [Destino] con clima [Lluvia, 15°C] para viaje de [Business]".
3.  Parsear respuesta JSON del LLM.

**Output**

```json
{ "categories": [{ "name": "Ropa", "items": ["Impermeable", "Traje"] }] }
```

---

## EPIC-004: Itinerary Builder

### FR-006: Optimizar Ruta (US-4.2)

**Prioridad:** Must Have

**Input**

- Array de POIs (Points of Interest) con `{lat, lng, id}`.
- `start_date`, `end_date`.

**Processing**

1.  Si n_puntos > n_dias \* 4: Alerta "Demasiados puntos".
2.  Ejecutar algoritmo de Clustering (K-Means) basado en geo-coordenadas para agrupar en días.
3.  Dentro de cada cluster (día), ordenar puntos usando heurística de viajero (TSP simple o cercanía).

**Output**

```json
{
  "days": [
    { "date": "2026-11-01", "pois": ["A", "B", "C"], "center": {lat, lng} }
  ]
}
```

---

## EPIC-005: Google Integration

### FR-007: Sync to Calendar (US-5.1)

**Prioridad:** Should Have

**Input**

- `trip_id`.
- Google OAuth Access Token (scope: calendar.events).

**Processing**

1.  Recuperar itinerario del viaje.
2.  Iterar por días y POIs.
3.  Crear eventos en Google Calendar:
    - "Vuelo a [Destino]"
    - "[POI Name]" (Bloque de 2h default).
4.  Manejar rate limits de Google API.

**Output**

- `success: true`, `events_created`: 5.
