/**
 * Shared content-page chrome:
 * - Notion-style TOC on article pages
 * - Mobile/small-screen back-to-top on long pages
 */
(function () {
    'use strict';

    var body = document.body;
    if (!body) return;

    var isLightTheme =
        (body.classList.contains('articles-theme') ||
            body.classList.contains('content-theme')) &&
        document.documentElement.getAttribute('data-content-theme') !== 'dark';

    var articleBody = document.querySelector('.article-body');
    var articleMain = document.querySelector('main.article');

    function prefersReducedMotion() {
        return (
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        );
    }

    function slugify(text) {
        return String(text || '')
            .toLowerCase()
            .replace(/&amp;/g, 'and')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 80) || 'section';
    }

    function ensureUniqueId(base, used) {
        var id = base;
        var n = 2;
        while (used[id] || document.getElementById(id)) {
            id = base + '-' + n;
            n += 1;
        }
        used[id] = true;
        return id;
    }

    function buildToc() {
        if (!isLightTheme || !articleBody || !articleMain) return null;

        var headings = Array.prototype.slice.call(articleBody.querySelectorAll('h2'));
        if (!headings.length) return null;

        var used = Object.create(null);
        var nav = document.createElement('nav');
        nav.className = 'article-toc';
        nav.setAttribute('aria-label', 'On this page');

        var title = document.createElement('p');
        title.className = 'article-toc__title';
        title.textContent = 'On this page';
        nav.appendChild(title);

        var list = document.createElement('ol');
        list.className = 'article-toc__list';
        var entries = [];

        headings.forEach(function (h2) {
            if (!h2.id) {
                h2.id = ensureUniqueId(slugify(h2.textContent), used);
            } else {
                used[h2.id] = true;
            }

            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = '#' + h2.id;
            a.textContent = h2.textContent.trim();
            li.appendChild(a);
            list.appendChild(li);
            entries.push({ heading: h2, link: a });
        });

        nav.appendChild(list);

        var layout = document.createElement('div');
        layout.className = 'article-layout';
        var parent = articleMain.parentNode;
        parent.insertBefore(layout, articleMain);
        layout.appendChild(nav);
        layout.appendChild(articleMain);

        return entries;
    }

    function wireActiveSection(entries) {
        if (!entries || !entries.length || !('IntersectionObserver' in window)) return;

        var activeId = null;

        function setActive(id) {
            if (activeId === id) return;
            activeId = id;
            entries.forEach(function (entry) {
                var on = entry.heading.id === id;
                entry.link.classList.toggle('is-active', on);
                if (on) entry.link.setAttribute('aria-current', 'location');
                else entry.link.removeAttribute('aria-current');
            });
        }

        var observer = new IntersectionObserver(
            function (observed) {
                var visible = observed
                    .filter(function (item) { return item.isIntersecting; })
                    .sort(function (a, b) {
                        return a.boundingClientRect.top - b.boundingClientRect.top;
                    });
                if (visible.length) setActive(visible[0].target.id);
            },
            { rootMargin: '-20% 0px -65% 0px', threshold: [0, 1] }
        );

        entries.forEach(function (entry) {
            observer.observe(entry.heading);
        });
    }

    function pageIsLongEnough() {
        var doc = document.documentElement;
        return doc.scrollHeight > window.innerHeight * 1.75;
    }

    function buildBackToTop() {
        if (document.querySelector('.back-to-top')) return;
        if (!pageIsLongEnough()) return;

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'back-to-top';
        btn.setAttribute('aria-label', 'Back to top');
        btn.innerHTML =
            '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">' +
            '<path d="M4 12.5 L10 6.5 L16 12.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>' +
            '<span class="back-to-top__label">Top</span>';

        btn.addEventListener('click', function () {
            var target =
                document.getElementById('main') ||
                document.querySelector('main') ||
                document.body;
            if (typeof target.scrollIntoView === 'function') {
                target.scrollIntoView({
                    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
                    block: 'start'
                });
            } else {
                window.scrollTo(0, 0);
            }
            var heading = document.querySelector('main h1, .article-header h1, h1');
            if (heading && typeof heading.focus === 'function') {
                if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
                heading.focus({ preventScroll: true });
            }
        });

        document.body.appendChild(btn);

        var bottomChrome =
            document.querySelector('.site-footer') ||
            document.querySelector('.playlist-page__cta');

        var shown = false;
        function updateVisibility() {
            var shouldShow = window.scrollY > 420 && pageIsLongEnough();
            if (shouldShow === shown) return;
            shown = shouldShow;
            btn.classList.toggle('is-visible', shown);
        }

        window.addEventListener('scroll', updateVisibility, { passive: true });
        window.addEventListener('resize', updateVisibility);
        updateVisibility();

        if (bottomChrome && 'IntersectionObserver' in window) {
            var liftObserver = new IntersectionObserver(function (entries) {
                var entry = entries[0];
                if (!entry || !entry.isIntersecting) {
                    btn.style.removeProperty('--back-to-top-lift');
                    return;
                }
                btn.style.setProperty(
                    '--back-to-top-lift',
                    Math.round(entry.intersectionRect.height + 12) + 'px'
                );
            }, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });
            liftObserver.observe(bottomChrome);
        }
    }

    var entries = buildToc();
    wireActiveSection(entries);
    buildBackToTop();
})();
