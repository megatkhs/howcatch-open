<template>
  <div @click="backPage">
    <img src="../assets/common--button-back.png">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PageBackButton extends Vue {
  // props
  @Prop() public path!: string;

  // methods
  public backPage() {
    this.$router.push(this.path);
  }
}
</script>

<style lang="scss" scoped>
  div {
    cursor: pointer;

    img {
      margin-top: -5%;
      width: 100%;
    }
  }
</style>