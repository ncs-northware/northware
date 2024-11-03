---
"@northware/auth": patch
"@northware/ui": patch
---

- **`@northware/ui`**: Das Styling der Login Pages und des Login Forms wird über eine /template module.sass definiert und von dort importiert
- **`@northware/auth`**: Der Authentifizierungs- und Login-Prozess wird im Auth-Package gelöst. Dazu wird Auth.js verwendet. Das Package exportiert neben einigen Authentifizierungs-Funktionen auch ein Login-Form das auf Login Pages der Apps verwendet werden kann.
