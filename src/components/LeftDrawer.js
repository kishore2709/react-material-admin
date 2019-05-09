import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";

import NestedMenuItem from "./NestedMenuItem";
import data from "../data";

const drawStyles = theme => {
  return {
    drawerPaper: {
      width: theme.drawer.width,
      backgroundColor: "rgb(31, 91, 113)",
      color: "white",
      borderRight: "0px",
      boxShadow:
        "rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px"
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.drawer.miniWidth
    },
    logo: {
      cursor: "pointer",
      fontSize: 22,
      color: "white",
      lineHeight: "64px",
      fontWeight: 300,
      backgroundColor: theme.palette.primary[500],
      paddingLeft: 40,
      height: 64
    },
    avatarRoot: {
      padding: "16px 0 10px 15px",
      backgroundImage: "url(" + require("../images/material_bg.png") + ")",
      height: 45,
      display: "flex"
    },
    avatarRootMini: {
      padding: "15px 0 10px 10px"
    },
    avatarIcon: {
      float: "left",
      display: "block",
      boxShadow: "0px 0px 0px 8px rgba(0,0,0,0.2)"
    },
    avatarSpan: {
      paddingTop: 8,
      paddingLeft: 24,
      display: "block",
      color: "white",
      fontWeight: 300,
      textShadow: "1px 1px #444"
    },
    menuItem: {
      color: "white",
      fontSize: 14
    }
  };
};

const LeftDrawer = props => {
  let {
    navDrawerOpen,
    classes,
    theme,
    handleChangeNavDrawer,
    onHandlePage
  } = props;

  const drawerContent = () => (
    <div>
      <div className={classes.logo}>Material Admin</div>
      <div
        className={classNames(
          classes.avatarRoot,
          !navDrawerOpen && classes.avatarRootMini
        )}
      >
        <Avatar
          src={data.user.avatar}
          size={navDrawerOpen ? 48 : 32}
          classes={{ root: classes.avatarIcon }}
          onClick={e => {
            onHandlePage(e, "index");
          }}
        />
        <span className={classes.avatarSpan}>{data.user.userName}</span>
      </div>
      {props.menus.map((menu, index) => (
        <NestedMenuItem
          key={index}
          menu={menu}
          navDrawerOpen={navDrawerOpen}
          onHandlePage={onHandlePage}
        />
      ))}
    </div>
  );

  return (
    <div>
      {/* Mobile screen */}
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={navDrawerOpen}
          onClose={handleChangeNavDrawer}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {/* should close drawer modal as well when click on menu */}
          {drawerContent(handleChangeNavDrawer)}
        </Drawer>
      </Hidden>

      {/* Desktop screen */}
      <Hidden smDown>
        <Drawer
          open={navDrawerOpen}
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !navDrawerOpen && classes.drawerPaperClose
            )
          }}
        >
          {drawerContent()}
        </Drawer>
      </Hidden>
    </div>
  );
};

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
  classes: PropTypes.object,
  theme: PropTypes.object,
  onHandlePage: PropTypes.func,
  handleChangeNavDrawer: PropTypes.func
};

export default withStyles(drawStyles, { withTheme: true })(LeftDrawer);
