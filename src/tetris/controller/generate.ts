import { EntityBlockName, generateBlockSet } from "tetris/core/block";
import { GAME_SETTING } from "tetris/core/setting";
import { Field, PlayerPosition } from "tetris/core/type";

export const popNext = (
  field: Field,
  playerPosition: PlayerPosition,
  blocks: EntityBlockName[]
) => {
    const next = blocks.shift()
    if(blocks.length < GAME_SETTING.NUM_CANDIDATES){
        const newBlocks = generateBlockSet()
        console.log("add new data", newBlocks)
        blocks.push(...newBlocks)
    }
    
    console.log("next", next)
};