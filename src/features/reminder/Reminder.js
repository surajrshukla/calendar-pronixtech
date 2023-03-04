import React from 'react';
import { parseTime } from '../../app/helpers/calendar.helper';
import { useAppDispatch } from '../../app/hooks';
import ReminderDialog from './ReminderDialog';
import { deleteReminder } from './reminderSlice';

function Reminder(props) {

    const [isReminderDialogOpen, setDialogOpen] = React.useState("");
    const dispatch = useAppDispatch();

    const handleClose = () => {
        setDialogOpen(false);
    }

    const openDialog = () => {
        setDialogOpen(true);
    }

    const handleDelete = (ev) => {
        ev.stopPropagation();
        const payload = {
            gridId: props.gridId,
            reminderId: props.reminder.id
        }
        dispatch(deleteReminder(payload))
    }

    return (
        <>
            <div onClick={ev => ev.stopPropagation()} className="reminder" style={{ backgroundColor: props.reminder.color }}>
                <div><b>{props.reminder.description} <span onClick={handleDelete} style={{ float: "right", padding: 4 }} className="link">x</span> <span onClick={openDialog} style={{ float: "right", padding: 4 }} className="link">edit</span></b></div>
                <div><b>{parseTime(props.reminder.reminderHour, props.reminder.reminderMinute)}</b></div>
            </div>
            {isReminderDialogOpen && <ReminderDialog mode="UP" gridId={props.gridId} day={props.day} reminder={props.reminder} handleClose={handleClose} />}
        </>
    )
}

export default Reminder;

