<script lang="ts">
import { useNotificationsStore } from '@/stores/notifications.store';
import { storeToRefs } from 'pinia';

export default {
  name: 'NotificationsList',
  components: {
    NotificationItem: () => import('@/components/Notifications/NotificationItem.vue'),
  },
  data() {
    const notificationsStore = useNotificationsStore();
    const { removeNotification } = notificationsStore;
    const { notifications } = storeToRefs(notificationsStore);
    return {
      notifications,
      removeNotification,
    };
  },

  computed: {
    currentlyShowing: function () {
      return this.notifications.map((notification) => notification.id);
    },
  },
};
</script>

<template>
  <transition-group
    class="notification-container"
    name="notification"
    :css="true"
    tag="div"
    move-class="notification-move"
  >
    <NotificationItem v-for="notification in notifications" :key="notification.id" :notification="notification" />
  </transition-group>
</template>

<style lang="scss">
.notification-container {
  width: auto;
  height: auto;
  box-sizing: border-box;
  position: fixed;
  top: 60px;
  right: 10px;
  z-index: 9999;
}
.notification-will-change {
  will-change: transform, opacity;
}

.notification-move {
  transition: all 0.2s ease-in-out;
}

.notification-enter-active {
  transition: all 0.2s ease-out;
}

.notification-leave-active {
  transition: all 0.2s ease-in;
}

.notification-enter,
.notification-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
