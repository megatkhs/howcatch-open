<template>
  <div v-show="flag" class="game--pause">
    <img class="game--button-retry" src="../assets/game--button-retry.png" alt="" @click="retryGame">
    <img class="game--button-play" src="../assets/game--button-play.png" alt="" @click="closePause">
    <img class="game--button-exit" src="../assets/game--button-exit.png" alt="" @click="pageBack">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

@Component
export default class GameScreenPause extends Vue {
  // props
  @Prop() flag!: boolean;

  // emit
  @Emit('close')
  public closePause():void {}

  // methods
  public retryGame(): void {
    this.closePause();
  }

  public pageBack(): void {
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

    > img {
      height: 25%;
      position: absolute;
      cursor: pointer;
      transform: translate(-50%, -50%);
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