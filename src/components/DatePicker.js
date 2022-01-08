import React, { Component } from "react";

// UI
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.state = {
            fromValue: "",
            isFromEmpty: true,
            isFromDisabled: false,
            toValue: "",
            isToEmpty: true,
            isToDisabled: false,
        };
    }

    handleFromChange(value, modifiers, dayPickerInput) {
        const input = dayPickerInput.getInput();
        this.setState({
            fromValue: value,
            isFromEmpty: !input.value.trim(),
            isFromDisabled: modifiers.disabled === true,
        });
    }

    handleToChange(value, modifiers, dayPickerInput) {
        const input = dayPickerInput.getInput();
        this.setState({
            toValue: value,
            isToEmpty: !input.value.trim(),
            isToDisabled: modifiers.disabled === true,
        });
    }

    render() {
        const { fromValue, toValue } = this.state;
        return (
            <div>
                <Grid container>
                    <Grid item>
                        <Typography variant="body2" style={{margin: 'auto 10px 10px 15px'}} color="#6db9fb">
                            Search images from date range:
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container style={{margin: 'auto auto 20px auto'}}>
                    <Grid item>
                        <Typography variant="body2" style={{margin: 'auto 10px auto 15px'}} color="#6db9fb">
                            From
                        </Typography>
                    </Grid>
                    <Grid item>
                        <DayPickerInput
                            value={fromValue}
                            onDayChange={this.handleFromChange}
                            dayPickerProps={{
                                selectedDays: fromValue,
                                disabledDays: {
                                    daysOfWeek: [0, 6],
                                },
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" style={{margin: 'auto 10px auto 20px'}} color="#6db9fb">
                            To
                        </Typography>
                    </Grid>
                    <Grid item>
                        <DayPickerInput
                            value={toValue}
                            onDayChange={this.handleToChange}
                            dayPickerProps={{
                                selectedDays: toValue,
                                disabledDays: {
                                    daysOfWeek: [0, 6],
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
