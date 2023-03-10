import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { popNext } from "tetris/controller/generate";
import { moveDown, moveLeft, moveRight } from "tetris/controller/move";
import {
  generateBlockSet,
  EntityBlockName,
  BlockName,
} from "tetris/core/block";
import { GAME_SETTING } from "tetris/core/setting";
import { Field, PlayerPosition } from "tetris/core/type";

export type GameSliceType = {
  field: Field;
  playerPosition: PlayerPosition;
  blocks: EntityBlockName[];
  hold: BlockName;
  currentBlock: BlockName;
};

/**
 *
 * @returns field
 *  field[x][y]
 *  >>> 0 // number
 */
const createField = (): Field => {
  const field = new Array();
  for (let x = 0; x < GAME_SETTING.WIDTH; x++) {
    const row = new Array(GAME_SETTING.HEIGHT);
    for (let y = 0; y < row.length; y++) {
      row[y] = 0;
    }
    field.push(row);
  }
  return field;
};

const field: Field = createField();

export type CreateBlock = {
  x: number;
  y: number;
  block: number;
};

export type DeleteBlock = {
  x: number;
  y: number;
};

export type MoveAction = {};

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    field: field,
    playerPosition: [
      [5, 0],
      [5, 1],
      [5, 2],
      [5, 3],
    ],
    blocks: generateBlockSet(),
    hold: "empty",
    currentBlock: "empty",
  } as GameSliceType,
  reducers: {
    moveLeftReducer: (state, action: PayloadAction<MoveAction>) => {
      if (state.currentBlock !== "empty") {
        moveLeft(state.field, state.playerPosition, state.currentBlock);
      }
    },
    moveRightReducer: (state, action: PayloadAction<MoveAction>) => {
      if (state.currentBlock !== "empty") {
        moveRight(state.field, state.playerPosition, state.currentBlock);
      }
    },
    moveDownReducer: (state, action: PayloadAction<MoveAction>) => {
        moveDown(state);
    },
    popNextReducer: (state, action: PayloadAction<MoveAction>) => {
      popNext(state);
    },
  },
});

export const {
  moveLeftReducer,
  moveRightReducer,
  moveDownReducer,
  popNextReducer,
} = gameSlice.actions;
