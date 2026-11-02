(() => {
 const label='Studexa Reading',kind='reading';
 // Keep internal product IDs and school data; change presentation and the hub destination only.
 if(window.ONELEARN_CONFIG?.apps)window.ONELEARN_CONFIG.apps.OneHome='../Studexa/index.html';
 const apply=()=>{
  document.title=label+' · Your learning space';document.body.dataset.studexa=kind;
  const icon=document.querySelector('link[rel="icon"]');if(icon)icon.href=kind+'.svg';
  document.querySelectorAll('.ui-brand').forEach(el=>{if(el.dataset.studexa)return;el.dataset.studexa='yes';el.replaceChildren();const img=document.createElement('img');img.src=kind+'.svg';img.alt='';img.width=35;img.height=35;const text=document.createElement('span');text.textContent=label;el.append(img,text)});
  document.querySelectorAll('.ui-header,.ui-footer,.login').forEach(root=>{const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);for(const n of nodes){const t=n.textContent.replaceAll('Back to OneHome','Back to Studexa').replaceAll('OneMaths','Studexa Maths').replaceAll('OneReader','Studexa Reading').replaceAll('Part of OneLearn','Connected to OneLearn');if(t!==n.textContent)n.textContent=t}});
  document.querySelectorAll('.ui-brand-link').forEach(a=>a.setAttribute('aria-label',label+' home'));
 };
 new MutationObserver(apply).observe(document.getElementById('app'),{childList:true,subtree:true});apply();
})();