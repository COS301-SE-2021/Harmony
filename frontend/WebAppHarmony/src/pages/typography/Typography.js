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
  const [tags, setTags] = useState(" ");
  const [requestedItemsAPI, setRequested] = useState([]);
  const requestedItems = {
    Data: [{
      ItemName: "Malva Pudding",
      ItemDescription: "Malva pudding is a sweet pudding that contains apricot jam and has a spongy caramelized texture.",
      ItemTags: "Sweet , Hot, Warm"
    },
    {
      ItemName: "Cape Malay Curry",
      ItemDescription: "Influenced by Malay cuisine, Cape/Malay curry powder/masala is a blend of sweet and pungent spices. A curry powder/masala of a mild heat yet full of the flavours you expect in Indian curry.",
      ItemTags: "Spicy, Hot, Savoury"
    },
    { ItemName: "Biltong", ItemDescription: "Biltong is a form of dried, cured meat that originated in Southern African countries Various types of meat are used to produce it, ranging from beef to game", ItemTags: "Spicy, Cold, Salty" },
    { ItemName: "Boerewors", ItemDescription: "Boerewors, a type of sausage which originated in South Africa. It is an important part of South African, Zimbabwean and Namibian cuisine and is popular across Southern Africa", ItemTags: "Spicy, Hot, Savoury" },
    { ItemName: "Amarula Don Pedro", ItemDescription: "Amarula is a cream liqueur from South Africa. It is made with sugar, cream and the fruit of the African marula tree", ItemTags: "Alcoholic, Cold, Sweet" },
    { ItemName: "Melktert", ItemDescription: "Melktert is an Afrikaner dessert consisting of a sweet pastry crust containing a custard filling made from milk, flour, sugar and eggs.", ItemTags: "Sweet, Warm" }]
  };
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
    console.log("click " + item.ItemName);
    setName(item.ItemName);
    setDescription(item.ItemDescription);
    setTags(item.ItemTags);
  }
  /**
   * @function removes the item from the list to be added
   */
  const handleRemoveItem = (item) => {
    console.log("clicked remove " + item.ItemName);
  }

  return (
    <>
      <PageTitle title="Moderate Items" />
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Widget disableWidgetMenu>
            <div className={classes.root}>
              <div className={classes.pageContainer}>
                <div className={classes.requestContainer}>
                  <p className={classes.fontSizeMedium}>Users have requested the following items to be added to the database:</p>
                  <br />
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
                      <ToggleButton className={classes.toggleButton} value={item.FoodName} onClick={() => handleClick(item)}>
                        <ItemsButton item={item.FoodName} />
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>

                </div>
                <AddItemForm itemName={name} itemDescription={description} itemTags={tags} />
              </div>
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
