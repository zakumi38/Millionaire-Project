import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#ff0000",
        },
    },
    typography: {
        body1: {
            fontWeight: 700,
            fontSize: "1.2rem",
        },
        body2: {
            fontWeight: 100,
            color: "#0000005c",
        },
    },
})
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
