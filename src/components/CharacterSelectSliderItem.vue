<template>
  <li :class="['character--slider-item', `character--slider-item-${sliceId}`]">
    <img class="character--background" :src="`./img/character--${sliceId}-background.png`" alt="" @error="srcError">
    <img class="character--image" :src="`./img/character--${sliceId}-image.png`" alt="" @error="srcError">
    <img class="character--title" :src="`./img/character--${sliceId}-title.svg`" alt="" @error="srcError">
    <p class="character--designer">character designed by {{ item.designer }}</p>
    <router-link class="character--enter" :to="{name: 'stage', params: {id: item.id}}">ENTER</router-link>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CharacterSelectSliderItem extends Vue {
  // props
  @Prop() public item!: ({id: number});
  @Prop() public index!: number;

  // computed
  get sliceId() {
    return ('00' + this.item.id).slice(-2);
  }

  // method
  public srcError(event: Event) {
    const target: any = event.target;
    const src: any = target!.src.split('/character--');
    const kind: string = src[1].split('-')[1];

    if (src[1].split('-')[0] !== '00') {
      target.src = `./img/character--00-${kind}`;
    } else {
      const type: string = kind.split('.')[0];
      target.src = `./img/character--00-${type}.svg`;
    }
  }
}
</script>

<style lang="scss">
.character--slider-item {
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
  }

  .character- {

    &-background {
      width: 110%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    &-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      background-color: #000;
      opacity: .2;
      transform: translate(-50%, -50%);
    }

    &-image {
      width: 30%;
      right: 23%;
      bottom: -10px;
      transform: translateX(50%);
    }

    &-title {
      width: 50%;
      top: 44%;
      left: 35%;
      transform: translate(-50%, -50%);
    }

    &-designer {
      position: absolute;
      left: 1.5rem;
      bottom: 1.5rem;
      padding: .6rem;
      background-color: rgba(0, 0, 0, .2);
      font-size: 1.2rem;
      color: #fff;
    }

    &-enter {
      display: block;
      position: absolute;
      left: 30%;
      bottom: 25%;
      padding: 1rem 8rem;
      background-color: #0af;
      font-size: 3.2rem;
      font-weight: bold;
      color: #ffffff;
      text-decoration: none;
      border: .4rem solid #fff;
      border-radius: .4rem;
      transform: translate(-50%, 50%);
    }
  }

  &.character--slider-item-01 {
    .character- {
      &-image {
        width: 32%;
      }
    }
  }

  &.character--slider-item-02 {
    .character- {
      &-enter {
        background-color: #ff4d5e;
      }
    }
  }
}

.title-to-character {
  &-enter {
    .character--background {
      opacity: 0;
    }


    &-active {
      transition: 10s;

      .character--background {
      }
    }
  }
}
</style>