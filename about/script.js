(() => {
    'use strict';

    const root = document.documentElement;
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle__icon');
    const themeLabel = document.querySelector('.theme-toggle__label');
    const dockThemeButton = document.querySelector('.about-dock__theme');
    const dockThemeIcon = document.querySelector('.about-dock__theme-icon');
    const aboutDock = document.querySelector('.about-dock');
    const firstStorySection = document.querySelector('#story');
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

        root.classList.toggle('dark-theme', isDark);
        body.classList.toggle('dark-theme', isDark);

        const nextLabel = isDark
            ? 'Switch to light theme'
            : 'Switch to dark theme';
        const nextIcon = isDark ? '☼' : '◐';

        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', String(isDark));
            themeToggle.setAttribute('aria-label', nextLabel);
        }

        if (dockThemeButton) {
            dockThemeButton.setAttribute('aria-pressed', String(isDark));
            dockThemeButton.setAttribute('aria-label', nextLabel);
        }

        if (themeIcon) {
            themeIcon.textContent = nextIcon;
        }

        if (dockThemeIcon) {
            dockThemeIcon.textContent = nextIcon;
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

    const roadImage = document.querySelector('.road-image img');

    if (roadImage) {
        const showRoadImage = () => {
            roadImage.style.opacity = '1';
        };

        roadImage.style.transition = reducedMotion.matches
            ? 'none'
            : 'opacity 650ms cubic-bezier(0.22, 1, 0.36, 1)';

        if (roadImage.complete) {
            showRoadImage();
        } else {
            roadImage.style.opacity = '0';

            const revealAfterDecode = () => {
                if (typeof roadImage.decode === 'function') {
                    roadImage.decode()
                        .then(showRoadImage)
                        .catch(showRoadImage);

                    return;
                }

                showRoadImage();
            };

            roadImage.addEventListener('load', revealAfterDecode, {
                once: true
            });

            roadImage.addEventListener('error', showRoadImage, {
                once: true
            });
        }
    }

    const handleThemeToggle = () => {
        const nextTheme = root.classList.contains('dark-theme')
            ? 'light'
            : 'dark';

        applyTheme(nextTheme);
        saveTheme(nextTheme);
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', handleThemeToggle);
    }

    if (dockThemeButton) {
        dockThemeButton.addEventListener('click', handleThemeToggle);
    }

    if (!reducedMotion.matches && window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.about-glass').forEach((surface) => {
            surface.addEventListener('pointermove', (event) => {
                const rect = surface.getBoundingClientRect();
                if (!rect.width || !rect.height) return;
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;
                surface.style.setProperty('--glass-x', `${x.toFixed(1)}%`);
                surface.style.setProperty('--glass-y', `${y.toFixed(1)}%`);
            });

            surface.addEventListener('pointerleave', () => {
                surface.style.removeProperty('--glass-x');
                surface.style.removeProperty('--glass-y');
            });
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

    let dockVisible = false;

    const updateDockVisibility = () => {
        if (!aboutDock || !firstStorySection) {
            return;
        }

        const shouldShow =
            window.scrollY > 120 &&
            firstStorySection.getBoundingClientRect().top <=
                window.innerHeight * 0.72;

        if (shouldShow === dockVisible) {
            return;
        }

        dockVisible = shouldShow;
        aboutDock.classList.toggle('is-visible', shouldShow);
        aboutDock.setAttribute('aria-hidden', String(!shouldShow));
    };

    const updateScrollUI = () => {
        updateReadingProgress();
        updateActiveSection();
        updateDockVisibility();
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
