import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBand, SiteFrame } from "../../components/site-shell";
import { findPublishedPost } from "../../public-content";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const post = await findPublishedPost((await params).slug); return post ? { title: post.title, description: post.excerpt } : {}; }
export default async function InsightDetail({ params }: { params: Promise<{ slug: string }> }) { const post = await findPublishedPost((await params).slug); if (!post) notFound(); return <SiteFrame><article className="article"><header><Link href="/insights">← Insights</Link><p className="eyebrow">{post.category}</p><h1>{post.title}</h1><p className="lead">{post.excerpt}</p><small>{post.readingTime} · Biên tập Khải Thiên</small></header><div className="article-body">{post.content.map((paragraph, index) => <p key={`${index}-${paragraph.slice(0,20)}`}>{paragraph}</p>)}<aside><strong>Gợi ý cho brief</strong><p>Ghi lại mục tiêu, đối tượng, thời gian, địa điểm, ngân sách dự kiến và tiêu chí đánh giá trước khi làm việc với đơn vị triển khai.</p></aside></div></article><ContactBand/></SiteFrame>; }
