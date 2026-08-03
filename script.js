/* Portafolio v2 — nav, galería (fotos + reels 9:16), lightbox */

(function () {
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
      });
    });
  }

  // Gallery filters
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".g-item");
  const galleryEmpty = document.getElementById("gallery-empty");

  function applyFilter(filter) {
    let visible = 0;
    galleryItems.forEach(function (item) {
      const type = item.getAttribute("data-type") || "foto";
      const show = filter === "all" || type === filter;
      item.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    if (galleryEmpty) galleryEmpty.hidden = visible > 0;
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      applyFilter(btn.getAttribute("data-filter") || "all");
    });
  });

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxContent = document.getElementById("lightbox-content");
  const lightboxCaption = document.getElementById("lightbox-caption");

  function isLocalVideo(src) {
    return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(src);
  }

  function isTikTok(src) {
    return /tiktok\.com/i.test(src);
  }

  function isInstagramReel(src) {
    return /instagram\.com\/(reel|p|tv)\//i.test(src);
  }

  function isYouTubeShort(src) {
    return /youtube\.com\/shorts\//i.test(src) || /youtu\.be\//i.test(src);
  }

  /** TikTok embed URL from watch or share link */
  function toTikTokEmbed(src) {
    const idMatch = src.match(/\/video\/(\d+)/);
    if (idMatch) {
      return "https://www.tiktok.com/embed/v2/" + idMatch[1];
    }
    // Already embed?
    if (/tiktok\.com\/embed/i.test(src)) return src;
    return null;
  }

  function toYouTubeShortEmbed(src) {
    const shorts = src.match(/youtube\.com\/shorts\/([^?&/]+)/);
    if (shorts) return "https://www.youtube.com/embed/" + shorts[1];
    const short = src.match(/youtu\.be\/([^?&]+)/);
    if (short) return "https://www.youtube.com/embed/" + short[1];
    return null;
  }

  function makeVerticalShell() {
    const shell = document.createElement("div");
    shell.className = "lightbox-reel";
    return shell;
  }

  function openLightbox(item) {
    if (!lightbox || !lightboxContent) return;

    const type = item.getAttribute("data-type") || "foto";
    const src = (item.getAttribute("data-src") || "").trim();
    const poster = (item.getAttribute("data-poster") || "").trim();
    const caption = item.getAttribute("data-caption") || "";
    const imgInThumb = item.querySelector(".reel-screen img, img");

    lightboxContent.innerHTML = "";
    lightboxContent.classList.toggle("is-reel", type === "reel" || type === "video");

    if (type === "reel" || type === "video") {
      if (src && isLocalVideo(src)) {
        const shell = makeVerticalShell();
        const video = document.createElement("video");
        video.src = src;
        if (poster) video.poster = poster;
        else if (imgInThumb && imgInThumb.src) video.poster = imgInThumb.src;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.setAttribute("playsinline", "");
        video.loop = true;
        shell.appendChild(video);
        lightboxContent.appendChild(shell);
      } else if (src && isTikTok(src)) {
        const embed = toTikTokEmbed(src);
        if (embed) {
          const shell = makeVerticalShell();
          const iframe = document.createElement("iframe");
          iframe.src = embed;
          iframe.title = caption || "TikTok";
          iframe.allow = "encrypted-media; fullscreen; autoplay";
          iframe.allowFullscreen = true;
          iframe.loading = "lazy";
          shell.appendChild(iframe);
          lightboxContent.appendChild(shell);
        } else {
          showReelPlaceholder(src, "No pude leer el ID de TikTok. Usá un link tipo tiktok.com/@usuario/video/123…");
        }
      } else if (src && isInstagramReel(src)) {
        // Instagram no permite embed confiable sin su script; abrimos el reel y mostramos poster
        const shell = makeVerticalShell();
        shell.classList.add("lightbox-reel-link");
        if (imgInThumb || poster) {
          const img = document.createElement("img");
          img.src = poster || imgInThumb.src;
          img.alt = caption || "Portada del reel";
          shell.appendChild(img);
        }
        const link = document.createElement("a");
        link.href = src;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "reel-open-btn";
        link.textContent = "Ver en Instagram";
        shell.appendChild(link);
        lightboxContent.appendChild(shell);
      } else if (src && isYouTubeShort(src)) {
        // Shorts siguen siendo verticales; no landscape “normal”
        const embed = toYouTubeShortEmbed(src);
        if (embed) {
          const shell = makeVerticalShell();
          const iframe = document.createElement("iframe");
          iframe.src = embed;
          iframe.title = caption || "Short vertical";
          iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          iframe.allowFullscreen = true;
          shell.appendChild(iframe);
          lightboxContent.appendChild(shell);
        }
      } else if (src) {
        // Link genérico: botón para abrir + poster
        const shell = makeVerticalShell();
        shell.classList.add("lightbox-reel-link");
        if (imgInThumb || poster) {
          const img = document.createElement("img");
          img.src = poster || (imgInThumb && imgInThumb.src);
          img.alt = caption || "Portada";
          shell.appendChild(img);
        }
        const link = document.createElement("a");
        link.href = src;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "reel-open-btn";
        link.textContent = "Abrir vídeo";
        shell.appendChild(link);
        lightboxContent.appendChild(shell);
      } else {
        showReelPlaceholder(
          "",
          "Guardá un <strong>.mp4</strong> en <em>assets/galeria/</em> o pegá un link de <strong>TikTok</strong> / <strong>Instagram Reel</strong> en <em>data-src</em>."
        );
      }
    } else if (src || imgInThumb) {
      const img = document.createElement("img");
      img.src = src || imgInThumb.src;
      img.alt = caption || (imgInThumb && imgInThumb.alt) || "Imagen de la galería";
      lightboxContent.appendChild(img);
    } else {
      const msg = document.createElement("div");
      msg.className = "lightbox-placeholder-msg";
      msg.innerHTML =
        "<strong>Todavía no hay imagen</strong>Guardá la foto en <em>assets/galeria/</em> y actualizá data-src.";
      lightboxContent.appendChild(msg);
    }

    if (lightboxCaption) lightboxCaption.textContent = caption;
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
  }

  function showReelPlaceholder(src, htmlDetail) {
    const msg = document.createElement("div");
    msg.className = "lightbox-placeholder-msg lightbox-placeholder-reel";
    msg.innerHTML = "<strong>Reel vacío</strong>" + htmlDetail;
    lightboxContent.appendChild(msg);
  }

  function closeLightbox() {
    if (!lightbox || !lightboxContent) return;
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    lightboxContent.classList.remove("is-reel");
    // Stop any playing video
    lightboxContent.querySelectorAll("video").forEach(function (v) {
      v.pause();
    });
    lightboxContent.innerHTML = "";
  }

  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
      openLightbox(item);
    });
  });

  if (lightbox) {
    lightbox.querySelectorAll("[data-lightbox-close]").forEach(function (el) {
      el.addEventListener("click", closeLightbox);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
  });

  // Scroll reveals
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    const targets = document.querySelectorAll(
      ".section-intro-block, .about-grid, .services-stack, .svc-row, .showreel-grid, .case, .gallery-filters, .gallery-bento, .brand-row, .process-steps, .quote-card, .contact-panel, .trust-bar"
    );
    targets.forEach(function (el) {
      el.classList.add("reveal");
    });
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );
    targets.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
