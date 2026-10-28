const C='ofa-v4',F=['./','index.html','manifest.webmanifest','icon.svg'];
const EXT=u=>/^https:\/\/fonts\.(googleapis|gstatic)\.com\//.test(u);
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(f=>new Request(f,{cache:'reload'})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=e.request.url;
 if(EXT(u)){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.ok||n.type==='opaque'){const k=n.clone();caches.open(C).then(c=>c.put(e.request,k))}return n})));return}
 if(new URL(u).origin!==location.origin)return;
 e.respondWith(fetch(e.request,{cache:'no-cache'}).then(n=>{if(n.ok){const k=n.clone();caches.open(C).then(c=>c.put(e.request,k))}return n}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))))});
