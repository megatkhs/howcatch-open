import {Engine, Render, Runner, Body, Bodies, Events, World} from 'matter-js';
import $ from 'jquery';
import anime from 'animejs';

export default class Game {
  constructor(Vue) {
    this.Vue = Vue;
    this.$refs = Vue.$refs;
    this.target = Vue.$refs.canvasArea;
    this.engine = Engine.create();
    this.World = World;
    this.Bodies = Bodies;
    this.status = 'initializing';
    this.holdingStatus = false;
    this.timer = false;
    this.armAnimeCount = 0;
  }

  createRender(background) {
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

  createCrane(num) {
    const pole = Bodies.rectangle(200, -450, 20, 1000, {
      label: 'ポール',
      render: {
        sprite: {
          texture: `../img/crane--${num}-pole.png`,
          yScale: 42,
        },
      },
    });

    const joint = Bodies.rectangle(200, 65.5, 76, 71, {
      label: 'ジョイント',
      render: {
        sprite: {
          texture: `../img/crane--${num}-joint.png`,
        },
      },
    });

    this.head = Bodies.circle(200, 130, 80, {
      label: 'ヘッド',
      render: {
        sprite: {
          texture: `../img/crane--${num}-head.png`,
          yOffset: -0.22,
        },
      },
    });

    const armL_1 = Bodies.rectangle(59, 238, 20, 116, {render: {fillStyle: 'transparent'}});
    const armL_2 = Bodies.rectangle(107, 190, 116, 20, {render: {fillStyle: 'transparent'}});
    this.armL = Body.create({
      parts: [armL_1, armL_2],
      label: '左腕',
      isStatic: true,
      isSensor: true,
      render: {
        sprite: {
          texture: `../img/crane--${num}-arm-l.png`,
        },
      },
    });

    const armR_1 = Bodies.rectangle(341, 238, 20, 116, {render: {fillStyle: 'transparent'}});
    const armR_2 = Bodies.rectangle(293, 190, 116, 20, {render: {fillStyle: 'transparent'}});
    this.armR = Body.create({
      parts: [armR_1, armR_2],
      label: '左腕',
      isStatic: true,
      isSensor: true,
      render: {
        sprite: {
          texture: `../img/crane--${num}-arm-r.png`,
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

  craneHolding() {
    if (this.status === 'moveD') {
      this.status = 'moveH';
      this.anime.pause();
      Events.on(this.engine, 'beforeUpdate', () => {
        if (this.armAnimeCount < 11) {
          Body.rotate(this.armL, -.1);
          Body.setPosition(this.armL, { x: this.armL.position.x + 3, y: this.armL.position.y + 6});
          Body.rotate(this.armR, .1);
          Body.setPosition(this.armR, { x: this.armR.position.x - 3, y: this.armR.position.y + 6});
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
    if (this.holdingStatus) {
      Events.on(this.engine, 'beforeUpdate', () => {
        if (this.armAnimeCount > 0) {
          Body.rotate(this.armL, .1);
          Body.setPosition(this.armL, { x: this.armL.position.x - 3, y: this.armL.position.y - 6});
          Body.rotate(this.armR, -.1);
          Body.setPosition(this.armR, { x: this.armR.position.x + 3, y: this.armR.position.y - 6});
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

      pairs.forEach((v) => {
        if (v.bodyA === BodyA && v.bodyB === BodyB) {
          this.clear();
        } else if (v.bodyA === BodyB && v.bodyB === BodyA) {
          this.clear();
        }

        if (v.bodyA === this.head || v.bodyB === this.head) {
          this.craneHolding();
        }

        if (v.bodyA === this.armL || v.bodyB === this.armL) {
          this.craneHolding();
        }

        if (v.bodyA === this.armR || v.bodyB === this.armR) {
          this.craneHolding();
        }
      });
    });
  }

  start() {
    this.setEventListener();
    Engine.run(this.engine);
    Render.run(this.render);

    this.status = 'wait';
  }

  end() {
    Engine.clear(this.engine);
    Render.stop(this.render);
  }

  clear() {
    this.end();
    const dbName = this.Vue.$store.state.dbName;
    let openReq;
    let db;
    let tx;
    let objStore;

    async function datasave() {
      return new Promise((resolve) => {
        openReq = indexedDB.open(dbName);

        openReq.onsuccess = (event) => {
          resolve(event);
        };
      });
    }

    datasave()
      .then((event) => {
        db = event.target.result;
        tx = db.transaction('SaveData', 'readwrite');
        objStore = tx.objectStore('SaveData');
        objStore.put({stageId: Number(this.Vue.$route.params.id), status: 1});
        return null;
      }).then(() => {
        this.Vue.$store.commit('saveload');
      }).then(() => {
        this.Vue.$router.push({name: 'clear', params: {id: this.Vue.$route.params.id}});
      });
  }
}