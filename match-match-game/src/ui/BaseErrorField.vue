<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseErrorField',
  props: {
    errorMessage: {
      type: String,
    }
  }
});
</script>

<template>
  <div class="error-field">{{ errorMessage }}</div>
</template>

<style scoped>
.error-field {
  padding-top: 2px;
  height: 11px;
  font-size: 12px;
  color: #be0000;
  line-height: 11px;
}
</style>