<template>
  <div class="title">
    <div class="touch-area">
      <img class="logo" src="../assets/logo.png" alt="ハウキャッチ">
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
import VueRouter from 'vue-router';
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

  public setTapToStartAction() {
    this.$el.getElementsByClassName('touch-area')[0].addEventListener('click', () => {
      this.gameStart()
    });
  }
}
</script>

<style lang="scss">
  .title {
    position: relative;

    .logo {
      position: absolute;
      left: 50%;
      top: 35%;
      transform: translate(-50%, -50%);
    }

    .touch-area {
      height: 100%;
    }

    .attention-text {
      position: absolute;
      width: 100%;
      top: 75%;
      left: 0;
      text-align: center;
      transform: translateY(-50%);
      animation: flashing 1s ease-out 0s infinite alternate none running;
    }

    .menu-open {
      position: absolute;
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

  // route transition
  .launch-game,
  .back-to-title {
    &-enter {
      opacity: 0;
      transform: scale(3);

      .logo {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.8);
      }

      .menu-open {
        opacity: 0;
        transform: translateY(-50%);
      }

      &-active {
        transition: 2.6s, opacity 1s, transform 1s;

        .logo {
          transition: opacity 1s 600ms, transform 1s 600ms;
        }
        
        .menu-open {
          transition: opacity 600ms ease 2s, transform 600ms ease 2s;
        }

        .attention-text {
          animation: none;
          opacity: 0;
        }
      }
    }
  }

  .title-to-character {
    &-leave {
      &-to {
        opacity: 0;
        transform: scale(2);

        .menu-open {
          opacity: 0;
          transform: translate(-50%, -30%) rotateY(75deg) rotateX(-45deg) scale(.6);
        }
      }

      &-active {
        transition: 1s, opacity 600ms, transform 800ms;
        
        .menu-open {
          transition: opacity 200ms ease 100ms, transform 400ms ease;
        }

        .attention-text {
          animation: flashing .1s ease-out 0s infinite alternate none running;
        }
      }
    }
  }

  // keyframe animation
  @keyframes flashing {
    0% {opacity: 0;}
    100% {opacity: 1;}
  }
</style>

