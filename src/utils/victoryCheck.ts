/* export const correctRows: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkVictory = (
    correctRows: number[][],
    playerRow: number[]
  ): boolean => {
    return correctRows.some((correctRow) =>
      correctRow.every((element) => playerRow.includes(element))
    );
};

export interface IVictoryCheckProps {
  playerX: string;
  playerO: string;
  playerXrow: number[];
  playerOrow: number[];
  totalMoves: number[];
}

type VictoryEvent = "playerXVictory" | "playerOVictory" | "itsATie";

const emit = defineEmits<{
    (e: "playerXVictory"): void;
    (e: "playerOVictory"): void;
    (e: "itsATie"): void;
}>();

export const useVictoryCheck = (
    props: IVictoryCheckProps,
    emit: (event: VictoryEvent) => void
  ) => {
    const resultPlayerX = checkVictory(correctRows, props.playerXrow);
    const resultPlayerO = checkVictory(correctRows, props.playerOrow);
  
    if (resultPlayerX) {
      emit("playerXVictory");
    } else if (resultPlayerO) {
      emit("playerOVictory");
    } else if (props.totalMoves.length === 9) {
      emit("itsATie");
    }
}; */