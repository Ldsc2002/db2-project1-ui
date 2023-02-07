import React, { useState } from 'react'
import Slider from '@mui/material/Slider'
import classes from './PageStats.module.css'

function PageStats() {
  const [stats, setStats] = useState(0);

  const handleSliderChange = (event, newValue) => {
    setStats(newValue);
  };

  return (
    <div className={classes.container}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%' }}>
        <Slider
          value={stats}
          onChange={handleSliderChange}
          min={0}
          max={10}
          step={1}
          className="slider"
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
        />
      </div>
      
    </div>
  );
}

export default PageStats;
