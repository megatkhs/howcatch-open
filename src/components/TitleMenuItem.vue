<template>
  <li :class="className" @click="callback">
    <button>{{ label }}</button>
  </li>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TitleMenuList extends Vue {
  @Prop() public className!: string;
  @Prop() public label!: string;
  @Prop() public callback!: any;
}
</script>

