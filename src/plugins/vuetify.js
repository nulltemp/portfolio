import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import { mdiChevronLeft, mdiHome, mdiOpenInNew } from "@mdi/js";

// アイコンは CDN のフォントではなく SVG を HTML に埋め込む（CDN が落ちてもアイコンが消えない）。
// テンプレートでは "$home" のようにエイリアスで指定する。
// $menu（ハンバーガーメニュー）や $next などの Vuetify 標準のアイコンは aliases に含まれている。
const vuetify = createVuetify({
  ssr: true,
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...aliases,
      home: mdiHome,
      openInNew: mdiOpenInNew,
      chevronLeft: mdiChevronLeft
    },
    sets: { mdi }
  }
});

export default vuetify;
