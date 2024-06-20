<script setup lang="ts">
interface ISquareProps {
  index: number;
  value: string;
}

const props = defineProps<ISquareProps>();

const emit = defineEmits<{
  (e: "square-click", index: number): void;
}>();

const handleClick = () => {
  if (props.value === "") {
    emit("square-click", props.index);
  }
};
</script>

<template>
  <div class="square" @click="handleClick">
    {{ props.value }}
  </div>
</template>

<style scoped lang="scss">
.square {
    max-width: 100px auto;
    max-height: 100px;
    background-color: var(--vt-c-white);
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
    background-color: var(--vt-c-lightbrown);
}

.square:active {
    transform: translateY(2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>