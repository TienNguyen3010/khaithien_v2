import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khải Thiên | Communication & Entertainment",
  description: "Giải pháp tích hợp về sự kiện, truyền thông, sản xuất nội dung, team building và KOL/KOC.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
