import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const styles = {
    button: {
        width: "80%",
        padding: "13.5px 16px",
    }
}

export default function TeamsButton() {
  
  const handleClick = () => {
    axios.get("/api/getTeams", () => {
    }).then(res => {
      console.log(res);
    }).catch(err => console.log(err));
  };
  
  return (
    <Button
    style={styles.button}
    variant="outlined"
    onClick={handleClick}>
        All Teams
    </Button>
  )
}
