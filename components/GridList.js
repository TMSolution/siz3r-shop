import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Grow,
  Paper,
  Typography,
  Zoom,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { TransitionGroup } from "react-transition-group";

export default function GridList({ list, userSizes }) {
  return (
    <div style={{ maxWidth: "100vw", padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: 24,
        }}>
        <h1>Product List</h1>
        {userSizes && (
          <h6 style={{ color: "gray" }}>
            (filtered by user measurements and product availability)
          </h6>
        )}
      </div>
      <Grid
        container
        spacing={2}
        component={TransitionGroup}
        style={{ transition: "all 1s ease-in-out" }}>
        {list.map((item, index) => {
          return (
            <Grow key={item.id}>
              <Grid item sm={12} md={6} lg={3} style={{ width: "100%" }}>
                <GridItem item={item} userSizes={userSizes} index={index} />
              </Grid>
            </Grow>
          );
        })}
      </Grid>
    </div>
  );
}

function GridItem({ item, userSizes, index }) {
  const [hover, setHover] = useState(false);
  const [hoveredPhoto, setHoveredPhoto] = useState(null);
  return (
    <Link href={`/product/${item.id}`} style={{ textDecoration: "none" }}>
      <Card
        style={{
          flex: 1,
          height: "100%",
          cursor: "pointer",
          position: "relative",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false);
          setHoveredPhoto(null);
        }}>
        {userSizes && (
          <img
            src="/logo.png"
            height={32}
            style={{ position: "absolute", top: 12, right: 12 }}
          />
        )}
        <CardMedia
          sx={{ height: 500 }}
          image={hoveredPhoto || item.images[0]}
          title="green iguana"
        />
        <CardContent style={{ position: "relative" }}>
          <Paper
            style={{
              width: "100%",
              height: 24 + 64 + 16 + 8,
              backgroundColor: "rgba(255,255,255,0.5)",
              position: "absolute",
              top: -(24 + 64 + 16 + 8),
              left: 0,

              opacity: hover ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
              paddingBottom: 8,
            }}>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                padding: 8,
                gap: 8,
              }}>
              {item.images.map((src) => {
                return (
                  <img
                    height={64}
                    src={src}
                    onMouseEnter={() => setHoveredPhoto(src)}
                  />
                );
              })}
            </div>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}>
              {item.sizes.map((size) => {
                return (
                  <Typography
                    style={{
                      marginBottom: 40,
                      padding: 4,
                      fontWeight: "bold",
                      borderRadius: 12,
                      color:"gray",
                      backgroundColor:
                        userSizes &&
                        userSizes?.[item.type]?.toUpperCase() ===
                          size.replace().replace(/ *\([^)]*\) */g, "") &&
                        "#3C1992",
                    }}
                    key={size}>
                    {size.replace().replace(/ *\([^)]*\) */g, "")}
                  </Typography>
                );
              })}
            </div>
          </Paper>
          <div>
            <Typography
              gutterBottom
              variant="h6"
              style={{
                textOverflow: "ellipsis",
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}>
              {item.name}
            </Typography>
          </div>
          <div>
            <Typography
              gutterBottom
              variant="h5"
              style={{ fontWeight: "bold" }}>
              {item.price} $
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
