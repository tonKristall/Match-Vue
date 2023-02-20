<script lang="ts">
export default {
  name: 'BaseInput',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <label :for="id" class="label">{{ label }}</label>
    <input :type="type" :id="id" class="input" :value="value"
      @input="$emit('input', $event.target && 'value' in $event.target && $event.target?.value)" />
  </div>
</template>

<style scoped>
.input {
  padding: 0 1rem;
  height: 2.5rem;
  width: 100%;
  outline: transparent solid 2px;
  outline-offset: 2px;
  appearance: none;
  border: 1px solid #97aba4;
  border-radius: 0.5rem;
  font-size: inherit;
  font-family: inherit;
  transition-property: border-color, box-shadow;
  transition-duration: 200ms;
}

.input:focus {
  border-color: #00bd7e;
  box-shadow: #00bd7e 0px 0px 0px 1px;
}
</style>
