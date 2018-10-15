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

      const cupBase = Bodies.rectangle(1851, 600, 42, 57, {
        label: 'カップ',
        // isStatic: true,
        render: {
          sprite: {
            texture: '../img/game--01-tea.png',
            yOffset: 0.06,
          },
        },
      });

      World.add(this.Game.engine.world, cupBase);

      this.Game.goalSenceActive(bucho ,cupBase);

      this.Game.start();
    },
    // stage 02
    () => {
      this.$refs.canvasBackground.src = '../img/game--01-background.png';
      this.Game.createRender();
      this.Game.createWalls();

      this.Game.createCrane();

      const bucho_head = Bodies.rectangle(855, 736, 531, 270, {
        label: '部長',
        isStatic: true,
        render: {
          sprite: {
            texture: '../img/game--01-bucho.png',
            yOffset: 0.25,
          },
        },
      });

      World.add(this.Game.engine.world, [bucho_head]);

      this.Game.start();
    },
    // stage 03
    () => {
      this.$refs.canvasBackground.src = '../img/game--01-background.png';
      this.Game.createRender();
      this.Game.createWalls();

      this.Game.createCrane();

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
