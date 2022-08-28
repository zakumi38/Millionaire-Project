import { useEffect, useState, useMemo } from "react"
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
} from "@mui/material"
import Button, { ButtonProps } from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import { FormatListBulleted } from "@mui/icons-material"
import homeStyle from "./index.module.scss"
import { Global } from "@emotion/react"
import OrderListItem from "../components/OrderListItem"
import dynamic from "next/dynamic"

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
    completedOrders: [OrderedList]
}

interface Orders {
    id: number
    shopName: string
    shopAddress: string
    items: [
        {
            name: string
            quantity: number
        }
    ]
}

interface Props {
    userCredentials: User
    orders: [Orders]
}
interface userLocations {
    latitude: number
    longitude: number
}
// To change the color of list icon
const ListButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "#000000",
}))
const Home: NextPage<Props> = ({ userCredentials, orders }) => {
    const [locations, setLocations] = useState({ latitude: 10, longitude: 10 })
    // User Modal Toggle
    const [userModal, setUserModal] = useState<boolean>(false)
    const MemorizedMap = useMemo(() => {
        return dynamic(() => import("../components/map"), {
            ssr: false,
        })
    }, [locations])

    // List Modal Toggle
    const [listModal, setListModal] = useState<boolean>(false)

    // Toggle Drawer
    /*
        Set the draggable size of the edge drawer.
        This should be the same as the height of the revealed part of that drawer.
     */
    const drawerBleeding: number = 98
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    // getlocations
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocations({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            })
        }
    }, [])
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
                    <Button onClick={() => setUserModal(true)}>
                        <Avatar
                            alt="profile-pic"
                            sx={{ width: 45, height: 45 }}
                            src={userCredentials.imagePath}
                        />
                    </Button>
                    {/*User modal*/}
                    <Modal
                        open={userModal}
                        onClose={() => setUserModal(false)}
                        aria-labelledby="User Profile"
                        aria-describedby="Modal for User Profile"
                    >
                        <Grid
                            container
                            width="320px"
                            px={3}
                            py={1}
                            position="absolute"
                            top="240px"
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
                            <Grid item xs={8}>
                                <Typography variant="body2">
                                    {userCredentials.username}
                                </Typography>
                                <Typography variant="body2">
                                    {userCredentials.email}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                container
                                justifyContent="space-between"
                                xs={12}
                                className={homeStyle.info}
                                px={2}
                                mt={2}
                                height="35px"
                                lineHeight="35px"
                            >
                                <Grid item xs={8}>
                                    Total Payment
                                </Grid>
                                <Grid item xs={1}>
                                    :
                                </Grid>
                                <Grid
                                    container
                                    item
                                    xs={3}
                                    justifyContent="flex-end"
                                >
                                    {userCredentials.totalPayment}
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                container
                                justifyContent="space-between"
                                xs={12}
                                className={homeStyle.info}
                                px={2}
                                mt={2}
                                height="35px"
                                lineHeight="35px"
                            >
                                <Grid item xs={8}>
                                    Percentage
                                </Grid>
                                <Grid item xs={1}>
                                    :
                                </Grid>
                                <Grid
                                    container
                                    item
                                    xs={3}
                                    justifyContent="flex-end"
                                >
                                    {userCredentials.percentage}
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                container
                                justifyContent="space-between"
                                className={homeStyle.info}
                                px={2}
                                mt={2}
                                height="35px"
                                lineHeight="35px"
                            >
                                <Grid item xs={8}>
                                    Income
                                </Grid>
                                <Grid item xs={1}>
                                    :
                                </Grid>
                                <Grid
                                    container
                                    item
                                    xs={3}
                                    justifyContent="flex-end"
                                >
                                    {userCredentials.income}
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                container
                                justifyContent="space-between"
                                className={homeStyle.info}
                                px={2}
                                mt={2}
                                height="35px"
                                lineHeight="35px"
                            >
                                <Grid item xs={8}>
                                    Completed
                                </Grid>
                                <Grid item xs={1}>
                                    :
                                </Grid>
                                <Grid
                                    container
                                    item
                                    xs={3}
                                    justifyContent="flex-end"
                                >
                                    {userCredentials.completed}
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                item
                                xs={12}
                                alignItems="center"
                                className={homeStyle.info}
                                px={2}
                                my={2}
                                height="35px"
                                lineHeight="35px"
                            >
                                Settings
                            </Grid>
                        </Grid>
                    </Modal>
                </Grid>
                <Grid item>
                    <ListButton
                        onClick={() => setListModal(true)}
                        variant="text"
                    >
                        <Badge badgeContent={4} color={"primary"}>
                            <Icon
                                component={FormatListBulleted}
                                className={homeStyle.listIcon}
                            />
                        </Badge>
                    </ListButton>
                    {/*List Modal*/}
                    <Modal
                        open={listModal}
                        onClose={() => setListModal(false)}
                        aria-labelledby="completed-order-list"
                        aria-describedby="modal-for-completed-order-list"
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
                            {userCredentials.completedOrders.map(
                                (item, index) => (
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
                                )
                            )}
                        </Grid>
                    </Modal>
                </Grid>
            </Grid>

            {/* Map */}

            <Grid container item xs={12} className={homeStyle.map}>
                {/* DragUp Bar */}
                <MemorizedMap {...locations} />
                <SwipeableDrawer
                    anchor="bottom"
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                    onOpen={() => setOpenDrawer(true)}
                    swipeAreaWidth={drawerBleeding}
                    hysteresis={0.1}
                    disableDiscovery={true}
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
                            <div
                                className={homeStyle.pill}
                                onClick={(e) => setOpenDrawer(!openDrawer)}
                            />
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
                    <Box
                        height="100%"
                        overflow="auto"
                        py={2}
                        className={homeStyle.hiddenPart}
                    >
                        {orders.map((item, index) => (
                            <OrderListItem key={index} item={item} />
                        ))}
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
    const orders: AxiosResponse = await api.get("/orders")
    const orderData: Orders = orders.data
    return {
        props: {
            userCredentials: data,
            orders: orderData,
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
