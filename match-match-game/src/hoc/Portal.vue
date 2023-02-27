<script lang="ts">
import type { PropType } from 'vue';

export default {
  name: 'Portal',
  props: {
    isOpen: { type: Boolean, required: true },
    closePortal: { type: Function as PropType<(payload: MouseEvent) => void>, required: true },
    head: { type: String, required: true },
  },
};
</script>

<template>
  <div class="portal" v-if="isOpen">
    <div class="portal__cover" @click="closePortal"></div>
    <div class="portal__container">
      <div class="portal__close-icon" @click="closePortal"></div>
      <div class="portal__header">
        <h3>{{ head }}</h3>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.portal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;

  &__cover {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(00, 00, 00, 0.5);
  }

  &__container {
    margin: 5px;
    padding: 10px;
    width: 100%;
    max-width: 500px;
    max-height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background-color: #ffffff;
  }

  &__close-icon {
    width: 17px;
    height: 17px;
    position: absolute;
    top: 10px;
    right: 10px;
    border: 1px solid red;
    border-radius: 50%;
    color: red;
    cursor: pointer;
    z-index: 10;

    &::before {
      content: '+';
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(30%, -15%) rotateZ(45deg);
      width: inherit;
      height: inherit;
    }
  }

  &__header {
    margin-bottom: 10px;
  }
}
</style>
