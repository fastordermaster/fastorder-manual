(()=>{
 const key='fastorder-guide-large-text';
 const buttons=[...document.querySelectorAll('[data-text-size]')];
 function apply(enabled){document.documentElement.classList.toggle('large-text',enabled);for(const button of buttons){button.setAttribute('aria-pressed',String(enabled));button.textContent=enabled?'기본 글씨':'큰 글씨';button.setAttribute('aria-label',enabled?'기본 글씨로 전환':'큰 글씨 모드로 전환')}}
 let enabled=false;try{enabled=localStorage.getItem(key)==='on'}catch{}
 apply(enabled);
 for(const button of buttons)button.addEventListener('click',()=>{enabled=!document.documentElement.classList.contains('large-text');apply(enabled);try{localStorage.setItem(key,enabled?'on':'off')}catch{}});
 window.addEventListener('storage',event=>{if(event.key===key)apply(event.newValue==='on')});
})();
