import CopyButton from "./CopyButton";

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
  console.log(item.createdAt, "createdAt");
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
        <p>
          <strong>engagement</strong> {item.clickCount}
        </p>
        <CopyButton
          link={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.shortUrl}`}
        />
      </div>
      <div className=""></div>
    </div>
  );
};

export default UrlCard;
