import { Block, BLOCK_NAME_TO_ID, EntityBlockName } from "tetris/core/block";
import { Field, PlayerPosition, Position } from "tetris/core/type"
import { GameSliceType } from "tetris/store/field";
import { popNext } from "./generate";

const moveRightImpl = (pos:Position):Position => {
    const newPos = [...pos] as Position
    newPos[0] += 1;
    return newPos;
}
export const moveRight = (field:Field, playerPosition:PlayerPosition, playerBlock:EntityBlockName) => {
    moveCore(field, playerPosition, playerBlock, moveRightImpl)
}

const moveLeftImpl = (pos:Position):Position => {
    const newPos = [...pos] as Position
    newPos[0] -= 1;
    return newPos;
}
export const moveLeft = (field:Field, playerPosition:PlayerPosition, playerBlock:EntityBlockName) => {
    moveCore(field, playerPosition, playerBlock, moveLeftImpl)
}

const moveDownImpl = (pos:Position):Position => {
    const newPos = [...pos] as Position
    newPos[1] += 1;
    return newPos;
}
export const moveDown = (gameData: GameSliceType) => {
  if (gameData.currentBlock !== "empty") {
    const hasMoved = moveCore(
      gameData.field,
      gameData.playerPosition,
      gameData.currentBlock,
      moveDownImpl
    );
    if(!hasMoved){
        popNext(gameData);
    }
  }
};


const copyPosition = (pos:Position):Position => {
    return [...pos]
}

const moveCore = (
  field: Field,
  playerPosition: PlayerPosition,
  playerBlock: EntityBlockName,
  move: (pos: Position) => Position
): boolean => {
    const block = new Block(undefined, playerBlock)
    const nextPlayerPosition = playerPosition.map(move);
    if (canMove(field, playerPosition.map(copyPosition), nextPlayerPosition)) {
      playerPosition.forEach((pos) => {
        const x = pos[0];
        const y = pos[1];
        field[x][y] = BLOCK_NAME_TO_ID["empty"];
      });
      nextPlayerPosition.forEach((pos) => {
        const x = pos[0];
        const y = pos[1];
        field[x][y] = block.id;
      });

      playerPosition.map((pos, i) => {
        playerPosition[i] = move(pos);
      });

      return true
    }
    else{
        return false;
    }
};

export const dropDown = () => {

}

export const canMove = (
  field: Field,
  currentPlayerPosition: PlayerPosition,
  nextPlayerPosition: PlayerPosition
) => {
  const currentPlayerPositionID = currentPlayerPosition.map((pos) =>
    pos.join(":")
  );
  return (
    nextPlayerPosition.filter((pos) => {
      if (currentPlayerPositionID.includes(pos.join(":"))) {
        return true;
      }
      const x = pos[0];
      const y = pos[1];
      try {
        return field[x][y] == BLOCK_NAME_TO_ID["empty"];
      } catch (error) {
        return false;
      }
    }).length == 4
  );
};