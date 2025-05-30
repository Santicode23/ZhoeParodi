import Header from "@/components/ui/Header";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return(
        <>
            <Header />
            <div className="md:flex">
                <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
                    {children}
                </main>
            </div>

            <ToastNotification />
        </>
    )
}