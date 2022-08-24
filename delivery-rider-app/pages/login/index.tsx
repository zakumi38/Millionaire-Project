import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"

// Files
import loginStyles from "./login.module.scss"
import { Box, Button, Container, TextField } from "@mui/material"

const Index: NextPage = () => {
    return (
        <Container maxWidth="lg" className={loginStyles.container}>
            <Box
                className={loginStyles.box}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                border="3px solid #000"
                padding="3rem 1rem 5rem"
                width="100%"
                boxShadow="4px 4px 4px 7px rgba(0,0,0,0.25)"
                overflow="hidden"
                borderRadius="20px"
            >
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
