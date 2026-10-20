# POOPGUMMY

A promotional site for a fictional pink, poop-shaped gummy candy. It takes inspiration from the KIILA LP's scroll-led storytelling, moving from the pouch to the gummy itself and into a close-up of its texture. This is a fictional concept, not a real product or sales page.

## Preview locally

```sh
cd dist
python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/`. No build step is needed.

## Files

- `dist/index.html`: page structure, copy, and interactive controls
- `dist/styles.css`: visual design, responsive layout, and static presentation
- `dist/script.js`: GSAP / ScrollTrigger scenes, Lenis, motion controls, and gummy counter
- `dist/assets/*.webp`: optimized generated images used by the site
- `source-images/*.png`: original generated images

Scroll scenes are enabled on screens at least 760px wide and 700px tall. Smaller screens use normal document flow. The site supports the motion toggle and `prefers-reduced-motion`; touch devices keep native scrolling.

## Generated visuals

The images were created with Codex's built-in imagegen tool:

1. `gummy-original.png`: Transparent product cutout of one pink poop-shaped gummy with a three-tier swirl, curled tip, translucent jelly, and sugar crystals. No face, text, or package.
2. `package-original.png`: Transparent product mockup of a butter-yellow resealable pouch with exact `POOPGUMMY` and `PINK BERRY` label text, referencing the gummy from image 1 through a clear window.
3. `gummies-original.png`: Macro product photo of seven or eight matching pink gummies on a pale pink studio surface, leaving negative space on the left, referencing image 1 and the pouch palette from image 2.

All visuals are generated concept imagery. They do not depict real food photography or product specifications.

## Libraries

GSAP / ScrollTrigger 3.15.0 and Lenis 1.3.27 are bundled from the reference LP. License files are in `dist/assets/GSAP-LICENSE.txt` and `dist/assets/LENIS-LICENSE.txt`.

