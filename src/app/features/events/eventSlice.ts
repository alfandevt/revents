import { PayloadAction } from '@reduxjs/toolkit';
import { AppEvent } from '../../types/event';
import { Timestamp } from 'firebase/firestore';
import {
  GenericActions,
  GenericState,
  createGenericSlice,
} from '../../store/genericSlice';
import { auth } from '../../config/firebase';

type State = {
  data: AppEvent[];
};

const initialState: State = {
  data: [],
};

export const eventsSlice = createGenericSlice({
  name: 'events',
  initialState: initialState as GenericState<AppEvent[]>,
  reducers: {
    success: {
      reducer(state, action: PayloadAction<AppEvent[]>) {
        state.data = action.payload;
        state.status = 'finished';
      },
      prepare(events) {
        let eventsArray: AppEvent[] = [];

        if (Array.isArray(events)) {
          eventsArray = events;
        } else {
          eventsArray.push(events);
        }
        const mapped = eventsArray.map((ev: any) => {
          return {
            ...ev,
            date: (ev.date as Timestamp).toDate().toISOString(),
            isHost: auth.currentUser?.uid === ev.hostUid,
            isGoing: ev.attendeeIds.includes(auth.currentUser?.uid),
          };
        });
        return { payload: mapped };
      },
    },
  },
});

export const actions = eventsSlice.actions as GenericActions<AppEvent[]>;
