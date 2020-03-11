# Users Search Service for GitHub

こちらは Apollo + GitHub API v4 (GraphQL) + React + TypeScript で作られた、GitHub ユーザの検索サービスです。

## インストール

```
$ npm ci
```

## 準備

現状では認証の問題でリリースできないので、ローカルでの実行となります。  
以下は初回時のみ実施してください。

### Personal access token の発行

- https://github.com/settings/tokens にアクセスする
- **Generate New Token** をクリックする
- **Note** に任意の文字列（例：`github-graphql-react-app`）を入力する。
- **Select scopes** の **read:user** にチェックを入れる。

![image](https://user-images.githubusercontent.com/10681108/76375668-bbc2da00-6389-11ea-8a51-828de2f262a8.png)

- **Generate Token** をクリックする。
- 作成に成功すると、Token がページに現れるため、それをメモしておく。（キャプチャの Token は書き換えてあります。）

![image](https://user-images.githubusercontent.com/10681108/76374843-a482ed00-6387-11ea-9ed8-d249f32e2bb9.png)

### `.env` の作成

プロジェクトルートに、`.env` を作成してください。  
`.env` の中身は以下の通りです。  
ここでは、発行した Token を `abcdefghijklmnopqrstuvwxyz0123456789abcd` とします。

```
REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN=abcdefghijklmnopqrstuvwxyz0123456789abcd
```

## 実行

```
$ npm run dev
```

実行すると、`http://localhost:8080/` にアクセスした状態でブラウザが自動で起動します。  
また、現状 `npm run build` で実行しても、Token が除かれた状態でビルドされるので認証エラーになってしまうので、`npm run dev` でお願いいたします。

---

## 認証周りの実装展望

SPA で実装する場合、現状の作りだと自身が持つ Personal access token を含んだ状態で deploy しなければならないため大変危険である。

そのため、認証を行い、Access Token を発行する仕組みを作る必要があるため、[OAuth Apps](https://github.com/settings/applications/1240272) より Client ID と Client Secret を取得し、こちらを使用する。

しかし、どちらにせよ Client Secret は公開できないため、`express` 等で Web サーバを立てて対応する方法で対応する。

1. アクセス時に `https://github.com/login/oauth/authorize?client_id=取得した client id` にリダイレクトさせ、ユーザに認証してもらう。
1. 認証後、再度ページにアクセスされたら、header から code を取得し、サーバサイドで Client ID、Client Secret、code を `https://github.com/login/oauth/access_token` に対して POST でリクエストを投げて、Access Token を取得する。
   - 再度ページにアクセスされるように、OAuth App の登録時に Callback URL を自身のサイトの URL とする。
1. この Access Token を cookie か header に登録して、現在作っている `App.tsx` にて Access Token を取得する処理を書き、`new ApolloClient()` を実行するときに、その Token を使用する。

上記の方法だと、GitHub pages の使用をやめて、サーバを建てる必要がある。  
そのため、GitHub pages の使用をやめずに実施する方法がないかと模索し、認証の処理を Google Cloud Functions で実装し、Access Token を受け取る仕組みもありうるかと考えた。

1. 上記同じ
1. 上記同じ
   - しかし、Access Token を受け取る処理を、全て Google Cloud Functions に記載する
   - なので、Callback URL を Google Cloud Functions の URL にしておく。
1. Access Token を受け取ったら、Google Cloud Functions に置いてあるコードに、このアプリケーションのページへリダイレクトさせる処理を施す。
   - その際に、cookie か header に書き込む処理も追加しておく。
1. 上記と同じく、`App.tsx` で、Access Token を取得し、その Token を使用する。

上記の方法で実施すれば、GitHub Pages の使用をやめずに実施できそうである。
