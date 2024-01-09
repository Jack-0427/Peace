import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useNavigate } from "react-router-dom"; 

const useStyles = makeStyles((theme) => ({
  button: {
    width: '300px',
    height: '300px',
    backgroundColor: 'black',
    color: 'white',
    margin: '50px',
    fontSize: '24px',
    fontWeight: 'bold',
    borderRadius: '50%',
    transition: 'background-color 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
    },
  },
}));

const ThreeFloatingButtons = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Button className={classes.button} onClick={() => { navigate('/allRecords')} } variant="contained">
        器官捐贈移植
      </Button>
      <Button className={classes.button} onClick={() => { navigate('/allStates')} }variant="contained">
        病人自主及安寧緩和
      </Button>
      <Button className={classes.button} onClick={() => { navigate('/allServices')} }variant="contained">
        線上服務申請
      </Button>
    </div>
  );
};

export default ThreeFloatingButtons;
