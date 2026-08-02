/* Portafolio v2 — island nav, gallery filters, lightbox, reveals */

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

  function isYouTubeOrVimeo(src) {
    return /youtube\.com|youtu\.be|vimeo\.com/i.test(src);
  }

  function toEmbedUrl(src) {
    if (/youtube\.com\/embed\//i.test(src)) return src;
    const ytWatch = src.match(/[?&]v=([^&]+)/);
    if (ytWatch) return "https://www.youtube.com/embed/" + ytWatch[1];
    const ytShort = src.match(/youtu\.be\/([^?&]+)/);
    if (ytShort) return "https://www.youtube.com/embed/" + ytShort[1];
    const vimeo = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeo) return "https://player.vimeo.com/video/" + vimeo[1];
    return src;
  }

  function openLightbox(item) {
    if (!lightbox || !lightboxContent) return;

    const type = item.getAttribute("data-type") || "foto";
    const src = (item.getAttribute("data-src") || "").trim();
    const caption = item.getAttribute("data-caption") || "";
    const imgInThumb = item.querySelector("img");

    lightboxContent.innerHTML = "";

    if (type === "video" && src && isYouTubeOrVimeo(src)) {
      const iframe = document.createElement("iframe");
      iframe.src = toEmbedUrl(src);
      iframe.title = caption || "Vídeo";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      lightboxContent.appendChild(iframe);
    } else if (type === "video" && src && /\.(mp4|webm|ogg)(\?|$)/i.test(src)) {
      const video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      lightboxContent.appendChild(video);
    } else if (src || imgInThumb) {
      const img = document.createElement("img");
      img.src = src || imgInThumb.src;
      img.alt = caption || (imgInThumb && imgInThumb.alt) || "Imagen de la galería";
      lightboxContent.appendChild(img);
    } else {
      const msg = document.createElement("div");
      msg.className = "lightbox-placeholder-msg";
      msg.innerHTML =
        type === "video"
          ? "<strong>Todavía no hay vídeo</strong>Guardá un archivo en assets/galeria/ o pegá un link de YouTube en data-src."
          : "<strong>Todavía no hay imagen</strong>Guardá la foto en assets/galeria/ y actualizá data-src.";
      lightboxContent.appendChild(msg);
    }

    if (lightboxCaption) lightboxCaption.textContent = caption;
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    if (!lightbox || !lightboxContent) return;
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
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
      ".section-intro-block, .about-grid, .bento, .case, .gallery-filters, .gallery-bento, .brand-row, .quote-card, .contact-panel"
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
