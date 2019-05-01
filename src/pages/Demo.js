/* eslint react/no-multi-comp:0, no-console:0, no-alert:0, no-undef: 0 */
import "./rc-tab.css";
import React from "react";
import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import Grid from "@material-ui/core/Grid";
import Dashboard from "./DashboardPage";
import { Route } from 'react-router-dom';
import FormPage from "./FormPage";
let index = 1;

export default class Demo extends React.Component {
  //key={index} menu={menu}
  state = {
    tabs: [
      {
        title: "initial",
        content: "Initial content"
      }
    ],
    activeKey: "initial"
  };

  onTabChange = activeKey => {
    this.setState({
      activeKey
    });
  };

  construct() {
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
            {/*
        <div style={{ padding: 0,  color: 'red'
             }}>
          {t.content}
        </div> */}
          <Route key={1234} path="/dashboard" component={FormPage} />
                  
          </TabPane>
        );
      })
      .concat([
        <TabPane
          tab={
            <a style={{ color: "black", cursor: "pointer" }} onClick={this.add}>
              {" "}
              + Add to
            </a>
          }
          disabled={disabled}
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
    return (
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
    );
  }
}
