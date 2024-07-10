import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="bg-gray-50">
        <Navbar />
        <div>
            {children}
        </div>
        <Footer />
      </div>
    );
  }