import Image from "next/image";
import CopyButton from "./CopyButton";
import calanderIcon from "@/assets/calander_icon.svg";

type Item = {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  userId: string;
  clickCount: number;
  createdAt: string;
  __v: number;
};

const UrlCard = ({ item, index }: { item: Item; index: number }) => {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(item.createdAt));

  return (
    <div
      className="bg-white text-black px-6 w-full  py-4 flex justify-between rounded-xl shadow-md"
      key={index}
    >
      <div className="">
        <p>
          <strong>Original URL:</strong>{" "}
          <a
            href={item.originalUrl}
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.originalUrl}
          </a>
        </p>
        <p>
          <strong>Short URL:</strong>{" "}
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.shortUrl}`}
            className="text-blue-500 underline text-sm break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${process.env.NEXT_PUBLIC_BASE_URL}/${item.shortUrl}`}
          </a>
        </p>
        <div className="flex gap-4">
          <div>
            <strong>Engagement : </strong> {item.clickCount}
          </div>
          <div className="flex gap-2">
            <Image
              src={calanderIcon}
              width={20}
              height={20}
              alt={"Calander Icon"}
            />
            {formattedDate}
          </div>
        </div>
        <CopyButton
          link={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.shortUrl}`}
        />
      </div>
      <div className=""></div>
    </div>
  );
};

export default UrlCard;
