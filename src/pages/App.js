import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Header from "../components/Header";
import LeftDrawer from "../components/LeftDrawer";
import RightDrawer from "../components/RightDrawer";
import Data from "../data";
import Dashboard from "./DashboardPage";
import ButtonBase from "@material-ui/core/ButtonBase";
import Form from "./FormPage";
import BasicTable from "./Table/BasicTables";
import DataTable from "./Table/DataTables";
import NotFound from "./NotFoundPage";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import defaultTheme, { customTheme } from "../theme";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
let index = 1;

const dashboardRoutes = [
  {
    path: "/",
    key: "default",
    component: Dashboard
  },

  {
    path: "/dashboard",
    key: "dashboard",
    component: Dashboard
  },
  {
    path: "/form",
    key: "form",
    component: Form
  },
  {
    path: "/table/basic",
    key: "basic",
    component: BasicTable
  },
  {
    path: "/table/data",
    key: "data",
    component: DataTable
  }
];

const styles = () => ({
  container: {
    margin: "80px 20px 20px 15px",
    paddingLeft: defaultTheme.drawer.width,
    [defaultTheme.breakpoints.down("sm")]: {
      paddingLeft: 0
    }
    // width: `calc(100% - ${defaultTheme.drawer.width}px)`
  },
  containerFull: {
    paddingLeft: defaultTheme.drawer.miniWidth,
    [defaultTheme.breakpoints.down("sm")]: {
      paddingLeft: 0
    }
  },
  settingBtn: {
    top: 105,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    color: "white",
    width: 48,
    right: 0,
    height: 48,
    opacity: 0.9,
    padding: 0,
    zIndex: 999,
    position: "fixed",
    minWidth: 48,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    // nav bar default open in desktop screen, and default closed in mobile screen
    this.state = {
      theme: defaultTheme,
      rightDrawerOpen: false,
      navDrawerOpen:
        window &&
        window.innerWidth &&
        window.innerWidth >= defaultTheme.breakpoints.values.md
          ? true
          : false,
      tabs: [
        {
          path: "/dashboard",
          key: "/dashboard"
        }
      ],
      activeKey: "/dashboard"
    };

    this.handleChangeRightDrawer = this.handleChangeRightDrawer.bind(this);
    this.handleChangeNavDrawer = this.handleChangeNavDrawer.bind(this);
    this.handleChangeTheme = this.handleChangeTheme.bind(this);
    this.onHandlePage = this.onHandlePage.bind(this);
  }

  comp(key) {
    const compnt = dashboardRoutes.find(routes => routes.path === key);
    if (typeof compnt === "undefined") {
      return "Dashboard";
    } else {
      return compnt.component;
    }
  }

  onHandlePage = (e, pathName) => {
    e.stopPropagation();
    const found = this.state.tabs.some(el => el.path === pathName);
    if (!found) {
      const newTab = {
        path: pathName,
        key: pathName
      };
      this.setState({
        tabs: this.state.tabs.concat(newTab),
        activeKey: newTab.key
      });
    } else {
      this.setState({
        activeKey: dashboardRoutes.find(route => {
          return route.path === pathName;
        }).path
      });
    }
  };
  handleChangeNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  handleChangeRightDrawer() {
    this.setState({
      rightDrawerOpen: !this.state.rightDrawerOpen
    });
  }

  handleChangeTheme(colorOption) {
    const theme = customTheme({
      palette: colorOption
    });
    this.setState({
      theme
    });
  }
  onTabChange = activeKey => {
    this.setState({
      activeKey
    });
    this.props.history.push(activeKey);
  };

  construct() {
    return this.state.tabs.map(t => {
      return (
        <TabPane
          tab={
            <span>
              {t.key}
              <a
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  color: "red",
                  right: 5,
                  top: 0
                }}
                onClick={e => {
                  this.remove(t.key, e);
                }}
              >
                x
              </a>
            </span>
          }
          key={t.key}
        >
          <Switch>
            {dashboardRoutes.map(route => (
              <Route
                exact
                path={route.path}
                component={route.component}
                key={t.key}
              />
            ))}
            <Route component={NotFound} />
          </Switch>
        </TabPane>
      );
    });
  }

  remove = (title, e) => {
    e.stopPropagation();
    if (this.state.tabs.length === 1) {
      alert("Only one left, can't delete");
      return;
    }
    let foundIndex = 0;
    const after = this.state.tabs.filter((t, i) => {
      if (t.key !== title) {
        return true;
      }
      foundIndex = i;
      return false;
    });
    let activeKey = this.state.activeKey;
    if (activeKey === title) {
      if (foundIndex) {
        foundIndex--;
      }
      activeKey = after[foundIndex].title;
    }
    this.setState({
      tabs: after,
      activeKey
    });
  };

  render() {
    const { classes } = this.props;
    const { navDrawerOpen, rightDrawerOpen, theme } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <Header
          handleChangeNavDrawer={this.handleChangeNavDrawer}
          navDrawerOpen={navDrawerOpen}
        />

        <LeftDrawer
          navDrawerOpen={navDrawerOpen}
          handleChangeNavDrawer={this.handleChangeNavDrawer}
          menus={Data.menus}
          onHandlePage={this.onHandlePage}
        />
        <ButtonBase
          color="inherit"
          classes={{ root: classes.settingBtn }}
          onClick={this.handleChangeRightDrawer}
        >
          <i className="fa fa-cog fa-3x" />
        </ButtonBase>
        <RightDrawer
          rightDrawerOpen={rightDrawerOpen}
          handleChangeRightDrawer={this.handleChangeRightDrawer}
          handleChangeTheme={this.handleChangeTheme}
        />
        <div
          className={classNames(
            classes.container,
            !navDrawerOpen && classes.containerFull
          )}
        >
          {/* <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/test" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/form" component={Form} />
            <Route path="/table/basic" component={BasicTable} />
            <Route path="/table/data" component={DataTable} />
            <Route component={NotFound} />
          </Switch> */}

          <div>
            <Tabs
              tabBarPosition={"top"}
              renderTabBar={() => (
                <ScrollableInkTabBar
                /*  extraContent={
                  <button onClick={this.add}>+Add to</button>
                }*/
                />
              )}
              renderTabContent={() => <TabContent />}
              activeKey={this.state.activeKey}
              onChange={this.onTabChange}
            >
              {this.construct()}
            </Tabs>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  classes: PropTypes.object
};

export default withStyles(styles)(App);
