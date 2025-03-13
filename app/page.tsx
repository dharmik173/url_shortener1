import MediaCard from "@/components/Card";

export default function Home() {
  return (
    <div className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <h1 className="font-bold text-3xl sm:text-5xl md:text-5xl my-0 mx-5">
        Build stronger digital connections
      </h1>
      <div className="text-xl sm:text-2xl m-4 sm:mx-16">
        Use our URL shortener, QR Codes, and landing pages to engage your
        audience and connect them to the right information. Build, edit, and
        track everything inside the shortly Connections Platform.
      </div>
      <MediaCard />
    </div>
  );
}
