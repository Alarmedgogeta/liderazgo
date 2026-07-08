# Plan de Desarrollo: Presentación Ejecutiva Interactiva - Caso Olist

## 1. Objetivo del Proyecto
Diseñar y desarrollar un producto de datos interactivo en formato de presentación ejecutiva utilizando tecnologías web modernas (Next.js + Reveal.js) para responder preguntas clave del negocio de Olist. El objetivo es transformar los datos operativos en *insights* accionables enfocados en ventas, logística y experiencia del cliente.

---

## 2. Arquitectura y Stack Tecnológico

*   **Framework Frontend:** Next.js (React) - Permite renderizado rápido y estructuración por componentes.
*   **Motor de Presentación:** Reveal.js (mediante la librería `reveal.js` o wrappers como `reveal.js-react`) - Ideal para presentaciones con navegación fluida y soporte HTML/CSS nativo.
*   **Librería de Gráficos Interactivos:** Recharts o Nivo - Librerías de React perfectas para crear gráficos responsivos con *tooltips* interactivos y transiciones animadas.
*   **Estilos:** Tailwind CSS - Para mantener un diseño limpio, profesional y ejecutivo.
*   **Procesamiento de Datos:** Exportación previa de los *DataFrames* de Pandas del entorno Jupyter a archivos `.json` estáticos optimizados para la web (Next.js no debe procesar 100k+ filas en tiempo real).

---

## 3. Fase de Preparación de Datos (ETL Web)

Antes de programar en Next.js, se deben generar un archivo `brazilian-e-commerce-of-olist.ipynb` que lea los conjuntos de datos agregados desde la carpeta `public/dataset` que haga todo el analisis previo y genere los json con los datos agregados para alimentar los componentes de React:
1.  **JSON General:** KPIs principales (Ingresos totales: 20.5M BRL, Total de órdenes: 99,441, Ticket promedio: 160.99 BRL).
2.  **JSON Latencia vs. Review:** Datos agrupados por días de atraso logístico y el puntaje promedio de reseñas (1-5).
3.  **JSON Flete y Categoría:** Datos cruzando categorías de productos, volumen de ventas, costo de envío y calificación.

---

## 4. Estructura de la Presentación (Mapeo de Slides)

La presentación seguirá una narrativa de embudo: desde el panorama general hasta los impedimentos operativos y las conclusiones.

### Slide 1: Portada
*   **Contenido:** Título del Proyecto Integrador, Nombre del Equipo, y Contexto del Negocio.
*   **Mensaje:** Análisis del comercio electrónico Olist para identificar generadores de valor y áreas de oportunidad operativa.

### Slide 2: Data Product Canvas
*   **Contenido:** Estructura matricial del problema y la solución.
*   **Interacción:** Tablas tipo "Flip-card" en React para mostrar el problema (alta incidencia de bajas calificaciones) y la hipótesis/KPIs (Reducir latencia para disminuir *Revenue* en riesgo).

### Slide 3: Panorama General del Negocio
*   **Contenido:** Tarjetas de KPI dinámicas.
*   **Datos Reales a incluir:**
    *   Ingresos Totales: 20,579,664.01 BRL.
    *   Tasa de Entrega: 97.13%.
    *   Score Promedio de Reseñas: 4.02.
*   **Gráfico:** Línea de tiempo de ingresos mensuales (Destacando el pico histórico de Noviembre 2017 con 1.19M BRL).

### Slide 4: Historia de Usuario 1 - El Impacto de la Latencia (Logística)
*   **Contenido:** Visualización del cuello de botella en los tiempos de entrega.
*   **Gráfico Interactivo:** *Scatter Plot* (Gráfico de dispersión) interactivo de Recharts.
    *   *Eje X:* Días de atraso/anticipación de entrega.
    *   *Eje Y:* `review_score`.
*   **Filtros UI:** Botones superiores para filtrar el gráfico por región (Norte, Sur, etc.).

### Slide 5: Historia de Usuario 2 - El Costo de la Insatisfacción (Finanzas)
*   **Contenido:** Cuantificación del riesgo de retención de clientes.
*   **Gráfico Interactivo:** *Donut Chart* interactivo.
    *   Muestra la distribución del `payment_value` segmentado por los scores de reseñas del 1 al 5.
*   **Interacción:** Al hacer clic en la porción del anillo de "Score 1", aparece una tarjeta modal que calcula la suma monetaria en riesgo.

### Slide 6: Historia de Usuario 3 - Matriz Comercial y Fletes
*   **Contenido:** Identificación de productos/categorías problemáticos.
*   **Gráfico Interactivo:** *Heatmap Table* (Matriz de calor) desarrollada con Tailwind CSS.
    *   Muestra la categoría del producto, volumen, costo de flete promedio (`freight_value`) y puntaje de reseñas (`review_score`).
*   **Filtros UI:** Ordenamiento dinámico al hacer clic en las cabeceras de las columnas (ej. ordenar de los fletes más caros a los más baratos).

### Slide 7: Conclusiones y Recomendaciones Ágiles
*   **Contenido:** Impacto esperado de las recomendaciones.
*   **Mensaje:** Cómo el uso de estos datos permite a la organización priorizar recursos logísticos, mejorar el SLA y reducir áreas ineficientes.

---

## 5. Fases de Ejecución del Proyecto

### Fase 1: Inicialización
1. Ejecutar `npx create-next-app@latest olist-presentation`.
2. Instalar dependencias: `npm install reveal.js recharts lucide-react`.
3. Configurar Tailwind CSS.

### Fase 2: Desarrollo de Componentes Base
1. Crear el layout del componente Reveal.js dentro de un `use client` component de Next.js.
2. Construir la carpeta estática `/data` para alojar los archivos `.json` procesados.

### Fase 3: Integración de Gráficos y Slides
1. Diseñar el componente `KPI_Card.jsx`.
2. Programar `ScatterChart.jsx` para la latencia.
3. Programar `DonutChart.jsx` para el riesgo financiero.
4. Ensamblar las etiquetas `<section>` de Reveal.js importando cada componente.

### Fase 4: Pruebas y Despliegue
1. Refinar responsividad (asegurar visualización en proyectores estándar).
2. Despliegue continuo a través de **Vercel** (`git push origin main`).