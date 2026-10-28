
(() => {
    'use strict';

    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle__icon');
    const themeLabel = document.querySelector('.theme-toggle__label');
    const progressBar = document.querySelector('.reading-progress__bar');
    const sectionLinks = document.querySelectorAll('.page-rail nav a');
    const yearElement = document.getElementById('current-year');
    const sections = document.querySelectorAll(
        '#story, #journey, #curiosity, #the-road, #interests, #elsewhere'
    );
    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );
    const storageKey = 'kvs-about-theme';

    let scrollTicking = false;
    let currentActiveSection = '';

    const getSavedTheme = () => {
        try {
            return localStorage.getItem(storageKey);
        } catch {
            return null;
        }
    };

    const saveTheme = (theme) => {
        try {
            localStorage.setItem(storageKey, theme);
        } catch {
            return;
        }
    };

    const getPreferredTheme = () => {
        const savedTheme = getSavedTheme();

        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    };

    const applyTheme = (theme) => {
        const isDark = theme === 'dark';

        body.classList.toggle('dark-theme', isDark);

        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', String(isDark));
            themeToggle.setAttribute(
                'aria-label',
                isDark ? 'Switch to light theme' : 'Switch to dark theme'
            );
        }

        if (themeIcon) {
            themeIcon.textContent = isDark ? '☼' : '◐';
        }

        if (themeLabel) {
            themeLabel.textContent = isDark
                ? 'Light appearance'
                : 'Dark appearance';
        }

        const themeColor = document.querySelector(
            'meta[name="theme-color"]'
        );

        if (themeColor) {
            themeColor.setAttribute(
                'content',
                isDark ? '#201F1C' : '#F4F0E8'
            );
        }
    };

    applyTheme(getPreferredTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = body.classList.contains('dark-theme')
                ? 'light'
                : 'dark';

            applyTheme(nextTheme);
            saveTheme(nextTheme);
        });
    }

    const updateReadingProgress = () => {
        if (!progressBar) {
            return;
        }

        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        if (scrollableHeight <= 0) {
            progressBar.style.width = '0%';
            return;
        }

        const scrollPosition = Math.max(
            0,
            Math.min(window.scrollY, scrollableHeight)
        );

        const progress = (scrollPosition / scrollableHeight) * 100;
        progressBar.style.width = `${progress}%`;
    };

    const updateActiveSection = () => {
        if (!sections.length || !sectionLinks.length) {
            return;
        }

        const activationPoint = window.innerHeight * 0.36;
        let activeSection = sections[0].id;

        sections.forEach((section) => {
            if (section.getBoundingClientRect().top <= activationPoint) {
                activeSection = section.id;
            }
        });

        const isAtPageBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 4;

        if (isAtPageBottom) {
            activeSection = sections[sections.length - 1].id;
        }

        if (activeSection === currentActiveSection) {
            return;
        }

        currentActiveSection = activeSection;

        sectionLinks.forEach((link) => {
            const isActive =
                link.getAttribute('href') === `#${activeSection}`;

            link.classList.toggle('is-active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const updateScrollUI = () => {
        updateReadingProgress();
        updateActiveSection();
        scrollTicking = false;
    };

    const requestScrollUpdate = () => {
        if (scrollTicking) {
            return;
        }

        scrollTicking = true;
        window.requestAnimationFrame(updateScrollUI);
    };

    window.addEventListener('scroll', requestScrollUpdate, {
        passive: true
    });

    window.addEventListener('resize', requestScrollUpdate, {
        passive: true
    });

    updateScrollUI();

    if ('IntersectionObserver' in window && !reducedMotion.matches) {
        const revealTargets = document.querySelectorAll(
            '.story-section, .elsewhere-section, .closing-section, .interest-item, .margin-note'
        );

        revealTargets.forEach((element) => {
            element.classList.add('reveal-pending');
        });

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            },
            {
                root: null,
                rootMargin: '0px 0px -45px 0px',
                threshold: 0.08
            }
        );

        revealTargets.forEach((element) => {
            revealObserver.observe(element);
        });
    }

    // Draw the curiosity curve once, when it enters the viewport.
    const curiosityCurve = document.querySelector('#curiosity-curve');

    if (
        curiosityCurve &&
        'IntersectionObserver' in window &&
        !reducedMotion.matches
    ) {
        curiosityCurve.classList.add('is-animated');

        const curveObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            },
            {
                root: null,
                rootMargin: '0px 0px -30px 0px',
                threshold: 0.2
            }
        );

        curveObserver.observe(curiosityCurve);
    }

    if (yearElement) {
        yearElement.textContent = String(new Date().getFullYear());
    }

    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');

            if (!targetId || targetId === '#') {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: reducedMotion.matches ? 'auto' : 'smooth',
                block: 'start'
            });

            if (window.location.hash !== targetId) {
                window.history.pushState(null, '', targetId);
            }
        });
    });

    // Keep the visible section in sync when navigating browser history.
    window.addEventListener('popstate', () => {
        const hash = window.location.hash;

        if (!hash) {
            window.scrollTo({
                top: 0,
                behavior: reducedMotion.matches ? 'auto' : 'smooth'
            });
            return;
        }

        let targetId;

        try {
            targetId = decodeURIComponent(hash.slice(1));
        } catch {
            return;
        }

        const target = document.getElementById(targetId);

        if (!target) {
            return;
        }

        target.scrollIntoView({
            behavior: reducedMotion.matches ? 'auto' : 'smooth',
            block: 'start'
        });
    });
})();
