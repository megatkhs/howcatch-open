<template>
  <div class="character">
    <character-select-slider :dataset="characterList"/>
    
    <page-back-button class="page-back">
      <font-awesome-icon icon="angle-left"/>
      もどりますお
    </page-back-button>
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
})
export default class CharacterSelect extends Vue {
  // computed
  get characterList(): object {
    return this.$store.state.characters;
  }
}
</script>

<style lang="scss">
.character {
  position: relative;

  .page-back {
    position: absolute;
    top: 2rem;
    left: 2rem;
  }
}
</style>