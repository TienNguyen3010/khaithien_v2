import type { Metadata } from "next";
import Link from "next/link";
import { services } from "../content";
import { ContactBand, PageHero, SiteFrame } from "../components/site-shell";

export const metadata: Metadata = { title: "Dịch vụ", description: "PR, Event, Production House và Activation từ Khải Thiên." };

export default function ServicesPage() {
  return <SiteFrame><PageHero eyebrow="Dịch vụ" title="Một hệ sinh thái. Nhiều điểm chạm." description="Chọn một hạng mục độc lập hoặc xây dựng giải pháp tích hợp từ chiến lược đến vận hành." /><section className="section container service-list-page">{services.map((service) => <Link href={`/dich-vu/${service.slug}`} key={service.slug}><span>{service.number}</span><div><h2>{service.name}</h2><p>{service.short}</p><ul>{service.deliverables.slice(0,3).map((item) => <li key={item}>{item}</li>)}</ul></div><b>↗</b></Link>)}</section><ContactBand /></SiteFrame>;
}
