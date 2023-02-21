<script lang="ts">
import { routes } from '@/router/router';
import { useUserStore } from '@/stores/user.store';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GuardRoutes',
  data() {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    return {
      user,
    };
  },
  methods: {
    checkAuthUser() {
      if (this.user) {
        this.$router.replace(routes.home.path);
      }
    },
  },
  watch: {
    user() {
      this.checkAuthUser();
    },
  },
  beforeMount() {
    this.checkAuthUser();
  },
});
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
