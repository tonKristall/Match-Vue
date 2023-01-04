<script setup lang="ts">
import CardList from '@/components/CardList/CardList.vue';
</script>

<template>
  <main class="container main-container">
    <!-- <div class="game-timer">05:59</div> -->
    <CardList />
  </main>
</template>

<style scoped>
.main-container {
  margin-top: 70px;
  padding: 2rem;
  width: 1100px;
  height: 700px;
  display: flex;
  background-color: #f1f1f1;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 55, 35, 0.5);
}
</style>
