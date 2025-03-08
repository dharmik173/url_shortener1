"use client";

import { Button, CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

const UrlInput = () => {
  const urlRegex = /^(https?:\/\/)?[\w-]{2,}\.[\w-]{2,}.*$/;

  const [urlValue, setUrlValue] = useState<string>("");
  const [responseData, setResponseData] = useState<any>([]);
  const [btndisabled, setbtnDisabled] = useState<boolean>(true);

  const handleOnChange = (e: any) => {
    const isValidUrl = (url: string) => urlRegex.test(url);
    if (isValidUrl(e.target.value)) {
      setbtnDisabled(false);
      setUrlValue(e.target.value);
      setResponseData([]);
    } else {
      setbtnDisabled(true);
      setUrlValue(e.target.value);
      setResponseData([]);
    }
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
      if (data && data.statusCode === 201) {
        setUrlValue("");
        setResponseData(data);
        setbtnDisabled(true);
      }
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
          value={urlValue}
        />
      </Box>
      <CardActions
        className="bg-black w-full xl:w-1/2 rounded-xl mt-4"
        style={{
          opacity: btndisabled ? "0.6" : "1",
          cursor: btndisabled ? "none" : "pointer",
        }}
      >
        <Button
          size="small"
          style={{
            color: "white",
            width: "100%",
          }}
          disabled={btndisabled}
          onClick={handleConvertLink}
        >
          Get your link for free
        </Button>
      </CardActions>
      {responseData?.shortUrl && (
        <div
          onClick={() => navigator.clipboard.writeText(responseData.shortUrl)}
          className="cursor-pointer flex items-center gap-2 bg-gray-100 p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow mt-4 justify-between"
        >
          <div
            className="truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px] "
            title={responseData.shortUrl}
          >
            {responseData.shortUrl}
          </div>
          <ContentCopyIcon className="text-gray-500 hover:text-black" />
        </div>
      )}
    </div>
  );
};

export default UrlInput;
