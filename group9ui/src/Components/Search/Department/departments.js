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




export default function Department(props) {

    const classes = useStyles();
      

    const handleChange = (event) => {
      props.setDepartment(event.target.value);
    };
    
      return(
        <div>
        <FormControl className={classes.formControl}>
            <InputLabel id="simple-select-label">Department</InputLabel>
            <Select
                labelId="simple-select-label"
                id="simple-select"
                value={props.department}
                onChange={handleChange}   
            >
            {allDepartments.map((str) => (
              <MenuItem value={str}> { str } </MenuItem>
            ))}

        </Select>
      </FormControl>

        </div>
      );
}


const allDepartments = [
  "ACCT",
  "AGR",
  "BIOM",
  "ANSC",
  "ANTH",
  "ARAB",
  "ARTH",
  "ASCI",
  "BIOC",
  "BIOL",
  "BIOM",
  "BOT",
  "BUS",
  "CHEM",
  "CHIN",
  "CLAS",
  "CIS",
  "COOP",
  "CROP",
  "CTS",
  "ECON",
  "EDRD",
  "ENGG",
  "ENGL",
  "ENVM",
  "ENVS",
  "EQN",
  "EURO",
  "XSEN",
  "FIN",
  "FRHD",
  "FARE",
  "FOOD",
  "FREN",
  "GEOG",
  "GERM",
  "GREK",
  "HIST",
  "HORT",
  "HTM",
  "HROB",
  "HK",
  "HUMN",
  "INDG",
  "IPS",
  "ISS",
  "UNIV",
  "IBIO",
  "IDEV",
  "ITAL",
  "LARC",
  "LAT",
  "LING",
  "MGMT",
  "MCS",
  "MATH",
  "MICR",
  "MCB",
  "MBG",
  "MUSC",
  "NANO",
  "NEUR",
  "NUTR",
  "OAGR",
  "ONEH",
  "PATH",
  "BIOM",
  "PHIL",
  "PHYS",
  "BIOM",
  "PBIO",
  "POLS",
  "POPM",
  "PORT",
  "PSYC",
  "REAL",
  "SOC",
  "SOAN",
  "SPAN",
  "STAT",
  "SART",
  "THST",
  "TOX",
  "VETM",
  "WMST",
  "ZOO",
];
