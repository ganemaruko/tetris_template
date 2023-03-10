import {rgba} from "polished"
import { Position } from "./type"
import { shuffleByFisherYates } from "./util"

type ID = number
export const BLOCKS = ["empty", "o" , "s" , "t" , "z" , "l" , "j" , "i"] as const
export const ENTITY_BLOCKS = ["o" , "s" , "t" , "z" , "l" , "j" , "i"] as const
export type BlockName = typeof BLOCKS[number]
export type EntityBlockName = typeof ENTITY_BLOCKS[number]

export type BlockInfo = {
    color: string
}
export const BLOCK_ID_TO_NAME: {[key: ID] : BlockName} = {
    0: "empty",
    1: "o",
    2: "s",
    3: "t",
    4: "z",
    5: "l",
    6: "j",
    7: "i"
}

export const BLOCK_NAME_TO_ID: { [key in BlockName]: ID } = {
  empty: 0,
  o: 1,
  s: 2,
  t: 3,
  z: 4,
  l: 5,
  j: 6,
  i: 7,
};

export const BLOCK_INFO: { [name in BlockName]: BlockInfo } = {
  empty: {
    color: rgba("black", 0.2),
    // color: "red",
  },
  o: {
    color: "#F8DC38",
  },
  s: {
    color: "#4DE46E",
  },
  t: {
    color: "#B36BEC",
  },
  z: {
    color: "#DB435F",
  },
  l: {
    color: "#F8B83A",
  },
  j: {
    color: "#31ADE4",
  },
  i: {
    color: "#17CFDE",
  },
};
  
export class Block{
    id: number
    color: string
    name: BlockName

    constructor(id?:number, name?: BlockName){
    if(id !== undefined){
        this.id = id;
        this.name = BLOCK_ID_TO_NAME[id];
        this.color = BLOCK_INFO[this.name].color
    }
    else if(name !== undefined){
        this.name = name;
        this.id = BLOCK_NAME_TO_ID[name];
        this.color = BLOCK_INFO[this.name].color

    }
    else{
        throw new Error("both of id and name is undefined.");
        
    }
    }
}

export const isBlock = (key:string):  key is BlockName => {
    return key in BLOCKS;
}


export const generateBlockSet = (): EntityBlockName[] => {
  return shuffleByFisherYates(ENTITY_BLOCKS);
};

export const generateBlockPositions = (
  blockName: BlockName,
  xCenter: number,
  yCenter: number
): Position[] => {
  switch (blockName) {
    case "i":
      return [
        [xCenter, yCenter],
        [xCenter, yCenter + 1],
        [xCenter, yCenter + 2],
        [xCenter, yCenter + 3],
      ];
    case "j":
      return [
        [xCenter, yCenter],
        [xCenter, yCenter + 1],
        [xCenter, yCenter + 2],
        [xCenter - 1, yCenter + 2],
      ];
    case "l":
      return [
        [xCenter, yCenter],
        [xCenter, yCenter + 1],
        [xCenter, yCenter + 2],
        [xCenter + 1, yCenter + 2],
      ];
    case "o":
      return [
        [xCenter, yCenter],
        [xCenter + 1, yCenter + 1],
        [xCenter, yCenter + 1],
        [xCenter + 1, yCenter],
      ];
    case "s":
      return [
        [xCenter, yCenter],
        [xCenter, yCenter + 1],
        [xCenter + 1, yCenter + 1],
        [xCenter + 1, yCenter + 2],
      ];
    case "t":
      return [
        [xCenter, yCenter],
        [xCenter, yCenter + 1],
        [xCenter, yCenter + 2],
        [xCenter + 1, yCenter + 1],
      ];
    case "z":
      return [
        [xCenter, yCenter + 2],
        [xCenter, yCenter + 1],
        [xCenter + 1, yCenter],
        [xCenter + 1, yCenter + 1],
      ];

    default:
      throw new Error(`invalid type ${blockName}`);
  }
};