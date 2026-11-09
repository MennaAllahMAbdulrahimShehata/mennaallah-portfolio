

const body=document.body, langToggle=document.getElementById('langToggle'), themeToggle=document.getElementById('themeToggle'), nav=document.getElementById('nav'), menuToggle=document.getElementById('menuToggle');
  function setTheme(theme){const light=theme==='light';body.dataset.theme=light?'light':'dark';themeToggle.textContent=light?'🌙':'☀️';themeToggle.setAttribute('aria-label',light?'Switch to dark mode':'Switch to light mode');themeToggle.title=light?'Switch to dark mode':'Switch to light mode';document.querySelector('meta[name="theme-color"]').content=light?'#f4f7fc':'#061020';try{localStorage.setItem('menna-portfolio-theme',body.dataset.theme)}catch(e){}}
  themeToggle.addEventListener('click',()=>setTheme(body.dataset.theme==='light'?'dark':'light'));
  let savedTheme='dark';try{savedTheme=localStorage.getItem('menna-portfolio-theme')||'dark'}catch(e){}setTheme(savedTheme);
  let lang='en';
  function setLang(next){
    lang=next; const rtl=lang==='ar'; body.dir=rtl?'rtl':'ltr'; document.documentElement.lang=lang;
    document.querySelectorAll('[data-en]').forEach(el=>{el.textContent=el.dataset[rtl?'ar':'en']||el.dataset.en});
    document.querySelectorAll('[data-en-html]').forEach(el=>{el.innerHTML=el.dataset[rtl?'arHtml':'enHtml']||el.dataset.enHtml});
    langToggle.textContent=rtl?'English':'العربية';
    document.title=rtl?'منة الله محمد | معرض رحلتي التقنية':'Menna Allah Mohamed | Tech Exploration Portfolio';
  }
  langToggle.addEventListener('click',()=>setLang(lang==='en'?'ar':'en'));
  menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');menuToggle.textContent=open?'✕':'☰';});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open navigation');menuToggle.textContent='☰';}));
  document.getElementById('year').textContent=new Date().getFullYear();
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  // Expandable project cards: the cards remain honest placeholders until real projects are ready.
  document.querySelectorAll('.project-toggle').forEach(button=>button.addEventListener('click',()=>{
    const card=button.closest('.project-card');
    const expanded=card.classList.toggle('expanded');
    button.setAttribute('aria-expanded',String(expanded));
    const rtl=document.documentElement.lang==='ar';
    button.textContent=expanded?(rtl?'إخفاء التفاصيل −':'Hide details −'):(rtl?'تفاصيل البطاقة +':'Explore card +');
  }));
  // Back-to-top button appears after scrolling.
  const backToTop=document.getElementById('backToTop');
  function updateBackToTop(){backToTop.classList.toggle('visible',window.scrollY>420);}
  window.addEventListener('scroll',updateBackToTop,{passive:true});
  backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
  // Highlight the current section in the navigation.
  const navLinks=[...nav.querySelectorAll('a[href^="#"]')];
  const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){navLinks.forEach(link=>{if(link.getAttribute('href')==='#'+entry.target.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}
  }),{rootMargin:'-25% 0px -60% 0px'});
  document.querySelectorAll('main section[id]').forEach(section=>sectionObserver.observe(section));
