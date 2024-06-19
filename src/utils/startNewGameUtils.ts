import { Ref } from 'vue';
import { resetBoard } from './resetBoardUtils';

export const startNewGame = (
  playerXrow: Ref<number[]>,
  playerOrow: Ref<number[]>,
  totalMoves: Ref<number[]>,
  saveState: () => void,
  playerXVictory: Ref<boolean>,
  playerOVictory: Ref<boolean>,
  tie: Ref<boolean>,
  gameOver: Ref<boolean>
) => {
  resetBoard(playerXrow, playerOrow, totalMoves, saveState);
  playerXVictory.value = false;
  playerOVictory.value = false;
  tie.value = false;
  gameOver.value = false;
};