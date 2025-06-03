import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ToastNotification from "@/components/ui/ToastNotification";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white py-10 px-4 md:px-10">
        <div className="max-w-2xl mx-auto w-full">
          {children}
        </div>
      </main>

      <Footer />
      <ToastNotification />
    </>
  );
}
