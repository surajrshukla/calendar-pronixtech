import React, { useState } from 'react';
import { colors } from '../../app/helpers/calendar.helper';
import ReminderColorPicker from './ReminderColorPicker';
import { saveReminder, updateReminder } from './reminderSlice';
import { ReactDialogBox } from 'react-js-dialog-box'
import { useAppDispatch } from '../../app/hooks';
import { createReminder } from './reminder.services';

const uniqid = require('uniqid');

function ReminderDialog(props) {

    const dispatch = useAppDispatch()

    const [state, setState] = useState({
        reminderText: props.reminder ? props.reminder.description : "",
        reminderHour: props.reminder ? props.reminder.reminderHour : 0,
        reminderMinute: props.reminder ? props.reminder.reminderMinute : 0,
        color: props.reminder ? Object.keys(colors).find(key => colors[key] === props.reminder.color) : "blue"
    });

    const handleClose = (ev) => {
        ev.stopPropagation();
        props.handleClose()
    }

    const handleReminderText = (ev) => {
        ev.stopPropagation();
        if (ev.currentTarget.value.length > 20) {
            return alert("You can not add more then 20 charecters")
        }

        setState({
            ...state,
            reminderText: ev.currentTarget.value
        })
    }

    const handleReminderHour = (ev) => {
        ev.stopPropagation();
        if (ev.currentTarget.value === "") {
            setState({
                ...state,
                reminderHour: ""
            });;
            return
        }
        if (parseInt(ev.currentTarget.value) < 0 || parseInt(ev.currentTarget.value) > 23) {
            return alert("enter hour value in range of 00 to 23")
        }

        setState({
            ...state,
            reminderHour: parseInt(ev.currentTarget.value)
        });
    }

    const handleReminderMinutes = (ev) => {
        ev.stopPropagation();
        if (ev.currentTarget.value === "") {
            setState({
                ...state,
                reminderMinute: ""
            });;
            return
        }
        if (parseInt(ev.currentTarget.value) < 0 || parseInt(ev.currentTarget.value) > 59) {
            return alert("enter minutes value in range of 00 to 59")
        }
        setState({
            ...state,
            reminderMinute: parseInt(ev.currentTarget.value)
        });
    }

    const handleSubmit = (ev) => {
        ev.stopPropagation();
        if (state.reminderText === "" || state.reminderHour === "" || state.reminderMinute === "") {
            alert("please enter valid details")
            return
        }
        const reminder = {
            id: props.mode === "UP" ? props.reminder.id : uniqid(),
            description: state.reminderText,
            reminderHour: state.reminderHour,
            reminderMinute: state.reminderMinute,
            color: colors[state.color]
        }
        const payload = {
            reminder,
            gridId: props.day.id,
            date: props.day.date,
            month: (new Date(props.day.date)).getMonth() +1,
            year: (new Date(props.day.date)).getFullYear()
        }
        if (props.mode === "UP") {
            // dispatch(createReminder(payload));
            dispatch(updateReminder(payload));
        } else {
            // dispatch(createReminder(payload));
            dispatch(saveReminder(payload))
        }
        props.handleClose()
    }

    const updateColor = (key) => {
        setState({
            ...state,
            color: key
        });
    }


    return (
        <>
            <ReactDialogBox
            closeBox={handleClose}
            modalWidth='60%'
            headerBackgroundColor='red'
            headerTextColor='white'
            headerHeight='65'
            closeButtonColor='white'
            bodyBackgroundColor='white'
            bodyTextColor='black'
            bodyHeight='200px'
            headerText="Reminder Detail"
            hasCloseIcon={false}
            >
            <div onClick={ev => ev.stopPropagation()}>
                <label>Reminder Text:</label>
                <input value={state.reminderText} onChange={handleReminderText} type="text" name="reminderText"></input><br></br>
                <label>Reminder Time:</label>
                <input style={{ width: 30 }} value={state.reminderHour} onChange={handleReminderHour} type="number" name="reminderTime"></input><span>{" / "}</span>
                <input style={{ width: 30 }} value={state.reminderMinute} onChange={handleReminderMinutes} type="number" name="reminderTime"></input><br></br>
                <ReminderColorPicker updateColor={updateColor} gridId={props.day.gridId} />
                <div className='text-center'>
                    <button onClick={handleSubmit}>Create Reminder</button>
                </div>
            </div>
        </ReactDialogBox>
        </>
    )
}

export default ReminderDialog;

