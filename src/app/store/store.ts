import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { testSlice } from '../features/scratch/testSlice';
import { eventsSlice } from '../features/events/eventSlice';
import { modalSlice } from '../common/modals/modalSlices';
import { authSlice } from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    test: testSlice.reducer,
    events: eventsSlice.reducer,
    modals: modalSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
