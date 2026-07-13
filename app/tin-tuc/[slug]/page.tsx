import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../../content";
import { ContactBand, SiteFrame } from "../../components/site-shell";
export function generateStaticParams() { return posts.map((post) => ({ slug: post.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const post = posts.find((item) => item.slug === slug); return post ? { title: post.title, description: post.excerpt } : {}; }
export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const post = posts.find((item) => item.slug === slug); if (!post) notFound(); return <SiteFrame><article className="article"><header><Link href="/tin-tuc">← Tin tức</Link><p className="eyebrow">{post.category}</p><h1>{post.title}</h1><p className="lead">{post.excerpt}</p><small>{post.readingTime}</small></header><div className="article-body">{post.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<aside><strong>Gợi ý cho brief</strong><p>Ghi lại mục tiêu, đối tượng, thời gian, địa điểm, ngân sách dự kiến và tiêu chí đánh giá trước khi làm việc với đơn vị triển khai.</p></aside></div></article><ContactBand /></SiteFrame>; }
