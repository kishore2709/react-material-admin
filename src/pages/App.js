import React from "react";
import { Route, Switch } from "react-router-dom";
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
    component: Dashboard
  },

  {
    path: "/dashboard",
    component: Dashboard
  },
  {
    path: "/form",
    component: Form
  },
  {
    path: "/table/basic",
    component: BasicTable
  },
  {
    path: "/table/data",
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
          title: "initial",
          content: "Initial content"
        }
      ],
      activeKey: "initial"
    };

    this.handleChangeRightDrawer = this.handleChangeRightDrawer.bind(this);
    this.handleChangeNavDrawer = this.handleChangeNavDrawer.bind(this);
    this.handleChangeTheme = this.handleChangeTheme.bind(this);
  }

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
  };

  construct() {
    console.log(this.props);
    const disabled = true;
    return this.state.tabs
      .map(t => {
        return (
          <TabPane
            tab={
              <span>
                {t.title}
                <a
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    color: "red",
                    right: 5,
                    top: 0
                  }}
                  onClick={e => {
                    this.remove(t.title, e);
                  }}
                >
                  x
                </a>
              </span>
            }
            key={t.title}
          >
            {/* <div style={{ padding: 0, color: "red" }}>{t.content}</div> */}
            <Switch>
              {dashboardRoutes.map(route => (
                <Route
                  exact
                  path={route.path}
                  component={route.component}
                  key={t.index}
                />
              ))}
              <Route component={NotFound} />
            </Switch>
          </TabPane>
        );
      })
      .concat([
        <TabPane
          tab={
            <a style={{ color: "black", cursor: "pointer" }} onClick={this.add}>
              + Add to
            </a>
          }
          // disabled={disabled}
          key="__add"
        />
      ]);
  }

  remove = (title, e) => {
    e.stopPropagation();
    if (this.state.tabs.length === 1) {
      alert("Only one left, can't delete");
      return;
    }
    let foundIndex = 0;
    const after = this.state.tabs.filter((t, i) => {
      if (t.title !== title) {
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

  add = e => {
    e.stopPropagation();
    index++;
    const newTab = {
      title: `name: ${index}`,
      content: `content: ${index}`
    };
    this.setState({
      tabs: this.state.tabs.concat(newTab),
      activeKey: `name: ${index}`
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
