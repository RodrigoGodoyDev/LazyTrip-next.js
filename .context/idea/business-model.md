# Business Model - LazyTrip

## 1. Resumen Ejecutivo

LazyTrip es una plataforma de gestión de viajes "End-to-End" (E2E) diseñada para eliminar la fragmentación en la experiencia del viajero moderno. A diferencia de las OTAs (Online Travel Agencies) tradicionales que se centran en la transacción, LazyTrip se centra en el flujo de vida del viaje: desde el descubrimiento proactivo basado en presupuesto hasta la ejecución logística en el destino. Su núcleo diferencial es la hiper-integración con el ecosistema de Google y el uso de IA Generativa para resolver problemas espaciales y burocráticos con el mínimo esfuerzo por parte del usuario.

## 2. Definición Profunda del Problema

**2.1. Parálisis de la Elección (Discovery Phase)**
El usuario promedio visita 38 sitios web antes de reservar. La pregunta "¿A dónde voy?" genera ansiedad cuando el presupuesto es limitado.
_Fricción actual:_ Los buscadores (Skyscanner, Kayak) son reactivos.
_El Vacío:_ No existe herramienta que responda a: "Tengo $500 y 4 días libres. Sorpréndeme."

**2.2. Fatiga Logística (Planning Phase)**
Datos dispersos (PDFs, apps, notas) y olvido de documentos críticos.

**2.3. Desorientación en Destino (Experience Phase)**
Ineficiencia al visitar atracciones por falta de agrupación geográfica.

## 3. La Solución: LazyTrip (Módulos)

**Pilar 1: Smart Hunter (Motor de Descubrimiento Inverso)**

- Búsqueda por Presupuesto: Input dinero -> Output destinos.
- Flexibilidad de Fechas ("Any Weekend").
- Watchlist Inteligente.

**Pilar 2: Logística Automatizada (Smart Prep)**

- Generador de Equipaje Contextual (Clima + Tipo de viaje).
- Semáforo de Visados (Integración con datos diplomáticos).

**Pilar 3: Arquitecto de Rutas (Itinerary Builder)**

- Clustering Geográfico (K-Means para agrupar puntos).
- Deep-Link a Google Maps.

**Pilar 4: Ecosistema Google (Integration Core)**

- Sync a Calendar.
- Login Social.

## 4. Perfiles de Usuario

**A. Alex, el "Deal Hunter":** 24 años, presupuesto ajustado, flexible.
**B. Sarah, la "Power Planner":** 35 años, eficiente, maximiza el tiempo.

## 5. Requisitos Técnicos

- Frontend: PWA/Mobile First.
- APIs: Skyscanner/Amadeus, Google Maps, OpenWeatherMap.
- IA: OpenAI GPT-4o-mini.
- Auth: Firebase/Supabase + Google OAuth.

## 6. Modelo de Negocio

- Fase 1 (MVP): Afiliación (CPA vuelos/hoteles).
- Fase 2: Freemium ($5/mes para features Pro).
