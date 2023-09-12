> **多分** タグが付いている内容は 100% 確実にチェックがまだ出来ていない内容です。<br/> こちらに関しましては皆さん分かるようになりましたら共有して頂いたら幸いです。
## getStaticPaths

### 概要
この関数を [`segment`].tsx ファイルから _export_ する事で [Dynamic routes](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes) を具現すます。
### 詳細
  * 静的作成時 `next build` コマンドをしたら build time で一回呼び出されます
  * `npx dev` でデバッグする時はページが開かれる度に呼び出されます
  * ファイル名の [`segment`].tsx の `segment` はこの関数の返却値の中 [`params`](https://github.com/WONJONG-GONG/nextjs-isr-swr-tscopy/blob/master/pages/jsonDB/post/%5Bid%5D.tsx#L27-L29) object の property名 (この場合、_id_) と一致する
  * `next build` を実行したら `.next/server/pages` の下に静的 .html ファイルが作成されます。
  * `next build` によって静的に作成されたページ以外の path にユーザーがアクセスしたら **多分**
    * `fallback` が _false_ だったらそのまま Not Found ページが表示されます
    * `fallback` が _'blocking'_ だったら
      * 初回目の rendering に対しては、runtime で `getStaticProps` が走って server side でページ(.html) を作ってブラウザーに渡します(SSR, Server Side Rendering)
      * 初回目の rendering が終わったら SSRで 作成てきた .html を `.next/server/pages` 下に更新 (**cache**) します。２回目からはキャッシュされた .html がブラウザーに表示されます
      * > もっと正確な明細は [こちら](https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-blocking) を参考してください。

<br/>

## getStaticProps

### 概要
この関数を .tsx ファイルから _export_ する事で 静的に作成される component (.html) に props を渡します。
### 詳細
  * 静的作成時 `next build` コマンドをしたら build time で一回呼び出されます
  * `npx dev` でデバッグする時はページが開かれる度に呼び出されます
  * 関数の context パラメータは中に [`params`](https://nextjs.org/docs/pages/api-reference/functions/get-static-props#context-parameter) object を持っています。現在ページの `route parameters` を取ることが出来ます。
  * `revalidate` option が設定した場合、例えば 10 に設定したら **多分**
    * 該当 path において直前の `ページ request` が有った時点で10秒が過ぎたあと、初回目の新しい `ページ request` が発生したらこの関数走ります
    * 同時に、その `ページ request` によって revalidate されたデータを使って .html 新しく作成して **cache** します。
    * ２回目からの `ページ request` に対しては cache された .html が表示されます
    * > もっと正確な明細は [こちら](https://nextjs.org/docs/pages/api-reference/functions/get-static-props#revalidate) を参考してください。
