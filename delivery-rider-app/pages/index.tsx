import { useState } from "react"
import type { NextPage } from "next"
import { AxiosResponse } from "axios"
import api from "../axios-api/axios"

// Files
import { Grid, Avatar, Typography, Icon, Modal, Button, Badge } from "@mui/material"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import homeStyle from "./index.module.scss"

interface User {
    username: string
    email: string
    imagePath: string
    totalPayment: number
    percentage: number
    income: number
    completed: number
}

interface Props {
    userCredentials: User
}

const Home: NextPage<Props> = ({ userCredentials }) => {
    // Modal Toggle
    const [userModal, setUserModal] = useState(false)
    const handleOpen = () => {
        setUserModal(true)
    }
    const handleClose = () => {
        setUserModal(false)
    }
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
                    <Button onClick={handleOpen}>
                        <Avatar
                            alt="profile-pic"
                            sx={{ width: 45, height: 45 }}
                            src={userCredentials.imagePath}
                        />
                    </Button>
                    {/*User modal*/}
                    <Modal
                        open={userModal}
                        onClose={handleClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Grid container width="320px" px={3} py={1} position="absolute" top="30%" left="50%"
                              boxShadow={24}
                              className={homeStyle.userModal} alignItems="center">
                            <Grid item xs={3}>
                                <Avatar
                                    alt="profile-pic"
                                    sx={{ width: 45, height: 45 }}
                                    src={userCredentials.imagePath}
                                />
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="h6">{userCredentials.username}</Typography>
                                <Typography variant="body2">
                                    {userCredentials.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={homeStyle.info} px={2} mt={2} height="35px" lineHeight="35px">
                                Total Payment : {userCredentials.totalPayment}
                            </Grid>
                            <Grid item xs={12} className={homeStyle.info} px={2} mt={2} height="35px" lineHeight="35px">
                                Percentage : {userCredentials.percentage}
                            </Grid>
                            <Grid item xs={12} className={homeStyle.info} px={2} mt={2} height="35px" lineHeight="35px">
                                Income : {userCredentials.income}
                            </Grid>
                            <Grid item xs={12} className={homeStyle.info} px={2} my={2} height="35px" lineHeight="35px">
                                Completed : {userCredentials.completed}
                            </Grid>
                        </Grid>
                    </Modal>
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
            userCredentials: data
        }
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
