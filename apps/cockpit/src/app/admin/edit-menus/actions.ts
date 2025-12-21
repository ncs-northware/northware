import { db } from "@northware/database/connection";
import { mainNavTable } from "@northware/database/schema/main-nav";

export async function getMenuItems() {
  try {
    const result = await db.select().from(mainNavTable);
    const cockpit = result.filter((item) => item.app === "cockpit");
    const finance = result.filter((item) => item.app === "finance");
    const trader = result.filter((item) => item.app === "trader");
    return {
      success: true,
      cockpit,
      finance,
      trader,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error
          : new Error("Es ist ein unerwarteter Fehler aufgetreten."),
    };
  }
}
