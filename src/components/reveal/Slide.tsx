export default function Slide({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className="!h-full !w-full">
      <div className={`flex h-full w-full flex-col justify-center px-16 py-12 ${className}`}>
        {children}
      </div>
    </section>
  );
}
