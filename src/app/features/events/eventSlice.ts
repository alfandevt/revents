import { createSlice } from '@reduxjs/toolkit';
import { sampleData } from '../../api/sampeData';
import { AppEvent } from '../../types/event.type';

type State = {
  events: AppEvent[];
};

const initialState: State = {
  events: sampleData,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    createEvent(state, action) {
      state.events.push(action.payload);
    },
    updateEvent(state, action) {
      state.events[
        state.events.findIndex((ev) => ev.id === action.payload.id)
      ] = action.payload;
    },
    deleteEvent(state, action) {
      state.events.splice(
        state.events.findIndex((ev) => ev.id === action.payload),
        1
      );
    },
  },
});

export const { createEvent, updateEvent, deleteEvent } = eventsSlice.actions;
