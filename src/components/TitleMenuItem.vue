<template>
  <li :class="className" @click="callback">
    <button>{{ label }}</button>
  </li>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TitleMenuList extends Vue {
  @Prop() protected className!: string;
  @Prop() protected label!: string;
  @Prop() protected callback!: any;
}
</script>

