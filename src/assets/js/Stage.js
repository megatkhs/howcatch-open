import {Engine, Render, Runner, Body, Bodies, Events, World} from 'matter-js';
import anime from 'animejs';
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

      const bomb = Bodies.circle(500, 800, 50, {
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

      const toiletWallL = Bodies.rectangle(400, 620, 10, 500, {
        isStatic: true,
      });

      const toiletWallR = Bodies.rectangle(780, 620, 10, 500, {
        isStatic: true,
      });

      const toiletWalls = Body.create({
        parts: [toiletWallL, toiletWallR],
        isStatic: true,
        isSensor: true,
        render: {
          sprite: {
            texture: '../img/game--04-bucho.png',
            yOffset: 0.1
          }
        }
      });

      const toiletRoom = Body.create({
        parts: [toiletWallL, toiletWallR ,toiletWalls],
        isStatic: true
      })

      World.add(this.Game.engine.world, [toiletRoom]);
      this.Game.createCrane();

      const rolls = [];

      // トイレットペーパーのサイズ
      const width = 72;
      const height = 67;

      let target;

      for(let i = 5; i > 0; i--) {
        for (let j = 0; j < i; j ++) {
          const paper = Bodies.rectangle(1300 + width * (5 - i) * 0.5 + width * j, 450 + height * i + height / 2,
            72, 67, {
              render: {
                sprite: {
                  texture: (i === 4 && j === 3) ? '../img/game--04-paper-pink.png' : '../img/game--04-paper-white.png',
                }
              }
            });
          rolls.push(paper);
          if (i === 4 && j === 3) {
            target = paper;
          }
        }
      }

      console.log(target)

      World.add(this.Game.engine.world, rolls);

      this.Game.goalSenceActive(toiletWalls ,target);

      this.Game.start();
    },
    // stage 05
    () => {
      this.$refs.canvasBackground.src = '../img/game--05-background.png';
      this.Game.createRender();
      this.Game.createWalls();

      const drawer = Bodies.rectangle(1500, 700, 400, 250, {
        isStatic: true,
        render: {
          sprite: {
            texture: '../img/game--05-drawer.png',
            xScale: 2,
            yScale: 2,
            yOffset: -.1
          }
        }
      });

      const girl = Bodies.rectangle(1000, 780, 100, 200, {
        isStatic: true,
        isSensor: true,
        render: {
          sprite: {
            texture: '../img/game--05-friend.png',
            xScale: 2,
            yScale: 2,
            yOffset: .1
          }
        }
      });

      World.add(this.Game.engine.world, [girl, drawer]);

      this.Game.createCrane();

      const bearHead = Bodies.circle(1600, 500, 50, {
        render: {
          fillStyle: 'transparent'
        }
      });

      const bearBody = Bodies.circle(1600, 600, 40, {
        isSensor: true,
        render: {
          fillStyle: 'transparent'
        }
      });

      const bearFoot = Bodies.rectangle(1600, 620, 80, 40, {
        isSensor: true,
        render: {
          fillStyle: 'transparent'
        }
      });

      const bear = Body.create({
        parts: [bearHead, bearBody, bearFoot],
        render: {
          sprite: {
            texture: '../img/game--05-doll.png',
            xScale: 1.5,
            yScale: 1.5,
            yOffset: -.1
          }
        }
      });

      const doll = Body.create({
        parts: [bearHead, bearBody, bearFoot, bear]
      });

      World.add(this.Game.engine.world, [doll]);

      this.Game.goalSenceActive(girl ,bear);

      this.Game.start();
    },
    // stage 06
    () => {
      this.$refs.canvasBackground.src = '../img/game--06-background.png';
      this.Game.createRender();
      this.Game.createWalls();
      
      const cageWallL = Bodies.rectangle(1450, 740, 10, 260, {
        isStatic: true,
        render: {
          fillStyle: 'transparent'
        }
      });

      const cageWallR = Bodies.rectangle(1700, 740, 10, 260, {
        isStatic: true,
        render: {
          fillStyle: 'transparent'
        }
      });

      const cageA = Body.create({
        parts: [cageWallL, cageWallR],
        isStatic: true,
        isSensor: true,
        render: {
          sprite: {
            texture: '../img/game--06-cage-after.png',
            xScale: 1.5,
            yScale: 1.5,
          },
        },
      });

      const cageAfter = Body.create({
        parts: [cageWallL, cageWallR, cageA],
        isStatic: true,
      });

      const girl = Bodies.rectangle(500, 780, 100, 200, {
        isStatic: true,
        isSensor: true,
        render: {
          sprite: {
            texture: '../img/game--06-friend.png',
            xScale: 2,
            yScale: 2,
            yOffset: .1
          }
        }
      });

      World.add(this.Game.engine.world, [cageAfter, girl]);

      this.Game.createCrane();

      const dog = Bodies.rectangle(800, 830, 80, 80, {
        // isStatic: true,
        render: {
          sprite: {
            texture: '../img/game--06-dog.png',
            xScale: 2,
            yScale: 2,
          }
        }
      });

      const pos = {
        x: dog.position.x,
        y: dog.position.y,
      }

      const dogAnime = anime({
        targets: pos,
        x: 1200,
        duration: 1000,
        easing: 'easeInOutCirc',
        direction: 'alternate',
        loop: true,
        update: () => {
          Body.setPosition(dog, {x: pos.x, y: pos.y});
        },
      });

      const cageBefore = Bodies.rectangle(1575, 740, 350, 260, {
        isStatic: true,
        isSensor: true,
        render: {
          sprite: {
            texture: '../img/game--06-cage-before.png',
            xScale: 1.5,
            yScale: 1.5,
          },
        },
      });

      World.add(this.Game.engine.world, [dog, cageBefore]);

      this.Game.goalSenceActive(dog, cageA, () => {
        dogAnime.pause();
      });

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
