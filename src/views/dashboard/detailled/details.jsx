import React, {useEffect, useState} from 'react'
import style from "./style.module.css"
import {Button, Card, Container, IconButton, TextField} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

import cloudy_light from "../../../assets/cloudy_light.png"
import rain_light from "../../../assets/raining_light.png"
import sunny_light from "../../../assets/sunny_light.png"
import dayjs from "dayjs";
import 'dayjs/locale/fr'




interface Props {
    citySelected: string,
    detailView: void
}

function Details(props: Props) {
    const {citySelected, detailView} = props


    const [forecast, setForecast] = useState([])

    useEffect(() => {
        axios.get(process.env.REACT_APP_OPEN_FORECAST_URL +
            `?lat=${citySelected.lat}&lon=${citySelected.long}&exclude=hourly,minutely&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`).then( (weather) => {
            setForecast(weather.data.daily)
            console.log(weather.data.daily[0])
        })
    }, [])
    console.log(citySelected)

    function weather(weather: string) {
        switch (weather) {
            case "Rain":
                return rain_light
            case "Clouds":
                return cloudy_light
            case "Clear":
                return sunny_light
        }
    }


    return (
        <Container className={style.container}>
            <Button onClick={detailView}>Retour aux villes</Button>
            {
                forecast.map((e, index) =>
                    (
                        <Card className={style.card} key={index}>
                            <p>{dayjs(e.dt * 1000).locale('fr').format('ddd D')}</p>
                            <p className={style.citiesTitle}>{citySelected.name}</p>
                            <img width="200px" src={weather(e.weather[0].main)} alt="weather"/>
                            <p style={{margin: 0, fontSize: "2.5rem"}}>{e.temp.day} °</p>
                            <div className={style.tempContainer}>
                                <div>
                                    <p>{e.temp.min.toFixed()}</p>
                                    <p style={{fontSize: 14, color: "#00FF9B"}}>Min</p>
                                </div>
                                <div>
                                    <p>{e.temp.max.toFixed()}</p>
                                    <p style={{fontSize: 14, color: "#ff0015"}}>Max</p>

                                </div>
                            </div>
                        </Card>
                    )
                )
            }
        </Container>
    )
}

export default Details
