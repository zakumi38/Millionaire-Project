import type { NextPage } from "next"
import { Box, Button, Container, TextField } from "@mui/material"
import Image from "next/image"
import loginStyles from "./login.module.scss"
import Link from "next/link"

const Index: NextPage = () => {
    return (
        <Container maxWidth="lg" className={loginStyles.container}>
            <Box className={loginStyles.box}>
                <Image
                    src="/images/login/logo.svg"
                    width="40"
                    height="100%"
                    alt="logo"
                    className={loginStyles.logo}
                />
                <TextField
                    label="Email or Password"
                    variant="outlined"
                    className={loginStyles.input}
                />
                <TextField
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
