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

const playerXrow = ref<number[]>([]);
const playerOrow = ref<number[]>([]);
const totalMoves = ref<number[]>([]);

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
    playerXrow: playerXrow.value,
    playerOrow: playerOrow.value,
    totalMoves: totalMoves.value,
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
    playerXrow.value = parsedState.playerXrow;
    playerOrow.value = parsedState.playerOrow;
    totalMoves.value = parsedState.totalMoves;
  } else {
    decideStartingPlayer();
  }
};

onMounted(() => {
  loadBoardState();
});

watch([board, currentPlayer, showScoreBoard, playerXrow, playerOrow, totalMoves], saveBoardState);

const resetBoard = () => {
  board.value = Array(9).fill("");
  playerXrow.value = [];
  playerOrow.value = [];
  totalMoves.value = [];
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
                <p class="whos-up-text" v-if="currentPlayer === 'X'">
                    Player {{ currentPlayer }} - {{ props.playerX }}, you're up!
                </p>
                <p class="whos-up-text" v-else>
                    Player {{ currentPlayer }} - {{ props.playerO }}, you're up!
                </p>
            </div>

            <div class="game-board">
                <Square
                v-for="(square, index) in board"
                :index="index"
                :value="square"
                @square-click="handleSquareClick"
                />
            </div>

            <div class="buttons-container">
              <button v-if="props.gameOver" @click="resetBoard">Play again</button>  
              <button @click="toggleScoreBoard">Score Board</button>
            </div>
        </div>

        <div v-else>
            <ScoreBoard
                :playerXpoints="props.playerXpoints"
                :playerOpoints="props.playerOpoints"
                :playerX="props.playerX"
                :playerO="props.playerO"
            />
        <button @click="toggleScoreBoard">Back to Game</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    .game-board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    gap: 10px;
    margin-bottom: 20px;
    }
}

.whos-up-text {
    color: var(--vt-c-orange);
    font-size: 1.1rem;
}

.hidden {
  visibility: hidden;
}
</style>