import { configureStore } from '@reduxjs/toolkit';
import { gameSlice, GameSliceType } from './field';

type ReducerType = {
  "game" : GameSliceType
}

export const store = configureStore({
  // reducer: { game: gameSlice } as any,
  reducer: { game: gameSlice.reducer } ,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

