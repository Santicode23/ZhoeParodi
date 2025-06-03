import Footer from "@/components/ui/Footer";
import GoBackButton from "@/components/ui/GoBackButton";
import Header from "@/components/ui/Header";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return(
        <>
            <Header />
            <GoBackButton />
            <div className="md:flex">
                <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
                    {children}
                </main>
            </div>
            <Footer />
            <ToastNotification />
        </>
    )
}