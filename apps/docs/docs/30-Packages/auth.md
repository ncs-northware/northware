# @northware/auth

Das Package `**@northware/auth**` stellt die Authentifizierungs- und Loginfunktion für die Northware Apps bereit.
Das Package nutzt für diese Funktionalität [Auth.js](https://authjs.dev/) mit dem Credentials Provider.

Die User-Daten werden in der Neon API gespeichert. Die Definition der Tabelle der Nutzerdaten wird vom `@northware/database` Package übernommen.
Innerhalb von `@northware/auth` wird auf die Nutzerdaten zugegriffen und validiert.

Der Code im `@northware/auth` Package ist vom Repository [vercel/nextjs-postgres-auth-starter](https://github.com/vercel/nextjs-postgres-auth-starter) inspiriert.