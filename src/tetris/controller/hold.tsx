import { BlockName, EntityBlockName } from "tetris/core/block";
import { Field, PlayerPosition } from "tetris/core/type";
import { gameSlice, GameSliceType } from "tetris/store/field";
import { popNext } from "./generate";

export const hold = (
    gameData: GameSliceType
) => {
    if(gameData.hold === "empty"){
        gameData.hold = gameData.currentBlock
        popNext(gameData);   
    }
    else{


    }
};