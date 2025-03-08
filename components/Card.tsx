import * as React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import UrlInput from "./UrlInput";

export default function MediaCard() {
  return (
    <div
      style={{
        width: "100%",
        margin: "2rem",
        padding: "2rem",
        maxWidth: "600px",
      }}
    >
      <Card style={{ padding: "2rem" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Shorten a long link
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Paste your long link here
          </Typography>
        </CardContent>
        <UrlInput />
      </Card>
    </div>
  );
}
