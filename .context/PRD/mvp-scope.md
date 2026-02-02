# MVP Scope - LazyTrip

**Versión:** 1.0
**Fecha:** 2026-02-02

---

## Epics del MVP

### EPIC-001: Authentication & User Profile

Gestión de identidad y preferencias del viajero.

### EPIC-002: Smart Hunter (Discovery)

Motor de búsqueda inversa basado en presupuesto.

### EPIC-003: Smart Prep (Logistics)

Herramientas de preparación automática (Visados y Equipaje).

### EPIC-004: Itinerary Builder

Creación y optimización de rutas diarias.

### EPIC-005: Google Integration

Sincronización con el ecosistema personal del usuario.

---

## User Stories & Priorización (MoSCoW)

### EPIC-001: Authentication & User Profile

| ID     | Story                                                                                           | Prioridad | Estimate |
| ------ | ----------------------------------------------------------------------------------------------- | --------- | -------- |
| US-1.1 | Como usuario, quiero registrarme con Google para acceder rápidamente.                           | **Must**  | 2 SP     |
| US-1.2 | Como usuario, quiero definir mi nacionalidad para que el sistema sepa mis requisitos de visado. | **Must**  | 1 SP     |

### EPIC-002: Smart Hunter (Discovery)

| ID     | Story                                                                                         | Prioridad  | Estimate |
| ------ | --------------------------------------------------------------------------------------------- | ---------- | -------- |
| US-2.1 | Como Alex, quiero buscar destinos por presupuesto máximo ($500) para ver mis opciones reales. | **Must**   | 5 SP     |
| US-2.2 | Como Alex, quiero seleccionar "Cualquier fecha" en un mes para encontrar el vuelo más barato. | **Should** | 3 SP     |
| US-2.3 | Como usuario, quiero ver detalles del destino (clima, costo vida) antes de elegir.            | **Should** | 3 SP     |

### EPIC-003: Smart Prep (Logistics)

| ID     | Story                                                                                 | Prioridad  | Estimate |
| ------ | ------------------------------------------------------------------------------------- | ---------- | -------- |
| US-3.1 | Como viajero, quiero ver un semáforo de visado (Rojo/Amarillo/Verde) para mi destino. | **Must**   | 2 SP     |
| US-3.2 | Como usuario, quiero generar una lista de equipaje basada en el clima de mi destino.  | **Should** | 3 SP     |
| US-3.3 | Como usuario, quiero marcar items de mi lista de equipaje como "listos".              | **Could**  | 1 SP     |

### EPIC-004: Itinerary Builder

| ID     | Story                                                                             | Prioridad | Estimate |
| ------ | --------------------------------------------------------------------------------- | --------- | -------- |
| US-4.1 | Como Sarah, quiero agregar puntos de interés (POIs) a un viaje.                   | **Must**  | 3 SP     |
| US-4.2 | Como Sarah, quiero que el sistema agrupe mis POIs en "Días" lógicos por cercanía. | **Must**  | 5 SP     |
| US-4.3 | Como usuario, quiero ver mis puntos en un mapa interactivo.                       | **Must**  | 3 SP     |

### EPIC-005: Google Integration

| ID     | Story                                                                     | Prioridad  | Estimate |
| ------ | ------------------------------------------------------------------------- | ---------- | -------- |
| US-5.1 | Como Sarah, quiero sincronizar mi itinerario final con Google Calendar.   | **Should** | 3 SP     |
| US-5.2 | Como usuario, quiero abrir la ruta de un día directamente en Google Maps. | **Must**   | 2 SP     |

---

## Out of Scope (MVP)

| Feature                              | Razón de exclusión                                        | Fase planeada |
| ------------------------------------ | --------------------------------------------------------- | ------------- |
| Compra directa (Vuelos/Hoteles)      | Complejidad legal/técnica. Se usarán links de afiliado.   | v2.0          |
| Modo Offline                         | Requiere desarrollo complejo de PWA/Native local storage. | v1.5          |
| Colaboración en tiempo real          | No crítico para validación inicial.                       | v1.5          |
| Multi-ciudad (Round trips complejos) | Algoritmo demasiado complejo para MVP.                    | v2.0          |
