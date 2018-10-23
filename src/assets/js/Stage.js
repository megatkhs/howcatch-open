import {Engine, Render, Runner, Body, Bodies, Events, World} from 'matter-js';
import $ from 'jquery';
const Game = require('@/assets/js/Game.js');

export default class Stage {

  stageList = [
    // stage 01
    () => {
      this.$refs.canvasBackground.src = '../img/game--01-background.png';
      this.Game.createRender();
      this.Game.createWalls();

      const bucho = Bodies.rectangle(855, 736, 531, 270, {
        label: '部長',
        isStatic: true,
        render: {
          sprite: {
            texture: '../img/game--01-bucho.png',
            yOffset: 0.25,
          },
        },
      });

      const desk = Bodies.rectangle(1851, 736, 178, 270, {
        label: '机',
        isStatic: true,
        render: {
          sprite: {
            texture: '../img/game--01-desk.png',
            yOffset: 0.06,
          },
        },
      });

      World.add(this.Game.engine.world, [bucho, desk]);

      this.Game.createCrane('01');

      const cupBody = Bodies.rectangle(1840, 567, 42, 57, {
        isStatic: true,
        render: {
          fillStyle: 'transparent'
        }
      });
      const cupBottom = Bodies.rectangle(1840, 592, 20, 10, {
        isStatic: true,
        render: {
          fillStyle: 'transparent'
        }
      });

      const cup_kari = Body.create({
        parts: [cupBody, cupBottom],
        isStatic: true,
        label: '湯呑',
        render: {
          sprite: {
            texture: '../img/game--01-tea.png',
          },
        },
      });

      const cup = Body.create({
        parts: [cupBody, cupBottom, cup_kari],
        label: '湯呑',
      });

      World.add(this.Game.engine.world, [cup]);

      this.Game.goalSenceActive(bucho ,cupBottom);

      this.Game.start();
    },
    // stage 02
    () => {
      this.$refs.canvasBackground.src = '../img/game--01-background.png';
      this.Game.createRender();
      this.Game.createWalls();

      this.Game.createCrane();

      const bucho_head = Bodies.circle(1200, 370, 30, {
        render: {
          fillStyle: 'transparent'
        }
      });

      const bucho_neck = Bodies.rectangle(1200, 420, 30, 40, {
        render: {
          fillStyle: 'transparent'
        }
      });

      const bucho_body = Bodies.rectangle(1200, 670, 100, 470, {
        isSensor: true,
        render: {
          fillStyle: 'transparent'
        }
      });

      const bucho_kari = Body.create({
        parts: [bucho_head, bucho_neck, bucho_body],
        isStatic: true,
        label: '部長',
        render: {
          sprite: {
            texture: '../img/game--02-bucho.png',
            xOffset: 0.08,
          },
        },
      });

      const bucho = Body.create({
        isStatic: true,
        parts: [bucho_head, bucho_neck, bucho_body, bucho_kari]
      });

      const buka = Bodies.rectangle(900, 700, 100, 550, {
        isStatic: true,
        isSensor: true,
        render: {
          sprite: {
            texture: '../img/game--02-ol.png',
            xOffset: 0.08,
          },
        },
      });

      const wig = Bodies.rectangle(1400, 700, 40, 20, {
        frictionAir: 0.1,
        render: {
          sprite: {
            texture: '../img/game--02-wig.png',
            yOffset: -0.3,
          },
        },
      });

      World.add(this.Game.engine.world, [bucho, wig, buka]);

      this.Game.goalSenceActive(bucho_head ,wig);

      this.Game.start();
    },
    // stage 03
    () => {
      this.$refs.canvasBackground.src = '../img/game--01-background.png';
      this.Game.createRender();
      this.Game.createWalls();

      const bucho = Bodies.rectangle(900, 550, 100, 550, {
        isStatic: true,
        isSensor: true,
        render: {
          sprite: {
            texture: '../img/game--03-bucho.png',
          },
        },
      });

      World.add(this.Game.engine.world, [bucho]);
      this.Game.createCrane();

      const bomb = Bodies.circle(900, 800, 50, {
        render: {
          sprite: {
            texture: '../img/game--03-bomb.png',
            xScale: 1.2,
            yScale: 1.2,
            xOffset: -0.1,
            yOffset: 0.2,
          },
        },
      });

      const aquariumWallL = Bodies.rectangle(1400, 740, 10, 260, {
        isStatic: true,
        render: {
          fillStyle: 'transparent'
        }
      });

      const aquariumWallR = Bodies.rectangle(1750, 740, 10, 260, {
        isStatic: true,
        render: {
          fillStyle: 'transparent'
        }
      });

      const aquariumA = Body.create({
        parts: [aquariumWallL, aquariumWallR],
        isStatic: true,
        isSensor: true,
        render: {
          sprite: {
            texture: '../img/game--03-aquarium-after.png',
          },
        },
      });

      const aquariumAfter = Body.create({
        parts: [aquariumWallL, aquariumWallR, aquariumA],
        isStatic: true,
      });

      const aquariumBefore = Bodies.rectangle(1560, 755, 350, 260, {
        isStatic: true,
        isSensor: true,
        render: {
          sprite: {
            texture: '../img/game--03-aquarium-before.png',
          },
        },
      });

      World.add(this.Game.engine.world, [aquariumAfter, bomb, aquariumBefore]);

      this.Game.goalSenceActive(bomb ,aquariumBefore);

      this.Game.start();
    },
    // stage 04
    () => {
      this.$refs.canvasBackground.src = '../img/game--01-background.png';
      this.Game.createRender();
      this.Game.createWalls();

      this.Game.createCrane();

      this.Game.start();
    },
    // stage 05
    () => {
      this.$refs.canvasBackground.src = '../img/game--05-background.png';
      this.Game.createRender();
      this.Game.createWalls();

      this.Game.createCrane();

      this.Game.start();
    },
    // stage 06
    () => {
      this.$refs.canvasBackground.src = '../img/game--06-background.png';
      this.Game.createRender();
      this.Game.createWalls();

      this.Game.createCrane();

      this.Game.start();
    },
    // stage 07
    () => {
      this.$refs.canvasBackground.src = '../img/game--07-background.png';
      this.Game.createRender();
      this.Game.createWalls();

      this.Game.createCrane();

      this.Game.start();
    },
    // stage 08
    () => {
      this.$refs.canvasBackground.src = '../img/game--08-background.png';
      this.Game.createRender();
      this.Game.createWalls();

      this.Game.createCrane();

      this.Game.start();
    },
  ];
  constructor(Vue, savedata) {
    this.$refs = Vue.$refs;
    this.Game = new Game.default(Vue, savedata);
    this.stageId = savedata.stage_id;

    this.gameStart();
  }

  gameStart() {
    this.stageList[this.stageId - 1]();
  }
}
