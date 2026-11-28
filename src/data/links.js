// プロフィールのリンク（各サービスのアカウント）。トップの Link 欄、構造化データ（person.js）の sameAs、
// 「このサイトについて」（/about/）の「技術情報の発信」で共有する。
// アイコン画像は Vite のアセットなので、Node から読むテストでも使えるよう LinkComponent.vue で id ごとに付ける。
const links = [
  { id: "github", title: "GitHub", url: "https://github.com/nulltemp" },
  { id: "qiita", title: "Qiita", url: "https://qiita.com/nulltemp" },
  { id: "twitter", title: "Twitter", url: "https://twitter.com/nulltemp1" },
  { id: "blog", title: "Blog", url: "https://nulltemp.hatenablog.com/" },
  { id: "lapras", title: "LAPRAS", url: "https://lapras.com/public/KQD5ZUC" },
  {
    id: "teratail",
    title: "teratail",
    url: "https://teratail.com/users/nulltemp"
  }
];

export default links;

// id のリンクを返す（無ければ例外）
export function findLink(id) {
  const link = links.find(link => link.id === id);
  if (!link) throw new Error(`Unknown link: ${id}`);
  return link;
}
