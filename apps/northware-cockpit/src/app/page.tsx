import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1 className="bg-cockpit-500 text-3xl size-16">Northware Cockpit</h1>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
