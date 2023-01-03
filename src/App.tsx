import './App.css';
import { Mino } from 'tetris/component/block';
import { GAME_SETTING } from 'tetris/core/setting';
import { RootState, store } from 'tetris/store/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useGameController } from 'tetris/controller/hook';
import {  moveDownReducer, moveLeftReducer, moveRightReducer } from 'tetris/store/field';
import { Block } from 'tetris/core/block';
import { Field } from 'tetris/core/type';
import { disableKeyScroll } from 'tetris/core/scroll';

function App() {
  useEffect(()=>{
    disableKeyScroll();
  }, [])
  return (
    <Provider store={store}>
      <TetrisMain></TetrisMain>
    </Provider>
  );
}

const TetrisMain = () => {
  const field = useSelector<RootState>((state) => state.game.field) as Field;
  const dispatch = useDispatch()

  // define call back functions
  const moveLeftCB = useCallback(() => {
    dispatch(moveLeftReducer({}));
  }, [dispatch])

  const moveRightCB = useCallback(() => {
    dispatch(moveRightReducer({}));
  }, [dispatch])

  const moveDownCB = useCallback(() => {
    dispatch(moveDownReducer({}));
  }, [dispatch])

  useGameController(moveLeftCB, moveDownCB, moveRightCB, moveLeftCB);
  
  return(
    <div style={{height:"100vh", width: "100vw"}}>
      {[... Array(GAME_SETTING.HEIGHT)].map((_, y)=> {
        return (
          <div key={y} style={{display:"flex"}}>
            {[...Array(GAME_SETTING.WIDTH)].map((_, x) => {
              const block = new Block(field[x][y])
              return <Mino backColor='red' key={x} size={30} color={block.color} />;
              // return <Mino backColor='red' key={j} size={30} color={"red"} />;
            })}
          </div>
        );
      })
      }
    </div>
  )
}
export default App;
