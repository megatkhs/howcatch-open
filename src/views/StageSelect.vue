<template>
  <div class="stage">
    {{ $route.params.id }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class StageSelect extends Vue {}
</script>

<style lang="scss">
</style>

