import { Ref } from 'vue';

export const addPointPlayerO = (
    playerOpoints: Ref<number>,
    saveState: () => void
) => {
    playerOpoints.value += 1;
    saveState(); 
};