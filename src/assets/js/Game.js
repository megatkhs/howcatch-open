import {Engine, Render, Runner, Body, Bodies, Events, World} from 'matter-js';
import $ from 'jquery';
import anime from 'animejs';

export default class Game {
  constructor(Vue, savedata) {
    this.Vue = Vue;
    this.savedata = savedata;
    this.$refs = Vue.$refs;
    this.target = Vue.$refs.canvasArea;
    this.init();
  }

  init() {
    this.engine = Engine.create();
    this.World = World;
    this.runner = Runner.create();
    this.render = Runner.create();
    this.Bodies = Bodies;
    this.status = 'initializing';
    this.holdingStatus = false;
    this.timer = false;
    this.clearJudge = false;
    this.clearTimer = false;
    this.armAnimeCount = 0;
  }

  createRender() {
    this.render = Render.create({
      element: this.target,
      engine: this.engine,
      options: {
        width: 1920,
        height: 1080,
        wireframes: false,
        background: 'transparent',
        wireframeBackground: 'transparent',
      },
    });
  }

  createWalls() {
    const wallL = Bodies.rectangle(0, 540, 100, 1080, {
      label: '壁左',
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });
    const wallR = Bodies.rectangle(1920, 540, 100, 1080, {
      label: '壁右',
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });
    const floar = Bodies.rectangle(960, 980, 1920, 220, {
      label: '床',
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });

    World.add(this.engine.world, [wallL, wallR, floar]);
  }

  createCrane(custom_id) {
    const id = custom_id ? custom_id : ('00' + this.savedata.character_id).slice(-2);
    const pole = Bodies.rectangle(200, -450, 20, 1000, {
      label: 'ポール',
      render: {
        sprite: {
          texture: `../img/crane--${id}-pole.png`,
          yScale: 42,
        },
      },
    });

    const joint = Bodies.rectangle(200, 65.5, 76, 71, {
      label: 'ジョイント',
      render: {
        sprite: {
          texture: `../img/crane--${id}-joint.png`,
        },
      },
    });

    this.head = Bodies.circle(200, 150, 80, {
      label: 'ヘッド',
      render: {
        sprite: {
          texture: `../img/crane--${id}-head.png`,
          yOffset: id === '01' ? -0.1 : 0
        },
      },
    });

    const armL_1 = Bodies.rectangle(82, 238, 20, 116, {render: {fillStyle: 'transparent'}});
    const armL_2 = Bodies.rectangle(130, 190, 116, 20, {render: {fillStyle: 'transparent'}});
    this.armL = Body.create({
      parts: [armL_1, armL_2],
      label: '左腕',
      isStatic: true,
      isSensor: true,
      render: {
        sprite: {
          texture: `../img/crane--${id}-arm-l.png`,
        },
      },
    });

    const armR_1 = Bodies.rectangle(318, 238, 20, 116, {render: {fillStyle: 'transparent'}});
    const armR_2 = Bodies.rectangle(270, 190, 116, 20, {render: {fillStyle: 'transparent'}});
    this.armR = Body.create({
      parts: [armR_1, armR_2],
      label: '左腕',
      isStatic: true,
      isSensor: true,
      render: {
        sprite: {
          texture: `../img/crane--${id}-arm-r.png`,
        },
      },
    });


    const parts = [pole, joint, armL_1, armL_2, this.armL, armR_1, armR_2, this.armR, this.head];

    this.crane = Body.create({
      parts,
      label: 'クレーン',
      isStatic: true,
    });

    World.add(this.engine.world, [this.crane]);
  }

  setEventListener() {
    const $leftBtn = this.$refs.leftBtn;
    const $rightBtn = this.$refs.rightBtn;
    const $downBtn = this.$refs.downBtn;

    $($leftBtn).on('mousedown touchstart', () => {
      if (this.status === 'wait') {
        this.status = 'moveL';
        $leftBtn.style.opacity = .4;
        Events.on(this.engine, 'beforeUpdate', () => {
          Body.setPosition(this.crane, { x: this.crane.position.x - 10, y: this.crane.position.y - 0});
        });
      }
    });

    $($leftBtn).on('mouseup mouseout touchend touchcancel', () => {
      if (this.status === 'moveL') {
        this.status = 'wait';
        $leftBtn.style.opacity = 1;
        Events.off(this.engine, 'beforeUpdate');
      }
    });

    $($rightBtn).on('mousedown touchstart', () => {
      if (this.status === 'wait') {
        this.status = 'moveR';
        $rightBtn.style.opacity = .4;
        Events.on(this.engine, 'beforeUpdate', () => {
          Body.setPosition(this.crane, { x: this.crane.position.x + 10, y: this.crane.position.y - 0});
        });
      }
    });

    $($rightBtn).on('mouseup mouseout touchend touchcancel', () => {
      if (this.status === 'moveR') {
        this.status = 'wait';
        $rightBtn.style.opacity = 1;
        Events.off(this.engine, 'beforeUpdate');
      }
    });

    $($downBtn).on('mousedown touchstart', () => {
      if (this.status === 'wait') {
        if (!this.holdingStatus) {
          this.status = 'moveD';
          $downBtn.style.opacity = .4;
          const pos = {
            x: this.crane.position.x,
            y: this.crane.position.y,
          };

          this.anime = anime({
            targets: pos,
            y: 500,
            duration: 1000,
            easing: 'linear',
            autoplay: false,
            update: () => {
              Body.setPosition(this.crane, {x: pos.x, y: pos.y});
            },
            complete: () => {
              this.craneHolding();
            },
          });
          this.anime.play();
        } else {
          this.craneRelease();
        }
      }
    });

    $($downBtn).on('mouseup mouseout touchend touchcancel', () => {
      $downBtn.style.opacity = 1;
    });
  }

  deleteEventlistener() {
    const $leftBtn = this.$refs.leftBtn;
    const $rightBtn = this.$refs.rightBtn;
    const $downBtn = this.$refs.downBtn;

    $($leftBtn).off('mousedown touchstart');
    $($leftBtn).off('mouseup mouseout touchend touchcancel');
    $($rightBtn).off('mousedown touchstart');
    $($leftBtn).off('mouseup mouseout touchend touchcancel');
    $($downBtn).off('mousedown touchstart');
    $($leftBtn).off('mouseup mouseout touchend touchcancel');
  }

  craneHolding() {
    if (this.status === 'moveD') {
      this.status = 'moveH';
      this.anime.pause();
      Events.on(this.engine, 'beforeUpdate', () => {
        if (this.armAnimeCount < 11) {
          Body.rotate(this.armL, -.1);
          Body.setPosition(this.armL, { x: this.armL.position.x + 3, y: this.armL.position.y + 4});
          Body.rotate(this.armR, .1);
          Body.setPosition(this.armR, { x: this.armR.position.x - 3, y: this.armR.position.y + 4});
          this.armAnimeCount++;
        } else {
          this.holdingStatus = true;
          this.craneUp();
        }
      });
    }
  }

  craneUp(callback) {
    if (this.status === 'moveH') {
      this.status = 'moveU';

      if (this.timer !== false) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        Events.off(this.engine, 'beforeUpdate');
        this.timer = setTimeout(() => {
          this.anime.play();
          this.anime.reverse();
          this.timer = setTimeout(() => {
            // if (typeof callback === "function") callback();
            this.status = 'wait';
          }, 1000);
        }, 300);
      }, 100);
    }
  }

  craneRelease() {
    if (this.holdingStatus && this.status === 'wait') {
      this.status = 'moveRe';
      Events.on(this.engine, 'beforeUpdate', () => {
        if (this.armAnimeCount > 0) {
          Body.rotate(this.armL, .1);
          Body.setPosition(this.armL, { x: this.armL.position.x - 3, y: this.armL.position.y - 4});
          Body.rotate(this.armR, -.1);
          Body.setPosition(this.armR, { x: this.armR.position.x + 3, y: this.armR.position.y - 4});
          this.armAnimeCount--;
        } else {
          Events.off(this.engine , 'beforeUpdate');
          this.holdingStatus = false;
          this.status = 'wait';
        }
      });
    }
  }

  goalSenceActive(BodyA, BodyB) {
    Events.on(this.engine, 'collisionStart', (event) => {
      const pairs = event.pairs;

      pairs.forEach(v => {
        if (
          v.bodyA === BodyA
          && v.bodyB === BodyB
          || v.bodyA === BodyB
          && v.bodyB === BodyA
        ) {
          this.clearJudge = true;
          this.clearTimer = setTimeout(() => {
            if (this.clearJudge === true) {
              this.clear();
            }
          }, 1000);
        }

        if (
          v.bodyA === this.head
          || v.bodyB === this.head
        ) {
          setTimeout(() => {
            this.craneHolding();
          }, 100);
        }
      });
    });

    

    Events.on(this.engine, 'collisionEnd', (event) => {
      const pairs = event.pairs;

      pairs.forEach(v => {
        if (
          v.bodyA === BodyA
          && v.bodyB === BodyB
          || v.bodyA === BodyB
          && v.bodyB === BodyA
        ) {
          this.clearJudge = false;
          if (this.clearTimer !== false) {
            clearTimeout(this.clearTimer)
          }
        }
      });
  });
  }

  start() {
    Engine.run(this.engine);
    Render.run(this.render);
    this.setEventListener();
    this.startedTime = new Date();
    this.status = 'wait';
  }

  end() {
    Events.off(this.engine, 'collisionStart');
    Events.off(this.engine, 'collisionEnd');
    Render.stop(this.render);
    World.clear(this.engine.world);
    Engine.clear(this.engine);
    this.deleteEventlistener();
    $('canvas', this.target).remove();
  }

  clear() {
    this.end();
    this.endedTime = new Date();
    const db = this.Vue.$store.state.db;
    const clear_time = this.endedTime - this.startedTime;
    if (this.savedata.clear_time > clear_time || this.savedata.clear_time === 0) {
      db.savedata.update(this.savedata.id, {status: 1, clear_time});
    } else {
      db.savedata.update(this.savedata.id, {status: 1});
    }
    this.Vue.$store.commit('saveload');
    this.Vue.$router.push({name: 'clear', params: {id: this.Vue.$route.params.id}});
  }
}
