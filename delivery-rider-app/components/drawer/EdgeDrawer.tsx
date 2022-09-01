import drawerStyle from "./drawer.module.scss";
import React, { useRef } from "react";

export default function EdgeDrawer() {
  const drawer = useRef<HTMLDivElement>(null);
  const drawerHeader = useRef<HTMLDivElement>(null);
  let initialY = 0,
    currentY = 0;
  const handler = (e: React.TouchEvent) => {
    if (drawer.current) {
      initialY = currentY - e.targetTouches[0].clientY;
      currentY = e.targetTouches[0].clientY;
      drawer.current!.style.top = drawer.current.offsetTop - initialY + "px";
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
      <div className={drawerStyle.header} ref={drawerHeader}></div>
    </div>
  );
}
