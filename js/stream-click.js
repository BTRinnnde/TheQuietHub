(() => {
  const ANALYTICS_ENDPOINT =
    "https://quiet-hub-clicks.btrinnnde.workers.dev/event";

  const viewId = crypto.randomUUID();
  const page = window.location.pathname;

  const match = page.match(/^\/playlists\/([^/]+)\/?$/);
  const playlist = match ? match[1] : "";

  function send(data) {
    const body = new URLSearchParams({
      view_id: viewId,
      page,
      playlist,
      ...data
    });

    const sent = navigator.sendBeacon(
      ANALYTICS_ENDPOINT,
      body
    );

    if (!sent) {
      fetch(ANALYTICS_ENDPOINT, {
        method: "POST",
        body,
        keepalive: true
      }).catch(() => {});
    }
  }

  // Record the page view.
  send({
    event: "view"
  });

  function getPlatform(href) {
    try {
      const host = new URL(href, window.location.href)
        .hostname
        .replace(/^www\./, "");

      if (
        host === "open.spotify.com" ||
        host.endsWith(".spotify.com")
      ) {
        return "spotify";
      }

      if (
        host === "music.apple.com" ||
        host.endsWith(".music.apple.com")
      ) {
        return "apple-music";
      }

      if (
        host === "music.youtube.com" ||
        host.endsWith(".music.youtube.com")
      ) {
        return "youtube-music";
      }

      return null;
    } catch {
      return null;
    }
  }

  function trackPlatformClick(event) {
    const link = event.target.closest("a[href]");

    if (!link) return;

    const platform = getPlatform(link.href);

    if (!platform) return;

    const linkPlaylist = link.getAttribute("data-stream-playlist") || "";

    send({
      event: "click",
      platform,
      ...(linkPlaylist ? { playlist: linkPlaylist } : {})
    });
  }

  document.addEventListener("click", trackPlatformClick, true);
  document.addEventListener("auxclick", trackPlatformClick, true);
})();
