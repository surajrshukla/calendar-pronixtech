import {  createSlice } from '@reduxjs/toolkit';
import { createDaysForCurrentMonth, getDaysInMonth, month, previousMonthDays } from '../../app/helpers/calendar.helper';


const currentDate = new Date()
const initialState = {
    currentMonthDetail: {
        currentDate: currentDate,
        currentMonth: month[currentDate.getMonth()],
        firstDayOfMonth: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        lastDayOfMonth: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
        daysInCurrentMonth: getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()),
        currentYear: currentDate.getFullYear(),
    },
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        createCalenar: (state, action) => {
            const previousMonthDaysToSkip = previousMonthDays(state.currentMonthDetail.currentMonth, state.currentMonthDetail.currentYear, state.currentMonthDetail.firstDayOfMonth.getDay());
            const currentMonthdays = createDaysForCurrentMonth(state.currentMonthDetail.daysInCurrentMonth, state.currentMonthDetail.currentMonth, state.currentMonthDetail.currentYear);
            state.currentMonthDetail.days = [...previousMonthDaysToSkip, ...currentMonthdays]
        }
    },
});

export const { createCalenar } = calendarSlice.actions;

export default calendarSlice.reducer;
