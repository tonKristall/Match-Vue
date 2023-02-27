<script lang="ts">
import { useGameStore } from '@/stores/game.store';
import { useUserStore } from '@/stores/user.store';
import { routes } from '@/router/router';

export default {
  name: 'GameScore',

  data() {
    const gameStore = useGameStore();
    const { user } = useUserStore();

    return {
      user,
      gameStore,
      routes,
    };
  },
};
</script>

<template>
  <div v-if="gameStore.lastScore" class="game-result">
    <div class="game-result__text">Your score: {{ gameStore.lastScore }}</div>
    <p v-if="!user">
      To save the result <router-link :to="routes.login.path">{{ routes.login.name }}</router-link>
    </p>
  </div>
</template>

<style scoped>
.game-result {
  margin-bottom: 15px;
  text-align: center;
  color: #ffffff;
}

.game-result__text {
  margin-bottom: 10px;
  font-size: 20px;
}

.game-result a:hover {
  background-color: transparent;
  text-decoration: underline;
}
</style>
