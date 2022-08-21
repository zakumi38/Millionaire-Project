import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import {
    Theme,
    ThemeProvider,
    createTheme,
    Typography,
    CssBaseline,
    PaletteOptions,
} from "@mui/material"
import { red } from "@mui/material/colors"
import { PaletteColorOptions } from "@mui/material"

/*
Only if additional colors are necessary 
     else use MUI 7*4 built-in theme colors to customize   

import "@mui/material/styles/createPalette"
import { PaletteColorOptions } from "@mui/material"

declare module "@mui/material/styles/createPalette" {
    interface PaletteOptions {
        customRedColor?: PaletteColorOptions
    }
}

customRedColor: {
    main: red[500],
},
To use custom variable color in mui component,augment that component as shown above
                            ↓↓  ↓↓  ↓↓  ↓↓  ↓↓  ↓↓
                            Implementation ...Soon
*/
const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#ff0000",
        },
    },
})
const Home: NextPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Typography color="primary">Login Page</Typography>
        </ThemeProvider>
    )
}

export default Home
