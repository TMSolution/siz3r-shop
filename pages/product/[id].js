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
import Siz3rButton from "@/components/Siz3rButton";

export default function ProductPage({ products, siz3rButtonVisible }) {
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
          }}
        >
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
            }}
          >
            <div>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="caption">
                Index: <i> {product.id}</i>
              </Typography>
              <Typography variant="h5" style={{ paddingTop: 24 }}>
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
                  }}
                >
                  {size}
                </ToggleButton>
              ))}
            </div>
            {product.type}
            <Divider />
            {["top", "bottom"].includes(product.type) && (
              <>
                <Siz3rButton
                  garment={`https://siz3r-shop.vercel.app/images/${filename}`}
                  type={product.type}
                  siz3rButtonVisible={siz3rButtonVisible}
                />
              </>
            )}
            <Button
              variant="contained"
              sx={{
                color: "white",
                fontWeight: "400",
                fontFamily: "LEMON MILK",
              }}
            >
              Add to cart
            </Button>
            <Divider />{" "}
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </Card>
        </Box>
      )}
    </Layout>
  );
}
ProductPage.getInitialProps = async (ctx) => {
  return await fetch("https://siz3r-dev.vercel.app/api/check-availability", {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ keyId: "btw537108xvlzcbskuyp4" }),
  })
    .then((res) => res.json())
    .then((data) => {
      return { siz3rButtonVisible: true };
    })
    .catch((err) => {
      return { siz3rButtonVisible: false };
    });
};
