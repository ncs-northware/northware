import { Headline } from "@northware/ui/components/base/headline";
import { Container } from "@northware/ui/components/layouts/container";
export default function DashboardPage() {
  return (
    <Container service="cockpit">
      <Headline level="h1">Dashboard Home</Headline>
    </Container>
  );
}
