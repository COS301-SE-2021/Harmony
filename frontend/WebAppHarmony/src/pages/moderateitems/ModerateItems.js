import React, { useState, useEffect } from 'react';
import { Grid, Table, TableRow, TableHead, TableBody, TableCell, } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import AddItemForm from "./AddItemForm";
import ItemsButton from "./ItemsButton";
import Widget from "../../components/Widget";
export default function TypographyPage() {
  var classes = useStyles();
  /**The name, description and tags for the form */
  const [name, setName] = useState(" ");
  const [description, setDescription] = useState(" ");
  const requestedItems = {
    Data: []
  };

  const [requestedItemsAPI, setRequested] = useState(requestedItems);

  useEffect(() => {

    fetch('https://w3lfp6r6f7.execute-api.eu-west-1.amazonaws.com/dev/viewrequesteditems')
      .then(response => response.json())
      .then(data => setRequested(data))
      .then(console.log("items " + JSON.stringify(requestedItemsAPI)));
    /**  empty dependency array means this effect will only run once (like componentDidMount in classes)*/
  }, []);

  /** @function sets the forms default values to the button values
   * @param item = the api response item
   */
  const handleClick = (item) => {
    console.log("click " + item.FoodName);
    setName(item.FoodName);
    setDescription(item.FoodDescription);
  }
  /**
   * @function removes the item from the list to be added
   */
  const handleRemoveItem = (item) => {
    console.log("clicked remove " + item.FoodName);
  }

  return (
    <>
    {/*<PageTitle title="Add Items to Database" />*/}
      <Grid item xs={12}>
        <Widget
            disableWidgetMenu
            bodyClass={classes.tableWidget}
        >
          <Typography size="xl" weight="bold">
            Add Items to Database
          </Typography>

          <Typography size="md" weight="light">
            This page is used to Add items to the database. The User can request for a new item from The Harmony Mobile Application and it will appear on the list. <br/>
            The Admin can select the item to be added from the left to auto-fill the form fields or fill in the form fields to add an item. <br/>
            Once an item is added, it will be available on The Harmony Mobile Application and you are able to create a Pairing with the item.
          </Typography>
        </Widget>
      </Grid>
      <br />
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <div className={classes.root}>
            <div className={classes.pageContainer}>
              <div className={classes.requestContainer}>
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.legendElementText}
                > Users have requested the following items be added to the database:
                </Typography>
                <br />
                {/* <p className={classes.fontSizeMedium}></p> */}
                <div style={{ height: 450, overflowY: "scroll", overflowX: "hidden" }}>
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow className={classes.tableRowHeader}>
                        <TableCell className={classes.tableCell}>NAME</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {requestedItemsAPI.Data.map((item) => (
                        <TableRow >
                          <TableCell className="pl-3 fw-normal" onClick={() => handleClick(item)}><ItemsButton item={item.FoodName} /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <AddItemForm FoodName={name} FoodDescription={description} />
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
