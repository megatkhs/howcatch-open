<template>
  <button :class="['stage--list-item', `stage--list-item-${slice(stage.stageId)}`]" @click="gameScreenEnter">
    <span class="stage--list-item-title">STAGE {{ slice(index + 1) }}</span>
    <span class="stage--list-item-time">{{ "00:00" }}</span>
    <figure>
      <img class="stage--list-item-image" :src="`../img/stage--${slice(stage.stageId)}-item.png`">
    </figure>
    <img class="stage--list-item-cleared-flag" v-if="stage.status" src="../assets/stage--cleared-flag.svg">
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class StageSelectItem extends Vue {
  // props
  @Prop() public stage!: {stageId: number};
  @Prop() public index!: number;
  @Prop() public isPlayable!: boolean;

  // computed
  get slice(): any {
    return (num: number) => {
      return ('00' + (num)).slice(-2);
    };
  }

  // method
  public srcError(event: Event) {
    const target: any = event.target;
    target.src = '../img/stage--00-item.svg';
  }

  public gameScreenEnter() {
    if (this.isPlayable) {
      const id: string = String(this.stage.stageId);
      this.$router.push({ name: 'game', params:{ id } });
    }
  }
}
</script>

<style lang="scss">

</style>