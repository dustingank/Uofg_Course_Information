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
  
  const allOptions = ['All', 'FULL', 'OPEN',
  ];


export default function Capacity(props) {

    const classes = useStyles();
      

    const handleChange = (event) => {
        props.setCapacity(event.target.value);
      };
    
      return(
        <div>
        <FormControl className={classes.formControl}>
            <InputLabel id="simple-select-label">Capacity</InputLabel>
            <Select
                labelId="simple-select-label"
                id="simple-select"
                value={props.capacity}
                onChange={handleChange}
            
            >
            {allOptions.map((x) => (
              <MenuItem value={x}> { x } </MenuItem>
            ))}
        </Select>
      </FormControl>

        </div>
      );
}
