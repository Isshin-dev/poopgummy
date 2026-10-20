'use strict';

(() => {
  const body = document.body;
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const largeScreen = matchMedia('(min-width: 760px) and (min-height: 700px)');
  const motionToggle = document.querySelector('.motion-toggle');
  const countButtons = [...document.querySelectorAll('[data-count]')];
  const trio = document.querySelector('.gummy-trio');
  const countMessage = document.querySelector('#count-message');
  const messages = {
    1: 'One little secret smile.',
    2: 'Double the gummy, double the grin.',
    3: 'Three little reasons to smile.'
  };
  let manuallyReduced = false;
  let animationContext;
  let lenis;
  let ticker;
  let refreshHandler;

  countButtons.forEach(button => button.addEventListener('click', () => {
    const count = button.dataset.count;
    trio.dataset.count = count;
    countButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    countMessage.textContent = messages[count];
  }));
  trio.dataset.count = '3';

  const stopMotion = () => {
    if (refreshHandler && window.ScrollTrigger) ScrollTrigger.removeEventListener('refresh', refreshHandler);
    refreshHandler = undefined;
    animationContext?.revert();
    animationContext = undefined;
    if (ticker && window.gsap) gsap.ticker.remove(ticker);
    ticker = undefined;
    lenis?.destroy();
    lenis = undefined;
    body.classList.remove('has-motion');
  };

  const startMotion = () => {
    if (!window.gsap || !window.ScrollTrigger || !window.Lenis) return;
    gsap.registerPlugin(ScrollTrigger);
    body.classList.add('has-motion');
    lenis = new Lenis({ lerp: .095, smoothWheel: true, syncTouch: false, autoRaf: false });
    lenis.on('scroll', ScrollTrigger.update);
    ticker = seconds => lenis?.raf(seconds * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    refreshHandler = () => lenis?.resize();
    ScrollTrigger.addEventListener('refresh', refreshHandler);

    animationContext = gsap.context(() => {
      const hero = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
        id: 'unwrap', trigger: '.hero-stage', start: 'top top', end: () => `+=${innerHeight * 3.45}`,
        pin: true, scrub: true, invalidateOnRefresh: true
      }});
      hero.to('.hero-intro', { autoAlpha: 0, y: -85, duration: .75 }, .15)
        .to('.hero-package', { xPercent: -28, yPercent: -24, rotation: -19, scale: .8, autoAlpha: 0, duration: .95, ease: 'power2.inOut' }, .2)
        .to('.hero-halo', { scale: 2.2, autoAlpha: .25, duration: 1 }, .3)
        .to('.hero-stage', { backgroundColor: '#ff79ad', duration: .85 }, .6)
        .fromTo('.hero-gummy-a', { xPercent: -5, yPercent: -36, scale: .22, rotation: -28, autoAlpha: 0 }, { xPercent: -4, yPercent: -46, scale: 1.05, rotation: 13, autoAlpha: 1, duration: 1.1, ease: 'power2.out' }, .7)
        .fromTo('.hero-reveal', { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: .7, ease: 'power2.out' }, 1.12)
        .to({}, { duration: .9 }, 1.8)
        .to('.hero-reveal', { autoAlpha: 0, y: -55, duration: .5 }, 2.7)
        .to('.hero-stage', { backgroundColor: '#ffc5db', duration: .8 }, 2.85)
        .to('.hero-gummy-a', { xPercent: 8, yPercent: -51, scale: 2.05, rotation: -17, duration: 1.2, ease: 'power2.inOut' }, 2.8)
        .fromTo('.hero-gummy-b', { xPercent: 30, yPercent: 15, scale: .25, rotation: 28, autoAlpha: 0 }, { xPercent: 55, yPercent: 29, scale: .7, rotation: 4, autoAlpha: 1, duration: .85 }, 3.2)
        .fromTo('.hero-detail', { autoAlpha: 0, y: 65 }, { autoAlpha: 1, y: 0, duration: .75, ease: 'power2.out' }, 3.3)
        .to({}, { duration: .85 }, 4.05);
      gsap.to('.hero-progress span', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.hero-stage', start: 'top top', end: () => `+=${innerHeight * 3.45}`, scrub: true } });

      gsap.from('.section-heading h2', { yPercent: 26, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '.flavor', start: 'top 82%', end: 'top 26%', scrub: true } });
      gsap.fromTo('.flavor-photo', { clipPath: 'inset(16% 13%)' }, { clipPath: 'inset(0% 0%)', ease: 'none', scrollTrigger: { trigger: '.flavor-photo', start: 'top 91%', end: 'center 44%', scrub: true } });
      gsap.fromTo('.flavor-photo img', { scale: 1.18, yPercent: -4 }, { scale: 1, yPercent: 3, ease: 'none', scrollTrigger: { trigger: '.flavor-photo', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.from('.flavor-medallion', { rotation: -90, scale: .45, autoAlpha: 0, scrollTrigger: { trigger: '.flavor-bottom', start: 'top 85%', end: 'top 55%', scrub: true } });

      gsap.from('.shape h2', { yPercent: 22, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '.shape', start: 'top 82%', end: 'top 30%', scrub: true } });
      gsap.from('.gummy-trio', { y: 170, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '.shape-play', start: 'top 85%', end: 'top 20%', scrub: true } });
      gsap.from('.shape-controls', { y: 100, rotation: -8, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '.shape-play', start: 'top 78%', end: 'top 30%', scrub: true } });

      const pack = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
        trigger: '.pack-inner', start: 'top top', end: () => `+=${innerHeight * .85}`,
        pin: true, scrub: true, invalidateOnRefresh: true
      }});
      pack.fromTo('.pack-visual img', { y: 120, rotation: -12, scale: .78 }, { y: -26, rotation: 6, scale: 1.03, duration: 1.2, ease: 'power2.out' }, 0)
        .fromTo('.pack-sunburst', { rotation: -30, scale: .75 }, { rotation: 28, scale: 1.15, duration: 1.2 }, 0)
        .from('.pack-copy h2', { x: -90, autoAlpha: 0, duration: .55 }, .1)
        .from('.pack-stamp', { scale: .1, rotation: -90, autoAlpha: 0, duration: .6, ease: 'back.out(2)' }, .55);
      gsap.from('.outro h2', { yPercent: 25, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '.outro', start: 'top 75%', end: 'top 20%', scrub: true } });
    });
    ScrollTrigger.refresh();
  };

  const syncMotion = () => {
    stopMotion();
    const reduced = manuallyReduced || motionPreference.matches;
    body.classList.toggle('reduced-motion', reduced);
    motionToggle.setAttribute('aria-pressed', String(reduced));
    motionToggle.disabled = motionPreference.matches;
    motionToggle.querySelector('.motion-label').textContent = motionPreference.matches ? 'Reduced motion is on in your device settings' : reduced ? 'Enable motion' : 'Reduce motion';
    motionToggle.querySelector('.motion-symbol').textContent = reduced ? '▶' : 'Ⅱ';
    if (!reduced && largeScreen.matches) {
      try { startMotion(); }
      catch (error) { stopMotion(); console.error('Animation initialization failed; static page is available.', error); }
    }
  };

  const goToHash = (hash, immediate = false) => {
    let target;
    try { target = document.getElementById(decodeURIComponent(hash.slice(1))); }
    catch { return; }
    if (!target) return;
    const focus = () => { target.tabIndex = -1; target.focus({ preventScroll: true }); };
    if (lenis) lenis.scrollTo(target, { duration: .95, immediate, onComplete: focus });
    else { target.scrollIntoView({ behavior: immediate || body.classList.contains('reduced-motion') ? 'instant' : 'smooth' }); focus(); }
  };

  motionToggle.addEventListener('click', () => {
    const current = document.elementFromPoint(innerWidth * .5, innerHeight * .5)?.closest('main > section');
    manuallyReduced = !manuallyReduced;
    syncMotion();
    if (current?.id) goToHash(`#${current.id}`, true);
  });
  motionPreference.addEventListener('change', syncMotion);
  largeScreen.addEventListener('change', syncMotion);
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    if (!link.hash) return;
    event.preventDefault();
    if (location.hash !== link.hash) history.pushState(null, '', link.hash);
    goToHash(link.hash);
  }));
  addEventListener('popstate', () => {
    if (location.hash) goToHash(location.hash, true);
    else if (lenis) lenis.scrollTo(0, { immediate: true });
    else scrollTo(0, 0);
  });
  syncMotion();
  addEventListener('load', () => {
    if (body.classList.contains('has-motion')) ScrollTrigger.refresh();
    if (location.hash) goToHash(location.hash, true);
  });
})();
