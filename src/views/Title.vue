<template>
  <div class="title">
    <div class="touch-area" @click="gameStart">
      <img src="../assets/logo.png" alt="ハウキャッチ">
      <span class="attention-text">Tap To Start!</span>
    </div>
    <button class="menu-open" @click="openMenu">
      <font-awesome-icon icon="bars"/>
    </button>
    <title-menu :flag="menuFlag" @close="closeMenu"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TitleMenu from '@/components/TitleMenu.vue';

@Component({
  components: {
    TitleMenu,
  },
})
export default class Title extends Vue {
  // data
  public menuFlag: boolean = false;

  // methods
  public gameStart() {
    this.$router.push('/character');
  }

  public openMenu() {
    this.menuFlag = true;
  }

  public closeMenu() {
    this.menuFlag = false;
  }
}
</script>

<style lang="scss">
  .title {
    .touch-area {
      height: 100%;
    }

    .attention-text {
      animation: flashing 1s ease-out 0s infinite alternate none running;
    }

    .menu-open {
      position: fixed;
      display: block;
      top: 20px;
      left: 20px;
      padding: 5px;
      font-size: 3.2rem;
      line-height: 1;
      cursor: pointer;
      transition: 100ms;

      &:hover,
      &:focus {
        cursor: pointer;
        transform: scale(1.1);
        z-index: 1;
      }

      &:active {
        transform: scale(.9);
      }

      svg {
        pointer-events: none;
      }
    }
  }

  @keyframes flashing {
    0% {opacity: 1;}
    50% {opacity: 1;}
    100% {opacity: 0;}
  }
</style>

