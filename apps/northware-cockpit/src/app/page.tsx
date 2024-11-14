import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1 className="size-16 bg-cockpit-500 text-3xl">Northware Cockpit</h1>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
