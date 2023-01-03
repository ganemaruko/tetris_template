import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Mino } from 'tetris/component/block';
import { GAME_SETTING } from 'tetris/core/setting';
import { RootState, store } from 'tetris/store/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useGameController } from 'tetris/controller/hook';
import {  moveDownReducer, moveLeftReducer, moveRightReducer, popNextReducer } from 'tetris/store/field';
import { Block, generateBlockSet, EntityBlockName } from 'tetris/core/block';
import { Field } from 'tetris/core/type';
import { disableKeyScroll } from 'tetris/core/scroll';
import { Candidate } from 'tetris/component/candidate';
import { Button, Col, Row } from 'react-bootstrap';

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
  
  return (
    <Row style={{ height: "100vh", width: "100vw" }}>
      <Col lg={2} xl={2} sm={2}>
        <Button variant="info">Start</Button>
        <Button
          variant="info"
          onClick={() => {
            dispatch(popNextReducer({}));
          }}
        >
          Next
        </Button>
      </Col>
      <Col
        lg={8}
        xl={8}
        sm={8}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          {[...Array(GAME_SETTING.HEIGHT)].map((_, y) => {
            return (
              <div key={y} style={{ display: "flex" }}>
                {[...Array(GAME_SETTING.WIDTH)].map((_, x) => {
                  const block = new Block(field[x][y]);
                  return (
                    <Mino
                      backColor="red"
                      key={x}
                      size={30}
                      color={block.color}
                    />
                  );
                  // return <Mino backColor='red' key={j} size={30} color={"red"} />;
                })}
              </div>
            );
          })}
        </div>
      </Col>
      <Col lg={2} xl={2} sm={2}>
        <CandidatesViewer />
      </Col>
    </Row>
  );
}

const CandidatesViewer = () => {
  const blocks = useSelector<RootState>((state) => state.game.blocks) as EntityBlockName[];

  return(
    <div>
      {blocks.map((block, i)=>{
        if(i < GAME_SETTING.NUM_CANDIDATES){
          return <Candidate block={block} key={i} />;
        }
      })}

    </div>
  )
}
export default App;
