<template>
  <div @click="backPage">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AlartModal extends Vue {
  // methods
  public backPage() {
    this.$router.go(-1);
  }
}
</script>

<style lang="scss" scoped>
  div {
    cursor: pointer;
  }
</style>