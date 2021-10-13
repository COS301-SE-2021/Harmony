import React, { useState, useEffect } from 'react';
import { Grid, Table, TableRow, TableHead, TableBody, TableCell, } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import CreateAdForm from "./CreateAdForm";
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";

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
      <div style={{ marginLeft: 26 }}>
        <Grid item xs={12}>
          <Widget
            disableWidgetMenu
          >
            <Typography size="xl" weight="bold">
              Create Advert
            </Typography>
            <Typography size="md" weight="light">
              We use a very specific cost calculation in order to determine the perfect price point for adverts.
              <br /><br />Advert costs are calculated as follows:<br />
            </Typography>
            <Typography size="md" weight="light">
              ( R2 x (Number of Locations) x (Time Period in days ) )+ (Radius in kms)
            </Typography>
            <br />
            <Typography size="xs" weight="light">
              For example, if you were to make an advert of a burger and coke in 3 of your locations for
              1 week with a radius of 20 kms from each location.
              <br />You would pay:<br />
              ( R2 x 3 Locations x 7 days ) + 20 Kilometers = R62
            </Typography>
          </Widget>
        </Grid>
      </div>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <CreateAdForm />
        </Grid>
      </Grid>


    </>
  );
}
