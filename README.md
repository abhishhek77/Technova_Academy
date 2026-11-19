# TechNova Computer Academy - Website

Static website (HTML5, CSS3, vanilla JavaScript) for a sample Computer & IT Training Institute.
Brand: Maroon `#8C2C3F`, Golden Yellow `#FCB433`, White, Dark Grey `#333333`. Fonts: Poppins and Montserrat.

## Run
1. Open `index.html` in any modern browser (double-click). No build step or server needed.
2. Optional local server: `python3 -m http.server 8000` then visit http://localhost:8000
3. Fonts load from Google Fonts when online; Arial is used as the offline fallback.

## Pages
index, about, courses, departments, trainers, facilities, gallery, admissions, news, contact (.html)

## Customise
- **Institute name / tagline:** search and replace `TechNova Computer Academy`, `TECHNOVA` and `Learn. Build. Innovate. Succeed.` in all HTML files.
- **Logo:** replace `img/logo/logo.svg` (keep the file name, or update `<img src>` in each header and footer).
- **Colours:** edit the CSS variables at the top of `css/style.css` (`--maroon`, `--gold`, `--text`).
- **Courses:** copy or edit a `<article class="card course">` block in `courses.html` (and in `index.html` for popular courses). Add a matching entry in `js/search.js`.
- **Trainers, news, facilities:** edit the matching cards in their pages, and update `js/search.js`.
- **Images:** all images are generated SVG placeholders. Put real photos (JPG/WebP) in the `img/` sub-folders and update the `src` attributes.
- **Contact details:** replace the sample address `123 Sample Street...`, phone `+91 00000 00000` and `info@technova-sample.example` in `contact.html` and every footer.
- **Map:** replace the `.map-box` element in `contact.html` with a Google Maps or OpenStreetMap iframe embed.
- **Search:** add or change entries in the `SEARCH_INDEX` array at the top of `js/search.js`.
- **Navigation:** the same menu is repeated in each page's header; edit it in every file when adding a page.

## Forms
The Admissions and Contact forms have client-side validation only. They do **not** submit data anywhere. To receive messages or store registrations, connect a backend (PHP, Node.js, or a service such as Formspree) by adding an `action` URL and handling the request on a server.

## Limitations
- All content, names, fees and numbers are fictional samples.
- Images are placeholders; the map is a placeholder box.
- Header and footer are repeated per page (no templating) to keep the project dependency-free.
