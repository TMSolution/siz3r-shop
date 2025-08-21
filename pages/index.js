import Head from "next/head";

//import GridList from "@/components/GridList";
import { useContext, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Siz3rReader from "@/components/Siz3rReader";
import { Siz3rContext } from "@/context/Siz3rContext";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import dynamic from "next/dynamic";

const GridList = dynamic(() => import("@/components/GridList"), {
  ssr: false,
});
export default function Home({ products }) {
  const [type, setType] = useState("shirt");
  const [list, setList] = useState([]);
  const [category, setCategory] = useState("shirt");
  const [siz3rFilter, setSiz3rFilter] = useState(false);
  const { userSizes, gender } = useContext(Siz3rContext);
  useEffect(() => {
    setList(Object.values(products));
  }, [products]);

  const sortProducts = (list) => {
    let pants = [];
    let shirt = [];

    list.forEach((element) => {
      if (element.type === "top") {
        shirt.push({ ...element, type: "shirt" });
      } else if (element.type === "bottom") {
        pants.push({ ...element, type: "pants" });
      }
    });

    return { shirt, pants, all: [...shirt, ...pants] };
  };
  const filterProducts = (array, userSizes, type, gender) => {
    if (userSizes) {
      return array.filter((item) => {
        let matched = false;
        item.sizes.forEach((size) => {
          if (
            size.replace(/ *\([^)]*\) */g, "") ===
              userSizes[type].toUpperCase() &&
            item.gender === gender
          ) {
            matched = true;
          }
        });
        return matched;
      });
    } else {
      return array;
    }
  };

  const finalList = filterProducts(
    sortProducts(list)[category],
    siz3rFilter && userSizes,
    category,
    gender
  )
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return (
    <Layout
      category={category}
      setCategory={setCategory}>
      <GridList
        list={finalList}
        userSizes={siz3rFilter && userSizes}
      />
    </Layout>
  );
}
