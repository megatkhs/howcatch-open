<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in" @after-enter="afterEnter" appear>
      <router-view class="screen" ref="screen"/>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  // data
  public transitionName: string = 'launch-game';

  // mounted
  public mounted(): void {
    const target: any = this.$el;
    const html: any = document!.documentElement;
    setSize();

    window.addEventListener('resize', () => {
      setSize();
    });

    function setSize(): void {
      if (window.innerHeight > window.innerWidth / 16 * 9) {
        target.style.width = '100vw';
        target.style.height = '56.25vw';
        html.style.fontSize = '1.5vw';
      } else {
        target.style.width = `${100 * 16 / 9}vh`;
        target.style.height = '100vh';
        html.style.fontSize = `${8 / 3}vh`;
      }
    }
  }

  public afterEnter(): void {
    if (this.transitionName === 'launch-game' || this.transitionName === 'back-to-title') {
      const screen: any = this.$refs.screen;
      screen.setTapToStartAction();
    }
  }

  // watch
  @Watch('$route')
  public onRouteChange(to: any, from: any): void {
    if (to.name === 'title') {
      this.transitionName = `back-to-title`;
    } else {
      this.transitionName = `${from.name}-to-${to.name}`;
    }
  }
}
</script>


<style lang="scss">
#app {
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  .screen {
    height: 100%;
  }
}
</style>
