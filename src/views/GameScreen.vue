<template>
  <div :class="['game', `game--${slice($route.params.id)}`]">
    <div ref="canvasArea" id="game--canvas-area">
      <img ref="canvasBackground" class="game--canvas-area-background" src="" alt="">
      <!-- <span @click="clearedGame">クリアしちゃった</span> -->
    </div>
    <div class="game--controller-area">
      <button ref="leftBtn" class="game--button-left">
        <img src="../assets/game--button-left.png" alt="">
      </button>
      <button ref="rightBtn" class="game--button-right">
        <img src="../assets/game--button-right.png" alt="">
      </button>
      <button ref="pauseBtn" class="game--button-pause"  @click="openPause">
        <img src="../assets/game--button-pause.png" alt="">
      </button>
      <button ref="downBtn" class="game--button-down">
        <img src="../assets/game--button-down.png" alt="">
      </button>
    </div>
    <game-screen-pause :flag="pauseFlag" :Stage="Stage" @close="closePause"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameScreenPause from '@/components/GameScreenPause.vue';
import router from '@/router';
const Stage = require('@/assets/js/Stage.js');

Component.registerHooks([
  'beforeRouteEnter',
]);

@Component({
  components: {
    GameScreenPause,
  },
})
export default class GameScreen extends Vue {
  // data
  public pauseFlag: boolean = false;
  public Stage: any = null;

  // methods
  public openPause(): void {
    this.pauseFlag = true;
  }

  public closePause(): void {
    this.pauseFlag = false;
  }

  public clearedGame(): void {
    const dbName = this.$store.state.dbName;
    let openReq;
    let db;
    let tx;
    let objStore: any;

    async function datasave() {
      return new Promise((resolve: any) => {
        openReq = indexedDB.open(dbName);

        openReq.onsuccess = (event: any) => {
          resolve(event);
        };
      });
    }

    datasave()
      .then((event: any) => {
        db = event.target.result;
        tx = db.transaction('SaveData', 'readwrite');
        objStore = tx.objectStore('SaveData');
        objStore.put({stageId: Number(this.$route.params.id), status: 1});
        return null;
      }).then(() => {
        this.$store.commit('saveload');
      }).then(() => {
        this.$router.push({name: 'clear', params: {id: this.$route.params.id}});
      });
  }

  // router
  // public beforeRouteEnter(to: any, from: any, next: any) {
  //   if (from.name === 'stage' || from.name === 'clear') {
  //     next();
  //   } else {
  //     next('/');
  //   }
  // }

  // computed
  get slice() {
    return (num: number) => {
      return ('00' + num).slice(-2);
    };
  }

  // mounted
  public mounted() {
    this.Stage = new Stage.default(this, this.$route.params.id);
  }
}
</script>

<style lang="scss">
.game {
  position: relative;
}

.game--canvas-area {
  position: relative;

  &-background {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
}

.game--controller-area {
  position: absolute;
  width: 100%;
  height: 20%;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);

  > button {
    position: absolute;
    height: 75%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    background: none;
    border: none;

    img {
      height: 100%;
    }
  }

  .game--button {
    &-left {
      left: 10%;
    }

    &-right {
      left: 30%;
    }

    &-pause {
      height: 65%;
      left: 55%;
    }

    &-down {
      left: 85%;
    }
  }
}

.stage-to-game {
  &-enter {
    opacity: 0;

    &-active {
      transition: 800ms;
    }
  }
}

.game-to-stage {
  &-leave {
    &-to {
      opacity: 0;
    }

    &-active {
      transition: 100ms;
    }
  }
}
</style>