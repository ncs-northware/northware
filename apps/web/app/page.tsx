import { add } from "@repo/math/add";
import { subtract } from "@repo/math/subtract";
import { Button } from "@repo/ui/button";
import { MyComponent } from "@repo/ui/mycomponent";

export default function Home() {
  return (
    <main>
      <Button appName="web" className="secondary">
        Open alert
      </Button>
      <MyComponent />
      <div>
        <p>Die Aufgabe 1+2 ergibt: {add(1, 2)}</p>
        <p>Die Aufgabe 1-2 ergibt: {subtract(1, 2)}</p>
        <p>{process.env.TEST}</p>
      </div>
    </main>
  );
}
