/* ============================================
   Buy Auburn - Page View Tracking
   Lightweight analytics via Supabase
   ============================================ */

(function() {
  if (window.location.pathname.includes('admin') || window.location.hostname === 'localhost') return;

  function getDevice() {
    const w = window.innerWidth;
    if (w < 768) return 'mobile';
    if (w < 1024) return 'tablet';
    return 'desktop';
  }

  const sessionKey = 'ba_tracked_' + window.location.pathname;
  if (sessionStorage.getItem(sessionKey)) return;
  sessionStorage.setItem(sessionKey, '1');

  function track() {
    if (typeof db === 'undefined' || !db) {
      setTimeout(track, 500);
      return;
    }

    const data = {
      page: window.location.pathname,
      referrer: document.referrer || null,
      device: getDevice()
    };

    const params = new URLSearchParams(window.location.search);
    if (params.get('business')) data.business_id = params.get('business');

    db.from('page_views').insert([data]).then(() => {}).catch(() => {});
  }

  if (document.readyState === 'complete') {
    track();
  } else {
    window.addEventListener('load', track);
  }
})();
