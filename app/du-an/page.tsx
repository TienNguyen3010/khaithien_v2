import type { Metadata } from "next";
import Link from "next/link";
import { ContactBand, PageHero, SiteFrame } from "../components/site-shell";
import { getPublishedProjects, publicMediaUrl } from "../public-content";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Dự án", description: "Hồ sơ năng lực và dự án của Khải Thiên." };
export default async function ProjectsPage() { const projects = await getPublishedProjects(); return <SiteFrame><PageHero eyebrow="Dự án" title="Ý tưởng được kiểm chứng bằng trải nghiệm thật." description="Danh mục trình bày theo phạm vi được phép công bố; thông tin khách hàng và số liệu được cập nhật sau khi có xác nhận." /><section className="section container"><div className="filter-note"><span>Tất cả</span><span>Event</span><span>Production</span><span>Activation</span></div><div className="project-grid project-grid-all">{projects.map((project) => <Link className="project-card" href={`/du-an/${project.slug}`} key={project.slug}><div className="project-image"><img src={publicMediaUrl(project.mediaId)} alt={project.title} style={{ objectPosition: project.imagePosition }} /></div><span>{project.category}</span><h2>{project.title}</h2><p>{project.summary}</p></Link>)}</div></section><ContactBand /></SiteFrame>; }
