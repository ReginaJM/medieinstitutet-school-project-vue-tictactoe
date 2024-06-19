import { Ref } from 'vue';

export const resetBoard = (
  playerXrow: Ref<number[]>,
  playerOrow: Ref<number[]>,
  totalMoves: Ref<number[]>,
  saveState: () => void
) => {
  playerXrow.value = [];
  playerOrow.value = [];
  totalMoves.value = [];
  saveState();
};