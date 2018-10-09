<template>
  <div class="stage">
    {{ characterId }}
    <ul>
      <li v-for="(stage, index) in stages" :key="index" :class="{cleared: stage.status, playable: playableJudge(index)}">
        Stage {{ index + 1 }} (stageId: {{ stage.stageId }}) {{stage.status ? 'cleared' : null}}
      </li>
    </ul>
    <page-back-button class="page-back">
      <font-awesome-icon icon="angle-left"/>
      もどりますお
    </page-back-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageBackButton from '@/components/PageBackButton.vue';

@Component({
  components: {
    PageBackButton,
  },
})
export default class StageSelect extends Vue {
  // computed
  get characterId(): string {
    return this.$store.state.route.params.id;
  }

  get savedata(): any {
    return this.$store.state.savedata;
  }

  get characterStages(): any {
    const characters = this.$store.state.characters;
    for (const item of characters) {
      if (item.id === this.characterId) {
        return item.stages;
      }
    }
    return {};
  }

  get stages(): any {
    const stages: any = [];
    this.characterStages.forEach((v: number) => {
      this.savedata.forEach((e: any) => {
        if (e.stageId === v) {
          stages.push(e);
        }
      });
    });
    return stages;
  }

  get endedStage(): number {
    let ended = 0;
    this.stages.forEach((v: any, i: number) => {
      if (v.status === 1) {
        ended = i + 1;
      }
    });
    return ended;
  }

  get playableJudge(): any {
    return (index: number) => {
      return index <= this.endedStage ? true : false;
    };
  }
}
</script>

<style lang="scss">
.stage {
  position: relative;

  .page-back {
    position: absolute;
    top: 2rem;
    left: 2rem;
  }
}
</style>