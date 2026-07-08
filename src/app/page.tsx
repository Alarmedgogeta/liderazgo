import RevealDeck from '@/components/reveal/RevealDeck';
import Slide from '@/components/reveal/Slide';
import FlipCard from '@/components/olist/FlipCard';
import KpiCard from '@/components/olist/KpiCard';
import MonthlyRevenueChart from '@/components/olist/MonthlyRevenueChart';
import LatencyScatter from '@/components/olist/LatencyScatter';
import PaymentDonut from '@/components/olist/PaymentDonut';
import CategoryTable from '@/components/olist/CategoryTable';
import kpis from '@/data/kpis.json';
import { formatBRL, formatBRLCompact, formatNumber } from '@/components/olist/format';

export default function Home() {
  return (
    <RevealDeck>
      {/* Slide 1 — Portada */}
      <Slide className="items-center text-center">
        <p className="mb-4 text-sm font-semibold tracking-widest text-neutral-500 uppercase">
          Proyecto Integrador · Analítica de Datos
        </p>
        <h1>Olist: dónde se gana y dónde se fuga el valor</h1>
        <p className="mt-4 max-w-3xl text-xl text-neutral-600">
          Análisis del marketplace brasileño ({formatNumber(kpis.totalOrders)} órdenes,{' '}
          {formatNumber(kpis.totalSellers)} vendedores) para identificar generadores de valor y
          oportunidades operativas en logística y experiencia del cliente.
        </p>
      </Slide>

      {/* Slide 2 — Data Product Canvas */}
      <Slide>
        <h2>Data Product Canvas</h2>
        <div className="grid grid-cols-3 gap-6">
          <FlipCard
            frontTitle="El problema"
            frontSubtitle="1 de cada 8 órdenes termina calificada con 1★ — y no sabemos cuánto nos cuesta."
            backTitle="Evidencia"
            backItems={[
              `${formatNumber(9352)} órdenes entregadas con score 1★`,
              `${kpis.lateDeliveryRate}% de las entregas llega después de la fecha estimada`,
              'Las reseñas bajas se concentran en órdenes con atraso logístico',
            ]}
          />
          <FlipCard
            frontTitle="La hipótesis"
            frontSubtitle="Reducir la latencia de entrega disminuye directamente el revenue en riesgo."
            backTitle="Mecanismo"
            backItems={[
              `Score promedio a tiempo: ${kpis.onTimeAvgScore}★ vs. ${kpis.lateAvgScore}★ con atraso`,
              `${formatBRLCompact(kpis.lateOrdersRevenue)} de pagos viajan en órdenes tardías`,
              'Cliente insatisfecho = menor recompra y peor reputación de marketplace',
            ]}
          />
          <FlipCard
            frontTitle="KPIs objetivo"
            frontSubtitle="Tres métricas para gobernar el problema desde un dashboard operativo."
            backTitle="Métricas"
            backItems={[
              `Tasa de entrega a tiempo (hoy: ${(100 - kpis.lateDeliveryRate).toFixed(1)}%)`,
              `Score promedio de reseñas (hoy: ${kpis.avgReviewScore}★)`,
              'Revenue en riesgo: pagos en órdenes con score 1–2★',
            ]}
          />
        </div>
      </Slide>

      {/* Slide 3 — Panorama general */}
      <Slide className="!py-8">
        <h2 style={{ marginBottom: '0.75rem' }}>
          Un negocio de {formatBRLCompact(kpis.totalRevenue)} que crece — con una fuga silenciosa
        </h2>
        <div className="mb-4 grid grid-cols-5 gap-3">
          <KpiCard label="Ingresos totales" value={formatBRLCompact(kpis.totalRevenue)} />
          <KpiCard label="Órdenes" value={formatNumber(kpis.totalOrders)} />
          <KpiCard label="Ticket promedio" value={`R$ ${kpis.avgTicket.toFixed(2)}`} />
          <KpiCard
            label="Tasa de entrega"
            value={`${kpis.deliveryRate}%`}
            detail="órdenes entregadas"
            tone="good"
          />
          <KpiCard
            label="Score promedio"
            value={`${kpis.avgReviewScore} ★`}
            detail={`${kpis.lateDeliveryRate}% de entregas tardías`}
            tone="bad"
          />
        </div>
        <MonthlyRevenueChart height={280} />
      </Slide>

      {/* Slide 4 — HU1: latencia */}
      <Slide className="!py-8">
        <h2 style={{ marginBottom: '0.5rem' }}>
          La fecha estimada es un acantilado: {kpis.onTimeAvgScore}★ a tiempo, {kpis.lateAvgScore}★
          con atraso
        </h2>
        <p className="mb-3 text-base text-neutral-600">
          Entregar antes de lo prometido apenas mejora el score — pero cada día de atraso lo
          derrumba. El patrón se repite en las cinco regiones.
        </p>
        <LatencyScatter height={330} />
      </Slide>

      {/* Slide 5 — HU2: costo de la insatisfacción */}
      <Slide className="!py-8">
        <h2 style={{ marginBottom: '0.5rem' }}>
          {formatBRL(2303091.56)} del volumen de pagos está en órdenes calificadas 1–2★
        </h2>
        <p className="mb-3 text-base text-neutral-600">
          El 15.1% del dinero que procesa Olist viaja en órdenes que dejaron clientes insatisfechos:
          revenue con baja probabilidad de recompra.
        </p>
        <PaymentDonut height={300} />
      </Slide>

      {/* Slide 6 — HU3: matriz comercial */}
      <Slide className="!py-8">
        <h2 style={{ marginBottom: '0.5rem' }}>
          Dónde priorizar: categorías con volumen alto, flete caro y score bajo
        </h2>
        <CategoryTable rows={11} />
      </Slide>

      {/* Slide 7 — Conclusiones */}
      <Slide>
        <h2>Recomendaciones</h2>
        <ol className="max-w-4xl space-y-4 text-xl text-neutral-700">
          <li>
            <strong>1. SLA por región y categoría.</strong> Recalibrar la fecha estimada donde el
            atraso es sistemático: la promesa incumplida cuesta {kpis.onTimeAvgScore}★ →{' '}
            {kpis.lateAvgScore}★.
          </li>
          <li>
            <strong>2. Alertas de riesgo en tránsito.</strong> Priorizar las órdenes que van a
            llegar tarde antes de que sucedan las reseñas: hoy{' '}
            {formatBRLCompact(kpis.lateOrdersRevenue)} viaja en órdenes tardías.
          </li>
          <li>
            <strong>3. Revisar el flete de las categorías críticas.</strong> Volumen alto + flete
            caro + score bajo = candidatas a renegociación logística inmediata.
          </li>
          <li>
            <strong>4. Dashboard vivo.</strong> Gobernar estos tres KPIs mes a mes con este mismo
            pipeline de datos (notebook → JSON → presentación).
          </li>
        </ol>
      </Slide>
    </RevealDeck>
  );
}
