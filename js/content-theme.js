/**
 * Light / dark theme for content pages (What is / Articles).
 * Default: system preference, then light. Persists explicit user choice.
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'tqh-content-theme';

    function getStoredTheme() {
        try {
            var stored = localStorage.getItem(STORAGE_KEY);
            if (stored === 'light' || stored === 'dark') return stored;
        } catch (e) { /* ignore */ }
        return null;
    }

    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    function getActiveTheme() {
        return getStoredTheme() || getSystemTheme();
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-content-theme', theme);

        var colorScheme = document.querySelector('meta[name="color-scheme"]');
        if (colorScheme) colorScheme.setAttribute('content', theme);

        var themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) {
            themeColor.setAttribute('content', theme === 'dark' ? '#14161c' : '#f4f5f7');
        }

        var toggle = document.querySelector('.theme-toggle');
        if (toggle) updateToggleButton(toggle, theme);
    }

    function updateToggleButton(btn, theme) {
        var toDark = theme === 'light';
        btn.setAttribute('aria-label', toDark ? 'Switch to dark mode' : 'Switch to light mode');
        btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        btn.innerHTML =
            toDark
                ? '<svg class="theme-toggle__icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
                  '<path fill="currentColor" d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16a1 1 0 0 1 1 1v1.25a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1-1-1v-1.25a1 1 0 1 1 2 0V20a1 1 0 0 1-1 1ZM4 12a1 1 0 0 1 1-1h1.25a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm16 0a1 1 0 0 1 1-1h1.25a1 1 0 1 1 0 2H21a1 1 0 0 1-1-1ZM6.22 6.22a1 1 0 0 1 1.41 0l.88.88a1 1 0 1 1-1.41 1.41l-.88-.88a1 1 0 0 1 0-1.41Zm11.09 11.09a1 1 0 0 1 1.41 0l.88.88a1 1 0 0 1-1.41 1.41l-.88-.88a1 1 0 0 1 0-1.41ZM17.78 6.22a1 1 0 0 1 0 1.41l-.88.88a1 1 0 1 1-1.41-1.41l.88-.88a1 1 0 0 1 1.41 0ZM7.53 17.31a1 1 0 0 1 0 1.41l-.88.88a1 1 0 1 1-1.41-1.41l.88-.88a1 1 0 0 1 1.41 0Z"/>' +
                  '</svg>'
                : '<svg class="theme-toggle__icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
                  '<path fill="currentColor" d="M21 14.5A7.5 7.5 0 0 1 9.5 3.05a.75.75 0 0 0-.79.98A9 9 0 0 0 19.97 15.3a.75.75 0 0 0 .98-.79Z"/>' +
                  '</svg>';
    }

    function setupToggle() {
        var body = document.body;
        if (!body || (!body.classList.contains('articles-theme') && !body.classList.contains('content-theme'))) {
            return;
        }

        var header = document.querySelector('.site-header');
        if (!header || header.querySelector('.theme-toggle')) return;

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'theme-toggle';
        updateToggleButton(btn, getActiveTheme());

        btn.addEventListener('click', function () {
            var next = getActiveTheme() === 'dark' ? 'light' : 'dark';
            try {
                localStorage.setItem(STORAGE_KEY, next);
            } catch (e) { /* ignore */ }
            applyTheme(next);
        });

        header.appendChild(btn);
    }

    applyTheme(getActiveTheme());

    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (event) {
            if (!getStoredTheme()) applyTheme(event.matches ? 'dark' : 'light');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupToggle);
    } else {
        setupToggle();
    }
})();
