<template>
  <div v-show="flag" class="game--pause">
    <button ref="retryBtn" class="game--button-retry" @click="retryGame">
      <img src="../assets/game--button-retry.png">
    </button>
    <button ref="playBtn" class="game--button-play" @click="closePause">
      <img src="../assets/game--button-play.png">
    </button>
    <button ref="exitBtn" class="game--button-exit" @click="pageBack">
      <img src="../assets/game--button-exit.png">
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

@Component
export default class GameScreenPause extends Vue {
  // props
  @Prop() public flag!: boolean;
  @Prop() public Stage!: any;

  // emit
  @Emit('close')
  public closePause(): void {}

  @Emit('onretry')
  public retryGame(): void {
    this.Stage.Game.end();
    this.closePause();
  }

  // methods
  public pageBack(): void {
    this.Stage.Game.end();
    this.$router.go(-1);
  }
}
</script>

<style lang="scss">
  .game--pause {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);

    > button {
      height: 25%;
      background: none;
      border: none;
      position: absolute;
      cursor: pointer;
      transform: translate(-50%, -50%);

      img {
        height: 100%;
      }
    }

    .game--button {
      &-retry {
        top: 50%;
        left: 35%;
      }

      &-play {
        height: 18%;
        top: 90%;
        left: 55%;
      }

      &-exit {
        top: 50%;
        left: 70%;
      }
    }
  }
</style>