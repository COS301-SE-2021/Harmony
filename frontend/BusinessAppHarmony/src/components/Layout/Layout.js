import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import { Box } from '@material-ui/core'



// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import HomePage from "../../pages/usertrends";
import Statements from "../../pages/dashboard";
import CreateAds from "../../pages/createads";
import Adverts from "../../pages/adverts";
import Profile from "../../pages/profile";


// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/usertrends" component={HomePage} />
            <Route path="/app/dashboard" component={Statements} />
            <Route path="/app/createads" component={CreateAds} />
            <Route path="/app/adverts" component={Adverts} />
            <Route path="/app/Profile" component={Profile} />

          </Switch>
          <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
          >
          </Box>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
