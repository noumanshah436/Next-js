import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome home!</h1>
      <Link href="/blog">Blog</Link><br />
      <Link href="/products">Products</Link><br />
      <Link href="/news">News</Link>
    </div>
  );
}
