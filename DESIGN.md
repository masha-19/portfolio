# DESIGN.md — Marianela Verdinelli (portafolio v2)

Documented from the **built** world (Impeccable document pass).

## Surface

Single-page portfolio (Experience + Persuade close). Static HTML/CSS/JS.

## Visual world

**Warm editing studio.** Paper fields, espresso media wells, rust as the committed accent. Double-bezel frames for media. Floating island navigation. Asymmetric bento for services. Gallery as visual proof, not a secondary dump.

## Color

| Role | Token | Value |
|------|--------|--------|
| Page ground | `--paper` | `#f3ebe1` |
| Elevated / alternate band | `--paper-elevated` | `#faf6f0` |
| Deep band | `--paper-deep` | `#e8ddd0` |
| Ink / espresso | `--espresso` | `#241814` |
| Body secondary | `--brown` / `--brown-mute` | `#5c4338` / `#7a6256` |
| Accent (committed) | `--rust` | `#b24a38` |
| Accent press | `--rust-deep` | `#8f3a2c` |

Pinned by product owner: browns + reds + beige. Neutrals are **warm-tinted**, never cool gray on paper.

## Typography

| Role | Face | Notes |
|------|------|--------|
| Display | **Bricolage Grotesque** | Headings, quotes, marks. Tracking tight (−0.03em). |
| Body | **Figtree** | UI, paragraphs, nav. Weight 300–600. |

Avoided training-default pair (Cormorant + Outfit) used in v1.

## Layout

- Max content width ≈ 1180px  
- Section vertical rhythm: large (`clamp(4.5rem, 10vw, 7.5rem)`)  
- Hero: **editorial split** (copy | media)  
- Services: **2-column bento** (1 tall + 2 stacked), not three equal cards  
- Work: stacked cases with media-first frames  
- Gallery: CSS grid bento (wide / tall spans)  
- Mobile: single column; island nav → morph menu  

## Components

- **Island nav:** pill, blur, mark monogram, primary CTA “Hablemos”  
- **Double bezel:** outer soft shell + inner rounded media core  
- **Primary button:** rust pill + nested icon circle  
- **Secondary / ghost:** outline and elevated paper  
- **Gallery item:** image button + badge + lightbox  
- **Quote cards:** display italic-feel via weight, not fake serif inject  

## Motion

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` and spring-ish `0.32, 0.72, 0, 1`  
- Scroll reveal: opacity + translateY once (IntersectionObserver)  
- Hover: subtle lift / scale on media and bento faces  
- **`prefers-reduced-motion: reduce`:** reveals and hover transforms off  

## Accessibility

- Focus rings: 2px rust offset  
- Touch targets ≥ ~44px on filters and CTAs  
- Body text on paper meets AA against espresso/brown  
- Lightbox: Esc, backdrop click, close control  
- Synthetic content labeled in copy where it could be mistaken for real clients  

## Anti-patterns refused

- Full-bleed sticky bar nav (used island instead)  
- Equal triple feature cards as page structure  
- Section number eyebrows / AI purple gradients  
- Nested card-in-card chrome  
- Cool gray text on warm grounds  

## Assets

- `assets/hero-studio.jpg`  
- `assets/galeria/*` (flatlay, reel still, feed print, color study)  
- Profile photo slot: placeholder MV  

## Skills applied

- Impeccable (PRODUCT.md, craft floor, polish/audit mindset)  
- design-taste-frontend (dials ~7–8 / 5–6 / 3, brief inference)  
- high-end-visual-design (double-bezel, island nav, macro whitespace)  
