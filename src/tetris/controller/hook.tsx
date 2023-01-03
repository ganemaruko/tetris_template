import {useKey} from "react-use"

export const useGameController = (
  arrowUp: () => void,
  arrowDown: () => void,
  arrowRight: () => void,
  arrowLeft: () => void
) => {
  useKey("ArrowUp", arrowUp);
  useKey("ArrowLeft", arrowLeft);
  useKey("ArrowDown", arrowDown);
  useKey("ArrowRight", arrowRight);
  useKey("j", arrowLeft);
  useKey("k", arrowDown);
  useKey("l", arrowRight);
  useKey("i", arrowUp);
};