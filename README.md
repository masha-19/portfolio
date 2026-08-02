# Portafolio v2 — Marianela Verdinelli

Versión **mejorada** del portafolio, construida con skills de diseño:

- **Impeccable** (sistema, anti-slop, polish/audit)
- **Taste Skill** (`design-taste-frontend`)
- **Soft Skill** (`high-end-visual-design`)

La versión anterior **no se tocó**: sigue en `../portafolio-marianela/`.

---

## Cómo abrirla

1. Abrí la carpeta `portafolio-marianela-v2` en el Finder.
2. Doble clic en **`index.html`**.

---

## Qué hay de nuevo vs v1

| | v1 | v2 |
|---|----|----|
| Nav | Barra sticky ancha | **Island** flotante (píldora) |
| Hero | Más clásico | **Split editorial** + foto de estudio |
| Servicios | 3 cards iguales | **Bento** asimétrico |
| Tipografía | Cormorant + Outfit | **Bricolage Grotesque** + **Figtree** |
| Galería | Sí | Sí, con fotos de ambiente ya cargadas |
| Docs de diseño | README | + `PRODUCT.md` + `DESIGN.md` |
| Skills | No | En `.grok/skills/` |

---

## Archivos importantes

| Archivo | Para qué |
|---------|----------|
| `index.html` | Contenido de la página |
| `styles.css` | Diseño |
| `script.js` | Menú, filtros, lightbox |
| `PRODUCT.md` | Contexto de producto (Impeccable) |
| `DESIGN.md` | Sistema visual documentado |
| `assets/` | Hero + galería |
| `assets/galeria/` | Tus fotos y vídeos |
| `.grok/skills/` | Skills usadas en este proyecto |

---

## Personalizar (rápido)

### Foto de perfil

1. Guardá `assets/foto-perfil.jpg`
2. En `index.html` (sección Sobre mí): comentá el placeholder y descomentá el `<img>`.

### Contacto

Buscá `mailto:`, `wa.me`, Instagram y LinkedIn cerca del final de `index.html`.

### Galería

1. Archivos en `assets/galeria/`
2. En cada botón `.g-item`, actualizá `data-src`, `data-type` (`foto` o `video`) y el `<img>`.
3. Para YouTube: `data-src="https://www.youtube.com/embed/ID"` y `data-type="video"`.

### Proyectos

Editá los tres bloques `.case` (títulos, textos, tags). Las zonas de vídeo embebido están listas para un iframe.

---

## Nota sobre imágenes de ejemplo

Las fotos de ambiente y galería son **material sintético** de muestra (no son clientes reales). Reemplazalas cuando tengas tu trabajo.

Los nombres de marcas y testimonios también son de ejemplo.

---

## Skills + Impeccable al 100%

### Ya instalado en esta Mac

- **Node.js v22** en `~/.local/node` (PATH en `~/.zshrc`)
- **Impeccable CLI** global (`impeccable` / `npx impeccable`)
- Skills del proyecto:

```
.grok/skills/impeccable/
.grok/skills/design-taste-frontend/
.grok/skills/high-end-visual-design/
```

### Pasar el detector (recomendado)

Abrí Terminal y:

```bash
cd ~/YoMashaGrok/portafolio-marianela-v2
python3 -m http.server 8765
```

En **otra** pestaña de Terminal:

```bash
export PATH="$HOME/.local/node/bin:$PATH"
npx impeccable detect http://127.0.0.1:8765/
```

Último informe limpio: **0 hallazgos** (ver `CRITIQUE.md` y `.impeccable/detect-report.json`).

### Actualizar skills

```bash
export PATH="$HOME/.local/node/bin:$PATH"
cd ~/YoMashaGrok/portafolio-marianela-v2
npx impeccable update
```

---

## Comparar las dos versiones

- Clásica / simple: `../portafolio-marianela/index.html`
- Premium / skills: `index.html` (esta carpeta)

Si querés, en el siguiente paso unimos lo que más te guste de cada una.
