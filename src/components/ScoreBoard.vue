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
    <div class="score-board">
        <h2>Score Board</h2>
        <div class="scores">
            <p>Player X - {{ playerX }}: {{ playerXpoints }}</p>
            <p>Player O - {{ playerO }}: {{ playerOpoints }}</p>
        </div>
    </div>

</template>

<style scoped lang="scss">

.score-board {
    background-color: var(--vt-c-white);
    border: solid 2px var(--vt-c-darkbrown);
    border-radius: 40px; 
    margin-top: 40px;
    margin-bottom: 40px;
    padding: 40px;

    h2 {
        margin: 0;
    }
    
    .p {
        color: var(--vt-c-darkbrown);
    }
}



</style>
