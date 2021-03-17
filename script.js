'use strict';

const game = document.querySelector('.game');
const areaSize = 150;

const empty = {
  top: 0,
  left: 0
};

const areas = [];
areas.push(empty);

function move(index) {
  const area = areas[index];

  area.element.style.left = `${empty.left * areaSize}px`;
  area.element.style.top = `${empty.top * areaSize}px`;

  const emptyLeft = empty.left;
  const emptyTop = empty.top;
  empty.left = area.left;
  empty.top = area.top;
  area.left = emptyLeft;
  area.top = emptyTop;
}

for (let i = 1; i <= 15; i++) {
  const area = document.createElement('div');
  area.className = 'area';
  area.innerHTML = i;

  const left = i % 4;
  const top = (i - left) / 4;

  areas.push({
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