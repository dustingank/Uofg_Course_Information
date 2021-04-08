import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const allSemesters = ['W','S','F',];

export default function Semesters() {

    const [semesters, setSemesters] = React.useState('');
    const classes = useStyles();
      

    const handleChange = (event) => {
        setSemesters(event.target.value);
      };
    
      return(
        <div>
        <FormControl className={classes.formControl}>
            <InputLabel id="simple-select-label">Semesters</InputLabel>
            <Select
                labelId="simple-select-label"
                id="simple-select"
                value={semesters}
                onChange={handleChange}
            
            >
            {allSemesters.map((x) => (
              <MenuItem value={x}> { x } </MenuItem>
            ))}

        </Select>
      </FormControl>

        </div>
      );
}
