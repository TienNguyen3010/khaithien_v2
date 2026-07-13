import type { Metadata } from "next";
import { company } from "./content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://khaithien.vn"),
  title: { default: "Khải Thiên | Communication & Entertainment", template: "%s | Khải Thiên" },
  description: "Giải pháp PR, sự kiện, sản xuất nội dung và activation tại TP. Hồ Chí Minh.",
  openGraph: { title: company.fullName, description: company.tagline, type: "website", locale: "vi_VN", images: [{ url: "/og.png", width: 1734, height: 907, alt: company.fullName }] },
  twitter: { card: "summary_large_image", title: company.fullName, description: company.tagline, images: ["/og.png"] },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.fullName,
  url: "https://khaithien.vn",
  logo: "https://khaithien.vn/kt-logo.jpg",
  email: company.email,
  telephone: company.phone,
  address: { "@type": "PostalAddress", addressLocality: "Thủ Đức", addressRegion: "TP. Hồ Chí Minh", addressCountry: "VN" },
  sameAs: [company.facebook],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></body></html>;
}
