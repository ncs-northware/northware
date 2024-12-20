import { Container, Headline } from "@northware/ui/components";

export default async function DashboardPage() {
  return (
    <Container>
      <Headline
        level="h1"
        className="color-primary-foreground bg-primary text-3xl font-semibold"
      >
        Northware
      </Headline>
    </Container>
  );
}
