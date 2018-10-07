<template>
  <div class="character">
    <character-select-slider :dataset="characterList"/>
    <router-link class="back-page" to="/">
      <font-awesome-icon icon="angle-left"/>
      もどりますお
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueRouter from 'vue-router';
import CharacterSelectSlider from '@/components/CharacterSelectSlider.vue';

@Component({
  components: {
    CharacterSelectSlider,
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'title' || from.name === 'stageList') {
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
      id: 0,
      title: 'つかみますおの部長レスキュー',
    },
    {
      id: 1,
      title: 'つきの憂鬱なお部屋',
    },
  ];
}
</script>

<style lang="scss">
.character {
  position: relative;
  
  .back-page {
    position: absolute;
    top: 20px;
    left: 20px;
  }
}
</style>