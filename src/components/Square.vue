<script setup lang="ts">



interface ISquareProps {
    index: number;
    value: string;
    /* currentPlayer: string; */
}

const props = defineProps<ISquareProps>();

const emit = defineEmits<{
  (e: 'square-click', index: number): void;
}>();

const handleClick = () => {
  if (props.value === '') {
    emit('square-click', props.index);
  }
};
</script>



<template>

    <div class="square" @click="handleClick">
        {{ props.value }}
    </div>

</template>







<style scoped>

</style>







