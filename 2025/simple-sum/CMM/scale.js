
    (function () {
      const BASE_W = 1200;  // match CSS width below
      const BASE_H = 800;   // match CSS min-height below
      const root = document.getElementById('scale-root');

      function scaleApp() {
        const pad = 16;
        const availW = window.innerWidth  - pad;
        const availH = window.innerHeight - pad;
        let scale = Math.min(availW / BASE_W, availH / BASE_H);
        scale = Math.min(scale, 1); // prevent upscaling (remove if you want upscaling)

        root.style.transform = `scale(${scale})`;

        const scaledH = BASE_H * scale;
        const topGap  = Math.max(0, (availH - scaledH) / 2);
        root.style.marginTop = `${topGap / Math.max(scale, 0.0001)}px`;
      }

      let t;
      window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(scaleApp, 50); });
      window.addEventListener('load', scaleApp);
    })();