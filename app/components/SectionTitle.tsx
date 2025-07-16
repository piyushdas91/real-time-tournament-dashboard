export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base sm:text-lg font-semibold sticky top-0 z-10 bg-gray-50 py-2 px-1 border-b border-gray-200">
      {children}
    </h2>
  );
}
