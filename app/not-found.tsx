import Link from "next/link";
import { SiteFrame } from "./components/site-shell";
export default function NotFound() { return <SiteFrame><section className="not-found"><span>404</span><h1>Trang bạn tìm chưa tồn tại.</h1><p>Nội dung có thể đã được di chuyển hoặc đang trong quá trình cập nhật.</p><Link className="button" href="/">Về trang chủ</Link></section></SiteFrame>; }
