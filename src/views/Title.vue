<template>
  <div class="title">
    <img class="window-texture" src="../assets/title--window-texture.svg" alt="">
    <div class="touch-area">
      <img class="logo" src="../assets/logo.svg" alt="ハウキャッチ">
      <p class="attention-text">大変お待たせしております...<br>もう間もなくです...</p>
      <p class="update-notice" v-if="update">ハウキャッチの更新があります！<br>タスクを終了してアプリを更新しましょう！</p>
    </div>
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
  // computed
  get update() {
    return this.$store.state.updateNotice;
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
    width: 100%;
    text-align: center;
    transform: translate(-50%, -50%);
    // animation: flashing 1s ease-out 0s infinite alternate none running;
  }
  
  .update-notice {
    position: absolute;
    width: 100%;
    top: 60%;
    left: 0;
    color: #fff;
    line-height: 1.6;
    padding: 1rem 0;
    background-color: rgba(0, 0, 0, .7);
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
      transform: translate(-50%, -150%) scale(1.3);
    }

    .menu-open {
      opacity: 0;
      transform: translateY(-50%);
    }

    .attention-text {
      opacity: 0;
      transform: translate(-50%, -150%) scale(1.3);
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
  0% {opacity: 0;}
  100% {opacity: 1;}
}
</style>

