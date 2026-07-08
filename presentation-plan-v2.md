# Plan de Desarrollo: Presentación Ejecutiva Interactiva - Caso Olist

## 1. Visión General del Proyecto
**Stack Tecnológico:** Next.js (React), Reveal.js (Presentación), Recharts o Nivo (Gráficos Interactivos), Tailwind CSS (Estilos) y JSON (Datos estáticos pre-procesados).
**Objetivo:** Desarrollar un producto de datos web interactivo en formato de presentación ejecutiva que cuantifique el impacto financiero de las reseñas negativas, cruzando valor de compra, tiempos de cumplimiento y costos de flete, para priorizar mejoras operativas y logísticas en Olist.

---

## 2. Contexto del Negocio y Data Product Canvas

### Contexto del Negocio
* **Problema a resolver:** Olist asume que una entrega realizada es una venta exitosa, pero desconoce el "revenue en riesgo" generado por la insatisfacción del cliente. Las calificaciones bajas (1 y 2 estrellas) ocultan ineficiencias logísticas y sobrecostos que destruyen la lealtad y el valor futuro del cliente.
* **Objetivo del análisis:** Diseñar un producto de datos (Dashboard en Next.js con reveal.js, Recharts y Tailwind CSS) para cuantificar el impacto financiero de las reseñas negativas cruzando `payment_value`, tiempos de cumplimiento y `freight_value`.

### Data Product Canvas
* **Problema:** Alta incidencia de bajas calificaciones operativas que generan *churn* y dañan la rentabilidad.
* **Solución:** Dashboard web interactivo (Next.js + Reveal.js) de diagnóstico logístico y de CX.
* **Hipótesis y KPIs:** Reducir la brecha entre fecha estimada y real de entrega disminuirá las reseñas negativas en un X%. 
  * **KPIs:** Revenue en Riesgo (Suma de `payment_value` de órdenes con 1-2 estrellas) y Tasa de Cumplimiento de SLA logístico.
* **Clientes / Usuarios:** Director de Operaciones, Gerentes de Logística y Líderes de CX.
* **Alternativa:** Análisis fragmentados y reactivos en Excel operando en silos.
* **Datos:** Tablas `orders`, `reviews`, `order_items` y `payments` (Dataset Kaggle).
* **Valor de negocio:** Retención de ingresos identificando rutas, vendedores o categorías que generan mayor costo de insatisfacción.
* **Riesgos:** Más de 58,000 reseñas sin comentario (`review_comment_message`), limitando el análisis cualitativo.

---

## 3. Estructura de Slides y Gráficos Interactivos

### Slide 1: Portada y Contexto
* **Visual:** Título del proyecto, contexto del problema y objetivo.
* **UI Next.js:** Animación de entrada limpia usando Tailwind CSS, estableciendo el tono ejecutivo.

### Slide 2: Data Product Canvas
* **Visual:** Matriz 3x3 responsiva resumiendo el Canvas.
* **Interacción:** Efecto *hover* sobre los bloques (Problema, KPIs, Riesgos) para expandir los detalles sin saturar la pantalla.

### Slide 3: Historia 1 - El Impacto de la Latencia (Foco Logístico)
* **Historia:** *Como Director de Operaciones, quiero visualizar la diferencia en días entre la fecha estimada y la fecha real de entrega para órdenes de 1-2 estrellas, para identificar si el incumplimiento es el factor raíz.*
* **Implementación Gráfica (Recharts/Nivo):** Gráfico de Dispersión (*Scatter Plot*) o Barras Apiladas con Línea de Tendencia.
  * **Eje X:** Días de Atraso o Anticipación (`order_delivered_customer_date` - `order_estimated_delivery_date`).
  * **Eje Y / Línea de Tendencia:** `review_score` promedio (1 al 5).
* **Filtros Interactivos:** Dropdown para filtrar por región/estado de Brasil.
* **Valor Directivo:** Prueba visualmente la hipótesis central. Muestra innegablemente cómo el score se desploma al aumentar los días de atraso, definiendo el límite de tolerancia de la red logística.

### Slide 4: Historia 2 - Cuantificando el Riesgo (Foco Financiero / P&L)
* **Historia:** *Como Líder de CX, quiero identificar el volumen total de ingresos asociado a reseñas negativas, para cuantificar el impacto monetario exacto del mal servicio y justificar inversiones.*
* **Implementación Gráfica:** 1. **Tarjetas KPI (React Components):** * **Revenue Total:** Suma global de `payment_value`.
     * **Revenue en Riesgo:** Suma de `payment_value` filtrado para scores 1 y 2.
     * **% de Riesgo:** (Revenue en Riesgo / Revenue Total) * 100.
  2. **Gráfico de Anillo (*Donut Chart*):** Distribución de `payment_value` por las 5 categorías de `review_score`.
* **Filtros Interactivos:** Selector de trimestre/año para ver la evolución del "Revenue en Riesgo".
* **Valor Directivo:** Habla el lenguaje del dinero (Sprint Review). Demuestra a los *stakeholders* la fuga de capital operativo real frente a un simple "problema de quejas".

### Slide 5: Historia 3 - Culpables y Oportunidades (Foco Comercial)
* **Historia:** *Como Gerente Comercial, quiero identificar productos y categorías con el peor review_score promedio y mayor freight_value, para evaluar la rentabilidad de vendedores.*
* **Implementación Gráfica:** Matriz de Calor (*Heatmap Table*) o Gráfico de Cuadrantes.
  * **Filas:** `product_category_name_english`.
  * **Columnas/Valores:** Promedio de `freight_value`, Promedio de `review_score` y Recuento de `order_id` (Volumen).
  * **Formato Condicional:** Lógica de colores en React (Rojo = envíos caros y scores bajos; Verde = envíos baratos y scores altos).
* **Filtros Interactivos:** *Sort* dinámico en los encabezados de las columnas (ej. ordenar de peor a mejor *score*).
* **Valor Directivo:** Herramienta táctica para la célula ágil. Permite detectar qué categorías (ej. Muebles) tienen fletes caros y malas calificaciones, indicando daño de producto o cobros excesivos por parte de transportistas.

### Slide 6: Conclusión e Impacto Esperado (Feedback Loop)
* **Visual:** Resumen de acciones ejecutivas.
* **Texto Principal:** Al transformar los *reviews* en un instrumento de diagnóstico (*Feedback Loop*), Olist rompe los silos entre CX y Logística.
* **Acciones Estratégicas Derivadas:**
  1. Penalizar a vendedores con fletes caros y tiempos de entrega altos.
  2. Reestructurar rutas con entregas crónicamente tardías.
  3. Traducir la retroalimentación en protección directa de la rentabilidad y aumento del *Life Time Value* (LTV).

---

## 4. Guía de Arquitectura de Datos (Pre-procesamiento)
Dado que Next.js correrá en el navegador/cliente, los datos de Olist (cientos de miles de filas) deben ser pre-agregados en Python/Pandas y exportados como JSONs ligeros:
1. `kpis_financieros.json` (Para Slide 4).
2. `latencia_vs_score.json` (Para Slide 3).
3. `categorias_heatmap.json` (Para Slide 5).