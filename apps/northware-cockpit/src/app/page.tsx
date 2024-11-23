import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl">Northware Cockpit</h1>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
