"use client";

import { Button, CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
const UrlInput = () => {
  const [urlValue, setUrlValue] = useState<string>("");
  const handleOnChange = (e: any) => {
    setUrlValue(e.target.value);
  };

  const handleConvertLink = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/shorten`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ originalUrl: urlValue }),
        }
      );
      const data = await res.json();
    } catch (error) {
      console.error("something went wrong" + error);
    }
  };
  return (
    <div>
      <Box sx={{ width: 500, maxWidth: "100%" }}>
        <TextField
          fullWidth
          label="Paste your URL"
          id="fullWidth"
          onChange={handleOnChange}
        />
      </Box>
      <CardActions className="bg-black w-full xl:w-1/2 rounded-xl mt-4">
        <Button
          size="small"
          style={{ color: "white" }}
          onClick={handleConvertLink}
        >
          Get your link for free
        </Button>
      </CardActions>
    </div>
  );
};

export default UrlInput;
