<template>
  <service-detail-layout :service="service" action-label="proc-questで遊ぶ">
    <h2>どんなゲームか</h2>
    <p>
      「proc-quest」は、マップが毎回自動で生成される、コマンド選択式のターン制ゲームです。マップはマス目ではなく、点（ノード）と線（エッジ）でつながった「グラフ」の形をしていて、プレイヤーは線でつながった隣のノードへ1ターンに1歩ずつ移動しながら、マップのどこかにいる敵のボスを目指します。
    </p>
    <p>
      ボスを倒せばクリア、自分の戦力が尽きればゲームオーバーです。1ターンごとに自分の戦力は少しずつ減り、敵の戦力は少しずつ増えていくので、寄り道して戦力を蓄えるか、早めにボスへ挑むかの見極めがポイントになります。登録は不要で、ブラウザを開けばすぐに遊べます。
    </p>

    <h2>遊び方</h2>
    <ol>
      <li>
        スタート画面でマップの大きさ（ノード数8〜80）を選び、「スタート」を押します。シード値を入力すると、同じマップを再現できます。
      </li>
      <li>
        マップ上の隣接するノードをクリック（スマホではタップ）すると、そのノードへ移動します。
      </li>
      <li>
        移動のほかに、「休息」で戦力を回復したり、手に入れたアイテムを使ったりもできます。どの行動も1ターンを消費します。
      </li>
      <li>
        ボスのノードに着いたとき、自分の戦力が敵の戦力以上なら勝利です。足りなければ反撃を受けますが、戦力を立て直してから何度でも挑み直せます。
      </li>
    </ol>
    <p>
      進行状況は自動でブラウザに保存され、次に開いたときに「続きから」で再開できます。セーブデータをファイルとして書き出し、読み込むこともできます。
    </p>

    <h2>ノードの種類</h2>
    <v-table density="compact">
      <thead>
        <tr>
          <th>ノード</th>
          <th>着いたときに起きること</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="node in nodes" :key="node.name">
          <td class="text-no-wrap">{{ node.name }}</td>
          <td>{{ node.effect }}</td>
        </tr>
      </tbody>
    </v-table>
    <p>
      戦闘・イベント・宝箱の効果は最初に訪れたときだけ起こります。同じノードを往復して戦力を稼ぐことはできません。
    </p>

    <h2>アイテム</h2>
    <ul>
      <li><strong>パワードリンク</strong>：使うと戦力が回復します。</li>
      <li>
        <strong>ガーディアンウォード</strong
        >：使うとシールドを張り、次に受けるダメージを1回分防ぎます。
      </li>
    </ul>
    <p>
      アイテムは宝箱で手に入れても、その場では使われず所持品に入ります。ボス戦の直前にシールドを張るなど、使うタイミングを自分で選べます。
    </p>

    <h2>使用技術</h2>
    <ul>
      <li>言語：TypeScript</li>
      <li>画面：Vite（フレームワークは使わず、マップはSVGで描画）</li>
      <li>配信：Cloudflare Workers（静的ファイルのみ）</li>
      <li>テスト：Node.js 標準のテストランナー（node:test）</li>
    </ul>
    <p>
      マップ生成とゲームのルールは、ブラウザ版とターミナルで遊べるコマンドライン版で共通のコードを使っています。画面は日本語と英語に対応しています。
    </p>
  </service-detail-layout>
</template>

<script>
import ServiceDetailLayout from "@/components/ServiceDetailLayout.vue";
import services from "@/data/services";

export default {
  components: {
    ServiceDetailLayout
  },
  data() {
    return {
      service: services.find(s => s.page === "/services/proc-quest/"),
      nodes: [
        { name: "開始地点", effect: "ゲームの出発点です。" },
        { name: "通常", effect: "何も起きません。" },
        {
          name: "戦闘",
          effect: "敵と戦い、お互いの戦力にランダムなダメージを与え合います。"
        },
        {
          name: "イベント",
          effect: "自分の戦力がランダムに増えたり減ったりします。"
        },
        { name: "宝箱", effect: "アイテムを1つ手に入れます。" },
        {
          name: "ボス",
          effect:
            "自分の戦力が敵の戦力以上なら勝利。足りなければ反撃を受けます。"
        }
      ]
    };
  }
};
</script>
