<script setup lang="ts">





// Det barnet vill ha av föräldern
interface IScoreBoardProps {
  playerXpoints: number;
  playerOpoints: number;
}

const props = defineProps<IScoreBoardProps>();


</script>


<template>
    <h2>Score board</h2>
    <p>Player X score: {{ playerXpoints }}</p>
    <p>Player O score: {{ playerOpoints }}</p>


</template>




<style scoped>

</style>
