'use strict';

const game = document.querySelector('.game');
const areaSize = 150;

const zero = {
  left: 0,
  top: 0,
  value: 0
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
    alert('You won!');
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
}