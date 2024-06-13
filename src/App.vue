<script setup lang="ts">
import Players from './components/Players.vue'
import { ref } from 'vue';






const playerX = ref<string>("");
const playerO = ref<string>("");

const addPlayerNames = (player1: string, player2: string) => {
  playerX.value = player1
  playerO.value = player2
  console.log(playerX.value, playerO.value);
}

</script>




<template>

  <Players @send-players="addPlayerNames"/>

</template>




<style scoped>

</style>
