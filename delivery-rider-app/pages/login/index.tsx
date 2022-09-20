import type { NextPage } from "next"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { DirectionsBike } from "@mui/icons-material"
import loginStyles from "./login.module.scss"
import { useState } from "react"
import axios from "axios"

const Index: NextPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    async function submit() {
        const response = await axios
            .post(
                "http://localhost:3001/login",
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res)
                const {
                    name,
                    email,
                    phoneNumber,
                    todayIncome,
                    photoUrl,
                    previousPayments,
                } = res.data.user
                console.log(
                    [
                        name,
                        email,
                        phoneNumber,
                        todayIncome,
                        photoUrl,
                        previousPayments,
                    ].join("-")
                )
                return true
            })
            .catch((err) => false)
        if (!response) return setError("Email or Password is incorrect!")
        window.location.href = "http://localhost:3000"
    }
    return (
        <Container maxWidth="lg" className={loginStyles.container}>
            <Box className={loginStyles.box}>
                <div className={loginStyles.logo}>
                    <DirectionsBike />
                </div>

                <TextField
                    value={email}
                    color="info"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    className={loginStyles.input}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    value={password}
                    color="info"
                    label="Password"
                    variant="outlined"
                    type="password"
                    className={loginStyles.input}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                    <Typography
                        color="error"
                        variant="body1"
                        fontSize={12}
                        marginTop="-10px"
                        marginBottom="20px"
                    >
                        {error}
                    </Typography>
                )}
                <Button
                    variant="outlined"
                    className={loginStyles.login}
                    onClick={submit}
                >
                    Login
                </Button>
            </Box>
        </Container>
    )
}
export default Index
