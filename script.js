(function(){
  'use strict';
  var $=function(s,c){return (c||document).querySelector(s)};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

  function ready(){$('#loader').classList.add('done');document.body.classList.add('loaded')}
  window.addEventListener('load',function(){setTimeout(ready,450)});
  setTimeout(ready,2500);

  var header=$('#header');
  function sc(){header.classList.toggle('s',window.scrollY>60)}
  window.addEventListener('scroll',sc,{passive:true});sc();

  var bg=$('#burger'),dr=$('#drawer');
  function tg(o){bg.classList.toggle('x',o);dr.classList.toggle('on',o);bg.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''}
  bg.addEventListener('click',function(){tg(!dr.classList.contains('on'))});
  $$('a',dr).forEach(function(a){a.addEventListener('click',function(){tg(false)})});

  // reveal
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  $$('.rv').forEach(function(e){io.observe(e)});

  // carrossel
  var gal=$('#gal');
  function step(d){gal.scrollBy({left:d*(gal.querySelector('figure').offsetWidth+14),behavior:'smooth'})}
  $('#gPrev').addEventListener('click',function(){step(-1)});
  $('#gNext').addEventListener('click',function(){step(1)});

  // depoimentos
  var qs=$$('#depQ blockquote'),nl=$('#depN'),qi=0,qt,bar=$('#depBar');
  qs.forEach(function(q,i){
    var nm=$('cite',q).textContent,p=nm.split(' '),ini=(p[0][0]+(p.length>1?p[p.length-1][0]:'')).toUpperCase();
    $('cite',q).setAttribute('data-i',ini);
    var li=document.createElement('li');li.textContent=ini;li.title=nm;li.addEventListener('click',function(){gq(i);rq()});nl.appendChild(li);
  });
  function gq(n){
    qi=(n+qs.length)%qs.length;
    qs.forEach(function(q,k){q.classList.toggle('on',k===qi)});
    $$('li',nl).forEach(function(l,k){l.classList.toggle('on',k===qi)});
    $('#depCur').textContent='0'+(qi+1);
    bar.classList.remove('run');void bar.offsetWidth;bar.classList.add('run');
  }
  function rq(){clearInterval(qt);qt=setInterval(function(){gq(qi+1)},7500);gq(qi)}
  $('#depPrev').addEventListener('click',function(){gq(qi-1);rq()});
  $('#depNext').addEventListener('click',function(){gq(qi+1);rq()});
  gq(0);rq();

  // formulário -> WhatsApp
  $('#form').addEventListener('submit',function(e){
    e.preventDefault();
    var f=e.target,v=function(n){return f.elements[n].value.trim()};
    if(!v('nome')){f.elements.nome.focus();return}
    var d=v('data')?v('data').split('-').reverse().join('/'):'a definir',E=encodeURIComponent;
    var m='Olá! Vim pelo site da RJ Concept.%0A%0A*Nome:* '+E(v('nome'))+'%0A*Telefone:* '+E(v('tel')||'-')+'%0A*Ocasião:* '+E(v('tipo'))+'%0A*Data:* '+E(d)+'%0A*Convidados:* '+E(v('convidados')||'a definir')+'%0A*Detalhes:* '+E(v('msg')||'-');
    window.open('https://wa.me/5573981727007?text='+m,'_blank','noopener');
  });
  $('#year').textContent=new Date().getFullYear();
})();
