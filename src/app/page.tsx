import RevealDeck from '@/components/reveal/RevealDeck';
import Slide from '@/components/reveal/Slide';
import FlipCard from '@/components/olist/FlipCard';
import LatencyScatter from '@/components/olist/LatencyScatter';
import PaymentDonut from '@/components/olist/PaymentDonut';
import FinancialKpis from '@/components/olist/FinancialKpis';
import CategoryTable from '@/components/olist/CategoryTable';
import kpis from '@/data/kpis.json';
import financial from '@/data/financial_kpis.json';
import { formatBRL, formatBRLCompact, formatNumber } from '@/components/olist/format';

const negativeReviewRatio = Math.round(kpis.totalReviews / financial.total.atRiskOrders);

export default function Home() {
  return (
    <RevealDeck>
      {/* Slide 1 — Portada y contexto */}
      <Slide className="items-center text-center">
        <p className="mb-4 text-sm font-semibold tracking-widest text-neutral-500 uppercase">
          Proyecto Integrador · Analítica de Datos
        </p>
        <h1>Olist: el costo oculto de las reseñas negativas</h1>
        <p className="mt-4 max-w-3xl text-xl text-neutral-600">
          Olist asume que una entrega realizada es una venta exitosa, pero desconoce el{' '}
          <strong>revenue en riesgo</strong> que genera la insatisfacción: las calificaciones de
          1–2★ esconden ineficiencias logísticas y sobrecostos que destruyen la lealtad del cliente.
        </p>
        <p className="mt-4 max-w-3xl text-base text-neutral-500">
          Objetivo: cuantificar el impacto financiero de las reseñas negativas cruzando valor de
          pago, tiempos de cumplimiento y costo de flete — sobre {formatNumber(kpis.totalOrders)}{' '}
          órdenes y {formatBRLCompact(kpis.totalRevenue)} en pagos procesados.
        </p>
      </Slide>

      {/* Slide 2 — Data Product Canvas (matriz 3×3, hover para expandir) */}
      <Slide className="!py-8">
        <h2 style={{ marginBottom: '0.75rem' }}>Data Product Canvas</h2>
        <div className="grid grid-cols-3 gap-3">
          <FlipCard
            compact
            frontTitle="Problema"
            frontSubtitle="Alta incidencia de calificaciones 1–2★ que genera churn y daña la rentabilidad."
            backTitle="Evidencia"
            backItems={[
              `1 de cada ${negativeReviewRatio} reseñas es de 1–2★ (${formatNumber(financial.total.atRiskOrders)} órdenes)`,
              `${kpis.lateDeliveryRate}% de las entregas llega tarde`,
              `Con atraso, el score cae de ${kpis.onTimeAvgScore}★ a ${kpis.lateAvgScore}★`,
            ]}
          />
          <FlipCard
            compact
            frontTitle="Solución"
            frontSubtitle="Dashboard web interactivo de diagnóstico logístico y de experiencia del cliente."
            backTitle="Cómo"
            backItems={[
              'Next.js + Reveal.js + Recharts + Tailwind CSS',
              'Datos pre-agregados en Python/Pandas → JSON estáticos',
              'Tres historias: logística, financiera y comercial',
            ]}
          />
          <FlipCard
            compact
            frontTitle="Hipótesis"
            frontSubtitle="Reducir la brecha entre fecha estimada y real de entrega disminuirá las reseñas negativas."
            backTitle="Evidencia"
            backItems={[
              `Score a tiempo: ${kpis.onTimeAvgScore}★ vs. ${kpis.lateAvgScore}★ con atraso`,
              `${formatBRLCompact(kpis.lateOrdersRevenue)} de pagos viajan en órdenes tardías`,
            ]}
          />
          <FlipCard
            compact
            frontTitle="KPIs"
            frontSubtitle="Revenue en Riesgo y tasa de cumplimiento del SLA logístico."
            backTitle="Hoy"
            backItems={[
              `Revenue en riesgo: ${formatBRLCompact(financial.total.atRisk)} (${financial.total.riskPct}%)`,
              `Entrega a tiempo: ${(100 - kpis.lateDeliveryRate).toFixed(1)}%`,
              `Score promedio: ${kpis.avgReviewScore}★`,
            ]}
          />
          <FlipCard
            compact
            frontTitle="Clientes / Usuarios"
            frontSubtitle="Decisiones operativas y comerciales sobre el mismo producto de datos."
            backTitle="Usuarios"
            backItems={[
              'Director de Operaciones',
              'Gerentes de Logística',
              'Líderes de Experiencia del Cliente (CX)',
            ]}
          />
          <FlipCard
            compact
            frontTitle="Alternativa"
            frontSubtitle="Análisis fragmentados y reactivos en Excel, operando en silos."
            backTitle="Su costo"
            backItems={[
              'Sin una cifra única de revenue en riesgo',
              'Sin cruce entre CX y logística',
              'Diagnóstico reactivo, no preventivo',
            ]}
          />
          <FlipCard
            compact
            frontTitle="Datos"
            frontSubtitle="Dataset público de Olist (Kaggle): orders, reviews, order_items y payments."
            backTitle="Escala"
            backItems={[
              `${formatNumber(kpis.totalOrders)} órdenes · ${formatNumber(kpis.totalReviews)} reseñas`,
              `${formatNumber(kpis.totalCustomers)} clientes · ${formatNumber(kpis.totalSellers)} vendedores`,
            ]}
          />
          <FlipCard
            compact
            frontTitle="Valor de negocio"
            frontSubtitle="Retención de ingresos: detectar dónde cuesta más la insatisfacción."
            backTitle="Palancas"
            backItems={[
              'Rutas y regiones con atraso crónico',
              'Vendedores y categorías con flete caro',
              'Protección del Life Time Value (LTV)',
            ]}
          />
          <FlipCard
            compact
            frontTitle="Riesgos"
            frontSubtitle="El análisis cualitativo del feedback es limitado."
            backTitle="Detalle"
            backItems={[
              `${formatNumber(kpis.reviewsWithoutComment)} reseñas sin comentario escrito`,
              'El diagnóstico se apoya en señales operativas cuantitativas',
            ]}
          />
        </div>
      </Slide>

      {/* Slide 3 — Historia 1: el impacto de la latencia (foco logístico) */}
      <Slide className="!py-8">
        <h2 style={{ marginBottom: '0.5rem' }}>
          La fecha estimada es un acantilado: {kpis.onTimeAvgScore}★ a tiempo, {kpis.lateAvgScore}★
          con atraso
        </h2>
        <p className="mb-3 text-base text-neutral-600">
          <em>
            Como Director de Operaciones, quiero ver la diferencia entre fecha estimada y real de
            entrega para identificar si el incumplimiento es el factor raíz de las reseñas
            negativas.
          </em>{' '}
          El score se desploma con cada día de atraso — y el patrón se repite en las cinco regiones.
        </p>
        <LatencyScatter height={320} />
      </Slide>

      {/* Slide 4 — Historia 2: cuantificando el riesgo (foco financiero) */}
      <Slide className="!py-8">
        <h2 style={{ marginBottom: '0.5rem' }}>
          {formatBRL(financial.total.atRisk)} en órdenes 1–2★: el {financial.total.riskPct}% del
          revenue está en riesgo
        </h2>
        <p className="mb-3 text-base text-neutral-600">
          <em>
            Como Líder de CX, quiero cuantificar el volumen de ingresos asociado a reseñas negativas
            para justificar inversiones en servicio y logística.
          </em>{' '}
          Es dinero ya cobrado, pero con baja probabilidad de recompra.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <PaymentDonut height={260} />
          <FinancialKpis chartHeight={150} />
        </div>
      </Slide>

      {/* Slide 5 — Historia 3: culpables y oportunidades (foco comercial) */}
      <Slide className="!py-8">
        <h2 style={{ marginBottom: '0.5rem' }}>
          Dónde priorizar: categorías con volumen alto, flete caro y score bajo
        </h2>
        <p className="mb-3 text-base text-neutral-600">
          <em>
            Como Gerente Comercial, quiero identificar las categorías con peor score y mayor flete
            para evaluar la rentabilidad de vendedores y transportistas.
          </em>
        </p>
        <CategoryTable maxHeight={420} />
      </Slide>

      {/* Slide 6 — Conclusión e impacto esperado (feedback loop) */}
      <Slide>
        <h2>El feedback loop: de reseñas a protección de rentabilidad</h2>
        <p className="mb-6 max-w-4xl text-xl text-neutral-600">
          Al transformar los reviews en un instrumento de diagnóstico, Olist rompe los silos entre
          CX y Logística: cada reseña negativa se convierte en una señal operativa accionable.
        </p>
        <ol className="max-w-4xl space-y-4 text-xl text-neutral-700">
          <li>
            <strong>1. Penalizar a vendedores con fletes caros y tiempos de entrega altos.</strong>{' '}
            La matriz comercial identifica dónde el flete elevado convive con scores bajos.
          </li>
          <li>
            <strong>2. Reestructurar rutas con entregas crónicamente tardías.</strong> Hoy{' '}
            {formatBRLCompact(kpis.lateOrdersRevenue)} viaja en órdenes que llegan después de la
            promesa, y el score cae de {kpis.onTimeAvgScore}★ a {kpis.lateAvgScore}★.
          </li>
          <li>
            <strong>3. Traducir la retroalimentación en rentabilidad y LTV.</strong> Proteger los{' '}
            {formatBRLCompact(financial.total.atRisk)} en riesgo es retener clientes, no solo
            resolver quejas.
          </li>
        </ol>
      </Slide>
    </RevealDeck>
  );
}
