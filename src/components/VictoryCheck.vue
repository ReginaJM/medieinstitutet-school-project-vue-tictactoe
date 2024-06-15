<script setup lang="ts">
import { ref, watch } from 'vue';


const correctRows: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


// Det barnet vill ha av föräldern
interface IVictoryCheckProps {
  playerX: string;
  playerO: string;
  playerXrow: number[];
  playerOrow: number[];
}
const props = defineProps<IVictoryCheckProps>();


const checkVictory = (correctRows: number[][], playerRow: number[]): boolean => {
    return correctRows.some(correctRow =>
        correctRow.every(element => playerRow.includes(element))
    );
}

const resultPlayerX = ref<boolean>(false);
const resultPlayerO = ref<boolean>(false);

const updateResults = () => {
  resultPlayerX.value = checkVictory(correctRows, props.playerXrow);
  resultPlayerO.value = checkVictory(correctRows, props.playerOrow);
}
updateResults();



const emit = defineEmits<{
    (e: "playerXVictory"): void;
    (e: "playerOVictory"): void;
}>()

watch(() => props.playerXrow, (newVal) => {
  const resultPlayerX = checkVictory(correctRows, newVal);
  if (resultPlayerX) {
    emit('playerXVictory');
  }
}, { immediate: true });

watch(() => props.playerOrow, (newVal) => {
  const resultPlayerO = checkVictory(correctRows, newVal);
  if (resultPlayerO) {
    emit('playerOVictory');
  }
}, { immediate: true }); 




</script>





<template>

</template>


<style scoped>

</style>
