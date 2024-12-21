import { Container, Headline } from "@northware/ui/components";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Headline level="h1">Northware Cockpit Startseite</Headline>
      <Headline level="h3">
        <Link href="/dashboard">Zum Dashboard</Link>
      </Headline>
    </>
  );
}
