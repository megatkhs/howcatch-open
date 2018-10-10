<template>
  <div class="clear">
    <img :src="`../img/clear--${slice(this.$route.params.id)}-image.svg`" alt="">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ClearScreen extends Vue {
  // computed
  get slice() {
    return (num: number) => {
      return ('00' + num).slice(-2);
    }
  }
}
</script>

<style lang="scss">

</style>