# Northware Docs

## Deployment

Der Workflow "Deploy docs to GitHub Pages" (deploy-docs.yml) deploy die Änderungen im `apps/docs` Ordner (Diese Docusaurus Dokumentation) automatisch auf den Branch `gh-pages`, wenn diese Änderungen auf den `main` Branch gemerget werden.

Das GitHub Repository ist so konfiguriert, dass der Inhalt des Branches `gh-pages` auf der Seite [ncs-northware.github.io/northware/](https://ncs-northware.github.io/northware/) veröffentlicht wird.

Es existiert eine Branch Protection Regel, die verhindert, dass der Branch `gh-pages` automatisch oder manuell gelöscht wird.
