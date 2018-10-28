<template>
  <div class="clear">
    <img :src="clearSrc" alt="" @error="altSrc">
    <button class="clear--enter" @click="enterStageList">ENTER</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

Component.registerHooks([
  'beforeRouteEnter',
]);

@Component
export default class ClearScreen extends Vue {
  // data
  public clearSrc: string = '';

  // computed
  get slice() {
    return (num: any) => {
      return ('00' + num).slice(-2);
    };
  }

  get selectedCharacter(): string {
    return this.$store.state.characterCurrentId + 1;
  }

  // router
  public beforeRouteEnter(to: any, from: any, next: any) {
    if (from.name === 'game') {
      next();
    } else {
      next('/');
    }
  }

  public enterStageList() {
    this.$router.push({
      name: 'stage',
      params: {
        id: this.selectedCharacter,
      },
    });
  }

  public altSrc(): void {
    this.clearSrc = `../img/clear--${this.slice(this.$route.params.id)}-image.png`;
  }

  // lifesycle: created
  public created() {
    this.clearSrc = `../img/clear--${this.slice(this.$route.params.id)}-image.svg`;
  }
}
</script>

<style lang="scss">

</style>