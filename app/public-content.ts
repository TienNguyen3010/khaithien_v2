import { getRuntimeBindings } from "../db";
import { posts as fallbackPosts, projects as fallbackProjects, services as fallbackServices } from "./content";

export type PublicService = { id?: number; slug: string; name: string; number: string; short: string; description: string; deliverables: string[]; process: string[]; faq: { question: string; answer: string }[]; mediaId: number | null };
export type PublicProject = { id?: number; slug: string; title: string; category: string; summary: string; description: string; challenge: string; solution: string; result: string; year: string; location: string; imagePosition: string; mediaId: number | null };
export type PublicPost = { id?: number; slug: string; title: string; category: string; excerpt: string; readingTime: string; content: string[]; mediaId: number | null };

const staticServices: PublicService[] = fallbackServices.map(item => ({ ...item, mediaId: null }));
const staticProjects: PublicProject[] = fallbackProjects.map(item => ({ ...item, description: item.summary, mediaId: null }));
const staticPosts: PublicPost[] = fallbackPosts.map(item => ({ ...item, mediaId: null }));

function merge<T extends { slug: string }>(database: T[], fallback: T[]) {
  const seen = new Set(database.map(item => item.slug));
  return [...database, ...fallback.filter(item => !seen.has(item.slug))];
}

export async function getPublishedServices(): Promise<PublicService[]> {
  try {
    const result = await getRuntimeBindings().DB.prepare("SELECT id,slug,name,summary,description,cover_media_id AS mediaId FROM services WHERE status='published' ORDER BY display_order,id").all<{ id: number; slug: string; name: string; summary: string | null; description: string | null; mediaId: number | null }>();
    const rows = result.results.map((item, index) => ({ id: item.id, slug: item.slug, name: item.name, number: String(index + 1).padStart(2, "0"), short: item.summary || "Giải pháp được xây dựng theo mục tiêu và phạm vi dự án.", description: item.description || item.summary || "Khải Thiên cùng khách hàng xác định phạm vi phù hợp trước khi triển khai.", deliverables: ["Tư vấn phạm vi", "Ý tưởng & kế hoạch", "Sản xuất & vận hành"], process: ["Tiếp nhận brief", "Đề xuất giải pháp", "Triển khai", "Tổng kết"], faq: [{ question: "Làm thế nào để bắt đầu?", answer: "Gửi brief dự án để Khải Thiên làm rõ mục tiêu, thời gian và phạm vi phù hợp." }], mediaId: item.mediaId }));
    return merge(rows, staticServices);
  } catch { return staticServices; }
}

export async function getPublishedProjects(): Promise<PublicProject[]> {
  try {
    const result = await getRuntimeBindings().DB.prepare("SELECT id,slug,title,summary,description,location,cover_media_id AS mediaId,published_at AS publishedAt FROM projects WHERE status='published' ORDER BY is_featured DESC,published_at DESC,id DESC").all<{ id: number; slug: string; title: string; summary: string | null; description: string | null; location: string | null; mediaId: number | null; publishedAt: number | null }>();
    const rows = result.results.map(item => ({ id: item.id, slug: item.slug, title: item.title, category: "Dự án", summary: item.summary || "Hồ sơ dự án được công bố theo phạm vi đã xác nhận.", description: item.description || item.summary || "", challenge: item.summary || "Bài toán được xác định từ brief và bối cảnh thực tế.", solution: item.description || "Giải pháp được xây dựng theo mục tiêu, nguồn lực và tiến độ.", result: "Kết quả được cập nhật khi có xác nhận công bố.", year: item.publishedAt ? String(new Date(item.publishedAt).getUTCFullYear()) : "—", location: item.location || "Việt Nam", imagePosition: "center", mediaId: item.mediaId }));
    return merge(rows, staticProjects);
  } catch { return staticProjects; }
}

export async function getPublishedPosts(): Promise<PublicPost[]> {
  try {
    const result = await getRuntimeBindings().DB.prepare("SELECT id,slug,title,excerpt,content,cover_media_id AS mediaId FROM posts WHERE status='published' ORDER BY published_at DESC,id DESC").all<{ id: number; slug: string; title: string; excerpt: string | null; content: string; mediaId: number | null }>();
    const rows = result.results.map(item => ({ id: item.id, slug: item.slug, title: item.title, category: "Insights", excerpt: item.excerpt || "Góc nhìn thực thi từ Khải Thiên.", readingTime: `${Math.max(2, Math.ceil((item.content || "").split(/\s+/).length / 220))} phút đọc`, content: (item.content || item.excerpt || "").split(/\n{2,}/).filter(Boolean), mediaId: item.mediaId }));
    return merge(rows, staticPosts);
  } catch { return staticPosts; }
}

export async function findPublishedService(slug: string) { return (await getPublishedServices()).find(item => item.slug === slug); }
export async function findPublishedProject(slug: string) { return (await getPublishedProjects()).find(item => item.slug === slug); }
export async function findPublishedPost(slug: string) { return (await getPublishedPosts()).find(item => item.slug === slug); }
export function publicMediaUrl(mediaId: number | null) { return mediaId ? `/api/media/${mediaId}` : "/kt-landpage.png"; }
