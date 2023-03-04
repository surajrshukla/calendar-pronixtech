import React from 'react';
import { ReactDialogBox } from 'react-js-dialog-box';


const ReminderPopup = (props) => {
    const handleClose = (ev) => {
        ev.stopPropagation()
        props.handleCloseReminderPopup()
    }
    return <ReactDialogBox
        closeBox={handleClose}
        modalWidth='60%'
        headerBackgroundColor='red'
        headerTextColor='white'
        headerHeight='65'
        closeButtonColor='white'
        bodyBackgroundColor='white'
        bodyTextColor='black'
        bodyHeight='200px'
        headerText="Reminders"
        hasCloseIcon={true}
       >
        <div onClick={ev => ev.stopPropagation()}>
            {props.children}
        </div>
    </ReactDialogBox>
}


export default ReminderPopup;