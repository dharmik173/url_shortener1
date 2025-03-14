"use client";

import { Button, CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ResponseDataType {
  shortUrl: string;
}

const UrlInput = () => {
  const urlRegex = /^(https?:\/\/)?[\w-]{2,}\.[\w-]{2,}.*$/;

  const userSession = useSession();
  const router = useRouter();

  const [urlValue, setUrlValue] = useState<string>("");
  const [responseData, setResponseData] = useState<ResponseDataType | string>(
    ""
  );
  const [btndisabled, setbtnDisabled] = useState<boolean>(true);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValidUrl = (url: string) => urlRegex.test(url);
    if (isValidUrl(e.target.value)) {
      setbtnDisabled(false);
      setUrlValue(e.target.value);
      setResponseData("");
    } else {
      setbtnDisabled(true);
      setUrlValue(e.target.value);
      setResponseData("");
    }
  };

  const handleConvertLink = async () => {
    try {
      if (userSession.status === "unauthenticated") {
        return router.push("/login");
      }
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
        setResponseData(data?.shortUrl);
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
          cursor: btndisabled ? "initial" : "pointer",
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
      {responseData && (
        <div
          onClick={() => {
            const textToCopy =
              typeof responseData === "string"
                ? responseData
                : responseData.shortUrl;
            if (textToCopy) navigator.clipboard.writeText(textToCopy);
          }}
          className="cursor-pointer flex items-center gap-2 bg-gray-100 p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow mt-4 justify-between"
        >
          <div
            className="truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px] "
            title={
              typeof responseData === "string"
                ? responseData
                : responseData?.shortUrl
            }
          >
            {typeof responseData === "string"
              ? responseData
              : responseData?.shortUrl}
          </div>
          <ContentCopyIcon className="text-gray-500 hover:text-black" />
        </div>
      )}
    </div>
  );
};

export default UrlInput;
