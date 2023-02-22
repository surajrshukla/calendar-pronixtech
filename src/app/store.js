import { configureStore } from '@reduxjs/toolkit';
import calendarSlice from '../features/calendar/calendarSlice';
import reminderSlice from '../features/reminder/reminderSlice';

export const store = configureStore({
    reducer: {
        calendar: calendarSlice,
        reminder: reminderSlice
    },
});
