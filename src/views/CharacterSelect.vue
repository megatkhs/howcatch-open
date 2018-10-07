<template>
  <div class="character">
    <character-select-slider/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CharacterSelectSlider from '@/components/CharacterSelectSlider.vue';

@Component({
  components: {
    CharacterSelectSlider,
  },
})
export default class CharacterSelect extends Vue {}
</script>

<style lang="scss">
</style>