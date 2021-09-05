import React, { useState, useEffect } from 'react';
import { Grid } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";
import AddItemForm from "./AddItemForm";
import ItemsButton from "./ItemsButton";

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
export default function TypographyPage() {
  var classes = useStyles();
  /**The name, description and tags for the form */
  const [name, setName] = useState(" ");
  const [description, setDescription] = useState(" ");
  const requestedItems = {
    Data: [{
      FoodName: "Malva Pudding",
      FoodDescription: "Malva pudding is a sweet pudding that contains apricot jam and has a spongy caramelized texture.",
    },
    {
      FoodName: "Cape Malay Curry",
      FoodDescription: "Influenced by Malay cuisine, Cape/Malay curry powder/masala is a blend of sweet and pungent spices. A curry powder/masala of a mild heat yet full of the flavours you expect in Indian curry.",
    },
    { FoodName: "Biltong", FoodDescription: "Biltong is a form of dried, cured meat that originated in Southern African countries Various types of meat are used to produce it, ranging from beef to game" },
    { FoodName: "Boerewors", FoodDescription: "Boerewors, a type of sausage which originated in South Africa. It is an important part of South African, Zimbabwean and Namibian cuisine and is popular across Southern Africa" },
    { FoodName: "Amarula Don Pedro", FoodDescription: "Amarula is a cream liqueur from South Africa. It is made with sugar, cream and the fruit of the African marula tree" },
    { FoodName: "Melktert", FoodDescription: "Melktert is an Afrikaner dessert consisting of a sweet pastry crust containing a custard filling made from milk, flour, sugar and eggs." }]
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
      <PageTitle title="Moderate Items" />
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
                <div style={{ height: 450, overflowY: "scroll" }}>
                  <ToggleButtonGroup
                    value={name}
                    exclusive
                    orientation="vertical"
                  // onChange={HandleToggle}
                  // className={classes.Toggle}
                  >
                    {/**
                       * maps the requested item names to be repeatedly displayed
                        */}
                    {requestedItemsAPI.Data.map((item, index) => (
                      <ToggleButton className={classes.toggleButton} value={item.FoodName} key={index} onClick={() => handleClick(item)}>
                        <ItemsButton item={item.FoodName} />
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
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
