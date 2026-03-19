import { Button, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

export default function Siz3rButton({
  garment,
  type,
  siz3rButtonVisible,
  model = "turbo",
  label = "Try on with Siz3r",
  info = {},
}) {
  return (
    <Button
      disabled={!siz3rButtonVisible}
      variant="contained"
      sx={{
        height: 36,
        color: "#00d278",
        fontWeight: "400",
        fontFamily: "LEMON MILK",
        background: "#3C1992",
      }}
      onClick={() => {
        fetch("/api/getToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            garment: garment,
            type: type,
            model: model,
          }),
        })
          .then((result) => result.json())
          .then((result) => {
            window.postMessage(
              JSON.stringify({
                type: "siz3r_tryon",
                token: result.token,
                info: {
                  ...info,
                },
              }),
            );
          })
          .catch((err) => {
            alert("error");
          });
      }}
    >
      {label}
    </Button>
  );
}
