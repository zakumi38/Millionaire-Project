import type { NextPage } from "next"
import { Box, Button, Container, TextField } from "@mui/material"
import { DirectionsBike } from "@mui/icons-material"
import loginStyles from "./login.module.scss"
import Link from "next/link"

const Index: NextPage = () => {
    return (
        <Container maxWidth="lg" className={loginStyles.container}>
            <Box className={loginStyles.box}>
                <div className={loginStyles.logo}>
                    <DirectionsBike />
                </div>

                <TextField
                    color="info"
                    id="outlined-basic"
                    label="Email or Password"
                    variant="outlined"
                    className={loginStyles.input}
                />
                <TextField
                    color="info"
                    label="Password"
                    variant="outlined"
                    type="password"
                    className={loginStyles.input}
                />
                <Link href="/forgetPassword">
                    <a>Forget Password?</a>
                </Link>
                <Button variant="outlined" className={loginStyles.login}>
                    Login
                </Button>
            </Box>
        </Container>
    )
}
export default Index
