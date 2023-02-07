import React, { useEffect, useState } from 'react'
import Slider from '@mui/material/Slider'
import classes from './PageStats.module.css'
import { aggregateInCollection } from '../db/api'

function ResultTable({ data, title }) {
  return (
    <div className={classes.tableContainer}>
      <h2>{title}</h2>
      <table>
        <thead>
          {data.length > 0 && (
              <tr>
                {Object.keys(data[0]).map(key => <th key={key}>{key}</th>)}
              </tr>
            )}
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, index) => <td key={index}>{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}



function PageStats() {
  const [stats, setStats] = useState(1);
  const [result, setResult] = useState({});
  const [title, setTitle] = useState('');

  useEffect(() => {
    console.log(stats);
    if (stats === 10) {
      
    }
    else if (stats === 9) {

    }
    else if (stats === 8) {

    }
    else if (stats === 7) {

    }
    else if (stats === 6) {

    }
    else if (stats === 5) {

    }
    else if (stats === 4) {

    }
    else if (stats === 3) {
      aggregateInCollection('user_worker', [{"$project":{"name":1,"last_name":{"$arrayElemAt":[{"$split":["$name"," "]},1]},"first_name_length":{"$strLenCP":{"$arrayElemAt":[{"$split":["$name"," "]},0]}}}},{"$group":{"_id":"$last_name","count":{"$sum":1},"avg_name_length":{"$avg":"$first_name_length"}}},{"$sort":{"count":-1}},{"$limit":10},{"$project":{"lastname":"$_id","count":1,"avg_name_length":1,"_id":0}}]).then((res) => {
        setResult(res.documents);
        setTitle('Most Common Last Names and Average Name Length')
      })
    }
    else if (stats === 2) {
      aggregateInCollection('user_worker', [{"$unwind":"$experience"},{"$group":{"_id":"$experience.position","averageYears":{"$avg":"$experience.years"},"workersCount":{"$sum":1}}},{"$sort":{"workersCount":-1}},{"$limit":5}]).then((res) => {
        setResult(res.documents);
        setTitle('Most Common Positions and Average Years of Experience')
      })
    }
    else if (stats === 1) {
      aggregateInCollection('user_worker', [{"$unwind":"$education"},{"$group":{"_id":"$education.school","count":{"$sum":1},"degree":{"$first":"$education.degree"}}},{"$sort":{"count":-1}},{"$group":{"_id":"$degree","schools":{"$push":"$_id"}}},{"$project":{"_id":0,"degree":"$_id","schools":{"$slice":["$schools",1]}}}]).then((res) => {
        console.log(res.documents);
        setResult(res.documents);
        setTitle('Most Common School by Degree')
      })
    }
  }, [stats]);

  return (
    <div className={classes.container}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%' }}>
        <Slider
          value={stats}
          
          // invoked when the user drags the thumb
          onChange={(_, newValue) => setStats(newValue)}
          // invoked when the user drops the thumb
          onChangeCommitted={(_, newValue) => setStats(newValue)}

          min={1}
          max={10}
          step={1}
          className="slider"
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
        />
      </div>
      
      {result && title && <ResultTable data={result} title={title} />}
      
    </div>
  );
}

export default PageStats;
