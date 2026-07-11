/* maps-nav.js — ЕДИНЫЙ реестр карт events.podlevskikh.com.
   Добавить новую карту = добавить ОДНУ строку в REGISTRY ниже.
   Подключение на странице карты:
     <div id="mapsnav"></div>
     <script src="maps-nav.js?v=1"></script>
   build_site.py читает массив между маркерами REGISTRY/END (чистый JSON!)
   и генерирует кнопки на главной + sitemap. Не ломать маркеры. */
window.MAPS_REGISTRY = /*REGISTRY*/[
  {"href":"detskie-ploshchadki.html","emoji":"🛝","ru":"Детские площадки","en":"Playgrounds","hy":"Խաղահրապարակներ","color":"#2e7d32"},
  {"href":"shkoly-erevana.html","emoji":"🏫","ru":"Школы Еревана","en":"Yerevan schools","hy":"Երևանի դպրոցներ","color":"#8e44ad"},
  {"href":"detskie-sady-erevana.html","emoji":"🧸","ru":"Детские сады","en":"Kindergartens","hy":"Մանկապարտեզներ","color":"#c0693b"},
  {"href":"angliyskiy-v-erevane.html","emoji":"🇬🇧","ru":"Английский в Ереване","en":"English in Yerevan","hy":"Անգլերենը Երևանում","color":"#1a3c8f"},
  {"href":"yaponiya-v-erevane.html","emoji":"🇯🇵","ru":"Япония в Ереване","en":"Japan in Yerevan","hy":"Ճապոնիան Երևանում","color":"#d6265c"}
]/*END*/;

(function(){
  var el = document.getElementById('mapsnav');
  if(!el) return;
  var lang = window.MAPS_LANG || localStorage.getItem('maps_lang') || 'ru';
  if(['ru','en','hy'].indexOf(lang)<0) lang='ru';
  var here = location.pathname.split('/').pop() || 'index.html';
  var T = {
    ru:{maps:'Карты', back:'← События в Ереване', cur:'вы здесь'},
    en:{maps:'Maps',  back:'← Yerevan events',      cur:'you are here'},
    hy:{maps:'Քարտեզներ', back:'← Իրադարձություններ', cur:'դուք այստեղ եք'}
  }[lang];

  var css = document.createElement('style');
  css.textContent =
    '#mapsnav{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:0 0 10px;position:relative}' +
    '#mapsnav a.mn-back{font-size:11.5px;text-decoration:none;border:1px solid rgba(255,255,255,.22);border-radius:8px;padding:4px 9px;color:inherit;opacity:.85}' +
    '#mapsnav a.mn-back:hover{opacity:1}' +
    '#mapsnav .mn-btn{font:700 11.5px system-ui;cursor:pointer;border:1px solid rgba(255,255,255,.28);border-radius:8px;padding:4px 10px;background:rgba(255,255,255,.08);color:inherit}' +
    '#mapsnav .mn-btn:hover{background:rgba(255,255,255,.16)}' +
    '#mapsnav .mn-dd{display:none;position:absolute;top:30px;left:0;z-index:3000;background:#1b1b24;border:1px solid rgba(255,255,255,.25);border-radius:10px;padding:6px;min-width:230px;box-shadow:0 6px 20px rgba(0,0,0,.55)}' +
    '#mapsnav .mn-dd.open{display:block}' +
    '#mapsnav .mn-dd a{display:flex;gap:8px;align-items:center;padding:7px 9px;border-radius:7px;font-size:12.5px;color:#eee;text-decoration:none}' +
    '#mapsnav .mn-dd a:hover{background:rgba(255,255,255,.1)}' +
    '#mapsnav .mn-dd a.cur{opacity:.55;pointer-events:none}' +
    '#mapsnav .mn-dd .dot{width:9px;height:9px;border-radius:50%;flex:0 0 9px}' +
    '#mapsnav .mn-dd small{margin-left:auto;font-size:9.5px;opacity:.7}';
  document.head.appendChild(css);

  var back = document.createElement('a');
  back.className='mn-back'; back.href='index.html'; back.textContent=T.back;
  el.appendChild(back);

  var btn = document.createElement('button');
  btn.className='mn-btn'; btn.type='button';
  btn.textContent = '🗺 ' + T.maps + ' (' + window.MAPS_REGISTRY.length + ') ▾';
  el.appendChild(btn);

  var dd = document.createElement('div');
  dd.className='mn-dd';
  window.MAPS_REGISTRY.forEach(function(m){
    var a=document.createElement('a');
    a.href=m.href;
    var isCur = (m.href===here);
    if(isCur) a.className='cur';
    a.innerHTML='<span class="dot" style="background:'+m.color+'"></span>'+m.emoji+' '+
      (m[lang]||m.ru)+(isCur?' <small>'+T.cur+'</small>':'');
    dd.appendChild(a);
  });
  el.appendChild(dd);

  btn.addEventListener('click',function(e){e.stopPropagation();dd.classList.toggle('open');});
  document.addEventListener('click',function(){dd.classList.remove('open');});
})();
