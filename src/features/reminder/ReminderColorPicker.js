import React, { useState } from 'react';
import { colors } from '../../app/helpers/calendar.helper';

function ReminderColorPicker(props) {

    const [current, setCurrent] = useState("blue");

    const  handleColorChange = (ev, key) => {
        ev.stopPropagation();
        setCurrent(key)
        props.updateColor(key);
    }
    
    return (
        <div style={{ marginTop: 15 }}>
            <label>Choose reminder color:</label>
            {Object.keys(colors).map((key, index) => <span key={index} className={current === key ? "selected_color_picker" : "color_picker"} onClick={ev => handleColorChange(ev, key)} style={{ backgroundColor: `${colors[key]}` }}>{key}</span>)}
        </div>
    )
}

export default ReminderColorPicker;