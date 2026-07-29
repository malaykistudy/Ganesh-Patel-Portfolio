(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const body = document.body;
  const header = $('[data-header]');
  const menuButton = $('[data-menu-toggle]');
  const nav = $('[data-nav]');

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('is-open');
    body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    nav?.classList.toggle('is-open', !isOpen);
    body.classList.toggle('menu-open', !isOpen);
  });
  $$('#site-nav a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 780) closeMenu(); });

  const pageName = body.dataset.page;
  $(`[data-nav-page="${pageName}"]`)?.setAttribute('aria-current', 'page');
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const slides = $$('.hero-slide');
  const dots = $$('.hero-dot');
  let slideIndex = 0;
  let slideTimer;
  const showSlide = index => {
    if (!slides.length) return;
    slideIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === slideIndex));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === slideIndex));
  };
  const startSlides = () => {
    if (slides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(slideTimer);
    slideTimer = setInterval(() => showSlide(slideIndex + 1), 5500);
  };
  dots.forEach(dot => dot.addEventListener('click', () => {
    showSlide(Number(dot.dataset.slide));
    startSlides();
  }));
  startSlides();

  const gallery = $('#portfolioGallery');
  if (gallery) {
    const items = [
      { category: 'Weddings', title: 'Wedding story', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQUdJY6J5L4VFWLppnzFwLTRdt8juuoL4xrEfCDfuLWHawyBpoGFBqa8rUgAzeE5_8Gpgbg2Hp9bemeXa9mAsRubq2unhBCr0VCrn0GvJQ-McRaGwiM0-PUB8krAAvYkZbUFum8ItYppvjHPEwo17IyhMt08fgk9ry4ybArOmK0fZDuO8Gde-nQ6NA=w1280' },
      { category: 'Pre-Weddings', title: 'Couple session', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQU3Rl1rUn3APqsmOD6AjRMoJChscqXSTtSf_5hRrsDDDfYh9C-Zg0OabFAKEK5_oMWdrPcgjXlFGYPfIfEUG3h5c0qUtOaJWouWChvSpgvP-S66T76LobOKAXfBJfUHaVnR5m7eBZwnwz5kDuVWeVew0PHmXsfLkbPAtTAyLTVriATGzuPAhZ0WgDNCHcw=w1280' },
      { category: 'Modelling', title: 'Editorial portrait', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQVLb51PVn5Od6TdybQRQwry9RgjMn4lyR51wXxNmRVgFEM1I5-H5vhPSO_CKslQ0h6gcmXr_jkxC6qSap5K8V1TuaPCtEEwS3Y3wxotuZW6HxnrrlAnynGbGiu-yckw0hNG9b-gPGQHY7kcBW_PDI6qrw_kBK872dxA412gSU5e7K2wOc0pIye97iulXSe1l0NQgtHibny5-MHxXn0lrqOdM_UuLC9HKBCGp691KMg=w1280' },
      { category: 'Baby Shower', title: 'Family celebration', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQUJwjkGIOhcbj7ZIYOFpn9JhM9JgVhprilM28wr8yeaBFfAsC3dej8CL1HvnKqwJW5LosKMreuY6YskSeQ3oLHm1LkjMd3K9Oh5Qo3UP3N001EIC36xmSdRBood5UD9_yTm5_drGPkoJsgJA21dGMfQa7cyACvyNVRt5iFsF3QTOBlMMpl9HNU940FMezM=w1280' },
      { category: 'Portraits', title: 'Traditional portrait', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQWCKLyXeqaBz4nlJXnHal3INfGeEyinG7OuHvU6hr92JeLoH2oIKByrb09wd5guBv66sJOsQ9eyx9Hx8ux3Fyull3l6jy-XVmHB8xGfgaZ9y0haxy4g91jRv1ex0L4C9GXEQrneKi5Qj7t8qaMLSPaDHJ4ok-3ZHhVmFfakimOGNGGQWwHUqb2OSMZO=w1280' },
      { category: 'Weddings', title: 'Ceremony detail', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQUM3G1ikHkIXyDpFcRPdcWVev-8SkBeyHPkbs44YwAbvXGLrJsm-TLtkUKzXvtuTRrufQP715j4COCT4qa1Y5eq2VEZlcnH-_xTLMAV5PvOPllFAJTdO1Q2ck-v1oIfc0g_ATGrATCNZHY_MheEiYYW6yVZixPmh7vu26I3CFfNWbKBe1wwh3dIcjDj5gg=w1280' },
      { category: 'Pre-Weddings', title: 'Outdoor couple portrait', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQUNgLMzcyvq-7MrEnFbZ9DB08nmq3cYu-5G_o7DD_3_9a4oX0uusScYTHTIafNkrf1_NSye-V-nWObeYqGyoAXRusS4po4mB-38zY1W8KR-CaO1OvGprG4T4GvW8bVkfIUyzJF3Gbz1fK0eYWfsSPcd18OAU_8qb9UPWsVqfo6-rApHjGFny3H4spxi=w1280' },
      { category: 'Modelling', title: 'Fashion portfolio', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQXtDnW3L8QiOCOhlKvP1411RLfj5VfkqxxR2NE-cR3VXbwedPhUZ1n3qYqYrQSJtlOpFCuKhfBcEId_ycQjhrp0UewiRutJ5EQQaTasgsS-DSw5g9CrGl-XkWCM4f97mVSKThN6PRRlAlEDGYp37PmEBrjKp3yUBXsUpNq-FuCCNAcaPa0FMP9RZCwoDevZrlKBtTsbeoOlxZm52HAdMuC9-EyWtjDtsyYov1lmoHs=w1280' },
      { category: 'Baby Shower', title: 'Baby shower portrait', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQXlp9RCX9DG_NwJcTYPiWDXK2rFon_cT4lVsuRyekR-5A1X5pPdY89ShLcVJfGNLWHa1DAZ8y4DfRbaFSBy7k-wVCCFmmmJySQeuy7-7nOsGxB2KL6pdW5JpWqdShFDdIkv43uhgbNPaZOwqDgbKi5MbiKxQTO8AGRn-_Ly-bWTdRj5UAHddeLMKpol=w1280' },
      { category: 'Portraits', title: 'Personal portrait', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQWRn3VLSyhlKWNlgoySMjMRlHFWgzKFIsQEQu05lCTT6P9nW7vvall6AqEXtq0amx2BNcP-VIctU6naYUAU2fL4sRkkkTJNeNdtKvn8hvMS7EwjklACcAFu7ghz4MWFU-ftFuMkuWzjAKa6Kb2SguU8UR3ukvA31eIRkzZU6D22fWrBjF1BJgyY2hLRWvc=w1280' },
      { category: 'Weddings', title: 'Celebration portrait', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQUf56MEdtDlU8V0vhcmsOwHtSVeWrgCR-Hg0YqJTOScYwOrujQ3enI_1spBSu0h8UuxORlIYcNgCwtaaF6gzH2AfOrKTb6uQFeaQ1GPBkmNoy8fR1FjNUtRZViTgi-ldoW4tpIZ9HPen_bNiDFdpydmrWxfZStqwHO_MC54L26so-RJ7B5u0m58mID7nek=w1280' },
      { category: 'Modelling', title: 'Studio portrait', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQVMa72mx0dN8O8gHVJlOMasHbnUgIvuOUIYA2ne_PkAJ6I6JeAE2TvVnvnc2lAsoZPUfodBdEI5Iooaq5QCil7VRFkodT9dmcNFhZxunQW39AKioRmqQirsE-EkybMtFLHchbXwLQOmg1w3orgSnGaGbjhQyoBpmgp_Q3DD9z_1ckUOhCaPtQqODEwPwvk=w1280' },
      { category: 'Baby Shower', title: 'Motherhood portrait', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQWN4d283Rz1N4Lv7JaYNgk1rEKepY3zlonj_9HHy4YB9jvATkLQcR_2tJhLrRRrBAlw8rbbyY3-Y8qxmHT1Up8deKU2rZtDv6hIVrxZP5HrEKBusG9p-q-5adlBF29nqG56Fesk0rA2b_oZ_up5bBfaU57ZMni5XhZVXfZv18TRAjoHerCptjDJpArk=w1280' },
      { category: 'Bio-Data', title: 'Bio-data portrait', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQVsNx4Vqf3OyKH1_e9phmQC22FztTj7B5Uh1PIgPZ6UlzkWjdEL6eLeI17gEpEKoBrlhb47kzaxRU8rdZlp9TLZsJxJU-KBb44yAXlSlRg3ewlfbQX65g287TdW15DX2P_jwswxHI-NRFd49b_FRF4sCzcyzOsfdEzrbTPfHPOzwfXRIa5JomRH9UBD664=w1280' },
      { category: 'Modelling', title: 'Outdoor editorial', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQUJ6Z5X1AruXtZ5f0pwMJp94x4xPryS0OwgHJjTGeykX4RPlzwq_z8rnpzJciE8FWcQBZQK_ChSNIIik3KiBJqWYy16PioWuoxA-Ttz6Z5GhEL9yAV7yyqw5NWn_OGhbel0JIDSLhNEC9zKCRJSjBpCWWOULFMbS_hYvZi6kviQ8-qzOyuOB9qv7SPpE-8=w1280' },
      { category: 'Pre-Weddings', title: 'Destination couple session', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQWYstznj3c9fbjcPeGAJ1omjnDSLPs7HpoBzfc0ARlFJf-fnvn8diO-L1y8gnKTGgVeJU-aC_JI_wESIlpT-atzHhFSzomqoT4nydZ0pEACTAj09hSNMKq3WMWH6Xs_AyMNUElSkxwfkDGW9IxIj48FuHoBpMEEC7sIjxY0xdwJiLl7GrHp31IhApd4CUw=w1280' },
      { category: 'Weddings', title: 'Wedding portrait', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQUgfzVXgn3xJIHtlwUFuck5f4-KvCaaH24Wx1Zs3cM8Or_C78zYYJOffuO7iDXZZ9ItiWXyaB4QDZ3lhkzqyOei0KOG92ml-mQ9wW0ieBfvenNtdmryMVHCNMTlQ_7-JNxGyVe03cWPDub16Nj3kI_L7lGovkLJ35jQQC6TW1opjdS5EKtO_8Qhf_n8Sv4=w1280' },
      { category: 'Modelling', title: 'Urban portrait', src: 'https://lh3.googleusercontent.com/sitesv/AG8ngQXmp_vfx33zx48kHh4AZ8C9sT5iFXtEDj7x6iC-EBlCc91J61HZgz7IE57sg-A87Cd2pVW9htpainqZqbJGp3AeYsTNMnGap6Wc8tgiSEos36avV6Coh-42mV4sctczHuRz2oRaDZ7BK_MxfzU88nlgcIH2eIHGdPEgbM3Qc7uhs5wZKiG7qDQNA9Lv=w1280' }
    ];

    let activeFilter = 'All';
    let visibleCount = 9;
    let visibleItems = [];
    const loadMore = $('#loadMore');
    const filterButtons = $$('.filter-button');
    const lightbox = $('[data-lightbox]');
    const lightboxImage = $('[data-lightbox-image]');
    const lightboxCaption = $('[data-lightbox-caption]');
    let currentIndex = 0;
    let lastFocused;

    const getFiltered = () => items.filter(item => activeFilter === 'All' || item.category === activeFilter);

    const renderGallery = () => {
      const filtered = getFiltered();
      visibleItems = filtered.slice(0, visibleCount);
      gallery.innerHTML = visibleItems.map((item, index) => `
        <button class="gallery-item" type="button" data-gallery-index="${index}" aria-label="Open ${item.category}: ${item.title}">
          <img src="${item.src}" alt="${item.title} by Big Boss Photography" loading="lazy" decoding="async">
          <span><small>${item.category}</small><strong>${item.title}</strong></span>
        </button>`).join('');
      loadMore.hidden = visibleCount >= filtered.length;
      $$('.gallery-item', gallery).forEach(button => button.addEventListener('click', () => openLightbox(Number(button.dataset.galleryIndex), button)));
    };

    const setFilter = category => {
      activeFilter = category;
      visibleCount = 9;
      filterButtons.forEach(button => button.classList.toggle('is-active', button.dataset.filter === category));
      renderGallery();
    };

    filterButtons.forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
    loadMore.addEventListener('click', () => { visibleCount += 6; renderGallery(); });

    const updateLightbox = () => {
      const item = visibleItems[currentIndex];
      if (!item) return;
      lightboxImage.src = item.src;
      lightboxImage.alt = `${item.title} by Big Boss Photography`;
      lightboxCaption.textContent = `${item.category} · ${item.title}`;
    };
    const openLightbox = (index, trigger) => {
      currentIndex = index;
      lastFocused = trigger;
      updateLightbox();
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      body.classList.add('lightbox-open');
      $('[data-lightbox-close]')?.focus();
    };
    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      body.classList.remove('lightbox-open');
      lightboxImage.src = '';
      lastFocused?.focus();
    };
    const moveLightbox = direction => {
      currentIndex = (currentIndex + direction + visibleItems.length) % visibleItems.length;
      updateLightbox();
    };
    $('[data-lightbox-close]')?.addEventListener('click', closeLightbox);
    $('[data-lightbox-prev]')?.addEventListener('click', () => moveLightbox(-1));
    $('[data-lightbox-next]')?.addEventListener('click', () => moveLightbox(1));
    lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', event => {
      if (!lightbox?.classList.contains('is-open')) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') moveLightbox(-1);
      if (event.key === 'ArrowRight') moveLightbox(1);
    });

    const requestedCategory = new URLSearchParams(window.location.search).get('category');
    const validCategory = items.some(item => item.category === requestedCategory) ? requestedCategory : 'All';
    setFilter(validCategory);
  }

  const bookingForm = $('#bookingForm');
  if (bookingForm) {
    const dateInput = $('input[type="date"]', bookingForm);
    if (dateInput) {
      const today = new Date();
      today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
      dateInput.min = today.toISOString().slice(0, 10);
    }

    bookingForm.addEventListener('submit', event => {
      event.preventDefault();
      const error = $('[data-form-error]', bookingForm);
      const requiredFields = $$('[required]', bookingForm);
      let firstInvalid;
      requiredFields.forEach(field => {
        const invalid = !field.value.trim();
        field.setAttribute('aria-invalid', String(invalid));
        if (invalid && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        error.textContent = 'Please complete all required fields.';
        firstInvalid.focus();
        return;
      }
      error.textContent = '';
      const data = new FormData(bookingForm);
      const lines = [
        'Hello Big Boss Photography, I would like to enquire about a session.',
        '',
        `Name: ${data.get('name')}`,
        `Phone: ${data.get('phone')}`,
        `Service: ${data.get('service')}`,
        `Date: ${data.get('date') || 'Not confirmed'}`,
        `Location: ${data.get('location') || 'Not confirmed'}`,
        '',
        `Details: ${data.get('message')}`
      ];
      const whatsappUrl = `https://wa.me/919725066898?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(whatsappUrl, '_blank', 'noopener');
    });
    $$('input, select, textarea', bookingForm).forEach(field => field.addEventListener('input', () => field.removeAttribute('aria-invalid')));
  }
})();
