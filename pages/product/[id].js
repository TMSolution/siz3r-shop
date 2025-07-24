import { useRouter } from "next/router";
import {
  Button,
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
      <main>
        {product.id && (
          <Grid
            container
            style={{ flex: 1 }}
            spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              lg={8}
              style={{
                height: "70vh",
                width: "100%",
                justifyContent: "center",
                display: "flex",
              }}>
              <img
                src={product.images[0]}
                style={{ height: "100%" }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              style={{
                height: "70vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 16,
              }}
              component={Paper}>
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
                        garment: product.images[0],
                        bodyPart: product.type,
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
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                width: "100%",

                gap: 8,
                display: "flex",
              }}>
              <Paper
                style={{
                  display: "flex",

                  padding: 24,
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "center",
                }}>
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </Paper>
            </Grid>
          </Grid>
        )}
      </main>
    </Layout>
  );
}
