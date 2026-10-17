(() => {
 'use strict';
 const cfg=window.INVITATION, $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const couple=`${cfg.groom} & ${cfg.bride}`, start=new Date(cfg.startsAt), end=new Date(cfg.endsAt);
 const months=['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentabr','Oktabr','Noyabr','Dekabr'];
 const localDate=new Date(start.getTime()+5*3600000), day=localDate.getUTCDate(), year=localDate.getUTCFullYear(), month=months[localDate.getUTCMonth()];
 const time=d=>new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Tashkent',hour:'2-digit',minute:'2-digit'}).format(d);
 const times=`${time(start)}–${time(end)}`, dateFull=`${day}-${month.toLowerCase()} ${year}`;
 const fill=(s,v)=>$$(s).forEach(el=>el.textContent=v);
 fill('[data-couple]',couple);fill('[data-groom]',cfg.groom);fill('[data-bride]',cfg.bride);fill('[data-times]',times);fill('[data-day]',day);fill('[data-month]',month);fill('[data-year]',year);fill('[data-date-full]',dateFull);fill('[data-address]',cfg.address);fill('[data-venue-name]',cfg.venue);
 fill('[data-weekday]',['YAKSHANBA','DUSHANBA','SESHANBA','CHORSHANBA','PAYSHANBA','JUMA','SHANBA'][localDate.getUTCDay()]);
 const shortDate=`${String(day).padStart(2,'0')}.${String(localDate.getUTCMonth()+1).padStart(2,'0')}.${year}`;
 document.title=`${couple} — ${shortDate}`;$('.top-date').textContent=shortDate;$('.venue-number').textContent=`${day}.${String(localDate.getUTCMonth()+1).padStart(2,'0')}`;
 $('.cover .eyebrow').textContent=`${day} ${month.toUpperCase()} ${year}`;$('.letter small').textContent=dateFull.toUpperCase();$('.cover-side').textContent=`${couple.toUpperCase()} — ${year}`;$('.closing>p:not(.eyebrow):not(.micro)').textContent=couple;$('.closing>.micro').textContent=`${shortDate} · ${cfg.venue.toUpperCase()} TO‘YXONASI`;
 const initials=cfg.groom[0]+'&'+cfg.bride[0];$('.brand').textContent=initials;$('.seal').textContent=initials;
 $('.names').setAttribute('aria-label',`${cfg.groom} va ${cfg.bride}`);
 $('#landmark').textContent=cfg.landmark||'';
 if(cfg.phone){$('#venue-phone').hidden=false;$('#venue-phone').textContent=cfg.phone;$('#venue-phone').href='tel:'+cfg.phone.replace(/[^+\d]/g,'');}
 const coords=`${cfg.coordinates.lat},${cfg.coordinates.lng}`;
 $('#google-map').href='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(coords);
 $('#yandex-map').href=`https://yandex.com/maps/?pt=${cfg.coordinates.lng},${cfg.coordinates.lat}&z=16&l=map`;
 if(cfg.siteUrl){$('meta[property="og:url"]').content=cfg.siteUrl;$('meta[property="og:image"]').content=new URL('assets/og.jpg',cfg.siteUrl.endsWith('/')?cfg.siteUrl:cfg.siteUrl+'/').href;}
 $('meta[property="og:title"]').content=`${couple} — To‘y taklifnomasi`;
 $('meta[property="og:description"]').content=`${dateFull} · ${times} · ${cfg.venue}, ${cfg.address}`;
 if(cfg.program.length){$('#dastur').hidden=false;cfg.program.forEach((item,i)=>{const li=document.createElement('li');li.className='reveal';const t=document.createElement('time');t.textContent=item.time;const box=document.createElement('div');const h=document.createElement('h3');h.textContent=item.title;const p=document.createElement('p');p.textContent=item.detail||'';box.append(h,p);li.append(t,box);$('#timeline').append(li);});}
 $('#family-note').textContent=cfg.parents?`Hurmat bilan, ${cfg.parents}`:'';$('#dress-note').textContent=cfg.dressCode?`Kiyinish uslubi: ${cfg.dressCode}`:'';
 if('IntersectionObserver' in window){const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}}),{threshold:.08});$$('.reveal').forEach(el=>obs.observe(el));}else{$$('.reveal').forEach(el=>el.classList.add('visible'));}
 document.documentElement.classList.add('app-ready');
 setTimeout(()=>document.documentElement.classList.add('ready'),600);
 let toastTimer;
 function toast(text){$('#toast').textContent=text;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),6500);}
 let opening=false;
 $('#open-invite').addEventListener('click',()=>{
  if(opening)return;opening=true;
  $('#open-envelope').classList.add('opened');
  $('#open-invite').disabled=true;
  setTimeout(()=>{
   $('#taklif').focus({preventScroll:true});
   $('#taklif').scrollIntoView({behavior:reduced?'auto':'smooth'});
   $('#open-invite').disabled=false;opening=false;
   setTimeout(()=>$('#open-envelope').classList.remove('opened'),600);
  },reduced?0:950);
 });
 let ticking=false;
 function progress(){ticking=false;const range=document.documentElement.scrollHeight-innerHeight;$('.reading-progress').style.width=`${range>0?scrollY/range*100:0}%`;}
 addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(progress);ticking=true;}},{passive:true});progress();
 for(const [key,path] of Object.entries(cfg.photos)){const frame=document.querySelector(`[data-photo="${key}"]`);if(!path||!frame)continue;const img=new Image();img.alt=key==='story'?'Nikoh kunidan esdalik':`${couple} — esdalik`;img.width=719;img.height=1280;img.decoding='async';img.addEventListener('load',()=>frame.querySelector('.photo-fallback')?.replaceWith(img),{once:true});img.src=path;}
 const hero=$('.hero-photo img');hero.src=cfg.photos.hero||'';hero.addEventListener('error',()=>{hero.hidden=true;$('.hero-photo').classList.add('no-photo');});
 function countdown(){const now=Date.now(),diff=Math.max(0,start-now);const v=[Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60];['days','hours','minutes','seconds'].forEach((id,i)=>$('#'+id).textContent=String(v[i]).padStart(2,'0'));$('#countdown-status').textContent=now>=end?'Biz birga nishonladik ♡':now>=start?'Bugun bizning kunimiz. Sizni kutamiz!':'Birga nishonlaydigan kunimizga qadar.';}
 countdown();setInterval(countdown,1000);
 const icsEscape=s=>s.replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\r?\n/g,'\\n');
 const utc=d=>d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
 $('#calendar').addEventListener('click',()=>{const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Wedding Invitation//UZ','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:wedding-${start.getTime()}@invitation.local`,`DTSTAMP:${utc(new Date())}`,`DTSTART:${utc(start)}`,`DTEND:${utc(end)}`,`SUMMARY:${icsEscape(couple+' — nikoh to‘yi')}`,`LOCATION:${icsEscape(cfg.venue+' to‘yxonasi, '+cfg.address)}`,`DESCRIPTION:${icsEscape('Toshkent vaqti bilan '+times)}`,`GEO:${cfg.coordinates.lat};${cfg.coordinates.lng}`,'END:VEVENT','END:VCALENDAR'];const url=URL.createObjectURL(new Blob([lines.join('\r\n')+'\r\n'],{type:'text/calendar;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='Nikoh-taklifnomasi.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);});
 async function copy(text){try{await navigator.clipboard.writeText(text);toast('Nusxalandi.');}catch{toast('Brauzer nusxalashga ruxsat bermadi.');}}
 $('#copy-address').addEventListener('click',()=>copy(`${cfg.venue} to‘yxonasi, ${cfg.address}. ${cfg.landmark}`));
 $('#share').addEventListener('click',async()=>{const url=cfg.siteUrl||location.href.split('#')[0];if(location.protocol==='file:'){toast('Ulashish saytingiz internetga joylangach ishlaydi.');return;}try{if(navigator.share)await navigator.share({title:couple,text:`Nikoh to‘yimizga taklif etamiz. ${dateFull}`,url});else await copy(url);}catch(e){if(e.name!=='AbortError')toast('Havolani manzil satridan nusxalashingiz mumkin.');}});
 $('#fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else toast('Bu qurilmada brauzer menyusi orqali to‘liq ekran rejimidan foydalaning.');}catch{toast('To‘liq ekran rejimi bu brauzerda mavjud emas.');}});
 const stage=$('.gallery-stage');let drag=false,x=0,left=0;
 $('#gallery-next').addEventListener('click',()=>stage.scrollBy({left:stage.clientWidth*.7,behavior:reduced?'auto':'smooth'}));$('#gallery-prev').addEventListener('click',()=>stage.scrollBy({left:-stage.clientWidth*.7,behavior:reduced?'auto':'smooth'}));
 stage.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;drag=true;x=e.clientX;left=stage.scrollLeft;stage.setPointerCapture(e.pointerId);});stage.addEventListener('pointermove',e=>{if(drag)stage.scrollLeft=left-(e.clientX-x);});stage.addEventListener('pointerup',()=>drag=false);stage.addEventListener('pointercancel',()=>drag=false);stage.addEventListener('dragstart',e=>e.preventDefault());
 const audio=$('#music'),button=$('#music-toggle'),dock=$('.music-dock'),caption=$('#music-state');
 audio.querySelector('source').src=cfg.music;audio.load();
 let audioState='idle',particleTimer,loadTimer,attempt=0;
 function particle(){if(reduced||document.hidden||audioState!=='playing')return;const e=document.createElement('span');e.className='particle';e.textContent=Math.random()>.5?'♡':'♪';e.style.setProperty('--drift',`${Math.random()*60-30}px`);$('.music-particles').append(e);setTimeout(()=>e.remove(),3100);}
 function player(state){audioState=state;clearInterval(particleTimer);clearTimeout(loadTimer);dock.classList.toggle('playing',state==='playing');dock.classList.toggle('loading',state==='loading');button.setAttribute('aria-pressed',String(state==='playing'));button.setAttribute('aria-busy',String(state==='loading'));button.setAttribute('aria-label',state==='playing'?'Musiqani to‘xtatish':state==='loading'?'Yuklashni bekor qilish':'Vafodorim — musiqani tinglash');caption.textContent=state==='playing'?'Vafodorim · ijroda':state==='loading'?'Yuklanmoqda…':state==='error'?'Qayta tinglash':'Musiqa · Vafodorim';if(state==='playing')particleTimer=setInterval(particle,1100);if(state==='loading')loadTimer=setTimeout(()=>{attempt++;audio.pause();player('error');toast('Musiqa sekin yuklanmoqda. Qayta bosing.');},20000);}
 audio.addEventListener('playing',()=>player('playing'));
 audio.addEventListener('pause',()=>player('idle'));
 audio.addEventListener('waiting',()=>{if(!audio.paused)player('loading');});
 audio.addEventListener('error',()=>{attempt++;player('error');toast('Musiqa yuklanmadi. Internetni tekshirib qayta bosing.');});
 button.addEventListener('click',async()=>{
  if(audioState==='loading'||!audio.paused){attempt++;audio.pause();player('idle');return;}
  const current=++attempt;player('loading');
  try{if(audio.error)audio.load();audio.volume=.7;await audio.play();}
  catch(e){if(current!==attempt)return;player('error');toast('Musiqani boshlash uchun yana bosing.');}
 });
 const wish=$('#wish'),form=$('#wish-form');let message='',submitting=false,challenge=null,formStarted=Date.now();
 try{wish.value=sessionStorage.getItem('wedding-wish')||'';}catch{}
 function updateWish(){$('#char-count').textContent=`${wish.value.length} / 1800`;wish.setCustomValidity('');try{sessionStorage.setItem('wedding-wish',wish.value);}catch{}}
 updateWish();wish.addEventListener('input',updateWish);
 async function getChallenge(){if(!cfg.apiBase)return;try{const r=await fetch(cfg.apiBase.replace(/\/$/,'')+'/api/challenge',{signal:AbortSignal.timeout(10000)});if(!r.ok)throw Error();challenge=await r.json();}catch{challenge=null;}}
 if(cfg.apiBase){$('.form-note').textContent='Tabrigingiz to‘g‘ridan-to‘g‘ri bizga yetib keladi.';form.querySelector('button[type="submit"]').firstChild.textContent='Tabrikni yuborish ';getChallenge();}
 form.addEventListener('submit',async e=>{e.preventDefault();if(submitting)return;const text=wish.value.trim();if(text.length<3){wish.setCustomValidity('Kamida 3 ta belgi yozing.');wish.reportValidity();return;}if($('#website').value)return;if(Date.now()-formStarted<3000){toast('Tilagingizni tekshirib, bir necha soniyadan keyin yuboring.');return;}
 message=`${cfg.groom} va ${cfg.bride}ga to‘y tabrigi 💐\n\n${text}`;
 if(!cfg.apiBase){const url=`https://t.me/${cfg.telegram}?text=${encodeURIComponent(message)}`;$('#telegram-retry').href=url;$('.wish-actions').hidden=false;$('#wish-status').textContent='Tabrigingiz tayyor. Telegramda yuborishni yakunlang.';window.open(url,'_blank','noopener,noreferrer');return;}
 if(!challenge){await getChallenge();toast('Ulanish tayyorlanmoqda. Bir necha soniyadan keyin yana bosing.');return;}
 submitting=true;const submit=form.querySelector('button[type="submit"]');submit.disabled=true;form.setAttribute('aria-busy','true');
 try{const r=await fetch(cfg.apiBase.replace(/\/$/,'')+'/api/wish',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text,website:$('#website').value,challenge}),signal:AbortSignal.timeout(15000)});const data=await r.json();if(!r.ok||!data.ok)throw Error(data.message||'Tabrik yuborilmadi. Qayta urinib ko‘ring.');$('#wish-status').textContent='Rahmat! Tabrigingiz bizga yetib keldi ♡';toast('Tabrigingiz yuborildi. Rahmat!');form.classList.add('sent');wish.value='';updateWish();challenge=null;getChallenge();}catch(err){toast(err.name==='TimeoutError'?'Ulanish vaqti tugadi. Matningiz saqlandi; natijani tekshirib qayta urinib ko‘ring.':err.message);}finally{submitting=false;submit.disabled=false;form.removeAttribute('aria-busy');}});
 $('#copy-wish').addEventListener('click',()=>copy(message));
})();
