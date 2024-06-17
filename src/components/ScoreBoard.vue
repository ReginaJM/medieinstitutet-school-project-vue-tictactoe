<script setup lang="ts">

import { ref, onMounted, watch } from 'vue';



// Det barnet vill ha av föräldern
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
  localStorage.setItem('playerXpoints', playerXpoints.value.toString());
  localStorage.setItem('playerOpoints', playerOpoints.value.toString());
};

const loadPointsFromLocalStorage = () => {
  const storedPlayerXpoints = localStorage.getItem('playerXpoints');
  const storedPlayerOpoints = localStorage.getItem('playerOpoints');

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

// Spara poäng när de ändras
watch([playerXpoints, playerOpoints], savePointsToLocalStorage);


</script>


<template>
    <h2>Score board</h2>
    <p>Player X - {{ playerX }}, score: {{ playerXpoints }}</p>
    <p>Player O - {{ playerO }}, score: {{ playerOpoints }}</p>


</template>




<style scoped>

</style>
