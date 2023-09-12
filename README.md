This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## getStaticPaths

### 概要
この関数を [`segment`].tsx ファイルから `export` する事で [Dynamic routes](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes) を具現すます。
### 詳細
> **多分** タグが付いている内容は 100% 確実にチェックがまだ出来ていない内容です。<br/> こちらに関しましては皆さん分かるようになりましたら共有して頂いたら幸いです。
  * 静的作成時 `next build` コマンドをしたら build time で一回呼び出されます
  * `npm run dev` でデバッグする時はページが開かれる度に呼び出されます
  * ファイル名の [`segment`].tsx の`segment` はこの関数の返却値の中 [`params`](https://github.com/WONJONG-GONG/nextjs-isr-swr-tscopy/blob/master/pages/jsonDB/post/%5Bid%5D.tsx#L27-L29) object の property名(この場合、_id_) と一致する
  * `next build` を実行したら `.next/server/pages` の下に静的 .html ファイルが作成されます。
  * 静的に作成されたページ以外の path にユーザーがアクセスしたら
    * `fallback` が _false_ だったらそのまま Not Found ページが表示されます
    * `fallback` が _'block'_ だったら
      * 初回目の rendering に対しては、runtime で `getStaticProps` が走って server side でページ(.html) を作ってブラウザーに渡します(SSR, Server Side Rendering)
      * 初回目の rendering が終わったら SSRで 作成てきた .html を `.next/server/pages` 下に追加(cache)します。２回目からはキャッシュされた .html がブラウザーに表示されます
      * > もっと正確な明細は [こちら](https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-blocking) を参考してください。
