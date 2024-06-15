<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Square from "./Square.vue";

const board = ref<string[]>(Array(9).fill(""));
const currentPlayer = ref<string>("X");
/* const playerXrow = ref<string>("");
const playerOrow = ref<string>(""); */

// Det barnet vill ha av föräldern
// ta bort? används ej?
interface IBoardProps {
  playerX: string;
  playerO: string;
}
// ta bort? används ej?
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
    saveBoardState(); // Save state after updating the board
  }
};

// //Function to save board state to localStorage
const saveBoardState = () => {
  const state = {
    board: board.value,
    currentPlayer: currentPlayer.value
  };
  localStorage.setItem("boardState", JSON.stringify(state));
};

// //Function to load board state from localStorage
const loadBoardState = () => {
  const state = localStorage.getItem("boardState");
  if (state) {
    const parsedState = JSON.parse(state);
    board.value = parsedState.board;
    currentPlayer.value = parsedState.currentPlayer;
  }
};

// //Load board state on mounted
onMounted(() => {
  loadBoardState();
});

// //Watch for changes in the board and save them
watch([board, currentPlayer], saveBoardState);

// Metod för att återställa brädet
const resetBoard = () => {
  board.value = Array(9).fill("");
  currentPlayer.value = "X";
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
        :index="index"
        :value="square"
        @square-click="handleSquareClick"
        
      />
    </div>

    <button>Show score</button>
    <button id="startOverBtn" @click="resetBoard">Start over</button>

  </div>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* max-height: 50%; */
  text-align: center;
}
.game-board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
  margin-bottom: 20px;
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
  border-radius: 25px; /* Rundade hörn */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Drop-shadow */
  transition: transform 0.1s ease, box-shadow 0.1s ease; /* Animering vid klick */
}

.square:hover {
  background-color: #fdf5eb;
} 

.square:active {
  transform: translateY(2px); /* Tryck ned cellen */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Mindre skugga vid tryck */
}
</style>
