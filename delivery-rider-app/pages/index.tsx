import type { NextPage, GetStaticProps } from "next"
import { Grid, Avatar, Typography, Badge } from "@mui/material"
import api from "../axios-api/axios"
import { AxiosResponse } from "axios"
import homeStyle from "./index.module.scss"

interface User {
    username: string
    email: string
    imagePath: string
}
interface Props {
    userCredentials: User
}

const Home: NextPage<Props> = ({ userCredentials }) => {
    return (
        <Grid container maxWidth={"600px"} height="100vh">
            {/*  Container */}

            {/* NavBar */}
            <Grid
                container
                item
                xs={12}
                alignItems="center"
                justifyContent="space-between"
                className={homeStyle.navBar}
            >
                <Grid item>
                    <Avatar
                        alt="profile-pic"
                        sx={{ width: 45, height: 45 }}
                        src={userCredentials.imagePath}
                    />
                </Grid>
                <Grid item>
                    <Badge badgeContent={4} color={"primary"}>
                        <Icon component={FormatListBulletedIcon} className={homeStyle.listIcon} />
                    </Badge>
                </Grid>
            </Grid>

            {/* Map */}

            <Grid container item xs={12} className={homeStyle.map}>
                {/* DragUp Bar */}
                <Grid container item xs={12} className={homeStyle.dragUpbar}>
                    <Grid
                        container
                        item
                        justifyContent="center"
                        height="max-content"
                    >
                        <div className={homeStyle.pill} />
                    </Grid>
                    <Grid container item xs={12} justifyContent="space-between">
                        <Typography variant="body2">Distance: 0.7km</Typography>

                        <Typography variant="body2">(15 Min)</Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        <Typography variant="body1">
                            No.10, 10th St, 10 Quarter, Hlaing
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home

export async function getStaticProps() {
    const response: AxiosResponse = await api.get("/profile")
    const data: User = response.data
    return {
        props: {
            userCredentials: data,
        },
    }
}

/*
Only if additional colors are necessary
     else use MUI 7*4 built-in theme colors to customize

// import "@mui/material/styles/createPalette"
import { PaletteColorOptions } from "@mui/material"

declare module "@mui/material/styles/createPalette" {
    interface PaletteOptions {
        customRedColor?: PaletteColorOptions,
        other?:PaletteColorOptions
    }
}

customRedColor: {
    main: red[500],
},
// To use custom variable color in mui component,augment that component as shown above
                            // ↓↓  ↓↓  ↓↓  ↓↓  ↓↓  ↓↓
                            // Implementation ...Soon
                            */
