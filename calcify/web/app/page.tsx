export default function Home() {
  return (
    <main className="mx-auto max-w-md p-4">
      <h1 className="text-3xl font-bold text-brand-900">Calcify</h1>
      <p className="text-brand-900/70 mt-2">Scan. Solve. Learn.</p>
      <a
        href="/solve"
        className="mt-6 inline-block rounded-2xl bg-brand-700 px-5 py-3 text-white shadow-lg hover:shadow-xl transition"
      >
        Open Solver
      </a>
    </main>
  )
}
