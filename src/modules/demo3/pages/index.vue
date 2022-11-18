<template>
  <div>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      baseProfile="full"
      width="500" height="500"
    >
      <rect width="100%" height="100%" fill="skyBlue" fill-opcity="0.6"/>

      <rect x="10" y="10" rx="10" ry="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"/>

      <line x1="30" x2="30" y1="30" y2="30" stroke="orange" fill="transparent" stroke-width="5"/>

      <circle id="myCircle" cx="100" cy="100" r="50" fill="green" />

      <polyline points="380 220, 420 100, 420 230"/>

      <polygon points="50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180"/>

      <path d="M 300 300 L 400 400 H 100 v -100 L 200 200 Z" fill="transparent" stroke="red"/>

      <path d="M140 200 C 100 140, 180 160, 270 200" stroke="purple" fill="transparent"/>

      <path d="M340 380 Q 305 310 400 280" stroke="black" fill="transparent"/>

      <path d="M20 300 L 200 200
        A 30 50 0 0 1 162.55 162.45
        L 172.55 152.45
        A 30 50 -45 0 1 215.1 109.9
        L 315 10" stroke="black" fill="green" stroke-width="2" fill-opacity="0.5"/>

      <polyline points="160 280 240 330 320 300" stroke="red" stroke-width="6" stroke-opacity="0.5"
        stroke-linecap="round" fill="none" stroke-linejoin="round" stroke-dasharray="5,10"/>
    </svg>
  </div>
</template>

<style>
#myCircle{
  fill: rgb(221, 169, 169);
  fill-opacity: 0.6;
}
</style>