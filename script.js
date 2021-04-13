'use strict';

function game(){
const game = document.querySelector('#game');
const areaSize = 150;
const zero = {
  left: 0,
  top: 0,
  value:0
};

const areas = [];
areas.push(zero);

function move(index) {
  const area = areas[index];

  const leftsub=Math.abs(zero.left-area.left);
  const topsub=Math.abs(zero.top-area.top);

  if(leftsub+topsub>1){
    return;
  }
  area.element.style.left = `${zero.left * areaSize}px`;
  area.element.style.top = `${zero.top * areaSize}px`;

  const zeroLeft = zero.left;
  const zeroTop = zero.top;
  zero.left = area.left;
  zero.top = area.top;
  area.left = zeroLeft;
  area.top = zeroTop;

  const Win=areas.every(area=>{
    console.log(area.value,area.top,area.left);
    return area.value===area.top*4+area.left;
  });
  if(Win){
    alert('You won! Your time :'+(readout));
    StartStop();
  }
}


const values =[...Array(15).keys()];
values.sort(()=>Math.random()-0.5);

for (let i = 1; i <= 15; i++) {
  const area = document.createElement('div');
  const value=values[i-1]+1;
  area.className = 'area';
  area.innerHTML = value;

  const left = i % 4;
  const top = (i - left) / 4;

  areas.push({
    value: value,
    left: left,
    top: top,
    element: area
  })

  area.style.left = `${left * areaSize}px`;
  area.style.top = `${top * areaSize}px`;

  game.append(area);
  
  area.addEventListener('click', () => {
    move(i);
  });
};
init=0;
StartStop();
}


//Timer
window.onload = () => {
  game();
}
var base = 60;
var clocktimer, dateObj, dh, dm, ds, ms;
var readout = '';
var h = 1,
  m = 1,
  tm = 1,
  s = 0,
  ts = 0,
  ms = 0,
  init = 0;


function Clearclock() {
  clearTimeout(clocktimer);
  h = 1;
  m = 1;
  tm = 1;
  s = 0;
  ts = 0;
  ms = 0;
  init = 0;
  readout = '00:00';
  document.MyForm.stopwatch.value = readout;
}

function StartTIME() {
  var cdateObj = new Date();
  var t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
  if (t > 999) {
    s++;
  }
  if (s >= (m * base)) {
    ts = 0;
    m++;
  } else {
    ts = parseInt((ms / 100) + s);
    if (ts >= base) {
      ts = ts - ((m - 1) * base);
    }
  }
  if (m > (h * base)) {
    tm = 1;
    h++;
  } else {
    tm = parseInt((ms / 100) + m);
    if (tm >= base) {
      tm = tm - ((h - 1) * base);
    }
  }
  ms = Math.round(t / 10);
  if (ms > 99) {
    ms = 0;
  }
  if (ms == 0) {
    ms = '00';
  }
  if (ms > 0 && ms <= 9) {
    ms = '0' + ms;
  }
  if (ts > 0) {
    ds = ts;
    if (ts < 10) {
      ds = '0' + ts;
    }
  } else {
    ds = '00';
  }
  dm = tm - 1;
  if (dm > 0) {
    if (dm < 10) {
      dm = '0' + dm;
    }
  } else {
    dm = '00';
  }
  readout = dm + ':' + ds;
  document.MyForm.stopwatch.value = readout;
  clocktimer = setTimeout("StartTIME()", 1);
}

function StartStop() {
  if (init == 0) {
    Clearclock();
    dateObj = new Date();
    StartTIME();
    init = 1;
  } else {
    clearTimeout(clocktimer);
    init = 0;
  }
}

//reload

press.onclick = function(){
  
  var elem= document.querySelector('#game');
  elem.remove();
  const start = document.querySelector('.player');
  var newgame = document.createElement('div');
  newgame.setAttribute('id', 'game')
  start.append(newgame);
  game();
  
};