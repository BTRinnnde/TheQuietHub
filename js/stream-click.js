/**
 * Privacy-preserving outbound streaming click analytics.
 * Fire-and-forget via sendBeacon; no cookies, storage, or client IDs.
 * Markup: data-stream-platform + data-stream-playlist on streaming links.
 */
(function () {
    'use strict';

    document.addEventListener('click', function (event) {
        var el = event.target && event.target.closest
            ? event.target.closest('[data-stream-platform]')
            : null;
        if (!el) return;

        var platform = el.getAttribute('data-stream-platform');
        var playlist = el.getAttribute('data-stream-playlist');
        if (!platform || !playlist) return;

        if (typeof navigator.sendBeacon !== 'function') return;

        var body = JSON.stringify({
            platform: platform,
            playlist: playlist,
            page: window.location.pathname
        });

        try {
            navigator.sendBeacon(
                '/api/track',
                new Blob([body], { type: 'application/json' })
            );
        } catch (err) {
            /* never block navigation */
        }
    });
})();
