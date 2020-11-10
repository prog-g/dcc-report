# DCC Report

岐阜大学の講義「デザイン思考序論」で使われる、発散収束曲線の記録ツール。

<https://prog-g.github.io/dcc-report/>

使い方などは[ユーザーマニュアル](https://prog-g.github.io/dcc-report/manual/)を見てください。

## 開発者向けガイド

### 環境のセットアップ

[Node.js](https://nodejs.org/ja/) と [Visual Studio Code](https://code.visualstudio.com/) が必要です。

```sh
# SSH設定済みの場合
$ git clone git@github.com:prog-g/dcc-report.git
# そうでない場合
$ git clone https://github.com/pro-g/dcc-report.git
$ cd dcc-report

#yarnの導入
$ npm install -g yarn@1

# nvmのインストール
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
# または
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.0/install.sh | bash

# 依存物と拡張機能をインストールする
$ yarn install
$ code --install-extension dbaeumer.vscode-eslint
$ code --install-extension esbenp.prettier-vscode
$ code --install-extension stylelint.vscode-stylelint

# 開発用ローカルサーバーとブラウザを起動する
$ yarn start
```

上記手順で環境を構築すると、次で紹介する `yarn lint:ts` や `yarn lint:css` に相当する処理とフォーマットが自動で行われます。

### ビルドなどに関するコマンドとその説明

定義されている全てのコマンドは `yarn` で確認できます。

- `yarn start`  
  開発用ローカルサーバーとブラウザを起動する。
- `yarn build`  
  本番環境用に最適化されたコードを `dist/` に出力する。
- `yarn lint:ts`  
  JS や TS のソースコードを手動で静的解析する。
- `yarn lint:css`  
  CSS のソースコードを手動で静的解析する。
- `yarn deploy`  
  `dist/` の内容を [GitHub Pages](https://help.github.com/ja/github/working-with-github-pages/about-github-pages) にデプロイする。

### デプロイの流れ

`npm run build` すると `gh-pages/` の内容がそのまま `dist/` にコピーされます。

```sh
$ rm -rf dist
$ yarn build
$ yarn deploy
```
