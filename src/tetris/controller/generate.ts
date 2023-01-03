import { Block, BlockName, EntityBlockName, generateBlockPositions, generateBlockSet } from "tetris/core/block";
import { GAME_SETTING } from "tetris/core/setting";
import { Field, PlayerPosition } from "tetris/core/type";
import { GameSliceType } from "tetris/store/field";

export const popNext = (
    gameData: GameSliceType  
) => {
  const next = gameData.blocks.shift();
  if (gameData.blocks.length < GAME_SETTING.NUM_CANDIDATES) {
    const newBlocks = generateBlockSet();
    console.log("add new data", newBlocks);
    gameData.blocks.push(...newBlocks);
  }
  if(next){
    generateBlock(gameData.field, gameData.playerPosition, next);
    console.log("next", next);
    gameData.currentBlock = next;
  
  }
};

const generateBlock = (field: Field, playerPosition: PlayerPosition, blockName: EntityBlockName) => {
  const xCenter = GAME_SETTING.BORN_X;
  const yCenter = GAME_SETTING.BORN_Y;
  const block = new Block(undefined, blockName);
  const positions = generateBlockPositions(blockName, xCenter, yCenter);
  positions.forEach((pos) => {
    field[pos[0]][pos[1]] = block.id;
  });
  positions.forEach((pos, i)=>{
    playerPosition[i][0] = pos[0]
    playerPosition[i][1] = pos[1];
  })


};