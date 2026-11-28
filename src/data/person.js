import links from "./links.js";

// 運営者（nulltemp）の構造化データ（schema.org の Person）。
// トップページの ProfilePage と /about/ の AboutPage の mainEntity で共有する。
export default {
  "@type": "Person",
  name: "nulltemp",
  alternateName: "nulltemp1",
  jobTitle: "プログラマ",
  url: "https://nulltemp.com/",
  sameAs: links.map(link => link.url)
};
