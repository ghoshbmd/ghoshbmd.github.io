
(function(){
  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if(menuBtn){
    menuBtn.addEventListener('click', ()=>{
      const open = mobileMenu.classList.toggle('hidden');
      menuBtn.innerHTML = open ? '<i data-lucide="menu"></i>' : '<i data-lucide="x"></i>';
      if (window.lucide) lucide.createIcons();
    });
  }
  mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    mobileMenu.classList.add('hidden');
    menuBtn.innerHTML = '<i data-lucide="menu"></i>';
    if (window.lucide) lucide.createIcons();
  }));

  // Experience height transitions
  function setH(el, h){ el.style.height = h + 'px'; }
  function getAutoH(el){ el.style.height = 'auto'; const h = el.getBoundingClientRect().height; return h; }
  function openP(p){ const s = p.getBoundingClientRect().height; const e = getAutoH(p); setH(p, s); requestAnimationFrame(()=> setH(p, e)); }
  function closeP(p){ setH(p, p.getBoundingClientRect().height); requestAnimationFrame(()=> setH(p, 0)); }
  function toggleItem(item, force){
    const head = item.querySelector('.timeline-head');
    const panel = item.querySelector('.exp-panel');
    const open = (typeof force === 'boolean') ? force : item.getAttribute('data-open') !== 'true';
    item.setAttribute('data-open', open);
    head.setAttribute('aria-expanded', String(open));
    if(open) openP(panel); else closeP(panel);
  }
  const items = Array.from(document.querySelectorAll('.exp-item'));
  items.forEach(item=>{
    const head = item.querySelector('.timeline-head');
    const panel = item.querySelector('.exp-panel');
    panel.style.height = 0;
    head.addEventListener('click', ()=> toggleItem(item));
    head.addEventListener('keydown', (e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggleItem(item); }});
  });
  document.getElementById('expandAll')?.addEventListener('click', ()=> items.forEach(it=> toggleItem(it, true)));
  document.getElementById('collapseAll')?.addEventListener('click', ()=> items.forEach(it=> toggleItem(it, false)));

  // Scroll reveal
  const revealEls = Array.from(document.querySelectorAll('[data-animate]'));
  const reveal = el => el.classList.add('reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{ if(en.isIntersecting){ reveal(en.target); io.unobserve(en.target);} });
    }, { threshold:.15 });
    revealEls.forEach(el=> io.observe(el));
  } else { revealEls.forEach(reveal); }

  // Experience node glow when in-view
  if('IntersectionObserver' in window){
    const io2 = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{ en.target.classList.toggle('in-view', en.isIntersecting); });
    }, { threshold: .4 });
    items.forEach(it=> io2.observe(it));
  }
})();
