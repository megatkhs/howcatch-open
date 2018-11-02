<template>
  <div class="title">
    <img class="window-texture" src="../assets/title--window-texture.svg" alt="">
<<<<<<< HEAD
    <div class="touch-area" v-if="!update" ref="touchArea"/>
    <img class="logo" src="../assets/logo.svg" alt="ハウキャッチ">
    <img class="attention-text" src="../assets/title--attention-text.svg" alt="tap to start" v-if="!update">
    <p class="game-version">ver.{{game_version}}</p>
    <p class="update-notice" v-if="update">ハウキャッチの更新があります！<br>タスクを終了してアプリを更新しましょう！</p>
    <button class="menu-open" @click="openMenu">
      <font-awesome-icon icon="bars"/>
    </button>
    <title-menu :flag="menuFlag" @closeMenu="closeMenu" @openAlart="openAlart" @closeAlart="closeAlart" @openNotice="openNotice"/>
    <alart-modal :flag="alartFlag" :message="alartMessage" :label="alartLabel" :callback="alartCallback" @closeAlart="closeAlart"/>
    <notice-modal :flag="noticeFlag" :message="noticeMessage" :callback="noticeCallback" @closeNotice="closeNotice"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TitleMenu from '@/components/TitleMenu.vue';
import AlartModal from '@/components/AlartModal.vue';
import NoticeModal from '@/components/NoticeModal.vue';

@Component({
  components: {
    TitleMenu,
    AlartModal,
    NoticeModal,
  },
})
export default class Title extends Vue {
<<<<<<< HEAD
  // data
  public menuFlag: boolean = false;
  public alartFlag: boolean = false;
  public alartMessage: string = '';
  public alartLabel: string = '';
  public alartCallback: any = this.closeAlart;
  public noticeFlag: boolean = false;
  public noticeMessage: string = '';
  public noticeCallback: any = this.closeNotice;

  // computed
  get game_version() {
    return this.$store.state.version;
  }

  get update() {
    return this.$store.state.updateNotice;
  }

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

  public openNotice(message: string, callback: any) {
    this.noticeMessage = message;
    this.noticeCallback = callback;
    this.noticeFlag = true;
  }

  public closeNotice() {
    this.noticeFlag = false;
  }

  public setTapToStartAction() {
    const target: any = this.$refs.touchArea;
    target.addEventListener('click', () => {
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
    font-size: 2.4rem;
    transform: translate(-50%, -50%);
    animation: flashing 1s ease-out 0s infinite alternate none running;
  }

  .game-version {
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    color: #fff;
  }
  
  .update-notice {
    position: absolute;
    width: 100%;
    top: 60%;
    left: 0;
    color: #fff;
    font-size: 1.4rem;
    line-height: 1.6;
    padding: 1rem 0;
    background-color: rgba(0, 0, 0, .6);
    // animation: flashing 3s linear 0s infinite alternate none running;
  }

  .menu-open {
    position: absolute;
    display: block;
    top: 2rem;
    left: 2rem;
    padding: .5rem;
    font-size: 3.2rem;
    line-height: 1;
    opacity: .6;
    cursor: pointer;
    transition: 100ms;
    background: none;
    border: none;

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
      transform: translate(-50%, -150%) scale(1.3);
    }

    .menu-open {
      opacity: 0;
      transform: translateY(-50%);
    }

    .attention-text {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.3);
    }

    .game-version {
      opacity: 0;
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
        transition: opacity 600ms ease 2s, transform 600ms ease 2s;
        animation: none;
      }

      .game-version {
        transition: opacity 600ms ease 2s;
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
      transition: 800ms, opacity 600ms, transform 800ms;
      
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
  0% {opacity: 1;}
  100% {opacity: 0;}
}
</style>

