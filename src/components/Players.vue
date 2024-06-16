<script setup lang="ts">
import { ref } from "vue";

const playerX = ref("");
const playerO = ref("");

// emit, SKAPA händelser
const emit = defineEmits<{
  (e: "sendPlayers", playerX: string, playerO: string): void;
}>();

const handleSubmit = () => {
  // console log
  console.log("submit", playerX.value, playerO.value);

  // emit, SÄTTA IGÅNG händelsen
  emit("sendPlayers", playerX.value, playerO.value);
  playerX.value = "";
  playerO.value = "";
};
</script>

<template>
  <div class="container">
    <h1>Tic Tac Toe</h1>

    <form @submit.prevent="handleSubmit">
      <label for="playerX">Player X name:</label><br />
      <input type="text" id="playerX" required v-model="playerX" /><br />

      <label for="playerO">Player O name:</label><br />
      <input type="text" id="playerO" required v-model="playerO" /><br />

      <input type="submit" value="Start game" />
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
