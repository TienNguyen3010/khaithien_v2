import type { Metadata } from "next";
import Link from "next/link";
import { ContactBand, PageHero, SiteFrame } from "../components/site-shell";
import { getPublishedServices } from "../public-content";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Dịch vụ", description: "Event Management, Brand Activation, Creative Production và truyền thông tích hợp từ Khải Thiên." };

export default async function ServicesPage() {
  const services = await getPublishedServices();
  return <SiteFrame><PageHero eyebrow="Dịch vụ" title="Một hệ sinh thái. Nhiều điểm chạm." description="Chọn một hạng mục độc lập hoặc xây dựng giải pháp tích hợp từ chiến lược đến vận hành." /><section className="section container service-list-page">{services.map((service) => <Link href={`/dich-vu/${service.slug}`} key={service.slug}><span>{service.number}</span><div><h2>{service.name}</h2><p>{service.short}</p><ul>{service.deliverables.slice(0,3).map((item) => <li key={item}>{item}</li>)}</ul></div><b>↗</b></Link>)}</section><ContactBand /></SiteFrame>;
}
