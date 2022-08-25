import { useState } from "react"
import type { NextPage } from "next"
import { AxiosResponse } from "axios"
import api from "../axios-api/axios"

// Files
import {
    Grid,
    Avatar,
    Typography,
    Icon,
    Modal,
    Badge,
    SwipeableDrawer,
    Box,
    Skeleton,
} from "@mui/material"
import Button, { ButtonProps } from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import homeStyle from "./index.module.scss"
import { Global } from "@emotion/react"

interface OrderedList {
    id: number
    destination: string
    shopLocation: string
    food: string
}

interface User {
    username: string
    email: string
    imagePath: string
    totalPayment: number
    percentage: number
    income: number
    completed: number
    orderedList: [OrderedList]
}

interface Props {
    userCredentials: User
}

// To change the color of list icon
const ListButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "#000000",
}))

const Home: NextPage<Props> = ({ userCredentials }) => {
    // User Modal Toggle
    const [userModal, setUserModal] = useState(false)
    const handleUserModalOpen = () => setUserModal(true)
    const handleUserModalClose = () => setUserModal(false)

    // List Modal Toggle
    const [listModal, setListModal] = useState(false)
    const handleListModalOpen = () => setListModal(true)
    const handleListModalClose = () => setListModal(false)

    // Toggle Drawer
    /*
        Set the draggable size of the edge drawer.
        This should be the same as the height of the revealed part of that drawer.
     */
    const drawerBleeding: number = 98
    const [open, setOpen] = useState(false)
    const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen)

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
                    <Button onClick={handleUserModalOpen}>
                        <Avatar
                            alt="profile-pic"
                            sx={{ width: 45, height: 45 }}
                            src={userCredentials.imagePath}
                        />
                    </Button>
                    {/*User modal*/}
                    <Modal
                        open={userModal}
                        onClose={handleUserModalClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Grid
                            container
                            width="320px"
                            px={3}
                            py={1}
                            position="absolute"
                            top="30%"
                            left="50%"
                            boxShadow={24}
                            className={homeStyle.userModal}
                            alignItems="center"
                        >
                            <Grid item xs={3}>
                                <Avatar
                                    alt="profile-pic"
                                    sx={{ width: 45, height: 45 }}
                                    src={userCredentials.imagePath}
                                />
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="h6">
                                    {userCredentials.username}
                                </Typography>
                                <Typography variant="body2">
                                    {userCredentials.email}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                className={homeStyle.info}
                                px={2}
                                mt={2}
                                height="35px"
                                lineHeight="35px"
                            >
                                Total Payment : {userCredentials.totalPayment}
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                className={homeStyle.info}
                                px={2}
                                mt={2}
                                height="35px"
                                lineHeight="35px"
                            >
                                Percentage : {userCredentials.percentage}
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                className={homeStyle.info}
                                px={2}
                                mt={2}
                                height="35px"
                                lineHeight="35px"
                            >
                                Income : {userCredentials.income}
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                className={homeStyle.info}
                                px={2}
                                my={2}
                                height="35px"
                                lineHeight="35px"
                            >
                                Completed : {userCredentials.completed}
                            </Grid>
                        </Grid>
                    </Modal>
                </Grid>
                <Grid item>
                    <ListButton onClick={handleListModalOpen} variant="text">
                        <Badge badgeContent={4} color={"primary"}>
                            <Icon
                                component={FormatListBulletedIcon}
                                className={homeStyle.listIcon}
                            />
                        </Badge>
                    </ListButton>
                    {/*List Modal*/}
                    <Modal
                        open={listModal}
                        onClose={handleListModalClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Grid
                            container
                            width="320px"
                            position="absolute"
                            top="50%"
                            left="50%"
                            boxShadow={24}
                            className={homeStyle.listModal}
                            alignItems="center"
                        >
                            {userCredentials.orderedList.map((item, index) => (
                                <Grid
                                    item
                                    container
                                    p={1}
                                    className={homeStyle.listModalItem}
                                    key={index}
                                >
                                    <Grid item xs={5} fontWeight={600}>
                                        Destination
                                    </Grid>
                                    <Grid
                                        item
                                        xs={7}
                                        textAlign="end"
                                        fontWeight={400}
                                    >
                                        {item.destination}
                                    </Grid>
                                    <Grid item xs={5} fontWeight={600}>
                                        Shop Location
                                    </Grid>
                                    <Grid
                                        item
                                        xs={7}
                                        textAlign="end"
                                        fontWeight={400}
                                    >
                                        {item.shopLocation}
                                    </Grid>
                                    <Grid item xs={5} fontWeight={600}>
                                        Food
                                    </Grid>
                                    <Grid
                                        item
                                        xs={7}
                                        textAlign="end"
                                        fontWeight={400}
                                    >
                                        {item.food}
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Modal>
                </Grid>
            </Grid>

            {/* Map */}

            <Grid container item xs={12} className={homeStyle.map}>
                {/* DragUp Bar */}
                <SwipeableDrawer
                    anchor="bottom"
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    swipeAreaWidth={drawerBleeding}
                    disableSwipeToOpen={false}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {/*Revealed Part of edge drawer*/}
                    <Box
                        sx={{ top: -drawerBleeding }}
                        className={homeStyle.revealedBar}
                    >
                        <Grid
                            container
                            item
                            justifyContent="center"
                            height="max-content"
                        >
                            <div className={homeStyle.pill} />
                        </Grid>
                        <Grid
                            container
                            item
                            xs={12}
                            justifyContent="space-between"
                        >
                            <Typography variant="body2">
                                Distance: 0.7km
                            </Typography>
                            <Typography variant="body2">(15 Min)</Typography>
                        </Grid>
                        <Grid container item xs={12}>
                            <Typography variant="body1">
                                No.10, 10th St, 10 Quarter, Hlaing
                            </Typography>
                        </Grid>
                    </Box>
                    {/*Hidden Part of edge drawer*/}
                    <Box height="100%" overflow="auto" px={2} pb={2}>
                        <Skeleton variant="rectangular" height="100%" />
                    </Box>
                </SwipeableDrawer>
            </Grid>
            {/*Global style required for edge drawer to work*/}
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        overflow: "visible",
                    },
                }}
            />
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
