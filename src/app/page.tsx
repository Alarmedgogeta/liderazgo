import Image from 'next/image';
import {
  CircleDollarSign,
  Clock,
  Globe,
  LayoutDashboard,
  Mail,
  TrendingUp,
  TriangleAlert,
  Truck,
} from 'lucide-react';
import RevealDeck from '@/components/reveal/RevealDeck';
import Slide from '@/components/reveal/Slide';
import LatencyScatter from '@/components/olist/LatencyScatter';
import PaymentDonut from '@/components/olist/PaymentDonut';
import FinancialKpis from '@/components/olist/FinancialKpis';
import CategoryTable from '@/components/olist/CategoryTable';
import kpis from '@/data/kpis.json';
import financial from '@/data/financial_kpis.json';
import { formatNumber } from '@/components/olist/format';

/*
 * Diseño calcado del PPTX "Olist - Presentación Ejecutiva Analítica.pptx"
 * (public/). El deck reveal.js es 1280×720 = 13.33in × 7.50in a 96 dpi, así
 * que las medidas del PPTX se trasladan 1:1 (1 in = 96 px, 1 pt = 4/3 px).
 * Paleta del archivo: #0F172A / #1E293B (tinta), #334155 (cuerpo), #64748B y
 * #94A3B8 (apagados), #005088 y #0284C7 / #0EA5E9 (azules), #EF4444 (riesgo),
 * #FB923C (viñetas). Tipografía: Merriweather (títulos), DM Sans (cuerpo),
 * Poppins + Lato (portadas de sección corporativas).
 */

const LIGHT_SLIDE = 'rounded-3xl bg-[linear-gradient(135deg,#F8FAFC_0%,#EEF1F6_55%,#E9EDF3_100%)]';
const WHITE_SLIDE = 'rounded-3xl bg-[linear-gradient(135deg,#FFFFFF_55%,#F8FAFC_100%)]';

const negativeReviewRatio = Math.round(kpis.totalReviews / financial.total.atRiskOrders);
const atRiskM = `$${(financial.total.atRisk / 1_000_000).toFixed(2)}M BRL`;
const lateRevenueM = `${(kpis.lateOrdersRevenue / 1_000_000).toFixed(2)}M BRL`;

function CanvasCard({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: string[];
}) {
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-4 text-left">
      <p className="font-poppins text-[15px] leading-none font-bold tracking-wide text-[#1E293B] uppercase">
        {title}
      </p>
      <p className="font-lato !mt-2 text-[14px] leading-tight font-bold text-[#005088]">
        {subtitle}
      </p>
      <ul className="!mt-2 space-y-1">
        {items.map((item) => (
          <li key={item} className="font-lato flex gap-2 text-[13px] leading-tight text-[#334155]">
            <span className="shrink-0 text-[#FB923C]">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PillarCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[455px] flex-col items-center rounded-2xl border border-[#E2E8F0] bg-white px-7 pt-11 pb-8 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <span className="text-[#0284C7]">{icon}</span>
      <p className="font-merriweather !mt-7 text-[26px] leading-tight font-bold text-[#1E293B]">
        {title}
      </p>
      <p className="font-dmsans !mt-5 text-center text-[19px] leading-normal text-[#334155]">
        {children}
      </p>
    </div>
  );
}

function ObjectiveRow({ icon, lead, rest }: { icon: React.ReactNode; lead: string; rest: string }) {
  return (
    <li className="font-lato flex items-center gap-3 text-[18px] text-[#334155]">
      <span className="shrink-0 text-[#0284C7]">{icon}</span>
      <span>
        <strong className="text-[#0F172A]">{lead}</strong> {rest}
      </span>
    </li>
  );
}

export default function Home() {
  return (
    <RevealDeck>
      {/* Slide 1 — Portada (PPTX 1: fondo navy, acento cielo) */}
      <Slide className="items-center rounded-3xl bg-[linear-gradient(135deg,#0B1120_0%,#0F172A_50%,#1B2637_100%)] text-center">
        <h1 className="max-w-[960px] !text-white">
          Cuantificación del Riesgo Financiero por{' '}
          <span className="text-[#0EA5E9]">Insatisfacción</span> en Olist
        </h1>
        <div className="!mt-8 h-1 w-20 rounded-full bg-[#0EA5E9]" />
        <p className="font-dmsans !mt-7 max-w-[900px] text-[24px] leading-normal text-[#94A3B8]">
          De la retroalimentación al Life Time Value: Un enfoque analítico para alinear la
          Experiencia del Cliente y la Eficiencia Logística.
        </p>
      </Slide>

      {/* Slide 2 — Contexto del Negocio (PPTX 2: Poppins/Lato, azul #005088) */}
      <Slide className={`${WHITE_SLIDE} !justify-start text-left`}>
        <h2 className="!font-poppins !text-[36px] !font-bold !text-[#005088]">
          Contexto del Negocio
        </h2>
        <div className="grid flex-1 grid-cols-2 items-center gap-x-16">
          <div>
            <p className="font-poppins text-[19px] font-bold text-[#005088]">El Problema</p>
            <p className="font-lato !mt-3 text-[18px] leading-relaxed text-[#334155]">
              Olist asume que una entrega realizada es un éxito, ignorando el{' '}
              <strong className="text-[#0F172A]">&ldquo;revenue en riesgo&rdquo;</strong> por la
              insatisfacción. Las calificaciones de 1–2★ ocultan ineficiencias logísticas y
              sobrecostos que destruyen el Life Time Value (LTV).
            </p>
            <div className="!mt-9 pl-[26px]">
              <p className="font-lato text-[18px] font-bold text-[#005088]">Hipótesis Central:</p>
              <p className="font-lato !mt-1 text-[18px] leading-relaxed text-[#334155]">
                Reducir la brecha entre la fecha estimada y la real disminuirá drásticamente las
                reseñas negativas.
              </p>
            </div>
          </div>
          <div>
            <p className="font-poppins text-[19px] font-bold text-[#005088]">
              Objetivo Estratégico
            </p>
            <p className="font-lato !mt-3 text-[18px] text-[#334155]">
              Diseñar un producto de datos <strong className="text-[#0F172A]">interactivo</strong>{' '}
              que cruce:
            </p>
            <ul className="!mt-5 space-y-4">
              <ObjectiveRow
                icon={<CircleDollarSign size={20} />}
                lead="Valor de compra"
                rest="(Revenue total)"
              />
              <ObjectiveRow
                icon={<Clock size={20} />}
                lead="Latencia de entrega"
                rest="(Promesa vs Real)"
              />
              <ObjectiveRow
                icon={<Truck size={20} />}
                lead="Costos de flete"
                rest="(Eficiencia logística)"
              />
            </ul>
          </div>
        </div>
      </Slide>

      {/* Slide 3 — Estructura del Problema (PPTX 3: tres pilares sobre gris azulado) */}
      <Slide className={`${LIGHT_SLIDE} !justify-start text-left`}>
        <h2>Estructura del Problema</h2>
        <div className="!mt-[74px] grid grid-cols-3 gap-[31px]">
          <PillarCard icon={<TriangleAlert size={44} strokeWidth={2} />} title="El Problema">
            Olist asume que una entrega realizada es exitosa. Se desconoce la fuga de capital por
            ineficiencias logísticas que generan bajas calificaciones (1 y 2 estrellas) y destruyen
            la lealtad.
          </PillarCard>
          <PillarCard
            icon={<LayoutDashboard size={44} strokeWidth={2} />}
            title="La Solución y KPIs"
          >
            Un dashboard interactivo que cruza tiempos de cumplimiento, costo de fletes y valor de
            compra. <strong>KPI Principal:</strong> Revenue en Riesgo (suma del valor de órdenes mal
            evaluadas).
          </PillarCard>
          <PillarCard icon={<TrendingUp size={44} strokeWidth={2} />} title="Valor de Negocio">
            Identificar quirúrgicamente qué rutas, vendedores o categorías generan insatisfacción.
            Permite retener ingresos abandonando análisis reactivos y rompiendo silos operativos.
          </PillarCard>
        </div>
      </Slide>

      {/* Slide 4 — Data Product Canvas (PPTX 4: matriz 3×3 estática) */}
      <Slide className={`${WHITE_SLIDE} !justify-start !py-10 text-left`}>
        <h2 className="!font-poppins !text-[36px] !font-bold !text-[#005088]">
          Data Product Canvas
        </h2>
        <div className="!mt-6 grid flex-1 grid-cols-3 grid-rows-3 gap-[15px]">
          <CanvasCard
            title="Problema"
            subtitle="Calificaciones 1–2★ dañan rentabilidad."
            items={[
              `1 de cada ${negativeReviewRatio} reseñas es de 1–2★ (${formatNumber(financial.total.atRiskOrders)} órdenes)`,
              `${kpis.lateDeliveryRate}% de las entregas llega tarde`,
              `Score cae de ${kpis.onTimeAvgScore}★ a ${kpis.lateAvgScore}★ con atraso`,
            ]}
          />
          <CanvasCard
            title="Solución"
            subtitle="Dashboard web interactivo CX/Logístico."
            items={[
              'Next.js + Recharts + Tailwind CSS',
              'Datos pre-agregados en Python/Pandas',
              'Tres historias: logística, financiera y comercial',
            ]}
          />
          <CanvasCard
            title="Hipótesis"
            subtitle="Menor brecha de entrega = menos quejas."
            items={[
              `Score ${kpis.onTimeAvgScore} (a tiempo) vs. ${kpis.lateAvgScore} (atraso)`,
              `${lateRevenueM} en pagos viajan en órdenes tardías`,
            ]}
          />
          <CanvasCard
            title="KPIs"
            subtitle="Revenue en Riesgo y SLA logístico."
            items={[
              `Revenue en riesgo: ${(financial.total.atRisk / 1_000_000).toFixed(2)}M BRL (${financial.total.riskPct}%)`,
              `Entrega a tiempo: ${(100 - kpis.lateDeliveryRate).toFixed(1)}%`,
              `Score promedio: ${kpis.avgReviewScore}★`,
            ]}
          />
          <CanvasCard
            title="Clientes / Usuarios"
            subtitle="Operaciones, Logística y Líderes de CX."
            items={[
              'Director de Operaciones',
              'Gerentes de Logística',
              'Líderes de Experiencia del Cliente (CX)',
            ]}
          />
          <CanvasCard
            title="Alternativa"
            subtitle="Análisis fragmentados en Excel (Silos)."
            items={[
              'Sin cifra única de revenue en riesgo',
              'Sin cruce entre CX y logística',
              'Diagnóstico reactivo, no preventivo',
            ]}
          />
          <CanvasCard
            title="Datos"
            subtitle="Dataset Olist (Orders, Payments, Reviews)."
            items={[
              `${formatNumber(kpis.totalOrders)} órdenes · ${formatNumber(kpis.totalReviews)} reseñas`,
              `${formatNumber(kpis.totalCustomers)} clientes · ${formatNumber(kpis.totalSellers)} vendedores`,
            ]}
          />
          <CanvasCard
            title="Valor de Negocio"
            subtitle="Retención de ingresos y protección de LTV."
            items={[
              'Detectar rutas con atraso crónico',
              'Detectar vendedores con flete caro',
              'Protección del Life Time Value (LTV)',
            ]}
          />
          <CanvasCard
            title="Riesgos"
            subtitle="Análisis cualitativo limitado."
            items={[
              `${formatNumber(kpis.reviewsWithoutComment)} reseñas sin comentario escrito`,
              'Apoyo en señales operativas cuantitativas',
            ]}
          />
        </div>
        <div className="!mt-4 border-t border-[#DBEAFE]" />
      </Slide>

      {/* Slide 5 — Historia 1 (PPTX 5: panel blanco; se conserva el chart interactivo) */}
      <Slide className={`${LIGHT_SLIDE} !justify-start text-left`}>
        <h2>Historia 1: El Impacto Logístico en la Satisfacción</h2>
        <div className="!mt-5 flex flex-1 flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
          <p className="font-dmsans !mb-3 max-w-[960px] text-[19px] leading-snug text-[#334155]">
            <strong>Hipótesis Validada:</strong> La diferencia entre la fecha estimada y real de
            entrega dicta el <em>review score</em>. El límite de tolerancia logística es nulo: un
            atraso de apenas 5 días desploma la calificación de 4.03 a 2.20 estrellas.
          </p>
          <LatencyScatter height={320} />
        </div>
      </Slide>

      {/* Slide 6 — Historia 2 (PPTX 6: cifras financieras + distribución de pagos) */}
      <Slide className={`${LIGHT_SLIDE} !justify-start text-left`}>
        <h2>Historia 2: Cuantificando el Riesgo (P&amp;L)</h2>
        <p className="font-dmsans !mt-2 text-[19px] leading-snug text-[#334155]">
          Traducimos el mal servicio al lenguaje universal: el impacto monetario exacto para
          justificar inversión operativa.
        </p>
        <div className="!mt-4 grid flex-1 grid-cols-2 gap-4">
          <FinancialKpis chartHeight={140} />
          <PaymentDonut height={250} />
        </div>
      </Slide>

      {/* Slide 7 — Historia 3 (PPTX 7: tabla de categorías; se conserva interactiva) */}
      <Slide className={`${LIGHT_SLIDE} !justify-start text-left`}>
        <h2>Historia 3: Culpables y Oportunidades (Top 20)</h2>
        <p className="font-dmsans !mt-2 text-[19px] leading-snug text-[#334155]">
          Identificamos la relación entre costos logísticos elevados y baja satisfacción por
          categoría, creando un mapa táctico para la célula ágil de CX y Operaciones.
        </p>
        <div className="!mt-4">
          <CategoryTable maxHeight={310} />
        </div>
        <p className="font-dmsans !mt-3 text-[16px] leading-snug text-[#64748B]">
          * Alerta operativa detectada en la categoría &ldquo;Furniture Decor&rdquo;: refleja los
          fletes más altos y la peor calificación, sugiriendo daño estructural en la red de
          transportistas.
        </p>
      </Slide>

      {/* Slide 8 — Conclusión e Impacto Esperado (PPTX 8: texto + infografía) */}
      <Slide className={`${WHITE_SLIDE} !justify-start !py-10 text-left`}>
        <div className="grid h-full grid-cols-[1fr_560px] items-center gap-10">
          <div>
            <h2 className="!text-[40px]">Conclusión e Impacto Esperado</h2>
            <p className="font-merriweather !mt-8 text-[24px] font-bold text-[#0284C7]">
              Rompiendo Silos (Feedback Loop)
            </p>
            <p className="font-dmsans !mt-2 text-[18px] leading-normal text-[#334155]">
              Al transformar los <em>reviews</em> en un instrumento de diagnóstico operativo
              directo, unificamos la métrica de éxito entre Experiencia del Cliente y Logística.
            </p>
            <p className="font-merriweather !mt-7 text-[24px] font-bold text-[#0284C7]">
              Acciones Quirúrgicas
            </p>
            <ul className="font-dmsans !mt-2 space-y-3 !pl-[20px] text-[18px] leading-normal text-[#334155]">
              <li>
                <strong>Auditoría de Transportistas:</strong> Penalizar y reestructurar rutas con
                entregas crónicamente tardías y daños en productos voluminosos (ej. Muebles).
              </li>
              <li>
                <strong>Depuración de Sellers:</strong> Exigir SLAs estrictos de cumplimiento o
                remover de la plataforma a vendedores con fletes caros injustificados y scores
                bajos.
              </li>
            </ul>
            <p className="font-merriweather !mt-7 text-[24px] font-bold text-[#0284C7]">
              Protección de Rentabilidad
            </p>
            <p className="font-dmsans !mt-2 text-[18px] leading-normal text-[#334155]">
              Estas medidas traducen la retroalimentación del usuario en protección directa a los{' '}
              <strong>{atRiskM}</strong> actualmente en riesgo, blindando el margen y asegurando un
              aumento sostenido en el <em>Life Time Value</em> del cliente.
            </p>
          </div>
          <Image
            src="/images/supply-chain-infographic.png"
            alt="Infografía: tecnología en la gestión de la cadena de suministro"
            width={560}
            height={664}
            className="max-h-[640px] w-auto justify-self-end object-contain"
          />
        </div>
      </Slide>

      {/* Slide 9 — Preguntas (PPTX 9: cierre corporativo) */}
      <Slide className={`${WHITE_SLIDE} relative items-center text-center`}>
        <p className="font-poppins text-[80px] leading-tight font-bold text-[#005088]">
          ¿Preguntas?
        </p>
        <p className="font-lato !mt-3 text-[24px] text-[#64748B]">Gracias por su atención.</p>
        <div className="font-lato !mt-12 flex items-center gap-14 text-[16px] text-[#005088]">
          <span className="flex items-center gap-2">
            <Mail size={17} />
            analytics@olist.com
          </span>
          <span className="flex items-center gap-2">
            <Globe size={17} />
            olist.com/data-insights
          </span>
        </div>
        <div className="font-lato absolute inset-x-[60px] bottom-9 flex items-center justify-between border-t border-[#DBEAFE] pt-3 text-[14px] text-[#94A3B8]">
          <span>Sesión de Q&amp;A</span>
          <span>Fin de Presentación</span>
        </div>
      </Slide>
    </RevealDeck>
  );
}
