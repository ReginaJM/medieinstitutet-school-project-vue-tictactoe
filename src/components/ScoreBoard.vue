<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

interface IScoreBoardProps {
  playerXpoints: number;
  playerOpoints: number;
  playerX: string;
  playerO: string;
}

const props = defineProps<IScoreBoardProps>();

const playerXpoints = ref<number>(props.playerXpoints);
const playerOpoints = ref<number>(props.playerOpoints);

const savePointsToLocalStorage = () => {
  localStorage.setItem("playerXpoints", playerXpoints.value.toString());
  localStorage.setItem("playerOpoints", playerOpoints.value.toString());
};

const loadPointsFromLocalStorage = () => {
  const storedPlayerXpoints = localStorage.getItem("playerXpoints");
  const storedPlayerOpoints = localStorage.getItem("playerOpoints");

  if (storedPlayerXpoints !== null) {
    playerXpoints.value = parseInt(storedPlayerXpoints, 10);
  }
  if (storedPlayerOpoints !== null) {
    playerOpoints.value = parseInt(storedPlayerOpoints, 10);
  }
};

onMounted(() => {
  loadPointsFromLocalStorage();
});

watch([playerXpoints, playerOpoints], savePointsToLocalStorage);
</script>

<template>
  <h2>Score board</h2>
  <div class="scores">
    <p>Player X - {{ playerX }}: {{ playerXpoints }}</p>
    <p>Player O - {{ playerO }}: {{ playerOpoints }}</p>
  </div>
</template>

<style scoped>
.scores {
  margin-bottom: 40px;
}
</style>
