<template>
  <transition name="transition--title-menu">
    <div class="title--menu" v-if="flag">
      <div class="title--menu-overlay" @click="closeMenu"></div>
      <div class="title--menu-window">
        <ul class="title--menu-list">
          <title-menu-item
            className="title--menu-list-item"
            label="ページを更新する"
            :callback="reloadPage"
          />
          <!-- <title-menu-item
            className="title--menu-list-item"
            label="お問い合わせする"
            :callback="closeMenu"
          /> -->
          <title-menu-item
            className="title--menu-list-item delete"
            label="データを削除する"
            :callback="deletePlayData"
          />
        </ul>
        <div class="title--menu-close">
          <button @click="closeMenu">閉じる</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
import TitleMenuItem from '@/components/TitleMenuItem.vue';

@Component({
  components: {
    TitleMenuItem,
  },
})
export default class TitleMenu extends Vue {
  // props
  @Prop() public flag!: boolean;

  // emit
  @Emit('closeMenu')
  public closeMenu() {}

  @Emit('openAlart')
  public openAlartModal(message: string, label: string, callback: any) {}

  @Emit('closeAlart')
  public closeAlart() {}

  @Emit('openNotice')
  public openNoticeModal(message: string, callback: any) {}

  // methods
  public reloadPage(): void {
    this.openAlartModal(
      `<p>ページを更新しますか？<br>ゲームの更新も同時に確認できます。</p><p class="attention">挙動がおかしい場合に使用してください。<br>キャッシュの更新はタスクを切って、<br>再度起動してください。</p>`,
      '更新する',
      () => {
        location.reload(true);
      },
    );
    this.closeMenu();
  }

  // methods
  public deletePlayData(): void {
    this.openAlartModal(
      `<p>本当にプレイデータを削除しますか？</p><p class="attention">失ったデータは取り戻せません。<br>ステージが表示されないなどの<br>不具合が起こった場合に使用してください。</p>`,
      '削除する',
      () => {
        this.$store.state.db.delete();

        this.openNoticeModal(`<p>消しちゃいました。</p>`, () => {
          location.reload();
        });
      },
    );
    this.closeMenu();
  }

  // computed
  get dbName(): string {
    return this.$store.state.dbName;
  }
}
</script>

<style lang="scss">
  .title--menu {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 100;

    &-overlay {
      flex: none;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: #000;
      opacity: .8;
    }

    &-window {
      position: relative;
      min-width: 30rem;
      max-width: 100%;
      padding: 0 2rem;
    }

    &-list {
      list-style: none;
      padding: 0 0 2rem;

      &-item {
        width: 100%;
        height: 5rem;

        &:nth-last-of-type(n + 2) {
          margin-bottom: 1rem;
        }

        button {
          display: block;
          width: 100%;
          height: 100%;
          font-size: 1.4rem;
          background-color: #0af;
          color: #fff;
          border: none;
          box-shadow: 0 .1rem .5rem .1rem rgba(0, 0, 0, .2);
          transition: 100ms;

          &:hover,
          &:focus {
            cursor: pointer;
            transform: scale(1.05);
            z-index: 1;
          }

          &:active {
            transform: scale(.95);
          }
        }

        &.delete {
          button {
            background-color: #cc2046;
          }
        }
      }
    }

    &-close {
      height: 5rem;
      box-sizing: content-box;

      button {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 1.4rem;
        background-color: #fafafa;
        color: #333;
        border: none;
        box-shadow: 0 .1rem .5rem .1rem rgba(0, 0, 0, .2);
        transition: 100ms;

        &:hover,
        &:focus {
          cursor: pointer;
          transform: scale(1.05);
          z-index: 1;
        }

        &:active {
          transform: scale(.95);
        }
      }
    }
  }

  /*
    animation
  */
  .transition--title-menu {
    &-enter {
      .title--menu {
        &-overlay {
          opacity: 0;
        }
        &-window {
          transform: scale(.2);
        }
      }

      &-to {
        .title--menu {
          &-overlay {
            transition: 300ms;
          }
          &-window {
            transition: 200ms;
          }
        }
      }

      &-active {
        transition: 300ms;
      }
    }

    &-leave {
      &-to {
        .title--menu {
          &-overlay {
            opacity: 0;
            transition: 300ms;
          }
          &-window {
            transform: scale(.5);
            opacity: 0;
            transition: 150ms;
          }
        }
      }

      &-active {
        transition: 300ms;
      }
    }
  }
</style>

