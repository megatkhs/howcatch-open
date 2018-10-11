<template>
  <div class="character">
    <character-select-slider :dataset="characterList" @changePageIndex="setPageIndex"/>
    
    <page-back-button class="page-back"/>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import VueRouter from 'vue-router';
import CharacterSelectSlider from '@/components/CharacterSelectSlider.vue';
import PageBackButton from '@/components/PageBackButton.vue';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
]);

@Component({
  components: {
    CharacterSelectSlider,
    PageBackButton,
  },
})
export default class CharacterSelect extends Vue {
  // datas
  public pageIndex: number = 0;

  // computed
  get characterList(): object {
    return this.$store.state.characters;
  }

  // methods
  public setPageIndex(newIndex: number) {
    this.pageIndex = newIndex;
  }

  // emit
  @Emit('open')
  public openNotice(message: string, value: string, callback: any): void {}

  // router
  public beforeRouteEnter(to: any, from: any, next: any) {
    if (from.name === 'title' || from.name === 'stage') {
      next();
    } else {
      next('/');
    }
  }

  public beforeRouteLeave(to: any, from: any, next: any) {
    this.$store.commit('setCharacterCurrentId', this.$data.pageIndex);
    next();
  }
}
</script>

<style lang="scss">
.character {
  position: relative;
  width: 100%;

  .page-back {
    position: absolute;
    top: 0;
    left: 2rem;
    width: 25%;
  }
}

.title-to-character {
  &-enter {
    opacity: 0;
    transform: scale(.9);

    &-active {
      transition: 800ms;
    }
  }
}

.character-to-stage {
  &-leave {
    &-to {
      opacity: 0;
      transform: scale(1.2)
    }

    &-active {
      transition: 600ms;
    }
  }
}

.stage-to-character {
  &-enter {
    opacity: 0;
    transform: scale(1.2);

    &-active {
      transition: 600ms;
    }
  }
}

.back-to-title {
  &-leave {
    &-to {
      opacity: 0;
      transform: scale(.9);
    }

    &-active {
      transition: 500ms;
    }
  }
}
</style>