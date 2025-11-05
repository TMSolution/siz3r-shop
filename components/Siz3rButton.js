import { Button } from "@mui/material";

export default function Siz3rButton({ garment, type }) {
  return (
    <Button
      variant="contained"
      sx={{
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
  );
}
