import { useState, useEffect } from 'react';
import './App.css';
import useFullPageLoader from "./hooks/useFullPageLoader";
import { Container, Typography, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import Slider from "react-slick";
import WeatherCard from './WeatherCard';
import { Bar } from 'react-chartjs-2';
import useStyles from './styles';
var moment = require('moment');

const App = () => {

  // State
  const [days, setDays] = useState(null)
  const [unit, setUnit] = useState("imperial")
  const [cardId, setCardId] = useState("0")
  const [chart, setChart] = useState(null)

  // API
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Munich,&units=${unit}&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40`;
  const apiUrlTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=48.1550547&lon=11.4017514&appid=75f972b80e26f14fe6c920aa6a85ad57&units=${unit}`;

  const classes = useStyles();
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(() => {
    const fetchCardData = () => {
      showLoader();
      fetch(apiUrlTwo)
      .then((res) => res.json())
      .then((data) => {
        setDays(data);
        hideLoader();
      });
    }
    fetchCardData()
  }, [unit]) 

  useEffect(() => {

    async function fetchChartData () {
      const response = await fetch(apiUrl)
      const json = await response.json()
      .then((json) => {
        
        let newDate = new Date();
        let dayOne = moment(newDate).format('YYYY-MM-DD')
        let dayTwo = moment(newDate).add(1,'days').format('YYYY-MM-DD')
        let dayThree = moment(newDate).add(2,'days').format('YYYY-MM-DD')
        let dayFour = moment(newDate).add(3,'days').format('YYYY-MM-DD')
        let dayFive = moment(newDate).add(4,'days').format('YYYY-MM-DD')
  
        const dayOneMatch = json.list.filter(match => match.dt_txt.includes(dayOne))
        const dayTwoMatch = json.list.filter(match => match.dt_txt.includes(dayTwo))
        const dayThreeMatch = json.list.filter(match => match.dt_txt.includes(dayThree))
        const dayFourMatch = json.list.filter(match => match.dt_txt.includes(dayFour))
        const dayFiveMatch = json.list.filter(match => match.dt_txt.includes(dayFive))

        const dayOneData = dayOneMatch.map((item) => {
          return item.main.temp
        });
        const dayTwoData = dayTwoMatch.map((item) => {
          return item.main.temp
        });
        const dayThreeData = dayThreeMatch.map((item) => {
          return item.main.temp
        });
        const dayFourData = dayFourMatch.map((item) => {
          return item.main.temp
        });
        const dayFiveData = dayFiveMatch.map((item) => {
          return item.main.temp
        });

        const renderChart = () => {
          {cardId == '0' ? setChart(dayOneData) : cardId == '1' ? setChart(dayTwoData) :
           cardId == '2' ? setChart(dayThreeData) : cardId == '3' ? setChart(dayFourData) :
           cardId == '4' ? setChart(dayFiveData) : setChart()
          }
        } 
        renderChart()

      });
      
    }
    fetchChartData()
  }, [unit, cardId])

  const weatherCard = (weatherCardId) => {
    setCardId(weatherCardId)
  }

  const updateForecastDegree = newDegreeType => {
    setUnit(newDegreeType)
  }
  
  var settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1
  };  

  return (
   <>
    <main>
      <div className={classes.container}>   
      
      <Container maxWidth="md">
        <Typography variant="h3" align="center" color="textPrimary" className={classes.heading} gutterBottom>
          5 Day Forecast, Munich
        </Typography>

        <RadioGroup row aria-label="position" className={classes.radio} name="position" defaultValue="imperial">
          <FormControlLabel value="metric" onChange={event => updateForecastDegree(event.target.value)} control={<Radio color="primary" />} label="Celcius" />
          <FormControlLabel value="imperial" onChange={event => updateForecastDegree(event.target.value)} control={<Radio color="primary" />} label="Fahrenheit" />
        </RadioGroup>
      </Container>     
        
      <Container className={classes.cardGrid} maxWidth="md">       
        <Slider {...settings}>
        {days && days.daily.slice(0, 5).map((day, index) => (
          <WeatherCard day={day} index={index} key={index} weatherCard={weatherCard} unit={unit} />
        ))}
        </Slider>       
      </Container>
              
      <Container className={classes.barContainer} maxWidth="md">
        <Bar
          data={{
            labels: chart,
            datasets: [
              {
                label: "Temp",
                data: chart,
                borderWidth: 3,
              }, 
            ],
          }}
          options={{
            legend: {
              display: false
          },
          }}
        />
      </Container>
      
      </div>
    </main>
    {loader}
    </>
  );
}

export default App;