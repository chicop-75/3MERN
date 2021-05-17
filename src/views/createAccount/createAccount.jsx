import React, {useState} from 'react'
import style from "./style.module.css"
import {Button, Container, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import axios from "axios";


function SignUp () {

    let history = useHistory()
    const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPwd, setConfirmPwd] = useState("")

    async function signUp() {
        try {
          await axios.post(process.env.REACT_APP_API_URL + "/register", {
              email: email,
              password: password
          })
            history.push("/login")
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <Container className={style.container}>
            <p className={style.welcome}>Bienvenue sur SupWeather</p>
            <div className={style.card}>
                <p style={{margin: 0}}>Email</p>
                <TextField
                    required={true}
                    error={!emailRegex.test(email) && email.length > 0}
                    helperText={!emailRegex.test(email) && email.length > 0 && "Email Invalid"}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    id="outlined-basic"
                    label="email"
                    variant="outlined" />
                <p style={{margin: 0}}>Mot de passe</p>
                <TextField
                    error={password.length < 6 && password.length > 0}
                    helperText={password.length < 6 && password.length > 0 && "Password Invalid"}
                    required={true}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    label="Mot de passe"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"/>
                <p style={{margin: 0}}>Confirmer mot de passe</p>
                <TextField
                    error={confirmPwd !== password}
                    helperText={confirmPwd !== password && "les mot de passes ne sont pas identiques"}
                    required={true}
                    value={confirmPwd}
                    onChange={e => setConfirmPwd(e.target.value)}
                    id="standard-password-input"
                    label="Mot de passe"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"/>
                <div className={style.buttons} style={{width: "100%"}}>
                    <Button onClick={signUp} disabled={password !== confirmPwd || email.length <= 0 || password <= 0 || !emailRegex.test(email)} style={{width: "inherit"}} variant="contained" color="primary" disableElevation>
                        Sign Up
                    </Button>
                </div>
            </div>


        </Container>
    )
}

export default SignUp
