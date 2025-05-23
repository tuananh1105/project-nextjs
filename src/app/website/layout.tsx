import Footer from "@/components/footer";
import Header from "@/components/header";
export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
