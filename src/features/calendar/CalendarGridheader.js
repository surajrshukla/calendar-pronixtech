import React from 'react';
import { getGroupedMonthStartDatesByWeekday, month, weekdays } from '../../app/helpers/calendar.helper';

function CalendarGridHeader() {
    const grouppedMonths = getGroupedMonthStartDatesByWeekday(new Date().getFullYear());
    return (
        <ol className="day_of_week">
            {weekdays.map((weekday, index) =>
                <li key={index}>
                        {weekday}
                    {grouppedMonths[index].length > 0 ? (
                        grouppedMonths[index].map((monthIndex) => <div>
                            {month[monthIndex.getMonth()]}
                        </div>
                        )
                    ): null}
                </li>
            )}
        </ol >
    )
}

export default CalendarGridHeader;