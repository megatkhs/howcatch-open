<template>
  <div class="game">
    <div id="game--canvas-area">
      <span @click="clearedGame">クリアしちゃった</span>
    </div>
    <div class="game--controller-area">
      <img class="game--button-left" src="../assets/game--button-left.png" alt="">
      <img class="game--button-right" src="../assets/game--button-right.png" alt="">
      <img class="game--button-pause" src="../assets/game--button-pause.png" alt="" @click="openPause">
      <img class="game--button-down" src="../assets/game--button-down.png" alt="">
    </div>
    <game-screen-pause :flag="pauseFlag" @close="closePause"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameScreenPause from '@/components/GameScreenPause.vue';
import router from '@/router';

@Component({
  components: {
    GameScreenPause
  }
})
export default class GameScreen extends Vue {
  // data
  public pauseFlag: boolean = false;

  // methods
  public openPause():void {
    this.pauseFlag = true;
  }

  public closePause():void {
    this.pauseFlag = false;
  }

  public clearedGame():void {
    const dbName = this.$store.state.dbName;
    let openReq, db, tx, objStore: any;

    async function datasave() {
      return new Promise(resolve => {
        openReq = indexedDB.open(dbName);
        
        openReq.onsuccess = (event: any) => {
          resolve(event);
        }
      })
    }

    datasave()
      .then((event: any) => {
        db = event.target.result;
        tx = db.transaction('SaveData', 'readwrite');
        objStore = tx.objectStore('SaveData');
        objStore.put({stageId: Number(this.$route.params.id), status: 1});
        return null;
      }).then(something => {
        this.$store.commit('saveload');
      }).then(() => {
        this.$router.push({name: 'clear', params: {id: this.$route.params.id}});
      })
  }
}
</script>

<style lang="scss">
.game {
  position: relative;
}

.game--controller-area {
  position: absolute;
  width: 100%;
  height: 20%;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);

  > img {
    position: absolute;
    height: 75%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
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
</style>