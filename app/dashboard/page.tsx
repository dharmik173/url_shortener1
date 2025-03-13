import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDB } from "@/lib/mongodb";
import { Url } from "@/models/Url";
import { User } from "@/models/User";
import UrlCard from "@/components/UrlCard";
import Link from "next/link";

type UrlDetail = {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  userId: string;
  clickCount: number;
  createdAt: string;
  __v: number;
};

const DashboardPage = async () => {
  const session = await getServerSession();
  if (!session || !session.user?.email) {
    return redirect("/login");
  }

  await connectToDB();

  const findUser = await User.findOne({ email: session?.user?.email });
  if (!findUser) {
    return redirect("/login");
  }

  const findUserAllLinks: UrlDetail[] = await Url.find({
    userId: findUser._id,
  });

  return (
    <div className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <div className="w-full flex justify-center items-center mr-8 mb-3">
        <Link href="/">
          <button className="default btn-primary p-4 rounded-md bg-white text-black text-lg mt-2">
            Create Link
          </button>
        </Link>
      </div>
      <div className="w-full flex flex-col gap-6 px-10">
        {findUserAllLinks.length > 0 ? (
          findUserAllLinks.map((item, index) => (
            <div key={index}>
              <UrlCard item={item} index={index} />
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
