import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCurrentMonthReminders } from '../reminder/reminder.services';

import './calendar.css';
import CalendarGrid from './CalendarGrid';
import CalendarGridHeader from './CalendarGridheader';
import CalendarHeader from './CalendarHeader';
import { createCalenar } from './calendarSlice';


function Calendar() {
    const dispatch = useAppDispatch();

    const currentMonthDetail = useAppSelector(
        (state) => state.calendar.currentMonthDetail
    );

    useEffect(() => {
        dispatch(createCalenar());
        const currentDate = new Date();
        const data = {
            month: currentDate.getMonth(),
            year: currentDate.getFullYear()
        }
        dispatch(getCurrentMonthReminders(data));
    }, [])
    
    return (
        <div className="calendar_month">
            <CalendarHeader currentMonth={currentMonthDetail.currentMonth} currentYear={currentMonthDetail.currentYear} />
            <CalendarGridHeader />
            <ol className="days_grid">
                {currentMonthDetail.days && currentMonthDetail.days.length > 0 ?currentMonthDetail.days.map((day, index) => {
                    return <CalendarGrid key={index} day={day} currentMonthDetail={currentMonthDetail} />
                }): null}
            </ol>
        </div>
    )
}

export default Calendar;