import type { Metadata } from "next";
import Link from "next/link";
import { ContactBand, PageHero, SiteFrame } from "../components/site-shell";
import { getPublishedPosts } from "../public-content";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Insights", description: "Kinh nghiệm thực tế về sự kiện, truyền thông, sản xuất và quản trị rủi ro." };
export default async function InsightsPage() { const posts = await getPublishedPosts(); return <SiteFrame><PageHero eyebrow="Insights" title="Kinh nghiệm để mỗi dự án bắt đầu rõ hơn." description="Checklist, quy trình và góc nhìn thực thi dành cho đội ngũ Marketing, Brand và Communication."/><section className="section container"><div className="filter-note"><span>Tất cả</span><span>Event Insights</span><span>Communication</span><span>Behind the Scenes</span></div><div className="post-grid post-grid-page">{posts.map((post, index) => <Link className={`post-card${index === 0 ? " post-featured" : ""}`} href={`/insights/${post.slug}`} key={post.slug}><span>{post.category}</span><h2>{post.title}</h2><p>{post.excerpt}</p><small>{post.readingTime} · Đọc tiếp ↗</small></Link>)}</div></section><ContactBand/></SiteFrame>; }
