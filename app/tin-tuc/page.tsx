import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "../content";
import { ContactBand, PageHero, SiteFrame } from "../components/site-shell";

export const metadata: Metadata = { title: "Tin tức", description: "Kinh nghiệm về sự kiện, truyền thông và sản xuất nội dung." };

export default function NewsPage() { return <SiteFrame><PageHero eyebrow="Góc chia sẻ" title="Kinh nghiệm để mỗi dự án bắt đầu tốt hơn." description="Quan sát thực tế về brief, sản xuất, vận hành và những điểm chạm tạo nên trải nghiệm thương hiệu." /><section className="section container"><div className="post-grid post-grid-page">{posts.map((post, index) => <Link className={`post-card${index === 0 ? " post-featured" : ""}`} href={`/tin-tuc/${post.slug}`} key={post.slug}><span>{post.category}</span><h2>{post.title}</h2><p>{post.excerpt}</p><small>{post.readingTime} · Đọc tiếp ↗</small></Link>)}</div></section><ContactBand /></SiteFrame>; }
