# DCC Report

岐阜大学の講義「デザイン思考序論」で使われる、発散収束曲線の記録ツール。

<https://prog-g.github.io/dcc-report/>

使い方などは[ユーザーマニュアル](https://prog-g.github.io/dcc-report/manual/)を見てください。

## 開発者向けガイド

### 環境のセットアップ

[Node.js](https://nodejs.org/ja/) と [Visual Studio Code](https://code.visualstudio.com/) が必要です。

```sh
# Node.js のインストール
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.0/install.sh | bash
$ nvm install --lts
$ npm install -g yarn@1

# 必要なライブラリと VS Code 拡張のインストール
$ git clone https://github.com/pro-g/dcc-report.git
$ cd dcc-report
$ yarn install
$ echo dbaeumer.vscode-eslint esbenp.prettier-vscode stylelint.vscode-stylelint | xargs -n1 code --install-extension

# 開発用のプレビュー環境の起動
$ yarn start
```

### ビルドなどに関するコマンドとその説明

定義されている全てのコマンドは `yarn` で確認できます。

- `yarn start`  
  開発用ローカルサーバーとブラウザを起動する。
- `yarn build`  
  本番環境用に最適化されたコードを `dist/` に出力する。
- `lint:format`  
  コードが正しくフォーマットされているかチェックする。
- `yarn lint:ts`  
  TS のコードに問題がないかチェックする。
- `yarn lint:css`  
  CSS のコードに問題がないかチェックする。
- `lint:type"`  
  TS のコードに型エラーがないかチェックする。
