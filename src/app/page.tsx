import RevealDeck from '@/components/reveal/RevealDeck';
import Slide from '@/components/reveal/Slide';
import CaseStudyDashboard from '@/components/dashboard/CaseStudyDashboard';

export default function Home() {
  return (
    <RevealDeck>
      <Slide className="items-center text-center">
        <p className="mb-4 text-sm font-semibold tracking-widest text-neutral-500 uppercase">
          Executive briefing
        </p>
        <h1>Supply Chain Optimization Program</h1>
        <p className="mt-6 text-xl text-neutral-600">Year 1 results and the path to scale</p>
      </Slide>

      <Slide>
        <h2>Agenda</h2>
        <ol className="space-y-4 text-2xl text-neutral-700">
          <li>1. Program context and objectives</li>
          <li>2. Year 1 results dashboard</li>
          <li>3. Recommendation and next steps</li>
        </ol>
      </Slide>

      <Slide>
        <h2>Why we invested</h2>
        <ul className="max-w-3xl space-y-4 text-xl text-neutral-700">
          <li>Logistics cost per unit had grown 18% over two years, outpacing volume growth.</li>
          <li>On-time delivery had fallen behind two of our three largest competitors.</li>
          <li>
            We funded a four-quarter program across four regions to re-negotiate carrier contracts,
            consolidate routes, and instrument the network end to end.
          </li>
        </ul>
      </Slide>

      <Slide className="!py-8">
        <CaseStudyDashboard />
      </Slide>

      <Slide>
        <h2>Recommendation</h2>
        <ul className="max-w-3xl space-y-4 text-xl text-neutral-700">
          <li>Extend the program to the remaining six regions over the next two quarters.</li>
          <li>Lock in the renegotiated carrier rates with three-year contracts.</li>
          <li>Fund a permanent analytics function to keep the dashboard live in production.</li>
        </ul>
      </Slide>

      <Slide className="items-center text-center">
        <h2>Questions</h2>
      </Slide>
    </RevealDeck>
  );
}
