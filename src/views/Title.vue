<template>
  <div class="title">
    <img class="window-texture" src="../assets/title--window-texture.svg" alt="">
    <div class="touch-area">
      <img class="logo" src="../assets/logo.svg" alt="ハウキャッチ">
      <img class="attention-text" src="../assets/title--attention-text.svg" alt="tap to start">
    </div>
    <button class="menu-open" @click="openMenu">
      <font-awesome-icon icon="bars"/>
    </button>
    <button class="js-push-btn">
      おるよ
    </button>
    <title-menu :flag="menuFlag" @closeMenu="closeMenu" @openAlart="openAlart" @closeAlart="closeAlart"/>
    <alart-modal :flag="alartFlag" :message="alartMessage" :label="alartLabel" :callback="alartCallback" @closeAlart="closeAlart"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TitleMenu from '@/components/TitleMenu.vue';
import AlartModal from '@/components/AlartModal.vue';

@Component({
  components: {
    TitleMenu,
    AlartModal,
  },
})
export default class Title extends Vue {
  // data
  public menuFlag: boolean = false;
  public alartFlag: boolean = false;
  public alartMessage: string = '';
  public alartLabel: string = '';
  public alartCallback: any = this.closeAlart;

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

  public openAlart(message: string, label: string, callback: any) {
    this.alartMessage = message;
    this.alartLabel = label;
    this.alartCallback = callback;
    this.alartFlag = true;
  }

  public closeAlart() {
    this.alartFlag = false;
  }

  public setTapToStartAction() {
    this.$el.getElementsByClassName('touch-area')[0].addEventListener('click', () => {
      this.gameStart();
    });
  }

  // mounted
  public mounted() {
  }
}
</script>

<style lang="scss">
  .title {
    position: relative;
    background-color: #c8eaff;

    .window-texture {
      position: absolute;
      top: 0;
      right: 0;
      width: 30%;
    }

    .logo {
      position: absolute;
      width: 80%;
      left: 50%;
      top: 35%;
      transform: translate(-50%, -50%);
    }

    .touch-area {
      height: 100%;
    }

    .attention-text {
      position: absolute;
      width: 30%;
      top: 75%;
      left: 50%;
      text-align: center;
      transform: translate(-50%, -50%);
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

  .js-push-btn {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }

  // route transition
  .launch-game,
  .back-to-title {
    &-enter {
      opacity: 0;
      transform: scale(3);

      .logo {
        opacity: 0;
        transform: translate(-50%, -150%) scale(1.3);
      }

      .menu-open {
        opacity: 0;
        transform: translateY(-50%);
      }

      &-active {
        transition: 2.6s, opacity 1.5s, transform 1.5s;

        .logo {
          transition: opacity 1s ease 600ms, transform 1.2s ease-out 800ms;
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

