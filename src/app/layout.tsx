import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import pt_BR from 'antd/locale/pt_BR';
import { ConfigProvider } from "antd";

const nunito = Nunito({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className={`${nunito.className} overflow-hidden`}>
                <Providers>
                    <AntdRegistry>
                        <ConfigProvider locale={pt_BR}>
                            {children}
                        </ConfigProvider>
                    </AntdRegistry>
                </Providers>
            </body>
        </html>
    );
}
