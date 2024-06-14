<script setup lang="ts">
import { ref } from "vue";
import Square from "./Square.vue";

const board = ref<string[]>(Array(9).fill(""));
const currentPlayer = ref<string>("X");
const playerXrow = ref<string>("");
const playerOrow = ref<string>("");

// Det barnet vill ha av föräldern
interface IBoardProps {
  playerX: string;
  playerO: string;
}
const props = defineProps<IBoardProps>();

// Det barnet ska skicka till föräldern
const emit = defineEmits<{
  (e: "square-click", playerAndIndex: { index: number; player: string }): void;
}>();

const handleSquareClick = (index: number) => {
  if (board.value[index] === "") {
    emit("square-click", { index, player: currentPlayer.value });
    board.value[index] = currentPlayer.value;
    currentPlayer.value = currentPlayer.value === "X" ? "O" : "X";
  }
};
</script>

<template>
  <div class="container">
    <h1>Tic Tac Toe</h1>
    <p v-if="currentPlayer === 'X'">
      Player {{ currentPlayer }}: {{ playerX }}, you're up!
    </p>
    <p v-else>Player {{ currentPlayer }}: {{ playerO }}, you're up!</p>

    <div class="game-board">
      <Square
        v-for="(square, index) in board"
        :key="index"
        :index="index"
        :value="square"
        @square-click="handleSquareClick"
      />
    </div>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}
.game-board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 5px;
}

.square {
  width: 100px;
  height: 100px;
  background-color: #fff;
  border: 2px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  cursor: pointer;
  user-select: none;
}

.square:hover {
  background-color: #e0e0e0;
}
</style>
