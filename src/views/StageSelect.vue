<template>
  <div class="stage">
    <div class="stage--list">
      <stage-select-item
        v-for = "(stage, index) in stages"
        :key = "index"
        :stage = "stage"
        :index = "index"
        :isPlayable = "playableJudge(index)"
        :class = "{cleared: stage.status, playable: playableJudge(index)}"
      />
    </div>
    <page-back-button class="page-back">
      <font-awesome-icon icon="angle-left"/>
      もどりますお
    </page-back-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageBackButton from '@/components/PageBackButton.vue';
import StageSelectItem from '@/components/StageSelectItem.vue';

@Component({
  components: {
    PageBackButton,
    StageSelectItem,
  },
})
export default class StageSelect extends Vue {
  // computed
  get characterId(): number {
    return this.$store.state.route.params.id;
  }

  get savedata(): any {
    return this.$store.state.savedata;
  }

  get characterStages(): any {
    const characters = this.$store.state.characters;
    for (const item of characters) {
      if (item.id == this.characterId) {
        return item.stages;
      }
    }
    return {};
  }

  get stages(): any {
    const stages: any = [];
    this.characterStages.forEach((v: number) => {
      this.savedata.forEach((e: any) => {
        if (e.stageId == v) {
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
  background: #c8eaff;

  .page-back {
    position: absolute;
    top: 0;
    left: 2rem;
    width: 25%;
  }
}

.stage- {
  &-list {
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 85%;
    height: 50%;
    top: 25%;
    left: 10%;
    list-style: none;

    &::after {
      content: "";
      display: block;
      clear: both;
    }

    &-item {
      position: relative;
      box-flex: 1;
      width: 22%;
      background-color: #fff;
      border: none;
      border-radius: .6rem;

      &.playable {
        cursor: pointer;
      }

      &-title {
        position: absolute;
        width: 84%;
        height: 16%;
        line-height: 2.8rem;
        bottom: 6%;
        left: 50%;
        font-size: 1.4rem;
        color: #0af;
        border: .1rem solid #0af;
        border-radius: .3rem;
        transform: translateX(-50%);
      }

      &-time {
        display: inline-block;
        position: absolute;
        width: 100%;
        bottom: 26%;
        left: 0;
        font-size: 1.4rem;
        text-align: center;
      }

      figure {
        position: absolute;
        top : 20%;
        left: 0;
        width: 100%;
        height: 40%;
      }

      &-image {
        position: absolute;
        top: 50%;
        width: 50%;
        width: auto;
        transform: translate(-50%, -50%);
      }

      &-cleared-flag {
        position: absolute;
        width: 20%;
        left: 5%;
        top: 3%;
      }

      &:not(.playable) {
        background-color: #b3b3b3;

        .stage--list-item-title {
          background-color: #999;
          color: #fff;
          border-color: #808080;
        }
      }

      &:not(.cleared) {
        .stage--list-item-image {
          filter: brightness(0);
        }
        .stage--list-item-time {
          color: #808080;
        }
      }

      &-01 {
        .stage--list-item-image {
          height: 90%;
        }
      }

      &-02 {
        .stage--list-item-image {
          height: 100%;
        }
      }

      &-03 {
        .stage--list-item-image {
          height: 80%;
          transform: translate(-40%, -60%);
        }
      }

      &-04 {
        .stage--list-item-image {
          height: 70%;
        }
      }

      &-04 {
        .stage--list-item-image {
          height: 70%;
        }
      }

      &-05 {
        .stage--list-item-image {
          height: 100%;
        }
      }

      &-06 {
        .stage--list-item-image {
          height: 60%;
        }
      }

      &-07 {
        .stage--list-item-image {
          height: 90%;
        }
      }

      &-08 {
        .stage--list-item-image {
          height: 70%;
        }
      }
    }
  }
}
</style>