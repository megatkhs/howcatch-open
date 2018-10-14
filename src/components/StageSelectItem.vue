<template>
  <button :class="['stage--list-item', `stage--list-item-${slice(stage.stage_id)}`]" @click="gameScreenEnter">
    <span class="stage--list-item-title">STAGE {{ slice(index + 1) }}</span>
    <span class="stage--list-item-time">{{ `${slice(clearTime.getMinutes())}:${slice(clearTime.getSeconds())}` }}</span>
    <figure>
      <img class="stage--list-item-image" :src="`../img/stage--${slice(stage.stage_id)}-item.png`">
    </figure>
    <img class="stage--list-item-cleared-flag" v-if="stage.status" src="../assets/stage--cleared-flag.svg">
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class StageSelectItem extends Vue {
  // props
  @Prop() public stage!: any;
  @Prop() public index!: number;
  @Prop() public isPlayable!: boolean;

  // computed
  get slice(): any {
    return (num: number) => {
      return ('00' + (num)).slice(-2);
    };
  }

  get clearTime() {
    return new Date(this.stage.clear_time);
  }

  // method
  public srcError(event: Event) {
    const target: any = event.target;
    target.src = '../img/stage--00-item.svg';
  }

  public gameScreenEnter() {
    if (this.isPlayable) {
      const id: string = String(this.stage.stage_id);
      this.$router.push({ name: 'game', params: { id } });
    }
  }
}
</script>

<style lang="scss">

</style>