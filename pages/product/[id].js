import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Paper,
  ToggleButton,
  Typography,
} from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Layout from "@/components/Layout";
import { Siz3rContext } from "@/context/Siz3rContext";
import { useContext } from "react";

export default function ProductPage({ products }) {
  const router = useRouter();
  const product = products[router.query.id] || {};
  const filename = product ? (product?.images?.[0] || "").split("/").pop() : "";
  const { userSizes, gender } = useContext(Siz3rContext);
  const type2Mode = (size) => {
    switch (size) {
      case "top":
        return "upper";
      case "bottom":
        return "lower";
    }
  };

  return (
    <Layout narrow>
      {product.id && (
        <Box
          sx={{
            display: "flex",
            //overflow: "hidden",
            gap: 1,
            minHeight: "calc(100vh - 64px - 48px)",
            flexDirection: { md: "row", xs: "column" },
            overflow: "hidden",
          }}>
          <Card
            sx={{
              flex: 1,
              width: "100%",
              minHeight: { md: "initial", xs: "60vh" },
              background: `url(/images/${filename})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <Card
            sx={{
              flex: 1,

              width: "100%",
              gap: 2,
              display: "flex",
              flexDirection: "column",
              padding: 3,
            }}>
            <div>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="caption">
                Index: <i> {product.id}</i>
              </Typography>
              <Typography
                variant="h5"
                style={{ paddingTop: 24 }}>
                <b>{product.price}</b> $
              </Typography>
            </div>
            <Divider />
            <div style={{ gap: 8, display: "flex" }}>
              {product.sizes.map((size) => (
                <ToggleButton
                  style={{
                    fontWeight: "bold",
                    // border: recommended.toUpperCase() === size && "2px solid #3C1992",
                  }}>
                  {size}
                </ToggleButton>
              ))}
            </div>
            <Divider />
            {["top", "bottom"].includes(product.type) && (
              <Button
                variant="contained"
                sx={{ color: "lightgreen", fontWeight: "bold" }}
                color="secondary"
                onClick={() => {
                  console.debug("posting message");
                  window.postMessage(
                    JSON.stringify({
                      type: "siz3r_tryon",
                      garment: `https://siz3r-shop.vercel.app/images/${filename}`,
                      bodyPart: product.type,
                      info: {
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        currency: "USD",
                        logo: "https://siz3r-shop.vercel.app/shopLogo.png",
                      },
                      token:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJ6a3FxZ2JoZ3ZvNXpmdWo4YTF0ZmgiLCJidXNpbmVzc0lkIjoiZ1JvczdVYlhDR05MTnQzOHZ2UjdqdnJIOThyMSIsImlhdCI6MTc1MzM1ODY2NywiZXhwIjoxODM5NjcyMjY3fQ.-ID7Kq-UzrA8r6sndkGNhBRywCgUjDjktA1FpntDKRI",
                      // style: {
                      //   logoUrl:
                      //     "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Zalando_logo.svg/1200px-Zalando_logo.svg.png",
                      //   modal: { background: "gray" },
                      //   mainButton: { background: "red" },
                      //   spinner: {
                      //     "--CircularProgress-trackColor": "yellow",
                      //     "--CircularProgress-trackColor": "orange",
                      //   },
                      //   secondaryButtons: {
                      //     background: "green",
                      //     borderColor: "blue",
                      //     color: "pink",
                      //   },
                      // },
                    }),
                    "*"
                  );
                  console.debug("messagePosted");
                }}>
                Przymierz z Siz3r
              </Button>
            )}
            <Button variant="contained">Add to cart</Button>
            <Divider />{" "}
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </Card>
        </Box>
      )}
    </Layout>
  );
}
