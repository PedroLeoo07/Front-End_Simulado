import "./globals.css";
import { Inter } from "next/font/google";

const font = Inter({
    subsets: ["latin"],
    variable: "--font",
});

export const metadata = {
    title: "My Exam Mockup",
    icons: {
        icon: "/icons/favicon.ico",
    },
    description: "Projeto pra mostrar tudo que eu sei"
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body className={font.variable}>{children}</body>
        </html>
    );
}