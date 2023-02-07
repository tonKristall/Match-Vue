<script lang="ts">

export default {
  name: 'ButtonApp',
  props: {
    text: {
      type: String,
      required: true
    },
    handleClick: {
      type: Function,
      required: true
    },
  }
};
</script>

<template>
  <button class="button green" type="button" @click="() => handleClick()">{{ text }}</button>
</template>

<style>
.button {
  padding: 10px 20px;
  cursor: pointer;
  font-size: 20px;
  text-transform: capitalize;
  border-radius: 10px;
}
</style>