<script lang="ts">
import { useNotificationsStore } from '@/stores/notifications.store';
import type { TNotification } from '@/types/notification.types';
import type { PropType } from 'vue';
import { notificationSetting } from './notificationSetting';

type TNotificationItemData = {
  timerId: null | number;
  removeNotification: (id: string) => void;
};

export default {
  name: 'NotificationItem',
  components: { NotificationIcon: () => import('@/components/Notifications/NotificationIcon.vue') },
  props: {
    notification: { type: Object as PropType<TNotification>, required: true },
  },
  data(): TNotificationItemData {
    const { removeNotification } = useNotificationsStore();
    return {
      timerId: null,
      removeNotification,
    };
  },

  mounted() {
    this.timerStart();
  },
  beforeDestroy() {
    if (!this.timerId) return;
    window.clearTimeout(this.timerId);
  },

  methods: {
    closeNotification() {
      this.removeNotification(this.notification.id);
    },
    timerStart() {
      const timerFinishesAt = new Date(notificationSetting.duration + Date.now());
      this.timerId = window.setTimeout(this.closeNotification, timerFinishesAt.getTime() - Date.now());
    },
  },
};
</script>

<template>
  <component is="div" class="notification-item">
    <NotificationIcon :type="notification.type" />
    <div class="notification-item__message">
      {{ notification.message }}
    </div>
  </component>
</template>

<style lang="scss">
.notification-item {
  margin-bottom: 10px;
  padding: 10px;
  min-width: 250px;
  display: flex;
  align-items: center;
  flex-flow: wrap row;
  align-content: center;
  transition: transform 100ms ease;
  box-shadow: 0 0 10px 0.5px rgba(0, 0, 0, 0.35);
  border-radius: 5px;
  z-index: 9999;
  background-color: #f0f0f0;

  &__message {
    max-width: 220px;
    height: 100%;
    word-break: break-word;
  }
}
</style>
