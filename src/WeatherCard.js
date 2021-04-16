import React from 'react'
import { Typography, Card, CardContent } from '@material-ui/core';
import useStyles from './styles';
var moment = require('moment');

const CardComponent = ({day, index, weatherCard, unit}) => {

 const classes = useStyles();
 const imgURL = "owf owf-"+ day.weather[0].id +" owf-5x weatherIconColor"

 let newDate = new Date();
 const weekday = day.dt * 1000
 newDate.setTime(weekday)

 return (
  <>

  <Card className={classes.card} key={index} id={index} onClick={() => weatherCard(index)} >
    <CardContent classname={classes.cardContent}> 
    
    <Typography variant="subtitle1" color="textSecondary">
      {moment(newDate).format('DD MMMM YY')}
    </Typography>     
    <Typography variant="h4" className={classes.temp}>
      <span className={classes.tempMax}>{Math.round(day.temp.max)}</span> / <span className={classes.tempMin}>{Math.round(day.temp.min)}</span> {unit == 'imperial' ? '°F' : '°C'}
    </Typography>
    <i className={imgURL}></i>
    <Typography variant="body2" color="textSecondary">
      {day.weather[0].description}
    </Typography>
    </CardContent>
  </Card>

  </>
 )
}

export default CardComponent
