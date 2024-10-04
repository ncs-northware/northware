---
pagination_prev: null
---

# GitHub Managment

Um den Entwicklungsprozess auf GitHub möglichst übersichtlich zu gestalten, gibt es einige Regeln und Einstellungen, die beim contributing beachtet werden sollten.
Es gibt Regeln an die sich die Entwickler möglichst halten sollten, Automationen und Bots die den Entwicklungsprozess unterstützen und die sogenannten Community-Health-Files, die dem Prozess innerhalb des Repositories Eckpfeiler geben.

## Coding Branches

Jede Änderung am Repository sollte auf einem eigenen Branch vorgenommen werden. Die Änderungen werden dann, wenn sie fertig sind und möglichst alle [CI/CD](./Workflows#cicd) erfolgreich abgeschlossen wurden mit einem Pull Request auf den `main` Branch gemerged.

Der `main` Branch ist geschützt, um direkte Commits auf diesen Branch zu vermeiden.

## Issues und Pull Requests

[GitHub Issues](https://docs.github.com/de/issues) sind dazu gedacht, die Arbeit zu planen und Ideen, Feedback, Aufgaben oder Bugs zu verfolgen. Hat man also eine Idee für ein neues Feature oder stellt fest, das etwas in der überhaupt nicht oder zumindest nicht wie erwartet funktioniert, sollte ein Issue erstellt werden.

Im Northware Repository gibt es vordefinierte **Issue-Templates**, um den übersichtlichen Entwicklungsprozess zu unterstützen.

- **Bug melden:** Während der Entwicklung oder der Nutzung der App ist ein (schwerwiegender) Bug aufgefallen. Etwas funktioniert nicht und führt so zu einem Fehler. Der Issue wird automatisch mit **`bug`** gelabeled.
- **Problem melden**: Während der Entwicklung oder Nutzung der App ist aufgefallen, das etwas nicht wie vorgesehen funktioniert. Der Issue wird automatisch mit **`invalid`** gelabeled.
- **Neues Feature:** Ein Vorschlag für ein neues Feature, das es bisher so noch nicht in der App gibt oder das ein bestehendes Feature erweitert. Der Issue wird automatisch mit **`enhancement`** gelabeled.
- **Erweiterung der Dokumentation:** Ein fertiges Feature soll in dieser Dokumentation erklärt werden. Der Issue wird automatisch mit **`docs-wanted`** gelabeled.
- **Security Vulnerability Tracking**: [Dependabot](./Dependabot) hat eine Security Vulnerability gefunden. In diesem Issue wird getracked, was getan werden kann, um die Vulnerabilty zu beseitigen.

- Es gibt Issue-Templates
- Es gibt ein Pull Request Template
- Jeder Issue und jeder PR soll dem Projekt hinzugefügt werden
- Die Labels für Apps/Packages/Turborepo/GitHub Mananagement sollen vergeben werden
- Es gibt Workflows, die das unterstützen
- Dependabot kümmert sich um Dependency Updates
- autofix.ci bemüht sich um Autofixes (Was macht es?)
