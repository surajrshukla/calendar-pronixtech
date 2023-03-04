import React, {  useEffect, useState } from 'react';
import { find } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Reminder from '../reminder/Reminder';
import ReminderDialog from '../reminder/ReminderDialog';
import { registerGrid } from '../reminder/reminderSlice';
import ReminderPopup from '../reminder/ReminderPopup';


function CalendarGrid(props) {
    const dispatch = useAppDispatch();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [openPopup, setopenPopup] = useState(false);

    useEffect(() => {
        if (props.day.dayOfMonth >= props.currentMonthDetail.currentDate.getDate() && props.day.isCurrentMonth) {
            dispatch(registerGrid(props.day))
        }
    }, []);

    const currentMonthDetail = useAppSelector(
        (state) => state.calendar.currentMonthDetail
    );

    const grids = useAppSelector(
        (state) => state.reminder.grids
    );

    const grid = find(grids, { date: props.day.date });


    const handleAddReminder = (ev) => {
        ev.stopPropagation();
        if (props.day.dayOfMonth < currentMonthDetail.currentDate.getDate()) return;
        setDialogOpen(true);
    }

    const handleClose = () => {
        setDialogOpen(false);
    }

    const handleOpenReminderPopup = (ev) => {
        ev.stopPropagation();
        setopenPopup(true);
    }

    const handleCloseReminderPopup = () => {
        setopenPopup(false)
    }

    const renderPopup = (reminder, gridId, day) => {
        return <ReminderPopup handleCloseReminderPopup={handleCloseReminderPopup}>
            {reminder.map(reminder => (<Reminder gridId={gridId} day={day} key={reminder.id} reminder={reminder} />))}
        </ReminderPopup>
    }


    const renderReminders = grid => {
        if (grid.reminders.length > 1) {
            return <>
                <Reminder gridId={grid.gridId} day={props.day} key={grid.reminders[0].id} reminder={grid.reminders[0]} />
                <Reminder gridId={grid.gridId} day={props.day} key={grid.reminders[1].id} reminder={grid.reminders[1]} />
                {grid.reminders.length - 2 !== 0 && <div onClick={ev => handleOpenReminderPopup(ev)} id={grid.gridId + "_extra"} className="link">{`+ ${grid.reminders.length - 2} more`}</div>}
            </>
        }

        return grid.reminders.map(reminder => (<Reminder gridId={grid.gridId} day={props.day} key={reminder.id} reminder={reminder} />))
    }


    return (
        <li onClick={handleAddReminder} className={props.day.isCurrentMonth ? "calendar_day" : "calendar_day calendar_day_not_current"}>
            <div className={props.day.date === `${currentMonthDetail.currentDate.getDate()} ${currentMonthDetail.currentMonth} ${currentMonthDetail.currentYear}` ? "calendar_day_today" : ""}>
                <span>{props.day.dayOfMonth}</span>
            </div>
            {isDialogOpen && <ReminderDialog day={props.day} handleClose={handleClose} />}
            {grid && grid.reminders.length && props.day.isCurrentMonth > 0 ? renderReminders(grid) : null}
            {grid && openPopup && renderPopup(grid.reminders.slice(2), grid.gridId, props.day)}
        </li>
    )
}

export default CalendarGrid