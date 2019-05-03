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
  updateTree = data => {
    const treeData = data;
    const treeList = [];
    // 递归获取树列表
    const getTreeList = data => {
      data.forEach(node => {
        if(!node.level){
          treeList.push({ tab: node.name, key: node.path,locale:node.locale,closable:true,content:node.component });
        }
        if (node.routes && node.routes.length > 0) { //!node.hideChildrenInMenu &&
          getTreeList(node.routes);
        }
      });
    };
    getTreeList(treeData);
    return treeList;
  };

  constructor(props) {
    super(props);
    // nav bar default open in desktop screen, and default closed in mobile screen
    const {routes}  = 'dashboard';
    const routeKey = 'dashboard';
    const tabLists = this.updateTree(routes);
    let tabList=[];
    tabLists.map((v) => {
      if(v.key === routeKey){
        if(tabList.length === 0){
          v.closable = false
          tabList.push(v);
        }
      }
    });

    this.state = {
      theme: defaultTheme,
      rightDrawerOpen: false,
      navDrawerOpen:
        window &&
        window.innerWidth &&
        window.innerWidth >= defaultTheme.breakpoints.values.md
          ? true
          : false,
         tabList:tabList,
        tabListKey:[routeKey],
        activeKey:routeKey,
        routeKey
    };

    this.handleChangeRightDrawer = this.handleChangeRightDrawer.bind(this);
    this.handleChangeNavDrawer = this.handleChangeNavDrawer.bind(this);
    this.handleChangeTheme = this.handleChangeTheme.bind(this);
    this.onHandlePage = this.onHandlePage.bind(this);
  }
  onHandlePage = e => {
    const {menuData} = this.props,{key} = e;
    const tabLists = this.updateTreeList(menuData);
    const {tabListKey,tabList} =  this.state;
    this.props.history.push(key);
    e.stopPropagation();
    this.setState({
      activeKey:key
    })
    tabLists.map((v) => {
      if(v.key === key){
        if(tabList.length === 0){
          v.closable = false
          this.setState({
            tabList:[...tabList,v]
          })
        }else{
          if(!tabListKey.includes(v.key)){
            this.setState({
              tabList:[...tabList,v],
              tabListKey:[...tabListKey,v.key]
            })
          }
        }
      }
    })
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
  onTabChange= key => {
    this.setState({ activeKey:key });
    this.props.history.push("/"+key);

  };

  updateTreeList = data => {
    const treeData = data;
    const treeList = [];
    const getTreeList = data => {
        data.forEach(node => {
          if(!node.level){
            treeList.push({ tab: node.name, key: node.path,locale:node.locale,closable:true,content:node.component });
          }
            if (node.children && node.children.length > 0) { //!node.hideChildrenInMenu &&
                getTreeList(node.children);
            }
        });
    };
    getTreeList(treeData);
    return treeList;
};

  construct2() {

        return this.state.tabList.map(item => {
          return (
      <TabPane tab={item.tab} key={item.key} closable={item.closable}>
         <Switch>
      {dashboardRoutes.map(route => (
        <Route
          exact
          path={route.path}
          component={route.component}
          key={item.key}
        />
      ))}
      <Route component={NotFound} />
    </Switch>
      </TabPane>
          );
  })
  }
  render() {
    const { classes,
      location: { pathname },
      route: { routes }
    } = this.props;
    const { navDrawerOpen, rightDrawerOpen, theme,activeKey,routeKey } = this.state;
    if(pathname === '/'){
      // router.push(routeKey)
      activeKey = routeKey
  }
  //this.props.location.onHandlePage = this.onHandlePage;
    return (
      <MuiThemeProvider theme={theme}>
        <Header
          handleChangeNavDrawer={this.handleChangeNavDrawer}
          navDrawerOpen={navDrawerOpen}/>

        <LeftDrawer
          navDrawerOpen={navDrawerOpen}
          handleChangeNavDrawer={this.handleChangeNavDrawer}
          menus={Data.menus}
          onHandlePage ={this.onHandlePage} />
        <ButtonBase
          color="inherit"
          classes={{ root: classes.settingBtn }}
          onClick={this.handleChangeRightDrawer}  >
          <i className="fa fa-cog fa-3x" />
        </ButtonBase>
        <RightDrawer
          rightDrawerOpen={rightDrawerOpen}
          handleChangeRightDrawer={this.handleChangeRightDrawer}
          handleChangeTheme={this.handleChangeTheme}  />
        <div
          className={classNames(
            classes.container,
            !navDrawerOpen && classes.containerFull
          )}
        >
          <div>
            <Tabs
            activeKey={activeKey}
              tabBarPosition={"top"}
              renderTabBar={() => ( <ScrollableInkTabBar /> )}
              renderTabContent={() => <TabContent />}
              onChange={this.onTabChange}
            >
          { this.construct2() }
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
