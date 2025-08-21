import { ArrowBackIosNew, Close } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function Layout({ children, narrow, category, setCategory }) {
  return (
    <Container
      sx={{
        padding: { md: "calc(64px + 24px) 24px 0", xs: "calc(64px) 8px 0" },
        paddingTop: "calc(64px + 24px)",
      }}>
      <AppBar>
        <Toolbar sx={{ padding: 0 }}>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: setCategory && "space-between",
              gap: 2,
            }}>
            {!setCategory && (
              <Link href="/">
                <IconButton>
                  <ArrowBackIosNew />
                </IconButton>
              </Link>
            )}{" "}
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <img
                style={{ maxHeight: "32px", maxWidth: "40vw" }}
                src="/logo2.png"
              />
            </Link>
            {setCategory && (
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: { md: 3, sm: 2, xs: 0 },
                  color: (theme) => theme.palette.text.primary,
                  fontWeight: "100",
                  fontFamily: "LEMON MILK",
                  // fontFamily:"Roboto"
                }}>
                <Button
                  variant={category === "shirt" ? "outlined" : "plain"}
                  onClick={() => setCategory("shirt")}
                  sx={{
                    color: "inherit",
                    fontWeight: "inherit",
                    fontFamily: "LEMON MILK",
                    textTransform: "none",
                  }}>
                  Upper
                </Button>

                <Button
                  variant={category === "pants" ? "outlined" : "plain"}
                  onClick={() => setCategory("pants")}
                  sx={{
                    color: "inherit",
                    fontWeight: "inherit",
                    fontFamily: "LEMON MILK",
                    textTransform: "unset",
                  }}>
                  Lower
                </Button>
              </Box>
            )}
          </Container>
        </Toolbar>
      </AppBar>
      {children}
    </Container>
  );
}
