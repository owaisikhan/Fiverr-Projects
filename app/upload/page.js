import { UploadForm } from "@/app/_components/upload/UploadForm";

export const metadata = {
  title: "Upload a project",
  description: "Commit a delivered Fiverr order, its code and its write-up to the portfolio repository.",
  robots: { index: false, follow: false },
};

export default function UploadPage() {
  return (
    <section className="shell pt-32 pb-20 md:pt-40 md:pb-28">
      <UploadForm />
    </section>
  );
}
