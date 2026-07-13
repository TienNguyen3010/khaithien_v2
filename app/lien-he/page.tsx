import type { Metadata } from "next";
import { company } from "../content";
import { ContactForm } from "../components/contact-form";
import { PageHero, SiteFrame } from "../components/site-shell";

export const metadata: Metadata = { title: "Liên hệ", description: "Gửi yêu cầu tư vấn dự án đến Khải Thiên." };

export default function ContactPage() { return <SiteFrame><PageHero eyebrow="Liên hệ" title="Cùng làm rõ ý tưởng của bạn." description="Chia sẻ mục tiêu, thời gian và phạm vi dự kiến. Khải Thiên sẽ liên hệ để trao đổi bước tiếp theo." /><section className="section container contact-layout"><div className="contact-details"><p className="eyebrow">Thông tin</p><h2>Khải Thiên Communication & Entertainment</h2><a href={company.phoneHref}><span>Điện thoại</span><b>{company.phone}</b></a><a href={`mailto:${company.email}`}><span>Email</span><b>{company.email}</b></a><div><span>Khu vực</span><b>{company.location}</b></div><a href={company.facebook} target="_blank" rel="noreferrer"><span>Mạng xã hội</span><b>Facebook ↗</b></a></div><ContactForm /></section></SiteFrame>; }
