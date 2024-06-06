import { Container } from "@mui/material";

export default function Layout({ children, narrow }) {
  return (
    <Container
      style={{
        maxWidth: narrow ? "1200px" : "100%",
        padding: 24,
        
      }}>
      {children}
    </Container>
  );
}
