<template>
  <div class="character--slider">
    <div class="character--slider-viewport">
      <ul class="character--slider-container">
        <li class="character--slider-item">
          こんにちは
        </li>
        <li class="character--slider-item">
          Hello
        </li>
        <li class="character--slider-item">
          Hello
        </li>
        <li class="character--slider-item">
          Hello
        </li>
        <li class="character--slider-item">
          Hello
        </li>
      </ul>
    </div>
    <div class="character--slider-Controller">
      <button class="prev" @click="prevSlide">こんにちは</button>
      <button class="next" @click="nextSlide">さようなら</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
const anime = require('animejs');

@Component
export default class TitleMenu extends Vue {
  // data
  public pageIndex: number = 0;
  public animation: any = false;

  // methods
  public prevSlide() {
    const container = this.$el.getElementsByClassName('character--slider-container')[0] as HTMLElement;
    const itemLength = this.$el.getElementsByClassName('character--slider-item').length;

    if (this.pageIndex !== 0) {
      this.pageIndex--;

      if (this.animation !== false) {
        this.animation.pause();
      }

      this.animation = anime({
        targets: container,
        left: [container.style.left, -(100 * this.pageIndex) + '%'],
        duration: 500,
        easing: this.pageIndex === 0 || this.pageIndex === itemLength - 1 ? 'easeOutExpo' : 'easeOutBack',
        callback: () => {
          this.animation = false;
        },
      });
    }
  }

  public nextSlide() {
    const container = this.$el.getElementsByClassName('character--slider-container')[0] as HTMLElement;
    const itemLength = this.$el.getElementsByClassName('character--slider-item').length;

    if (this.pageIndex !== itemLength - 1) {
      this.pageIndex++;

      if (this.animation !== false) {
        this.animation.pause();
      }

      this.animation = anime({
        targets: container,
        left: [container.style.left, -(100 * this.pageIndex) + '%'],
        duration: 500,
        easing: this.pageIndex === 0 || this.pageIndex === itemLength - 1 ? 'easeOutExpo' : 'easeOutBack',
        callback: () => {
          this.animation = false;
        },
      });
    }
  }

  // mounted
  public mounted() {
    // Elements
    const viewport = this.$el.getElementsByClassName('character--slider-viewport')[0] as HTMLElement;
    const container = this.$el.getElementsByClassName('character--slider-container')[0] as HTMLElement;
    const item = this.$el.getElementsByClassName('character--slider-item');
    const itemLength = item.length;

    let dragging = false;
    let value = this.pageIndex * -100;
    let mouseX = 0;
    let pointer: any;

    const setValue = () => {
      container.style.left = value + '%';
    };

    setEventListener(container, 'mousedown touchstart', (event: any) => {
      if (!dragging) {
        if (this.animation !== false) {
          this.animation.pause();
        }
        pointer = event.targetTouches ? event.targetTouches[0] : event;
        dragging = true;
        mouseX = -container.offsetLeft + pointer.pageX;
      }
    });

    setEventListener(container, 'mouseup touchend mouseleave', (event: any) => {
      if (dragging) {
        dragging = false;
        const itemWidth = item[0].clientWidth;
        const pageIndex = Math.round(-(pointer.clientX - mouseX) / itemWidth);
        if (pageIndex < 0) {
          this.pageIndex = 0;
        } else if (pageIndex > itemLength - 1) {
          this.pageIndex = itemLength - 1;
        } else {
          this.pageIndex = pageIndex;
        }

        this.animation = anime({
          targets: container,
          left: [container.style.left, -(100 * this.pageIndex) + '%'],
          duration: 500,
          easing: this.pageIndex === 0 || this.pageIndex === itemLength - 1 ? 'easeOutExpo' : 'easeOutBack',
          callback: () => {
            this.animation = false;
          },
        });
      }
    });

    setEventListener(container, 'mousemove touchmove', (event: any) => {
      if (dragging) {
        pointer = event.targetTouches ? event.targetTouches[0] : event;
        const itemWidth = item[0].clientWidth;
        const rect = viewport.getBoundingClientRect();
        value = (pointer.clientX - mouseX) / itemWidth * 100;

        if (value > 0) {
          value = 0;
        } else if (value < -(itemLength - 1) * 100) {
          value = -(itemLength - 1) * 100;
        }

        setValue();
      }
    });

    function setEventListener(target: HTMLElement | Document, eventNames: string, callback: (event: Event) => void) {
      const eventList = eventNames.split(' ');

      eventList.forEach((v) => {
        target.addEventListener(v, (event: Event) => {
          callback(event);
        });
      });
    }
  }
}
</script>

<style lang="scss">
.character--slider {
  height: 100%;
  user-select: none;

  &-viewport {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &-container {
    display: flex;
    justify-content: space-around;
    position: absolute;
    width: 500%;
    height: 100%;
    top: 0;
    left: 0;
    // border: 1px solid red;
    list-style: none;
  }

  &-item {
    flex: 1;

    @for $i from 1 through 5 {
      &:nth-of-type(#{$i}) {
        background-color: hsl($i * 10, 80%, 80%);
      }
    }
  }
}
</style>