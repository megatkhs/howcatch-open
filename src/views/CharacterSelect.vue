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
  // data
  public characterList: object = [
    {
      id: 1,
      title: 'つかみますおの部長レスキュー',
    },
    {
      id: 2,
      title: 'つきの憂鬱なお部屋',
    },
  ];
}
</script>

<style lang="scss">
.character {
  position: relative;

  .page-back {
    position: absolute;
    top: 20px;
    left: 20px;
  }
}
</style>