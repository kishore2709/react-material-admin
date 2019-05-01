import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import classNames from "classnames";

const styles = theme => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 2,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      // marginLeft: theme.drawer.width,
      width: `calc(100% - ${theme.drawer.width}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    root: {
      width: "100%"
    },
    grow: {
      flexGrow: 1
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    }
  });
  class TabBar extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          anchorEl: null,
          mobileMoreAnchorEl: null
        };
      }
    
      handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
      };
    
      handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
      };
    
      handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
      };
    
      render() {
        const { handleChangeNavDrawer, classes, navDrawerOpen } = this.props;
    
        const { anchorEl } = this.state;
        const isMenuOpen = Boolean(anchorEl);
       
        return (
          <div>
        
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Photos
          </Typography>
        </Toolbar>
     
          </div>
        );
      }
    }
    
    TabBar.propTypes = {
      styles: PropTypes.object,
      handleChangeNavDrawer: PropTypes.func,
      classes: PropTypes.object,
      navDrawerOpen: PropTypes.bool
    };
  
  export default withStyles(styles)(TabBar);
  