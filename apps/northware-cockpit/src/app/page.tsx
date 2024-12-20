import { Container, Headline } from "@northware/ui/components";
import Link from "next/link";

export default function Page() {
  return (
    <Container>
      <Headline level="h1">Northware Cockpit Startseite</Headline>
      <Headline level="h3">
        <Link href="/dashboard">Dashboard</Link>
      </Headline>
    </Container>
  );
}
