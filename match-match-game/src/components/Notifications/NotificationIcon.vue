<template>
  <div class="notification-icon-container" :class="`notification-${type}`">
    <div v-if="type === 'success'" class="notification-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
        <path
          d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z"
        />
      </svg>
    </div>
    <div v-else-if="type === 'error'" class="notification-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
        <path
          d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
        />
      </svg>
    </div>
    <div v-else-if="type === 'warning'" class="notification-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
        <circle cx="12" cy="19" r="2" />
        <path d="M12 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z" />
      </svg>
    </div>
    <div v-else-if="type === 'info'" class="notification-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style="transform: rotate(180deg);"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
      >
        <path d="M12 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z" />
        <circle cx="12" cy="19" r="2" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import type { TTypeNotification } from '@/types/notification.types';
import type { PropType } from 'vue';

export default {
  name: 'NotificationIcon',
  props: {
    type: { type: String as PropType<TTypeNotification> },
  },
};
</script>

<style lang="scss">
.notification-icon-container {
  margin: 0 5px auto 0;
  width: 32px;
  height: 32px;
  position: relative;
  border-style: solid;
  border-width: 2px;
  border-radius: 50%;

  & > .notification-icon {
    height: 24px;
    width: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.notification-success {
  & > .notification-icon > svg {
    fill: #199919;
  }
  border-color: #199919;
}
.notification-info {
  & > .notification-icon > svg {
    fill: #003bc8;
  }
  border-color: #003bc8;
}
.notification-warning {
  & > .notification-icon > svg {
    fill: #ffb300;
  }
  border-color: #ffb300;
}
.notification-error {
  & > .notification-icon > svg {
    fill: #b11414;
  }
  border-color: #b11414;
}
</style>
