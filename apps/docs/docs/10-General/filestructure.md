# Filestructure

Die Dateien in jedem Projekt sollten ungefähr nach der gleichen Struktur geordnet sein. Hier möchte ich diese Struktur definieren und erklären, denn sie sollte einem System folgen. [React empfiehlt](https://legacy.reactjs.org/docs/faq-structure.html), die eigene Dateistruktur möglichst offen und nicht zu verschachtelt zu gestalten und sich um die Dateistruktur nicht zu viele Gedanken zu machen. Für die Northware Projekte bedeutet dass, das ich zwar gnere eine Struktur definieren möchte, sie soll aber nicht straff sondern flexibel veränderbar sein. Wenn sich herausstellt, dass die Dateistruktur für ein zukünftiges Northware Projekt nicht passend ist, kann dieses Projket eine eigene Struktur bekommen.

Next.js wurde auf Basis von React entwickelt. React selbst hat keine vorgeschriebene Dateistruktur. Next.js hat eine vorgegebene [Projektstruktur](https://nextjs.org/docs/getting-started/project-structure) und reagiert auf einige Dateinamen mit einem bestimmten Verhalten ([File Conventions](https://nextjs.org/docs/app/api-reference/file-conventions)).

Außerdem habe ich mich an diesem [DEV Community Artikel](https://dev.to/itswillt/folder-structures-in-react-projects-3dp8) orientiert, der drei Ansätze der Odner-Strukturierung aufzeigen. Ich nutzte für die Northware Projekte eine Mischung aus den Ansätzen.

:::note

**Dateiendungen**

- Für die Dateien, die JSX verwenden, soll auch die Endung `.jsx` verwendet werden
- Dateien, die nur Funktionen exportieren (libs und helpers), sollen die Endung `.js` verwenden
- Typescript wird möglichst nicht verwendet.
- Stylesheets sollten `.sass` verwenden.

:::

## Ordnerstruktur der Northware Projekte

<!-- prettier-ignore -->
| Ordner | Erklärung |
| ----------------- | ----------|
| (Projekt-Root) | Der Ordner in dem das Projekt anfängt. |
| -- .next | Next interner Ordner |
| -- node_modules |  |
| -- **[public](https://nextjs.org/docs/app/building-your-application/optimizing/static-assets)** | Assets (wie Bilder) auf die die App zugreigen soll. |
| -- **[src](https://nextjs.org/docs/app/building-your-application/configuring/src-directory)** | Dieser Ordner beinhaltet allen Code der Application. Der `src` Ordner wird von Next.js als dieser Root-Ordner der App interpretiert. |
| --- **[app](https://nextjs.org/docs/app/building-your-application/routing)** | Der Ordner `app` enhält den Code der Seiten, die der User im Frontend sehen kann. Next.js nennt das **App-Router**. |
| ---- subpage | Der App-Router interpretiert jeden Ordner im App-Router als eine Seite. |
| ---- sub-subpage | Solch ein Ordner würde als Unterseite der Unterseite interpretiert werden. |
| ---- [(organized-files), _private-folder](https://nextjs.org/docs/getting-started/project-structure#route-groups-and-private-folders) | Ordner, deren Namen (eingeklammert) sind, werden vom App-Router als "Route Groups" interpretiert. Ein solcher Ordner wird nicht nicht vom Routing beachtet. |
| ---- [[dynamic-route], [...catch-all-segment], [[...catch-all-segement]]](https://nextjs.org/docs/getting-started/project-structure#dynamic-routes) | Wenn Ordner-Namen in [eckige Klammern] eingeklammert sind, werden sie als dynamisch angesehen, in der URL wird also je nach Parameter eine unterschiedliche Seite angezeigt. |

### /app

Der `/app`-Ordner wird von Next.js zum Routing verwendet. Er enthält den spzifischen App-Code des Frontends der App.

Das **Root-Level** enthält einige Dateien, die global für die App gelten und Dateien, die für das die Root-Route gelten:

- [page.jsx](https://nextjs.org/docs/app/building-your-application/routing/pages) (Code der gerenderten Seite unter `/`)
- [layout.jsx](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates) (Globales Layout der App)
- [loading.jsx](https://nextjs.org/docs/app/api-reference/file-conventions/loading) (Wird angezeigt, wenn die App-UI oder Daten geladen werden.)
- [error.jsx](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates) (Der Inhalt dieser Seite wird angezeigt, wenn Next.js einen Uncaught Error produziert.)
- [not-found.jsx](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) (Wird angezeigt, wenn die aufgerufene Seite nicht gefunden werden kann.)
- [favicon.ico, icon.(ico|jpg|jpeg|png|svg), apple-icon.(jpg|jpeg|png)](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons) (Definiert App-Icons für die App)
- Es gibt auch noch weitere [File Conventions](https://nextjs.org/docs/app/api-reference/file-conventions) auf die Next.js automatisch reagiert.

#### Unterseiten

Jede Unterseite und auch verschachtelte Unterseite der App muss einen eigenen (ggf. verschachtelten) Ordner erhalten. Dieser Ordner muss eine `page.jsx` enthalten, der auf dieser Unterseite angezeigt wird. Viele der File-Conventions im Root-Level gelten auch für die Unterseiten.

Abgesehen davon kann jeder Ordner beliebige Dateien enthalten. Next.js reagiert nur auf die speziellen Dateien.

Wenn es Komponenten gibt, die spziell für eine Seite entwickelt wurden, sollen diese Komponenten im Northware Projekt auch im Ordner der Route gespeichert werden.

Funktionen, die nur für die spezielle Seite genutzt werden und nicht innerhalb der Seite oder Komponente definiert werden, sollten im Ordner der Seite gespeichert werden. Es ist möglich eine eigene Datei für die Funktion zu erstellen oder eine Datei für mehrere Funktionen (z.B. `utils.js`, `hooks.js`, `lib.js`, ...) zu erstellen oder eine Mischung zu verwenden.

:::tip

**Route Groups und Private Folders**
Wenn durch viele spezielle Komponenten, Funktionnen, Unterseiten und besondere Dateien die Übersicht innerhalb eines Ordners verloren geht, können `(route-groups)` für Dateien, die im Routing berücksichtigt werden sollen und `_private-folders` für Logik-Dateien verwendet werden.

:::

### /theme

Der Ordner `/theme` enthält das Repository [northware-theme](https://github.com/ncs-northware/northware-theme), das als Git Submodule in die Northware Projekte eingebunden sind.

Git Submodules werden von Git auf eine besondere Weise betrachtet. Im Git-Repository, in das das Submodule eingebettet ist wird nur verfolgt, in welchem Commit das Module aktuell verwendet wird.

Innerhalb des Next.js Projekts wird der Ordner `/theme` als normaler Ordner unterhalb des `/src`-Ordner betrachtet. Next.js beachtet diesen Ordner also nicht beim Routing, man kann aber innerhalb des von `src` auf den Ordner zugreifen.

Das `northware-theme` enthält wiederverwendbare Komponenten, Funktionen und Styling, die für alle Northware-Projekte definieren.

#### Ordnerstruktur von `northware-theme`

<!-- prettier-ignore -->
| Ordner | Erklärung |
| ------ | --------- |
| Projekt-Root (/theme) |  |
| -- components | Wiederverwendbare Komponenten für die UI bzw. das grundsätzliche Layout der App |
| --- cockpit-frontend | Komponenten, die im cockpit-frontend verwendet wurden. Werden diese Komponenten auf für die App verwendet, sollen sie in den Ordner `/components` verschoben werden. |
| -- helpers | Wiederverwendetete Funktionen, die Aufgaben übernehmen, die immer wieder auftauchen  |
| -- lib | Wiederverwendetet Funktionen, die verwendete Dependencies steuern oder die komplexe Programme ausführen. |
| -- style | Hier wird das Aussehen der Northware Apps definiert. So wird ein durchgängiges Aussehen der Apps definiert. |

##### /components - Wiederverwendbare Komponenten, die UI und Inhalt definieren

Komponenten sind Bausteine der Nothware Apps. Der Code einer Seite wird in wiederverwendbare unabhängige Teile zerlegt und in die einzelnen Seiten importiert.

Der `/components`-Ordner enthält Komponenten die in den Northware-Projekten an unterschiedlichen Stellen oder global verwendet werden.

Dabei enthält jede Komponente eine eigene `.jsx` Datei, die im PascalCase benannt ist und i.d.R. den gleichen Namen erhält wie die Komponente.

Gibt es weniger komplexe Komponenten, die sich nur minimal von einer Komponente unterscheiden, können diese innerhalb der selben Datei definiert werden.

Gibt es Komponenten, die selbst eine Komponente verwenden müssen, die nur für diesen Zweck definiert wurde, können diese innerhalb der selben Datei wie der verwendeten Komponente definiert werden, oder sie erhalten eine eigene Datei und beide Dateien werden in einem Unterordner von `/components` gespeichert.

Komponenten, die nur für einzelne Seiten einer App verwendet werden, werden jeweils im Ordner der jeweiligen App-Route definiert.

Komponenten, die zwar nur von einer App verwendet werden, aber innerhalb dieser wiederverwenbar sind, können in einen Unterordner von `/theme` gespeichert werden, der so heßt wie die App selbst (also `cockpit`, `trader` oder `finance`)

:::note

**Headless UI**
Die Northware Projekte verwenden [Headless UI](https://headlessui.com/). So müssen nicht alle Komponenten von Grund auf erschaffen werden. Diese Komponenten müssen aber in einigen Fällen angepasst werden und erhalten für diesen Zweck ihre eigene Komponenten in diesem Projekt bzw. ein besonderes Styling.

:::

##### /helpers - Kleine helfende Funktionen, die immer wieder genutzt werden.\*\*

Die einzelnen Helper-Funktionen sollen dabei eigene `.js` Dateien verwenden.

Wenn Helper-Funktionen thematisch zusammenpassen oder sich gegenseitig verwenden, sollen sie in einer Datei definiert werden. Eine Unterordner-Struktur im `/helpers`-Ordner ist nicht vorgesehen.

Werden die Dateien dadurch zu komplex oder dieser Ansatz lässt sich nicht umsetzen, können sie im `/lib`-Ordner plaziert werden.

##### /lib - Komplexe Funktionalitäten und Programme

Wenn einzelne Dependencies (wie z.B. Auth.js) spezielle Konfigurationen benötigen, kann der Code dieser Konfiguration in einen eigenen Unterordner gelagert werden. Werden hier nur einzelne Dateien benötigt, können sie auch direkt in den `/lib`-Ordner gelegt werden.

Die Definitionen im `/lib`-Ordner sollten in mehreren Northware Projekten wiederverwendet werden. Werden die Dependencies nur in einem Projekt verwedet, können die zugehörigen Funktionen in einen Unterordner des einzelnen Projektes gespeichert werden.

Wenn für die Northware Projekte neue komplexe Funktionen und Programme geschrieben werden, die nicht in den `/helpers`-Ordner passen, können sie wie die Dependencies einen eigenen Ordner unter `/lib` erhalten.

##### /style - Das Styling der Northware-Projekte

Die Northware Projekte verwenden [SASS](https://sass-lang.com/) in Verbindung mit [Tailwind CSS](https://tailwindcss.com/).

Das globale Styling der Apps wird in der `global.sass` definiert und diese Datei wird auch als globales Stylesheet in das Root-Layout eingebunden. Die `global.sass` selbst soll nicht viel Sass-Code enthalten sondern soll die Partitial-Dateien importieren. Für unterschiedliche globale Stylings werden in dem Ordner `_partitial.sass` Dateien angelegt.

Wenn einzelne wiederverwendbare Komponenten ein spezielles Styling benötigen, sollen sie ein eigenes Sass-Module (Endung `.module.sass`) erhalten. Diese Module werden dann in die Komponenten importiert. Der Vorteil dabei ist, dass dieses Spezifische Styling dann nur geladen wird, wenn die spezifische Komponente genutzt wird.

Es ist möglich ein Sass-Module zu definieren, dass keine eigene Komponente im `/components` Ordner hat. Diese Sass-Modules werden ggf. nicht all zu häufig in der App verwendet, definieren aber ein komplexes Styling.

Die Northware Projekte verwenden Tailwind CSS. Da ich aber kein großer Fan von dem Inline-Class-Ansatz von Tailwind bin, defniere ich lieber einzelne Custom-Classes in einer Sass-Datei, der ich mit dem [@apply](https://tailwindcss.com/docs/reusing-styles#extracting-classes-with-apply) Regel Tailwind Klassen zuordne.
