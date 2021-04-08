import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));




export default function MeetingTime(props) {

    const classes = useStyles();

    const handleLoc = (event) => {
      props.setLocation(event.target.value);
    };
    const handleType = (event) => {
      props.setMeetingType(event.target.value);
    };
    const handleDay = (event) => {
      props.setMeetingDay(event.target.value);
    };
    const handleStartTime = (event) => {
      props.setStartTime(event.target.value);
    };
    const handleEndTime = (event) => {
      props.setEndTime(event.target.value);
    };
    
      return(
        <div>
          {/* Meeting type (lec, lab, sem) */}
          <FormControl className={classes.formControl}>
            <InputLabel id="simple-select-label-type">Meeting Type</InputLabel>
            <Select
                labelId="simple-select-label-type"
                id="simple-select-type"
                value={props.meetingType}
                onChange={handleType}   
            >
              {meetingTypes.map((str) => (
                <MenuItem value={str}> { str } </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Meeting day */}
          <FormControl className={classes.formControl}>
            <InputLabel id="simple-select-label-day">Meeting Day</InputLabel>
            <Select
                labelId="simple-select-label-day"
                id="simple-select-day"
                value={props.meetingDay}
                onChange={handleDay}   
            >
              {days.map((str) => (
                <MenuItem value={str}> { str } </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Start time */}
          <FormControl className={classes.formControl}>
            <InputLabel id="simple-select-label-st">Start Time</InputLabel>
            <Select
                labelId="simple-select-label-st"
                id="simple-select-st"
                value={props.startTime}
                onChange={handleStartTime}   
            >
              {times.map((str) => (
                <MenuItem value={str}> { str } </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* End time */}
          <FormControl className={classes.formControl}>
            <InputLabel id="simple-select-label-et">End Time</InputLabel>
            <Select
                labelId="simple-select-label-et"
                id="simple-select-et"
                value={props.endTime}
                onChange={handleEndTime}   
            >
              {times2.map((str) => (
                <MenuItem value={str}> { str } </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Location/Timing */}
          <FormControl className={classes.formControl}>
            <InputLabel id="simple-select-label-loc">Delivery</InputLabel>
            <Select
                labelId="simple-select-label-loc"
                id="simple-select-loc"
                value={props.location}
                onChange={handleLoc}   
            >
              {location.map((str) => (
                <MenuItem value={str}> { str } </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      );
}

const meetingTypes = [
  "LEC",
  "LAB",
  "SEM",
  "EXAM",
];

const location = [
  "AD-S",
  "AD-A",
];

const days = [
  "Mon  Wed  Fri",
  "Mon  Wed",
  "Tues  Thur",
  "Mon",
  "Tues",
  "Wed",
  "Thur",
  "Fri",
  "Sat",
];

const times = [
  "06:00AM",
  "06:30AM",
  "07:00AM",
  "07:30AM",
  "08:00AM",
  "08:30AM",
  "09:00AM",
  "09:30AM",
  "10:00AM",
  "10:30AM",
  "11:00AM",
  "11:30AM",
  "12:00PM",
  "12:30PM",
  "01:00PM",
  "01:30PM",
  "02:00PM",
  "02:30PM",
  "03:00PM",
  "03:30PM",
  "04:00PM",
  "04:30PM",
  "05:00PM",
  "05:30PM",
  "06:00PM",
  "06:30PM",
  "07:00PM",
  "07:30PM",
  "08:00PM",
  "08:30PM",
  "09:00PM",
  "09:30PM",
  "10:00PM",
  "10:30PM",
  "11:00PM",
  "11:30PM",
];

const times2 = [
  "06:20AM",
  "06:50AM",
  "07:20AM",
  "07:50AM",
  "08:20AM",
  "08:50AM",
  "09:20AM",
  "09:50AM",
  "10:20AM",
  "10:50AM",
  "11:20AM",
  "11:50AM",
  "12:20PM",
  "12:50PM",
  "01:20PM",
  "01:50PM",
  "02:20PM",
  "02:50PM",
  "03:20PM",
  "03:50PM",
  "04:20PM",
  "04:50PM",
  "05:20PM",
  "05:50PM",
  "06:20PM",
  "06:50PM",
  "07:20PM",
  "07:50PM",
  "08:20PM",
  "08:50PM",
  "09:20PM",
  "09:50PM",
  "10:20PM",
  "10:50PM",
  "11:20PM",
  "11:50PM",
];



