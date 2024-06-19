import { Ref } from 'vue';

export const addPointPlayerX = (
    playerXpoints: Ref<number>,
    saveState: () => void
) => {
    playerXpoints.value += 1;
    saveState(); 
};