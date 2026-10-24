Karan Veer Singh | Personal Website

A small, considered space for my work, interests, and the things I choose to put on the internet.

Live website: karanveersingh05.github.io/links.to.me

The Idea

I wanted a single place where someone could get a sense of who I am without having to piece together different profiles across the internet.

The website brings together my professional background, interests, projects, and other online profiles. It is part personal introduction, part portfolio, and part digital visiting card.

Rather than making it look like a conventional portfolio template, I wanted something quieter. The design takes inspiration from editorial layouts, understated luxury, astronomy, and industrial design. The result is meant to feel personal without being informal, and professional without feeling corporate.

Design Philosophy

The visual language is built around restraint. Every element should have a reason to be there, whether it helps someone navigate the page, understand something about me, or find another part of my online presence.

Colour and Typography

The palette uses warm off-white, charcoal, muted grey, and restrained bronze tones. These colours give the website the feel of printed paper and carefully chosen materials rather than a typical digital dashboard.

Typography does much of the visual work. A serif display font adds character to headings, while a clean sans-serif font keeps the supporting text readable. The contrast creates an editorial feel without sacrificing clarity.

Layout and Space

I use spacing, alignment, subtle borders, and a clear content hierarchy to keep the interface composed. Instead of filling every available space with cards, gradients, or decorative elements, the layout gives the content room to breathe.

Small details, including icons, hover states, and transitions, add polish without competing with the information itself.

A Personal Identity

The website is designed to bring together different sides of my identity, including computer science, finance, automobiles, and the interests that exist outside a conventional professional profile.

It is not intended to tell my entire story in one visit. It gives people a starting point and lets them decide where to explore next.

How It Is Built

I built the website using standard web technologies, without relying on a frontend framework or a large collection of third-party libraries.

The goal was to keep the code understandable, the page lightweight, and the design easy to maintain.

* HTML5: Provides the structure of the page, including its sections, navigation, links, and metadata. Semantic elements help keep the document meaningful and improve accessibility.
* CSS3: Handles the visual design, typography, layout, responsive behaviour, colour themes, and transitions. CSS variables make it easier to maintain a consistent palette and adjust shared design choices.
* Vanilla JavaScript: Powers the interactive parts of the website, including the theme switcher, reading progress indicator, active section navigation, and scroll-triggered reveals.
* Google Fonts: Supplies the display and body typefaces used throughout the interface.
* GitHub Pages: Hosts the website directly from the repository, making deployment straightforward without needing a separate application server.

Keeping the stack simple also means there is less tooling to configure and fewer dependencies to maintain.

A Few Technical Details

Responsive Layout

The layout adapts to different screen sizes so the content remains comfortable to read on both desktop and mobile devices. Flexible sizing, CSS layout techniques, and responsive rules help the page adjust without maintaining separate versions for different devices.

Where appropriate, the design also accounts for the safe areas on modern mobile screens.

Light and Dark Themes

The theme switcher lets visitors choose between light and dark appearances. Shared CSS variables keep colours consistent across the interface, while JavaScript handles switching themes and remembering the visitor’s preference where browser storage is available.

If no saved preference exists, the website can use the appearance preference configured on the visitor’s device.

Reading Progress and Navigation

A reading progress indicator tracks how far someone has moved through the page. The section navigation also responds to scrolling, highlighting the part of the website currently being explored.

These details make a longer page easier to navigate without adding unnecessary controls.

Scroll-Based Effects

Selected sections and elements reveal themselves as they enter the viewport. The browser’s IntersectionObserver API handles these effects, allowing the page to respond to scrolling without constantly checking every element manually.

The animations are deliberately subtle. Visitors who prefer reduced motion are shown the content without relying on these animated transitions.

Accessibility and Metadata

The website uses descriptive page metadata, meaningful HTML structure, accessible labels for interactive controls, and text alternatives where appropriate. These details help make the interface easier to navigate and give search engines a clearer understanding of the page.

The intention is to make the website usable first and visually distinctive second.

Project Structure

The website is separated into three main files:

* index.html contains the page structure, written content, navigation, and metadata.
* style.css contains the visual system, responsive layouts, themes, and animations.
* script.js handles the interactive behaviour.

Keeping structure, presentation, and behaviour separate makes the project easier to understand and update. For example, changing a section’s content usually means editing the HTML, while adjusting its appearance can be handled in CSS without rewriting the JavaScript.

Customisation

The website is designed to be straightforward to maintain.

1. Update content and links: Edit the relevant sections and link destinations in index.html.
2. Adjust the visual design: Modify the CSS variables and component rules in style.css to change colours, typography, spacing, and other visual details.
3. Change interactive behaviour: Edit script.js to modify the theme switcher, navigation behaviour, or scroll-based effects.
4. Update assets: Replace the relevant image references or other assets while keeping their paths consistent with the HTML and CSS.
5. Publish changes: Commit and push the updated files to the repository configured for GitHub Pages.

The site can evolve alongside my work and interests without needing to be rebuilt around a different framework.

What’s Next

This is an evolving personal project. As I work on new things, develop new interests, and build a clearer professional direction, the website can grow with them.

The aim is not to make it bigger for the sake of it. It is to keep it useful, considered, and recognisably mine.

Credits

Designed and developed by Karan Veer Singh

Built with HTML, CSS, and JavaScript.

Hosted with GitHub Pages.

Made with care, by me.
