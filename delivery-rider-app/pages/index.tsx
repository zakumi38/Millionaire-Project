// Next
import type { NextPage } from "next"
import dynamic from "next/dynamic"
import _ from "next/amp"
//  Hooks
import { useEffect, useState, useMemo } from "react"
//  Axios
import api from "axios-api/axios"
import axios, { AxiosResponse } from "axios"
// UI Libraries
import {
    Grid,
    Avatar,
    Typography,
    Icon,
    Modal,
    Badge,
    SwipeableDrawer,
    Box,
    Button,
    ButtonProps,
    styled,
} from "@mui/material"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import { Global } from "@emotion/react"
// Files
import homeStyle from "./index.module.scss"
import OrderListItem from "../components/OrderListItem"

interface OrderedList {
    id: number
    destination: string
    shopLocation: string
    food: string
    price: number
    percentage: number
}

interface previousPayments {
    date: string
    amount: number
}
interface Rider {
    name: string
    email: string
    photoUrl: string
    phoneNumber: string
    previousPayments: previousPayments[]
    completedOrders: OrderedList[]
    todayIncome: number
}

interface Props {
    userCredentials: Rider
}
interface userLocations {
    latitude: number
    longitude: number
}
// To change the color of list icon
const ListButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "#000000",
}))
const Home: NextPage<Props> = ({ userCredentials }) => {
    const [locations, setLocations] = useState<userLocations>({
        latitude: 10,
        longitude: 10,
    })
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
        axios
            .get("http://localhost:3001", { withCredentials: true })
            .then((res) => console.log(res.data))
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
                            src={userCredentials.photoUrl}
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
                            maxWidth="90%"
                            minWidth="340px"
                            px={3}
                            py={1}
                            position="absolute"
                            top="240px"
                            left="50%"
                            boxShadow={24}
                            className={homeStyle.userModal}
                            alignItems="center"
                            maxHeight="80%"
                            overflow="auto"
                        >
                            <Grid item xs={3}>
                                <Avatar
                                    alt="profile-pic"
                                    sx={{ width: 45, height: 45 }}
                                    src={userCredentials.photoUrl}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body2">
                                    {userCredentials.name}
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
                                    Today Income
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
                                    {userCredentials.todayIncome}
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
                                    {10}%
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
                                    {userCredentials.completedOrders.length}
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
                                component={FormatListBulletedIcon}
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
                            maxWidth="90%"
                            minWidth="340px"
                            position="absolute"
                            top="50%"
                            left="50%"
                            boxShadow={24}
                            className={homeStyle.listModal}
                            alignItems="center"
                            maxHeight="80%"
                            overflow="auto"
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
                                onClick={() => setOpenDrawer(!openDrawer)}
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
                        <OrderListItem
                            item={{
                                shopAddress: "Hladan",
                                items: [{ name: "chicken wing", quantity: 1 }],
                                shopName: "KFC",
                                id: 1,
                            }}
                        />
                    </Box>
                </SwipeableDrawer>
            </Grid>
            {/*Global style required for edge drawer to work*/}
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        // Change the percentage inside calc function to change the total height of the revealed drawer
                        height: `calc(90% - ${drawerBleeding}px)`,
                        overflow: "visible",
                    },
                }}
            />
        </Grid>
    )
}

export default Home

export async function getStaticProps() {
    const response: AxiosResponse = await api.get("riders/1")
    const data: Rider = response.data
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
