import React, {Component} from 'react'
import style from "./style.module.css"
import {Button, Container, TextField} from "@material-ui/core";


export class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    render() {
        return (
            <Container className={style.container}>
                <p className={style.welcome}>Bienvenue sur SupWeather</p>
                <div className={style.card}>
                    <p style={{margin: 0}}>Email</p>
                    <TextField id="outlined-basic" label="email" variant="outlined" />
                    <p style={{margin: 0}}>Password</p>
                    <TextField id="standard-password-input" label="Password" type="password" autoComplete="current-password" variant="outlined"/>
                    <div className={style.buttons} style={{width: "100%"}}>
                        <Button style={{width: "inherit"}} variant="contained" color="primary" disableElevation>
                            Sign Up
                        </Button>
                    </div>
                </div>


            </Container>
        )
    }
}
