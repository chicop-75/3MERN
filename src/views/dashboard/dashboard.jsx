import React, {useState, useEffect} from 'react'
import style from "./style.module.css"
import {
    AppBar,
    Button,
    Card,
    Container,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    IconButton,
    Switch, TextField,
} from "@material-ui/core";
import axios from "axios";
import cloudy_light from "../../assets/cloudy_light.png"
import rain_light from "../../assets/raining_light.png"
import sunny_light from "../../assets/sunny_light.png"
import {Cancel, ExitToApp} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import Details from "./detailled/details";



function Dashboard() {
    let history = useHistory()
    const user = JSON.parse(window.sessionStorage.getItem("user"))
    const jwt = window.sessionStorage.getItem("JWT")
    const [city, setCities] = useState([])
    const [dialog, setDialog] = useState(false)
    const [newCity, setNewCity] = useState("")
    const [error, setError] = useState("")
    const [details, setDetails] = useState(false)
    const [citySelected, setCitySelected] = useState()

    function getCities() {
        axios.get(process.env.REACT_APP_API_URL + "/cities/" + user._id,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }).then( (cities) => {
            setCities([])
            cities.data.forEach(async (city) => {
                const weatherCity = await axios.get(process.env.REACT_APP_OPEN_WEATHER_URL +
                    `?q=${city}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`)
                setCities(prevState => {
                    console.log([...prevState, weatherCity.data])
                    return [...prevState, weatherCity.data]
                })
            })
        })
    }


    useEffect(() => {
        try {
            setDetails(false)
            getCities()
        }catch (e) {
            console.log(e)
        }
    }, [])


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

    async function addCity() {
        setError("")
        console.log(newCity, user._id)
        try {
            const city = await axios.get(process.env.REACT_APP_OPEN_WEATHER_URL +
                `?q=${newCity}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`)
            await axios.post(process.env.REACT_APP_API_URL + "/cities/" + user._id,{
                cities: city.data.name
                }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }})
            setDialog(false)
            getCities()
        }catch (error) {
            setError("Nous n'avons pas pu trouver la ville")
        }
    }

    function detailView() {
        setDetails(!details)
    }

    async function removeCity(city) {
        try {
            await axios.delete(process.env.REACT_APP_API_URL + "/cities/" + user._id, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                data: {
                    cities: city
                }
            })
            getCities()
        }catch (e) {
            console.log(e)
        }
    }

    function logOut() {
        window.sessionStorage.removeItem("JWT")
        window.sessionStorage.removeItem("user")
        window.location.reload()
    }

    return (
        <div style={{height: "100vh"}}>
            <AppBar className={style.navbar} position="static">
                <p style={{color: "#432C85", fontWeight: 400}}>Minimis</p>
                <p style={{fontWeight: 600, textTransform: "uppercase"}}>today</p>
                <div>
                    <p>LIGHT</p>
                    <Switch/>
                    <p>DARK</p>
                    <IconButton onClick={logOut} style={{color: "#ff0015", marginLeft: 30}}>
                        <ExitToApp/>
                    </IconButton>

                </div>

            </AppBar>
            { !details ?
               <>
                   <Container className={style.container}>
                       {
                           city.map( (e) => (
                               <Card onClick={() => {setCitySelected({lat: e.coord.lat, long: e.coord.lon, name: e.name}); detailView()}} className={style.card} key={e.id}>
                                   <IconButton onClick={() => removeCity(e.name)} style={{color: "#ff0015"}}>
                                       <Cancel />
                                   </IconButton>
                                   <p className={style.citiesTitle}>{e.name}</p>
                                   <img width="200px" src={weather(e.weather[0].main)} alt="weather"/>
                                   <p style={{margin: 0, fontSize: "2.5rem"}}>{e.main.temp} °</p>
                                   <div className={style.tempContainer}>
                                       <div>
                                           <p>{e.main.temp_min.toFixed()}</p>
                                           <p style={{fontSize: 14, color: "#00FF9B"}}>Min</p>
                                       </div>
                                       <div>
                                           <p>{e.main.temp_max.toFixed()}</p>
                                           <p style={{fontSize: 14, color: "#ff0015"}}>Max</p>

                                       </div>
                                   </div>
                               </Card>

                           ))
                       }
                       <Card onClick={() => {setDialog(true)}} className={style.addCities}>
                           <p className={style.citiesTitle}>add Cities</p>
                       </Card>
                       <Dialog open={dialog}>
                           <div className={style.dialog}>
                               <DialogTitle id="alert-dialog-slide-title">{"Ajouter une Ville"}</DialogTitle>
                               <TextField
                                   error={error.length > 0}
                                   helperText={error.length > 0 && error}
                                   style={{width: "100%"}}
                                   required={true}
                                   value={newCity}
                                   onChange={e => setNewCity(e.target.value)}
                                   id="outlined-basic"
                                   variant="outlined"
                               />

                               <DialogContent>

                               </DialogContent>
                               <DialogActions>
                                   <Button onClick={() => {setDialog(false)}} color="secondary">
                                       Annuler
                                   </Button>
                                   <Button onClick={addCity} disabled={newCity.length <= 0} color="primary">
                                       Ajouter
                                   </Button>
                               </DialogActions>
                           </div>

                       </Dialog>
                   </Container>
               </> :
                <Details detailView={detailView} citySelected={citySelected}/>
            }

        </div>
    )
}

export default Dashboard
