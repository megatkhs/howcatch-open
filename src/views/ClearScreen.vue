<template>
  <div class="clear" :class="className">
    <div class="clear--wrap">
      <img class="clear--text" src="/img/clear--text.svg" alt="clear!!">
      <ul class="clear--buttons cf">
        <li @click="retryGame">
          <img src="/img/clear--retry.svg" alt="">
        </li>
        <li @click="enterStageList">
          <img src="/img/clear--next.svg" alt="">
        </li>
      </ul>
    </div>
    <figure class="clear--image">
      <img :src="clearSrc" alt="" @error="altSrc">
    </figure>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

Component.registerHooks([
  'beforeRouteEnter',
]);

@Component
export default class ClearScreen extends Vue {
  // data
  public clearSrc: string = '';

  // computed
  get slice() {
    return (num: any) => {
      return ('00' + num).slice(-2);
    };
  }

  get selectedCharacter(): string {
    return this.$store.state.characterCurrentId + 1;
  }

  get className(): string {
    return `clear--${this.slice(this.$route.params.id)}`;
  }

  // router
  public beforeRouteEnter(to: any, from: any, next: any) {
    if (from.name === 'game') {
      next();
    } else {
      next('/');
    }
  }

  public retryGame() {
    this.$router.push({
      name: 'game',
      params: {
        id: this.$route.params.id,
      },
    });
  }

  public enterStageList() {
    this.$router.push({
      name: 'stage',
      params: {
        id: this.selectedCharacter,
      },
    });
  }

  public altSrc(): void {
    this.clearSrc = `/img/clear--${this.slice(this.$route.params.id)}-image.png`;
  }

  // lifesycle: created
  public created() {
    this.clearSrc = `/img/clear--${this.slice(this.$route.params.id)}-image.svg`;
  }
}
</script>

<style lang="scss">
  .clear- {
    &-wrap {
      position: absolute;
      top: 50%;
      left: 30%;
      width: 40%;
      transform: translate(-50%, -50%);
    }

    &-text {
      width: 100%;
      margin-bottom: 2rem;
    }

    &-buttons {
      width: 80%;
      margin: 0 auto;
      list-style: none;

      li {
        float: left;
        width: 45%;
        cursor: pointer;

        img {
          width: 100%;
        }

        &:first-of-type {
          margin-right: 10%;
        }
      }
    }

    &-image {
      img {
        position: absolute;
        right: 25%;
        bottom: 0;
      }
    }
  }
  @for $i from 1 through 4 {
    .clear--0#{$i} {
      background-color: #c8eaff;
      .clear--image {
        img {
          height: 40rem;
          transform: translate(50%, 5rem);
        }
      }
    }
  }
  @for $i from 5 through 8 {
    .clear--0#{$i} {
      background-color: #c8eaff;
      .clear--image {
        img {
          height: 35rem;
          transform: translate(50%, 1rem);
        }
      }
    }
  }

  .game-to-clear {
    &-enter {
      opacity: 0;

      .clear--wrap {
        opacity: 0;
        transform: translate(-50%, -60%);
      }
      @for $i from 1 through 4 {
        &.clear--0#{$i} {
          .clear--image {
            img {
              transform: translate(80%, 5rem);
            }
          }
        }
      }
      @for $i from 5 through 8 {
        &.clear--0#{$i} {
          .clear--image {
            img {
              transform: translate(80%, 1rem);
            }
          }
        }
      }
      .clear--image {
        img {
          opacity: 0;
        }
      }
  
      &-active {
        transition: 1050ms , opacity 600ms;

        .clear--wrap {
          transition: 600ms 450ms;
        }
  
        .clear--image {
          img {
            transition: 300ms 300ms;
          }
        }
      }
    }
  }
</style>