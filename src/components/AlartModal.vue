<template>
  <transition name="transition--alart-modal">
    <div class="alart--modal" v-if="flag">
      <div class="alart--modal-overlay" @click="closeAlart"></div>
      <div class="alart--modal-window">
        <div class="message" v-html="message"/>
        <div class="alart--modal-buttons">
          <button class="ok" @click="runCallback">{{ label }}</button>
          <button class="cancel" @click="closeAlart">キャンセル</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AlartModal extends Vue {
  // props
  @Prop() public flag!: boolean;
  @Prop() public message!: string;
  @Prop() public label!: string;
  @Prop() public callback!: any;

  // emit
  @Emit('closeAlart')
  public closeAlart() {}

  @Emit('closeAlart')
  public runCallback() {
    this.callback();
  }
}
</script>

<style lang="scss">
  .alart--modal {
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
      opacity: .8;
    }

    &-window {
      position: relative;
      min-width: 30rem;
      max-width: 100%;
      border-radius: .2rem;
      overflow: hidden;

      .message {
        padding: 4rem 3rem 2rem;
        color: #fff;
        line-height: 1.2;
        text-shadow: 0 .1rem 1rem rgba(0, 0, 0, 0.6);

        p:nth-last-of-type(n + 2) {
          margin-bottom: 1rem;
        }

        .attention {
          color: red;
          font-size: 1.4rem;
          line-height: 1.2;
        }
      }
    }

    &-buttons {
      padding: 1rem 2rem;
      height: 5rem;
      box-sizing: content-box;

      button {
        display: inline-block;
        width: calc(50% - .5rem);
        height: 100%;
        font-size: 1.4rem;
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

        &.ok {
          background-color: #c24;
          color: #fff;
          border: none;
          box-shadow: 0 .1rem .5rem .1rem rgba(0, 0, 0, .2);
          margin-right: 1rem;
        }

        &.cancel {
          background-color: #0af;
          color: #fff;
          border: none;
          box-shadow: 0 .1rem .5rem .1rem rgba(0, 0, 0, .2);
        }
      }
    }
  }

  /*
    animation
  */
  .transition--alart-modal {
    &-enter {
      .alart--modal {
        &-overlay {
          opacity: 0;
        }
        &-window {
          transform: scale(.2);
        }
      }

      &-to {
        .alart--modal {
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
        .alart--modal {
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