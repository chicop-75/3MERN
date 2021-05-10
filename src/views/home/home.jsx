import React, {Component} from 'react'
import style from "./style.module.css"
import {Button, Container, TextField} from "@material-ui/core";


export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            email: ""
        }
    }


    render() {

        function login() {
            try {
                console.log("login", process.env.REACT_APP_API_URL)
            }catch (e) {
                console.log(e)
            }
        }
        return (
            <Container className={style.container}>
                <p className={style.welcome}>Bienvenue sur SupWeather</p>
                <div className={style.card}>
                    <p style={{margin: 0}}>Email</p>
                    <TextField value={this.state.email} id="outlined-basic" label="email" variant="outlined" />
                     <p style={{margin: 0}}>Password</p>
                    <TextField value={this.state.password} id="standard-password-input" label="Password" type="password" autoComplete="current-password" variant="outlined"/>
                    <div className={style.buttons} style={{width: "100%"}}>
                        <Button onClick={login} style={{width: "inherit"}} variant="contained" color="primary" disableElevation>
                            Sign in
                        </Button>
                        <a style={{width: "inherit", color: "blue", textDecoration: "none"}} href="/signUp">Create an Account</a>
                    </div>
                    </div>


            </Container>
        )
    }
}
