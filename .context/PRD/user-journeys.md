# User Journeys - LazyTrip

**Versión:** 1.0
**Fecha:** 2026-02-02

---

## Journeys Principales

1.  **Discovery Journey (The Deal Hunter):** Alex encuentra un viaje barato para el fin de semana.
2.  **Planning Journey (The Smart Prep):** Sarah optimiza un viaje de negocios con tiempo libre.

---

### Journey 1: Discovery (Alex)

**Persona:** Alex (Deal Hunter)
**Goal:** Encontrar un destino por menos de $300 para Noviembre.
**Trigger:** Tiene un fin de semana libre y ahorros limitados.

#### Flujo Principal (Happy Path)

```
HOME ──→ SMART HUNTER ──→ RESULTS ──→ DETAILS ──→ AFFILIATE
 │            │             │           │           │
 ▼            ▼             ▼           ▼           ▼
Login/   Input: $300     Lista de    Revisa      Click en
Guest    + Noviembre     Destinos    Visado/     "Ver Vuelo"
         + Origen        Viables     Clima       (Skyscanner)
```

| Paso | Acción del Usuario                          | Respuesta del Sistema                          | Pantalla           |
| ---- | ------------------------------------------- | ---------------------------------------------- | ------------------ |
| 1    | Abre LazyTrip y selecciona "Smart Hunter"   | Muestra form simple de presupuesto/fechas      | Home               |
| 2    | Ingresa "$300", "Noviembre", desde "Madrid" | Procesa búsqueda inversa                       | Search             |
| 3    | Explora tarjetas de resultados              | Muestra: "Londres ($45)", "Marrakech ($80)"    | Results Grid       |
| 4    | Selecciona "Marrakech"                      | Muestra: Semáforo Visado, Clima, Costo         | Destination Detail |
| 5    | Click en "Reservar Vuelos"                  | Redirige a Skyscanner con búsqueda pre-llenada | External           |

---

### Journey 2: Planning & Sync (Sarah)

**Persona:** Sarah (Power Planner)
**Goal:** Organizar 4 horas libres en París y tenerlo en su calendario.
**Trigger:** Viaje de trabajo confirmado, quiere aprovechar la tarde.

#### Flujo Principal (Happy Path)

```
TRIP ──→ ADD POIs ──→ BUILDER ──→ REVIEW ──→ SYNC
 │          │           │           │         │
 ▼          ▼           ▼           ▼         ▼
Crea      Busca y     IA Agrupa   Ve mapa y   Envía a
Viaje     agrega      puntos      ruta        G-Calendar
          lugares
```

| Paso | Acción del Usuario              | Respuesta del Sistema              | Pantalla       |
| ---- | ------------------------------- | ---------------------------------- | -------------- |
| 1    | Crea viaje "París Express"      | Dashboard de viaje vacío           | Trip Dashboard |
| 2    | Busca "Torre Eiffel" y "Louvre" | Agrega POIs a la lista             | POI Search     |
| 3    | Click en "Optimizar Ruta"       | Algoritmo ordena por cercanía      | Route View     |
| 4    | Revisa el orden sugerido        | Muestra ruta en mapa y tiempos     | Map View       |
| 5    | Click en "Sync to Calendar"     | Crea eventos en su Google Calendar | Sync Modal     |

#### Edge Cases

| Caso                    | Qué pasa                   | Cómo se maneja                                               |
| ----------------------- | -------------------------- | ------------------------------------------------------------ |
| POIs muy lejanos        | Imposible hacer en 4 horas | Alerta: "Estos puntos están muy lejos, ¿dividir en 2 días?"  |
| Sin resultados (Hunter) | Presupuesto irreal         | Mensaje: "Sube tu presupuesto o cambia fechas" + Sugerencias |
| API Error (Sync)        | Google token expirado      | Solicita re-login con Google                                 |
