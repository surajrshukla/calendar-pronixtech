import React from 'react';
import { weekdays } from '../../app/helpers/calendar.helper';

function CalendarGridHeader() {
    return (
        <ol className="day_of_week">
            {weekdays.map((weekday, index) => <li key={index}>{weekday}</li>)}
        </ol >
    )
}

export default CalendarGridHeader;