<script setup lang="ts">
import Players from './Players.vue';
import Board from './Board.vue';
import VictoryCheck from './VictoryCheck.vue';
import { ref, onMounted, watch } from 'vue';

const playerX = ref<string>("");
const playerO = ref<string>("");
const showPlayers = ref<boolean>(true);
const playerXpoints = ref<number>(0);
const playerOpoints = ref<number>(0);

const playerXrow = ref<number[]>([]);
const playerOrow = ref<number[]>([]);
const totalMoves = ref<number[]>([]);
const gameOver = ref<boolean>(false); 

const playerXVictory = ref<boolean>(false);
const playerOVictory = ref<boolean>(false);
const tie = ref<boolean>(false);

const saveState = () => {
  const state = {
    playerX: playerX.value,
    playerO: playerO.value,
    playerXpoints: playerXpoints.value,
    playerOpoints: playerOpoints.value,
    playerXrow: playerXrow.value,
    playerOrow: playerOrow.value,
    totalMoves: totalMoves.value,
    showPlayers: showPlayers.value,
    gameOver: gameOver.value,
    playerXVictory: playerXVictory.value,
    playerOVictory: playerOVictory.value,
    tie: tie.value
  };
  localStorage.setItem("ticTacToeState", JSON.stringify(state));
};

const loadState = () => {
  const state = localStorage.getItem("ticTacToeState");
  if (state) {
    const parsedState = JSON.parse(state);
    playerX.value = parsedState.playerX;
    playerO.value = parsedState.playerO;
    playerXpoints.value = parsedState.playerXpoints;
    playerOpoints.value = parsedState.playerOpoints;
    playerXrow.value = parsedState.playerXrow;
    playerOrow.value = parsedState.playerOrow;
    totalMoves.value = parsedState.totalMoves;
    showPlayers.value = parsedState.showPlayers;
    gameOver.value = parsedState.gameOver;
    playerXVictory.value = parsedState.playerXVictory;
    playerOVictory.value = parsedState.playerOVictory;
    tie.value = parsedState.tie;
  };
};

const addPlayerNames = (player1: string, player2: string) => {
  playerX.value = player1
  playerO.value = player2
  showPlayers.value = false; 
  saveState(); 
};

const updatePlayerRow = (playerAndIndex: { index: number; player: string }) => {
    if (!gameOver.value) {
        totalMoves.value.push(1);
        if(playerAndIndex.player === 'X') {
            playerXrow.value.push(playerAndIndex.index)
        } else {
            playerOrow.value.push(playerAndIndex.index)
        }
        saveState(); 
    };
};

const addPointPlayerX = () => {
    playerXpoints.value += 1;
    saveState(); 
};

const addPointPlayerO = () => {
    playerOpoints.value += 1;
    saveState(); 
};

const resetBoard = () => {
  playerXrow.value = [];
  playerOrow.value = [];
  totalMoves.value = [];
  saveState(); 
};

const handlePlayerXVictory = () => {
  playerXVictory.value = true;
  addPointPlayerX();
  gameOver.value = true; 
  resetBoard();
};

const handlePlayerOVictory = () => {
   playerOVictory.value = true;
  addPointPlayerO();
  gameOver.value = true; 
  resetBoard();
};

const handleTie = () => {
    tie.value = true;
    gameOver.value = true; 
    resetBoard();
};

const handleShowScore = () => {
    playerXVictory.value = false;
    playerOVictory.value = false;
    tie.value = false;
};

const startNewGame = () => {
  resetBoard();
  playerXVictory.value = false;
  playerOVictory.value = false;
  tie.value = false;
  gameOver.value = false; 
};

const resetGame = () => {
  localStorage.clear();
  playerX.value = "";
  playerO.value = "";
  playerXpoints.value = 0;
  playerOpoints.value = 0;
  playerXrow.value = [];
  playerOrow.value = [];
  totalMoves.value = [];
  showPlayers.value = true;
  gameOver.value = false;
  playerXVictory.value = false;
  playerOVictory.value = false;
  tie.value = false;
};

onMounted(() => {
  loadState();
});

watch(
    [playerX, playerO, playerXpoints, playerOpoints, playerXrow, playerOrow, totalMoves, 
    showPlayers, gameOver, playerXVictory, playerOVictory, tie], 
    saveState
);

</script>
<template>
    <div class="container-app">

        <Players v-if="showPlayers" 
            @send-players="addPlayerNames"
        />

        <Board v-else 
            :playerX="playerX"
            :playerO="playerO" 
            :gameOver="gameOver" 
            :playerXpoints="playerXpoints"
            :playerOpoints="playerOpoints"
            @square-click="updatePlayerRow" 
            @clear-board="startNewGame"
            @show-score="handleShowScore"

        />

         <VictoryCheck v-for="(t, i) in totalMoves" :key="i"
            :playerX="playerX"
            :playerO="playerO"
            :playerXrow="playerXrow"
            :playerOrow="playerOrow"
            :totalMoves="totalMoves"
            @playerXVictory="handlePlayerXVictory" 
            @playerOVictory="handlePlayerOVictory"
            @itsATie="handleTie"  
        /> 

        <p v-if="playerXVictory">Player X - {{ playerX }}, you won this round! &#129395;</p>
        <p v-if="playerOVictory">Player O - {{ playerO }}, you won this round! &#129395;</p>
        <p v-if="tie">It's a tie! &#128074</p>

        <button class="resetBtn"v-if="!showPlayers" @click="resetGame">Reset Game</button>
    </div>
</template>

<style scoped lang="scss">
.container-app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 50%;
  min-width: 300px;
  text-align: center;

  background-color: var(--vt-c-beige);
  border-radius: 40px; 

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px; 
}

.p {
    color: var(--vt-c-darkbrown);
}

.hidden {
    visibility: hidden;
}
</style>


