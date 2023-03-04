import {  createSlice } from '@reduxjs/toolkit';
import { findIndex, sortBy } from 'lodash';
import { createReminder, getCurrentMonthReminders, updateReminder } from './reminder.services';


const initialState = {
    grids: [],
    loading: false
};

export const reminderSlice = createSlice({
    name: 'reminder',
    initialState,
    reducers: {
        registerGrid: (state, action) => {
            state.grids = [...state.grids, action.payload]
        },
        saveReminder: (state, action) => {
            let gridIndex = findIndex(state.grids, { id: action.payload.gridId });
            state.grids[gridIndex].reminders = [...state.grids[gridIndex].reminders, action.payload.reminder]
            state.grids[gridIndex].reminders = sortBy(state.grids[gridIndex].reminders, ["reminderHour", "reminderMinute"]);
        },
        // updateReminder: (state, action) => {
        //     const gIndex = findIndex(state.grids, { id: action.payload.gridId });
        //     let reminders = state.grids[gIndex].reminders;
        //     const reminderIndex = findIndex(reminders, { id: action.payload.reminder.id });
        //     if (reminderIndex > -1) {
        //         reminders[reminderIndex] = action.payload.reminder;
        //     }
        //     state.grids[gIndex].reminders = sortBy(reminders, ["reminderHour", "reminderMinute"]);
        // },
        deleteReminder: (state, action) => {
            const gInx = findIndex(state.grids, { id: action.payload.gridId });
            state.grids[gInx].reminders = state.grids[gInx].reminders.length === 1 ? [] : [...state.grids[gInx].reminders.filter(reminder => reminder.id !== action.payload.reminderId)];
            state.grids[gInx].reminders = sortBy(state.grids[gInx].reminders, ["reminderHour", "reminderMinute"]);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createReminder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createReminder.fulfilled, (state, action) => {
            state.loading = false;
             const gIndex = findIndex(state.grids, { id: action.payload.gridId });
            let reminders = state.grids[gIndex].reminders;
            const reminderIndex = findIndex(reminders, { id: action.payload.reminder.id });
            if (reminderIndex > -1) {
                reminders[reminderIndex] = action.payload.reminder;
            }
            state.grids[gIndex].reminders = sortBy(reminders, ["reminderHour", "reminderMinute"]);
        });
        builder.addCase(createReminder.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(updateReminder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateReminder.fulfilled, (state, action) => {
            state.loading = false;
             const gIndex = findIndex(state.grids, { id: action.payload.gridId });
            let reminders = state.grids[gIndex].reminders;
            const reminderIndex = findIndex(reminders, { id: action.payload.reminder.id });
            if (reminderIndex > -1) {
                reminders[reminderIndex] = action.payload.reminder;
            }
            state.grids[gIndex].reminders = sortBy(reminders, ["reminderHour", "reminderMinute"]);
        });
        builder.addCase(updateReminder.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(getCurrentMonthReminders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCurrentMonthReminders.fulfilled, (state, action) => {
            state.loading = false;
            state.grids = action.payload.data.data;
        });
        builder.addCase(getCurrentMonthReminders.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const {
    registerGrid,
    saveReminder,
    deleteReminder
} = reminderSlice.actions;

export default reminderSlice.reducer;
