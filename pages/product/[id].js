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

export default function ProductPage({
  products,
  siz3rButtonVisible,
  measurement,
}) {
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
              {["xs", "s", "m", "l", "xl", "xxl"].map((size) => (
                <ToggleButton
                  style={{
                    fontWeight: "bold",
                    border:
                      measurement?.toLowerCase() === size.toLowerCase() &&
                      "2px solid rgba(0, 210, 120,0.7)",
                    background:
                      measurement?.toLowerCase() === size.toLowerCase() &&
                      "linear-gradient(120deg,rgba(0, 210, 120,0.7),rgba(129, 74, 200,0.7))",
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
                  label="Try on with Siz3r - turbo"
                  model="turbo"
                />
                <Siz3rButton
                  garment={`https://siz3r-shop.vercel.app/images/${filename}`}
                  type={product.type}
                  siz3rButtonVisible={siz3rButtonVisible}
                  label="Try on with Siz3r - standard"
                  model="standard"
                />
                <Siz3rButton
                  garment={`https://siz3r-shop.vercel.app/images/${filename}`}
                  type={product.type}
                  siz3rButtonVisible={siz3rButtonVisible}
                  label="Try on with Siz3r - premium"
                  model="premium"
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
  const parseCookies = (req) => {
    if (!req) return {};
    const list = {};
    const rc = req.headers.cookie;

    rc &&
      rc.split(";").forEach(function (cookie) {
        const parts = cookie.split("=");
        list[parts.shift().trim()] = decodeURI(parts.join("="));
      });

    return list;
  };
  let cookies;

  if (ctx?.req) {
    // Server-side: Cookies are in the request headers
    cookies = parseCookies(ctx.req);
    // If making further API calls from the server, you may need to manually attach the cookie header
    // e.g., axios.defaults.headers.get.Cookie = req.headers.cookie;
  } else {
    // Client-side: Cookies are accessed via the browser's document.cookie
    cookies = document.cookie; // you might need a client-side parsing function here as well
  }
  let measurement;
  if (cookies?.["siz3r_user_id"]) {
    await fetch(process.env.SIZ3R_URL + "/api/get-measurement", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: cookies?.["siz3r_user_id"] }),
    })
      .then((res) => res.json())
      .then((data) => {
        measurement = data.size;
      })
      .catch((err) => {
        console.debug(err);
      });
  }
  let available = false;
  await fetch(process.env.SIZ3R_URL + "/api/check-availability", {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ keyId: "eix292dnhoff0n5w5fa3h" }),
  })
    .then((res) => res.json())
    .then((data) => {
      available = data?.message === "available";
    })
    .catch((err) => {
      available = false;
    });
  return { siz3rButtonVisible: available, measurement };
};
