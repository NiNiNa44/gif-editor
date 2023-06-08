import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@mui/material';

const RadioButton = ({onRadioChange, quality}) => {
return (
    <FormControl className="mx-5">
        <h5>File Quality</h5>
        <RadioGroup
            value= {quality}
        >
            <FormControlLabel value="Large" control={<Radio />} onChange={onRadioChange} label="Large" />
            <FormControlLabel value="Medium" control={<Radio />} onChange={onRadioChange} label="Medium" />
            <FormControlLabel value="Small" control={<Radio />} onChange={onRadioChange} label="Small" />

        </RadioGroup>
    </FormControl>
)
}

export default RadioButton;