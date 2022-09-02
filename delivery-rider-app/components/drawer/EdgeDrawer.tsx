// Hooks
import React, { useRef } from "react";

// UI Library
import { Box, Grid, Typography } from "@mui/material";

// Files
import drawerStyle from "./drawer.module.scss";
import DrawerOrderListItem from "components/DrawerOrderListItem";

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
  orders: Orders[];
}

export default function EdgeDrawer({ orders }: Props) {
  const drawer = useRef<HTMLDivElement>(null);
  const drawerHeader = useRef<HTMLDivElement>(null);
  let initialY = 0;
  let currentY = 0;
  let navbarHeight = 60;
  let revealedDrawerHeight = 100;
  const handler = (e: React.TouchEvent) => {
    if (drawer.current) {
      let hasNotReachedBottom =
        window.outerHeight -
          drawer.current.offsetTop -
          revealedDrawerHeight -
          navbarHeight >
        0;
      let hasNotReachedTop = drawer.current.offsetTop >= 0;

      initialY = currentY - e.targetTouches[0].clientY;
      currentY = e.targetTouches[0].clientY;
      /*
      If the drawer has not reached bottom, keep moving the drawer with the touch.
      Else, set to one specific value.
       */
      if (hasNotReachedBottom && hasNotReachedTop) {
        drawer.current!.style.top = drawer.current.offsetTop - initialY + "px";
      } else if (!hasNotReachedTop) {
        drawer.current!.style.top = "0";
      } else if (!hasNotReachedBottom) {
        drawer.current!.style.top =
          drawer.current.offsetTop - initialY - 10 + "px";
      }
    }
  };
  const startHandler = (e: React.TouchEvent) => {
    if (drawer.current) {
      currentY = e.targetTouches[0].clientY;
    }
  };

  return (
    <div
      className={drawerStyle.drawer}
      ref={drawer}
      onTouchMove={(e) => handler(e)}
      onTouchStart={(e) => startHandler(e)}
    >
      <div className={drawerStyle.header} ref={drawerHeader}>
        {/*Revealed Part of edge drawer*/}
        <Grid container item justifyContent="center" height="max-content">
          <div className={drawerStyle.pill} />
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
      </div>
      {/*Hidden part of edge drawer*/}
      <Box className={drawerStyle.hiddenPart} overflow="auto" height="100vh">
        {orders.map((item, index) => (
          <DrawerOrderListItem key={index} item={item} />
        ))}
      </Box>
    </div>
  );
}
