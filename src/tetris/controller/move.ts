import { BLOCK_NAME_TO_ID } from "tetris/core/block";
import { Field, PlayerPosition, Position } from "tetris/core/type"

const moveRightImpl = (pos:Position):Position => {
    const newPos = [...pos] as Position
    newPos[0] += 1;
    return newPos;
}
export const moveRight = (field:Field, playerPosition:PlayerPosition) => {
    moveCore(field, playerPosition, moveRightImpl)
}

const moveLeftImpl = (pos:Position):Position => {
    const newPos = [...pos] as Position
    newPos[0] -= 1;
    return newPos;
}
export const moveLeft = (field:Field, playerPosition:PlayerPosition) => {
    moveCore(field, playerPosition, moveLeftImpl)

}

const moveDownImpl = (pos:Position):Position => {
    const newPos = [...pos] as Position
    newPos[1] += 1;
    return newPos;
}
export const moveDown = (field:Field, playerPosition:PlayerPosition) => {
    moveCore(field, playerPosition, moveDownImpl)
}


const copyPosition = (pos:Position):Position => {
    return [...pos]
}

const moveCore = (
  field: Field,
  playerPosition: PlayerPosition,
  move: (pos: Position) => Position
) => {
    const nextPlayerPosition = playerPosition.map(move);
    if (canMove(field, playerPosition.map(copyPosition), nextPlayerPosition)) {
      playerPosition.forEach((pos) => {
        const x = pos[0];
        const y = pos[1];
        console.log(x, y);
        field[x][y] = BLOCK_NAME_TO_ID["empty"];
      });
      nextPlayerPosition.forEach((pos) => {
        const x = pos[0];
        const y = pos[1];
        console.log(x, y);
        field[x][y] = 3;
      });

      playerPosition.map((pos, i) => {
        playerPosition[i] = move(pos);
      });
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