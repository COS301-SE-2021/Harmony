import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box} from '@material-ui/core'



// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import ModerateItems from "../../pages/moderateitems/ModerateItems";
import Tables from "../../pages/tables";
import Feedback from "../../pages/feedback";



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
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/moderateitems" component={ModerateItems} />
              <Route path="/app/tables" component={Tables} />
              <Route path="/app/feedback" component={Feedback} />

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
