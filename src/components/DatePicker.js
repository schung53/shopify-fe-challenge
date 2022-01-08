import React, { Component } from "react";
import moment from "moment";
import { dateRangeValidator } from '../util/dateUtils';
import { withStyles } from "@mui/styles";

// Redux
import { connect } from 'react-redux';
import { setInitialDates } from '../features/dates/datesSlice'
import { fetchPicturesAsync, searchDateRangeAsync } from '../features/pictures/picturesSlice';

// UI
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

const styles = {
    grid: {
        backgroundColor: '#001c33',
        borderRadius: '10px',
        margin: '5px 25px 20px 10px',
        height: '80px'
    },
    error: {
        color: '#001c33'
    }
};

export class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.state = {
            startValue: "",
            isStartEmpty: true,
            isStartDisabled: false,
            endValue: "",
            isEndEmpty: true,
            isEndDisabled: false,
            errorOpen: false,
            errorMessage: ""
        };
    }

    handleStartChange(value, modifiers, dayPickerInput) {
        const input = dayPickerInput.getInput();
        this.setState({
            startValue: value,
            isStartEmpty: !input.value.trim(),
            isStartDisabled: modifiers.disabled === true,
        });
    }

    handleEndChange(value, modifiers, dayPickerInput) {
        const input = dayPickerInput.getInput();
        this.setState({
            endValue: value,
            isEndEmpty: !input.value.trim(),
            isEndDisabled: modifiers.disabled === true,
        });
    }

    handleSubmit() {
        const { startValue, endValue } = this.state;
        const { searchDateRangeAsync } = this.props;

        if (startValue === "" || endValue === "") {
            this.setState({
                errorMessage: 'Both dates must be supplied.',
                errorOpen: true
            });
            return;
        }

        const startDate = moment(startValue).format('YYYY-MM-DD');
        const endDate = moment(endValue).format('YYYY-MM-DD');
        const validator = dateRangeValidator(startDate, endDate);

        if (validator === 'RANGE_TOO_LARGE') {
            this.setState({
                errorMessage: 'The date range must contain less than 100 days.',
                errorOpen: true
            });
            return;
        } else if (validator === 'NOT_CHRONOLOGICAL') {
            this.setState({
                errorMessage: 'Dates must be in chronological order.',
                errorOpen: true
            });
            return;
        }

        searchDateRangeAsync({startDate, endDate})
    }

    handleClear() {
        const { setInitialDates, fetchPicturesAsync } = this.props;
        setInitialDates();
        fetchPicturesAsync();
    }

    handleCloseError() {
        this.setState({ errorOpen: false });
    }

    render() {
        const { startValue, endValue, errorOpen, errorMessage } = this.state;
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
                            value={startValue}
                            onDayChange={this.handleStartChange}
                            dayPickerProps={{
                                selectedDays: startValue,
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
                            value={endValue}
                            onDayChange={this.handleEndChange}
                            dayPickerProps={{
                                selectedDays: endValue,
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
                            onClick={() => this.handleSubmit()}
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
                            onClick={() => this.handleClear()}
                            style={{ margin: 'auto auto auto 10px'}}
                        >
                            Clear
                        </Button>
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={errorOpen}
                    onClose={() => this.handleCloseError()}
                >
                    <Alert severity="error">{errorMessage}</Alert>
                </Snackbar>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    startDate: state.dates.lastDate,
    endDate: state.dates.currentDate
});

const mapActionsToProps = {
    setInitialDates,
    fetchPicturesAsync,
    searchDateRangeAsync
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(DatePicker));
