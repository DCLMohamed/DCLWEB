/* ==========================================================================
   Dubai Coating Limited -- site behaviour
   No dependencies, no build step. Loaded with `defer`.
   ========================================================================== */

/* --------------------------------------------------------------------------
   CONTACT DETAILS -- EDIT HERE ONLY.
   These values fill every phone / email link on the site and build
   the quote message. Change them once and the whole site updates.
   -------------------------------------------------------------------------- */
var CONTACT = {
  phone: '+971 4 3458438',             // landline, as displayed
  fax: '+971 4 3457671',
  email: 'dcl@emirates.net.ae',
  address: 'PO Box 23366, Dubai, United Arab Emirates'
};

(function () {
  'use strict';

  var digits = function (s) { return s.replace(/\D/g, ''); };

  /* --- Contact links ----------------------------------------------------- */

  // Sets the link target and visible text for elements that carry the data
  // attributes below.
  function fill(selector, href, text) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), function (el) {
      el.setAttribute('href', href);
      if (text) { el.textContent = text; }
    });
  }

  fill('[data-tel]', 'tel:+' + digits(CONTACT.phone), CONTACT.phone);
  fill('[data-fax]', 'tel:+' + digits(CONTACT.fax), CONTACT.fax);
  fill('[data-mail]', 'mailto:' + CONTACT.email, CONTACT.email);

  Array.prototype.forEach.call(document.querySelectorAll('[data-address]'), function (el) {
    el.textContent = CONTACT.address;
  });

  var year = document.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }

  /* --- Mobile navigation ------------------------------------------------- */

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // close the panel after choosing a destination
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- Nav disclosure ------------------------------------------------------ */
  /* The About panel is a <details>, so it opens on its own. These two handlers
     only close it again: on a click outside, and on Escape. */

  var drops = document.querySelectorAll('.nav-drop');

  if (drops.length) {
    var closeDrops = function (except) {
      Array.prototype.forEach.call(drops, function (d) {
        if (d !== except) { d.open = false; }
      });
    };

    document.addEventListener('click', function (e) {
      var inside = e.target.closest('.nav-drop');
      // Leave it open on the page it points at, where the markup opens it.
      if (!inside && !e.target.closest('.nav.is-open')) { closeDrops(null); }
      if (inside) { closeDrops(inside); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') { return; }
      var open = document.querySelector('.nav-drop[open]');
      if (open) {
        open.open = false;
        open.querySelector('summary').focus();
      }
    });
  }

  /* --- Sticky header state ----------------------------------------------- */

  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* An IntersectionObserver used to sit here and mark the nav link for whichever
     section was in view. It served the Arabic pages while they were one long
     scroll. Both languages are nine pages now, every nav entry is a .html link,
     and each page marks its own with aria-current="page" in the markup, so the
     `.nav a[href^="#"]` it selected matched nothing on any of the 18 pages. */

  /* --- Scroll reveal ----------------------------------------------------- */

  var targets = document.querySelectorAll('.reveal');
  if (targets.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(targets, function (t) { io.observe(t); });
  } else {
    Array.prototype.forEach.call(targets, function (t) { t.classList.add('is-visible'); });
  }

  /* --- Project grid ------------------------------------------------------ */
  /* Every tile, every case-study body and the sector filter are built from
     PROJECTS (assets/js/projects.js). This block has to run before the modal
     block below, which binds its click handlers to the tiles. */

  // The English page is lang="en", the Arabic page under /ar/ is lang="ar".
  var LANG = document.documentElement.lang === 'ar' ? 'ar' : 'en';

  // Falls back to English, so an untranslated field never renders empty.
  function t(pair) { return (pair && pair[LANG]) || (pair && pair.en) || ''; }

  /* GENERATED WORDING -- EDIT HERE TO TRANSLATE THE GRID.
     Project copy lives in projects.js; these are the labels around it. */
  var PROJECT_UI = {
    cta: { en: 'View case study', ar: '' },
    scope: { en: 'Scope', ar: 'نطاق العمل' },
    client: { en: 'Client', ar: 'العميل' },
    programme: { en: 'Programme', ar: 'البرنامج' },
    category: { en: 'Category', ar: 'التصنيف' },
    area: { en: 'Area', ar: 'المساحة' },
    owner: { en: 'Owner', ar: 'المالك' },
    year: { en: 'Year', ar: 'السنة' },
    unit: { en: 'm²', ar: 'م²' },
    all: { en: 'All', ar: '' },
    filter: { en: 'Filter projects by sector', ar: '' },
    done1: { en: 'Delivered in {a}.', ar: 'تم تنفيذ المشروع في عام {a}.' },
    done2: { en: 'Delivered across {a} and {b}.', ar: 'تم تنفيذ المشروع خلال الفترة من {a} إلى {b}.' },
    open1: { en: 'Programme runs through {a}.', ar: 'يمتد تنفيذ البرنامج خلال عام {a}.' },
    open2: { en: 'Programme runs across {a} and {b}.', ar: 'يمتد تنفيذ البرنامج خلال عامي {a} و{b}.' }
  };

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // "2016-2018" -> "Delivered across 2016 and 2018." A range whose last year
  // has not passed yet reads as still running.
  function programme(year) {
    var parts = String(year).split('-');
    var last = parts[parts.length - 1];
    var stem = Number(last) >= new Date().getFullYear() ? 'open' : 'done';
    return t(PROJECT_UI[stem + (parts.length > 1 ? '2' : '1')])
      .replace('{a}', parts[0])
      .replace('{b}', last);
  }

  function projectMarkup(p, base) {
    var name = esc(t(p.name));
    var cat = esc(t(p.cat));
    var owner = esc(t(p.owner));
    var area = esc(p.area) + ' ' + t(PROJECT_UI.unit);
    var year = esc(p.year);

    function block(label, text) {
      return '<div><h3>' + esc(t(label)) + '</h3><p>' + text + '</p></div>';
    }
    function item(label, value) {
      return '<li>' + esc(t(label)) + ': ' + value + '</li>';
    }

    return '<article class="project" data-cat="' + cat + '">' +
      '<button class="project-card" type="button" aria-haspopup="dialog"' +
      ' aria-controls="project-modal" aria-expanded="false">' +
      '<img src="' + esc(base + p.img) + '" alt="' + esc(t(p.alt)) + '"' +
      ' width="' + p.w + '" height="' + p.h + '" loading="lazy">' +
      '<span class="project-scrim">' +
      '<span class="project-sector">' + cat + '</span>' +
      '<span class="project-cta">' + esc(t(PROJECT_UI.cta)) + '</span>' +
      '</span>' +
      '<span class="project-body">' +
      '<span class="project-name">' + name + '</span>' +
      '<span class="project-meta">' + area + ' &middot; ' + owner + ' &middot; ' + year + '</span>' +
      '</span>' +
      '</button>' +
      '<div class="project-detail" hidden>' +
      '<p class="project-meta">' + cat + ' &middot; ' + owner + ' &middot; ' + year + '</p>' +
      '<div class="project-modal-blocks">' +
      block(PROJECT_UI.scope, esc(t(p.scope))) +
      block(PROJECT_UI.client, owner + (/[.!?]$/.test(owner) ? '' : '.')) +
      block(PROJECT_UI.programme, esc(programme(p.year))) +
      '</div>' +
      '<ul class="spec-list">' +
      item(PROJECT_UI.category, cat) +
      item(PROJECT_UI.area, area) +
      item(PROJECT_UI.owner, owner) +
      item(PROJECT_UI.year, year) +
      '</ul>' +
      '</div>' +
      '</article>';
  }

  var grid = document.getElementById('projects-grid');

  if (grid && typeof PROJECTS !== 'undefined') {
    // The Arabic page sits one directory down, so it carries its own base.
    var imgBase = grid.getAttribute('data-img-base') || 'assets/img/projects/';

    grid.innerHTML = PROJECTS.map(function (p) {
      return projectMarkup(p, imgBase);
    }).join('');

    // The filter chips are whatever categories the data actually contains.
    var cats = [];
    PROJECTS.forEach(function (p) {
      var c = t(p.cat);
      if (c && cats.indexOf(c) === -1) { cats.push(c); }
    });

    var filter = document.getElementById('projects-filter');

    if (filter && cats.length > 1) {
      filter.setAttribute('aria-label', t(PROJECT_UI.filter));

      // '' is the "All" chip and matches every article.
      filter.innerHTML = [''].concat(cats).map(function (c) {
        return '<button class="filter-chip" type="button" data-cat="' + esc(c) + '"' +
          ' aria-pressed="' + (c === '') + '">' +
          esc(c || t(PROJECT_UI.all)) + '</button>';
      }).join('');

      filter.addEventListener('click', function (e) {
        var chip = e.target.closest('.filter-chip');
        if (!chip) { return; }
        var want = chip.getAttribute('data-cat');

        Array.prototype.forEach.call(filter.children, function (b) {
          b.setAttribute('aria-pressed', String(b === chip));
        });
        Array.prototype.forEach.call(grid.children, function (a) {
          a.hidden = want !== '' && a.getAttribute('data-cat') !== want;
        });
      });
    }
  }

  /* --- News and events --------------------------------------------------- */
  /* Entries come from NEWS (assets/js/news.js). An empty list is a normal
     state, not an error: the page says so and stops. */

  var newsList = document.getElementById('news-list');

  var NEWS_UI = {
    empty: { en: 'Nothing published yet. Check back, or ask us directly.',
             ar: 'لا توجد أخبار منشورة حتى الآن. تابعونا لاحقًا أو تواصلوا معنا مباشرة.' },
    placeholder: { en: 'Sample entry. Not for publication.',
                   ar: 'مثال توضيحي. غير مخصص للنشر.' }
  };

  if (newsList && typeof NEWS !== 'undefined') {
    if (!NEWS.length) {
      newsList.innerHTML = '<p class="lede">' + esc(t(NEWS_UI.empty)) + '</p>';
    } else {
      newsList.innerHTML = NEWS.map(function (n) {
        // Written out rather than localised: the site uses Western digits in
        // both languages, and an ISO date needs no translation.
        var when = '<time datetime="' + esc(n.date) + '">' + esc(n.date) + '</time>';
        var figure = n.img
          ? '<figure class="figure"><img src="' + esc(n.img) + '" alt="' +
            esc(t(n.alt)) + '" loading="lazy"></figure>'
          : '';

        return '<article class="news-item reveal is-visible">' +
          (n.placeholder ? '<p class="news-flag">' + esc(t(NEWS_UI.placeholder)) + '</p>' : '') +
          '<p class="spec">' + when + '</p>' +
          '<h2>' + esc(t(n.title)) + '</h2>' +
          figure +
          '<p>' + esc(t(n.body)) + '</p>' +
          '</article>';
      }).join('');
    }
  }

  /* --- Project case-study modal ------------------------------------------ */

  var modal = document.getElementById('project-modal');
  var modalTitle = document.getElementById('project-modal-title');
  var modalContent = document.getElementById('project-modal-content');
  var modalImg = document.getElementById('project-modal-img');
  var modalClose = modal && modal.querySelector('.project-modal-close');
  var useNativeDialog = modal && typeof modal.showModal === 'function';
  var lastFocusedCard = null;
  var bodyScrollY = 0;
  var fallbackBackdrop = null;
  var fallbackEscHandler = null;
  var fallbackTrapHandler = null;
  var fallbackBackdropClick = null;

  function lockBodyScroll() {
    bodyScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + bodyScrollY + 'px';
    document.body.style.width = '100%';
    document.body.style.overflowY = 'hidden';
  }

  function unlockBodyScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflowY = '';
    window.scrollTo(0, bodyScrollY);
  }

  function openModal(card) {
    if (!modal || !modalContent || modal.open) { return; }
    var article = card.closest('.project');
    if (!article) { return; }

    var detail = article.querySelector('.project-detail');
    var img = card.querySelector('img');
    var nameEl = card.querySelector('.project-name');
    if (!detail) { return; }

    lastFocusedCard = card;

    if (modalTitle && nameEl) { modalTitle.textContent = nameEl.textContent; }
    modalContent.innerHTML = detail.innerHTML;

    if (modalImg && img) {
      modalImg.src = img.src;
      modalImg.alt = img.alt || '';
    }

    var scrollBox = modal.querySelector('.project-modal-scroll');
    if (scrollBox) { scrollBox.scrollTop = 0; }

    lockBodyScroll();

    if (useNativeDialog) {
      modal.showModal();
    } else {
      openFallbackModal();
    }

    if (modalClose) { modalClose.focus(); }

    Array.prototype.forEach.call(document.querySelectorAll('.project-card'), function (c) {
      c.setAttribute('aria-expanded', String(c === card));
    });
  }

  function getFocusableModalElements() {
    return Array.prototype.filter.call(
      modal.querySelectorAll('a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'),
      function (el) { return el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement; }
    );
  }

  function openFallbackModal() {
    modal.setAttribute('open', '');
    fallbackBackdrop = document.createElement('div');
    fallbackBackdrop.className = 'project-modal-fallback-backdrop';
    document.body.appendChild(fallbackBackdrop);

    fallbackEscHandler = function (e) {
      if (e.key === 'Escape') { e.preventDefault(); requestCloseModal(); }
    };
    document.addEventListener('keydown', fallbackEscHandler);

    fallbackTrapHandler = function (e) {
      if (e.key !== 'Tab') { return; }
      var focusables = getFocusableModalElements();
      if (!focusables.length) { return; }
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    modal.addEventListener('keydown', fallbackTrapHandler);

    fallbackBackdropClick = function (e) {
      e.stopPropagation();
      requestCloseModal();
    };
    fallbackBackdrop.addEventListener('click', fallbackBackdropClick);
  }

  function cleanupFallbackModal() {
    if (fallbackEscHandler) {
      document.removeEventListener('keydown', fallbackEscHandler);
      fallbackEscHandler = null;
    }
    if (fallbackTrapHandler) {
      modal.removeEventListener('keydown', fallbackTrapHandler);
      fallbackTrapHandler = null;
    }
    if (fallbackBackdrop) {
      if (fallbackBackdropClick) {
        fallbackBackdrop.removeEventListener('click', fallbackBackdropClick);
        fallbackBackdropClick = null;
      }
      fallbackBackdrop.parentNode.removeChild(fallbackBackdrop);
      fallbackBackdrop = null;
    }
    modal.removeAttribute('open');
  }

  function cleanupModal() {
    unlockBodyScroll();

    if (lastFocusedCard) {
      lastFocusedCard.focus();
      lastFocusedCard = null;
    }

    Array.prototype.forEach.call(document.querySelectorAll('.project-card'), function (c) {
      c.setAttribute('aria-expanded', 'false');
    });
  }

  function requestCloseModal() {
    if (!modal) { return; }
    if (useNativeDialog) {
      modal.close();
    } else {
      cleanupFallbackModal();
      cleanupModal();
    }
  }

  if (modal) {
    Array.prototype.forEach.call(document.querySelectorAll('.project-card'), function (card) {
      card.addEventListener('click', function () { openModal(card); });
    });

    if (modalClose) {
      modalClose.addEventListener('click', requestCloseModal);
    }

    modal.addEventListener('click', function (e) {
      var box = modal.querySelector('.project-modal-box');
      if (box && !box.contains(e.target)) {
        requestCloseModal();
      }
    });

    modal.addEventListener('close', cleanupModal);
  }
  /* --- Quote form -------------------------------------------------------- */
  /* The form posts to the Worker at /api/quote, which sends the enquiry to
     CONTACT.email. If that route is unconfigured, blocked or offline, the form
     falls back to the visitor's own mail client, so it never dead-ends. */

  var form = document.querySelector('#quote-form');
  if (!form) { return; }

  var LABELS = {
    name: 'Contact name',
    company: 'Company',
    email: 'Email',
    phone: 'Phone',
    service: 'Service required',
    location: 'Project location',
    scope: 'Approximate scope',
    message: 'Details'
  };
  var ORDER = ['name', 'company', 'email', 'phone', 'service', 'location', 'scope', 'message'];

  function compose() {
    var data = new FormData(form);
    var lines = ['Quote request - Dubai Coating Limited', ''];

    ORDER.forEach(function (key) {
      var value = (data.get(key) || '').toString().trim();
      if (value) { lines.push(LABELS[key] + ': ' + value); }
    });

    return lines.join('\n');
  }

  var status = document.getElementById('quote-status');

  /* GENERATED WORDING -- the Arabic page carries its own translation. */
  var QUOTE_UI = {
    sending: { en: 'Sending…', ar: 'جارٍ الإرسال…' },
    sent: { en: 'Thank you. Your enquiry is on its way and we will reply by email.',
            ar: 'شكرًا لكم. تم إرسال طلبكم وسنرد عليكم عبر البريد الإلكتروني.' },
    failed: { en: 'We could not send it from here, so your mail app is opening with the enquiry filled in.',
              ar: 'تعذّر الإرسال من هنا، لذلك سيُفتح تطبيق البريد لديكم والطلب جاهز.' }
  };

  function say(key, kind) {
    if (!status) { return; }
    status.textContent = t(QUOTE_UI[key]);
    status.className = 'form-status is-' + kind;
  }

  function mailtoUrl() {
    return 'mailto:' + CONTACT.email +
      '?subject=' + encodeURIComponent('Quote request - ' + (new FormData(form).get('company') || 'New enquiry')) +
      '&body=' + encodeURIComponent(compose());
  }

  // The fallback the site shipped with: hand the enquiry to the visitor's own
  // mail client. The event stays cancelable so test/quote-form.test.html can
  // intercept it instead of navigating.
  function handOffToMailClient() {
    var url = mailtoUrl();
    var evt = new CustomEvent('dcl:quote', { cancelable: true, detail: { url: url } });
    if (form.dispatchEvent(evt)) { window.location.href = url; }
  }

  function payload() {
    var data = new FormData(form);
    var out = {};
    ORDER.concat(['website']).forEach(function (key) {
      out[key] = (data.get(key) || '').toString().trim();
    });
    return out;
  }

  var sending = false;

  function send() {
    // let the browser run native validation first
    if (sending || !form.reportValidity()) { return; }

    sending = true;
    say('sending', 'busy');

    fetch('/api/quote', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload())
    }).then(function (res) {
      if (!res.ok) { throw new Error('HTTP ' + res.status); }
      say('sent', 'ok');
      form.reset();
    }).catch(function () {
      say('failed', 'warn');
      handOffToMailClient();
    }).then(function () {
      sending = false;
    });
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); send(); });

  Array.prototype.forEach.call(form.querySelectorAll('[data-send]'), function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      send();
    });
  });
})();
