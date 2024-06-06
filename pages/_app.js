import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";

import { useEffect, useState } from "react";
import json from "../Output_002.json";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Siz3rContextProvider } from "@/context/Siz3rContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function App(props) {
  const { Component, pageProps } = props;
  const [products, setProducts] = useState({});
  useEffect(() => {
    let newProducts = {};
    json
      .filter((item) => item.Type === "variable")
      .forEach((item, index) => {
        function getImages(object) {
          let main = null;
          let rest = [];
          Object.values(object).forEach((value) => {
            if (value.includes("main.jpg")) {
              main = value;
            } else if (value) {
              rest.push(value);
            }
          });
          return [main, ...rest];
        }
        try {
          let values = Object.values(item);

          let type = null;
          let gender = null;
          values.forEach((item) => {
            if (item.includes(">Tops>")) {
              type = "top";
            } else if (item.includes(">Bottoms>")) {
              type = "bottom";
            }
          });
          values.forEach((item) => {
            if (item.includes(">Men>")) {
              gender = "male";
            } else if (item.includes(">Women>")) {
              gender = "female";
            }
          });

          let images = getImages({
            1: item["Download limit"],
            2: item["Download expiry days"],
            3: item["Parent"],
            4: item["Grouped products"],
            5: item["Upsells"],
            6: item["Cross-sells"],
            7: item["Images"],
          });
          // let description = JSON.parse(item.description.replaceAll("'", `"`));
          // let images = JSON.parse(item.images.replaceAll("'", `"`));
          console.debug(
            values[values.findIndex((value) => value === "Size") + 1]
          );
          let sizes = values[values.findIndex((value) => value === "Size") + 1]
            .replace("28", "XS")
            .replace("29", "S")
            .replace("32", "M")
            .replace("33", "L")
            .replace("34", "XL")
            .replace("36", "XXL")
            .replace("38", "XXXL")
            .split("|");
          if (sizes.length > 2) {
            sizes.splice(
              Math.floor(Math.random() * (sizes.length - 0 + 1) + 0),
              1
            );
            if (type === "top") {
              sizes.splice(
                Math.floor(Math.random() * (sizes.length - 0 + 1) + 0),
                1
              );
              sizes.splice(
                Math.floor(Math.random() * (sizes.length - 0 + 1) + 0),
                1
              );
            }
          }

          let newItem = {
            name: item["Name"],
            type,
            gender,
            description:
              item["description"] +
              item["Date sale price starts"] +
              item["Date sale price ends"] +
              item["Tax status"] +
              item["Tax class"],
            price: (Math.random() * (100 - 5 + 1) + 5).toFixed(2),
            sizes,

            images,
            id: item["SKU"] + "_" + index,
          };

          newProducts[newItem.id] = newItem;
        } catch (err) {}
      });
    setProducts(newProducts);
  }, []);
  return (
    <AppCacheProvider {...props}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <script
          id="siz3r_plugin"
          src="http://localhost:3001/embed.js"
          noreload="true"
        />
        <Siz3rContextProvider>
          <Component {...pageProps} products={products} />
        </Siz3rContextProvider>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
