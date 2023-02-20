<script lang="ts">
import type { PropType } from 'vue';

type TTypeButton = 'button' | 'submit' | 'reset';
type THandleClick = (payload: MouseEvent) => void;

export default {
  name: 'BaseButton',
  props: {
    text: {
      type: String,
      required: true,
    },
    handleClick: {
      type: Function as PropType<THandleClick>,
    },
    type: {
      type: String as PropType<TTypeButton>,
      default: 'button',
      validator: (value: TTypeButton) => ['button', 'submit', 'reset'].indexOf(value) !== -1,
    },
  },
};
</script>

<template>
  <button v-if="type === 'submit'" class="button green" :type="type">{{ text }}</button>
  <button v-else class="button green" :type="type" @click.prevent="handleClick">{{ text }}</button>
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
