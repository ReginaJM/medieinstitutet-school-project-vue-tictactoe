<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Square from "./Square.vue";
import ScoreBoard from "./ScoreBoard.vue";

const board = ref<string[]>(Array(9).fill(""));
const currentPlayer = ref<string>("X");
const showScoreBoard = ref<boolean>(false);

interface IBoardProps {
  playerX: string;
  playerO: string;
  gameOver: boolean;
  playerXpoints: number;
  playerOpoints: number;
}

const props = defineProps<IBoardProps>();

const emit = defineEmits<{
  (e: "square-click", playerAndIndex: { index: number; player: string }): void;
  (e: "clear-board"): void;
  (e: "show-score"): void;
}>();

const handleSquareClick = (index: number) => {
  if (board.value[index] === "" && !props.gameOver) {
    emit("square-click", { index, player: currentPlayer.value });
    board.value[index] = currentPlayer.value;
    currentPlayer.value = currentPlayer.value === "X" ? "O" : "X";
    saveBoardState();
  }
};

const decideStartingPlayer = () => {
  currentPlayer.value = Math.random() < 0.5 ? "X" : "O";
};

const saveBoardState = () => {
  const state = {
    board: board.value,
    currentPlayer: currentPlayer.value,
    showScoreBoard: showScoreBoard.value,
  };
  localStorage.setItem("boardState", JSON.stringify(state));
};

const loadBoardState = () => {
  const state = localStorage.getItem("boardState");
  if (state) {
    const parsedState = JSON.parse(state);
    board.value = parsedState.board;
    currentPlayer.value = parsedState.currentPlayer;
    showScoreBoard.value = parsedState.showScoreBoard;
  } else {
    decideStartingPlayer();
  }
};

onMounted(() => {
  loadBoardState();
});

watch([board, currentPlayer, showScoreBoard], saveBoardState);

const resetBoard = () => {
  board.value = Array(9).fill("");
  decideStartingPlayer();
  saveBoardState();
  emit("clear-board");
};

const toggleScoreBoard = () => {
  showScoreBoard.value = !showScoreBoard.value;
  emit("show-score");
};
</script>

<template>
    <div class="container">
        <h1>Tic Tac Toe</h1>

        <div v-if="!showScoreBoard">
            <div :class="{ hidden: props.gameOver }">
                <p v-if="currentPlayer === 'X'">
                    Player {{ currentPlayer }} - {{ props.playerX }}, you're up!
                </p>
                <p v-else>
                    Player {{ currentPlayer }} - {{ props.playerO }}, you're up!
                </p>
            </div>

            <div class="game-board">
                <Square
                v-for="(square, index) in board"
                :key="index"
                :index="index"
                :value="square"
                @square-click="handleSquareClick"
                />
            </div>

            <div class="buttons-container">
                <button @click="toggleScoreBoard">Show score</button>
                <button v-if="props.gameOver" @click="resetBoard">Play again</button>
            </div>
        </div>

        <div v-else>
            <ScoreBoard
                :playerXpoints="props.playerXpoints"
                :playerOpoints="props.playerOpoints"
                :playerX="props.playerX"
                :playerO="props.playerO"
            />
        <button @click="toggleScoreBoard">Back to game</button>
        </div>
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

.buttons-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

p {
  color: var(--vt-c-orange);
}

.game-board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
  margin-bottom: 20px;
}

.square {
  max-width: 100px auto;
  max-height: 100px;
  background-color: #f9f7f1;
  border: 1px solid var(--vt-c-darkbrown);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  font-size: 2em;
  cursor: pointer;
  user-select: none;
  border-radius: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.square:hover {
  background-color: #d6c4a9;
}

.square:active {
  transform: translateY(2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hidden {
  visibility: hidden;
}
</style>