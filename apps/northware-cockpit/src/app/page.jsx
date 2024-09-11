import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex h-screen">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="font-bold text-2xl">Northware Cockpit</h1>
        </div>
        <div className="flex space-x-3">
          <Link href="/dashboard" className="underline transition-all">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
