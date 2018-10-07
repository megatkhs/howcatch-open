<template>
  <transition name="transition--title-menu">
    <div class="title--menu" v-if="flag">
      <div class="title--menu-overlay" @click="close"></div>
      <div class="title--menu-window">
        <ul class="title--menu-list">
          <TitleMenuItem
            className="title--menu-list-item"
            label="お問い合わせする"
            :callback="close"
          />
          <TitleMenuItem
            className="title--menu-list-item"
            label="データを削除する"
            :callback="close"
          />
        </ul>
        <div class="title--menu-close">
          <button @click="close">閉じる</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
import TitleMenuItem from '@/components/TitleMenuItem.vue';

@Component({
  components: {
    TitleMenuItem,
  },
})
export default class TitleMenu extends Vue {
  @Prop() public flag!: boolean;

  @Emit('close')
  public close() {}
}
</script>

<style lang="scss">
  .title--menu {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 100;

    &-overlay {
      flex: none;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: #000;
      opacity: .6;
    }

    &-window {
      position: relative;
      min-width: 400px;
      background-color: #fff;
      box-shadow: 0 5px 20px 5px rgba(0, 0, 0, .1);
    }

    &-list {
      list-style: none;
      padding: 20px 20px 10px;

      &-item {
        width: 100%;
        height: 50px;

        &:nth-last-of-type(n + 2) {
          margin-bottom: 10px;
        }

        button {
          display: block;
          width: 100%;
          height: 100%;
          transition: 100ms;

          &:hover,
          &:focus {
            cursor: pointer;
            transform: scale(1.05);
            z-index: 1;
          }

          &:active {
            transform: scale(.95);
          }
        }
      }
    }

    &-close {
      padding: 10px 20px;
      height: 50px;
      background-color: #3d96df;
      box-sizing: content-box;

      button {
        display: block;
        width: 100%;
        height: 100%;
        transition: 100ms;

        &:hover,
        &:focus {
          cursor: pointer;
          transform: scale(1.05);
          z-index: 1;
        }

        &:active {
          transform: scale(.95);
        }
      }
    }
  }

  /*
    animation
  */
  .transition--title-menu {
    &-enter {
      .title--menu {
        &-overlay {
          opacity: 0;
        }
        &-window {
          transform: scale(.2);
        }
      }

      &-to {
        .title--menu {
          &-overlay {
            transition: 300ms;
          }
          &-window {
            transition: 200ms;
          }
        }
      }

      &-active {
        transition: 300ms;
      }
    }

    &-leave {
      &-to {
        .title--menu {
          &-overlay {
            opacity: 0;
            transition: 300ms;
          }
          &-window {
            transform: scale(.5);
            opacity: 0;
            transition: 150ms;
          }
        }
      }

      &-active {
        transition: 300ms;
      }
    }
  }
</style>

