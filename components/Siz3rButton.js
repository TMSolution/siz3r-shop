import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { CircularProgress } from "@mui/material";

async function openPlugin({ garment, type, model, info, setLoading }) {
  setLoading(true);
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
      setLoading(false);
    })
    .catch((err) => {
      alert("error");
      setLoading(false);
    });
}

export default function SplitButton({ models, garment, type, info }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [loading, setLoading] = React.useState(false);
  const handleClick = () => {
    console.info(`You clicked ${models[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
        sx={{
          //.MuiButtonGroup-firstButton change borderColor to red
          "& .MuiButtonGroup-firstButton": {
            borderColor: "rgba(255,255,255,0.2)",
          },
          minHeight:37
        }}
      >
        <Button
          onClick={() =>
            openPlugin({
              model: models[selectedIndex],
              garment,
              type,
              info,
              setLoading
            })
          }
          fullWidth
          sx={{
            color: "#00d278",
            fontWeight: "400",
            fontFamily: "LEMON MILK",
            background: "#3C1992",
            borderColor: "red",
            gap: 1.1,
            alignItems: "center",

            justifyContent: "center",
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={22} />
            </>
          ) : (
            <>
              Try on with <img src="/logoBig.png" height={16} style={{marginBottom:1.1}} />
            </>
          )}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{
            color: "white",
            fontWeight: "400",
            fontFamily: "LEMON MILK",
            background: "#3C1992",
          }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
          width: anchorRef.current?.offsetWidth,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper
              sx={{
                background: "rgba(64,64,64,0.3)",
                backdropFilter: "blur(20px)",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {models.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
