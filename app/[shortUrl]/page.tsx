import { redirect } from "next/navigation";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ shortUrl: string }>;
}) {
  const { shortUrl } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/shorten/${shortUrl}`
  );

  if (res.status === 404) {
    return (
      <div className="">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p>Short URL not found. Please check the link.</p>
        </div>
      </div>
    );
  }

  if (!res.ok) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p>Something went wrong. Please try again later.</p>
        </div>
      </div>
    );
  }

  const data = await res.json();
  redirect(data.url);
}
