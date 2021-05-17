import React, {useState} from 'react'
import style from "./style.module.css"
import {Button, Container, TextField} from "@material-ui/core";
import axios from "axios";
import {useHistory} from "react-router-dom";


function Home () {
        let history = useHistory()
        const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        async function login() {
            try {
                const token = await axios.post(process.env.REACT_APP_API_URL + '/login',
                    {email: email, password: password})
                window.sessionStorage.setItem("JWT", token.data.token)
                window.sessionStorage.setItem("user", JSON.stringify(token.data.user))
                history.push("/dashboard")
            }catch (e) {
                console.log()
            }
        }
        return (
            <Container className={style.container}>
                <p className={style.welcome}>Bienvenue sur SupWeather</p>
                <div className={style.card}>
                    <p style={{margin: 0}}>Email</p>
                    <TextField required={true}
                               error={!emailRegex.test(email) && email.length > 0}
                               helperText={!emailRegex.test(email) && email.length > 0 && "Email Invalid"}
                               value={email}
                               onChange={e => setEmail(e.target.value)}
                               id="outlined-basic"
                               label="email"
                               variant="outlined" />
                     <p style={{margin: 0}}>Password</p>
                    <TextField error={password.length < 6 && password.length > 0}
                               helperText={password.length < 6 && password.length > 0 && "Password Invalid"}
                               required={true}
                               value={password}
                               onChange={e => setPassword(e.target.value)}
                               id="standard-password-input"
                               label="Password"
                               type="password"
                               autoComplete="current-password"
                               variant="outlined"/>
                    <div className={style.buttons} style={{width: "100%"}}>
                        <Button disabled={!emailRegex.test(email) || password.length < 6} onClick={login} style={{width: "inherit"}} variant="contained" color="primary" disableElevation>
                            Sign in
                        </Button>
                        <a style={{width: "inherit", color: "blue", textDecoration: "none"}} href="/signUp">Create an Account</a>
                    </div>
                    </div>


            </Container>
        )
}

export default Home
