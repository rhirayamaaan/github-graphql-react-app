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

1. https://github.com/settings/tokens にアクセスする
1. **Generate New Token** をクリックする
1. **Note** に任意の文字列（例：`github-graphql-react-app`）を入力する。
1. **Select scopes** の **read:user** にチェックを入れる。
  - ![image](https://user-images.githubusercontent.com/10681108/76375668-bbc2da00-6389-11ea-8a51-828de2f262a8.png)
1. **Generate Token** をクリックする。
1. 作成に成功すると、Token がページに現れるため、それをメモしておく。
  - ![image](https://user-images.githubusercontent.com/10681108/76374843-a482ed00-6387-11ea-9ed8-d249f32e2bb9.png)

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

現状、`npm run build` で実行しても、Token が除かれた状態でビルドされるので認証エラーになってしまいます。
