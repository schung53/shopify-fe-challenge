import React, { Component } from "react";

// UI
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { withStyles } from "@mui/styles";

const styles = {
    grid: {
        backgroundColor: '#001c33',
        borderRadius: '10px',
        margin: '5px 25px 10px 10px',
        height: '80px'
    }
};

export class DatePicker extends Component {
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
        const { classes } = this.props;

        return (
            <Grid className={classes.grid}>
                <Grid container alignItems='center'>
                    <Grid item>
                        <Typography variant="body2" style={{ margin: '10px 10px 10px 15px' }} color="#6db9fb">
                            Search images from date range:
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container style={{ margin: 'auto auto 20px auto' }} alignItems='center'>
                    <Grid item>
                        <Typography variant="body2" style={{ margin: 'auto 10px auto 15px' }} color="#6db9fb">
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
                        <Typography variant="body2" style={{ margin: 'auto 10px auto 20px' }} color="#6db9fb">
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
                    <Grid item>
                        <Button 
                            variant="outlined"
                            size="small"
                            startIcon={<SearchIcon />}
                            onClick={this.handleSubmit}
                            style={{ margin: 'auto auto auto 30px'}}
                        >
                            Search
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="outlined"
                            size="small"
                            startIcon={<ClearIcon />}
                            onClick={this.handleSubmit}
                            style={{ margin: 'auto auto auto 10px'}}
                        >
                            Clear
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(DatePicker)