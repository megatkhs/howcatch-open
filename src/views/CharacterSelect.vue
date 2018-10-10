<template>
  <div class="character">
    <character-select-slider :dataset="characterList" @changePageIndex="setPageIndex"/>
    
    <page-back-button class="page-back"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueRouter from 'vue-router';
import CharacterSelectSlider from '@/components/CharacterSelectSlider.vue';
import PageBackButton from '@/components/PageBackButton.vue';

@Component({
  components: {
    CharacterSelectSlider,
    PageBackButton,
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'title' || from.name === 'stage') {
      next();
    } else {
      next('/');
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('setCharacterCurrentId', this.$data.pageIndex);
    next();
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
}
</script>

<style lang="scss">
.character {
  position: relative;

  .page-back {
    position: absolute;
    top: 0;
    left: 2rem;
    width: 25%;
  }
}
</style>