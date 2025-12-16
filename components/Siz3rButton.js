import { Button, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

export default function Siz3rButton({ garment, type, siz3rButtonVisible }) {
  return (
    siz3rButtonVisible && (
      <Button
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
            body: JSON.stringify({ garment: garment, type: type }),
          })
            .then((result) => result.json())
            .then((result) => {
              window.postMessage(
                JSON.stringify({
                  type: "siz3r_tryon",
                  token: result.token,
                })
              );
            })
            .catch((err) => {
              alert("error");
            });
        }}
      >
        Try on with Siz3r
      </Button>
    )
  );
}
