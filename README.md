# did:web issuer app

## Overview
did-web-issuerはdid:webにおいて物理での個人証明ができる学生証を用いてVCを発行できるようにする。
このアプリケーションはあくまでデモであり認証機能や個人を証明できるような検証を行う処理は提供していない。

このアプリケーションが想定するストーリーは大学（もしくはそれに順ずる組織 Ex)学部，学科など）が大学の研究室に所属していることを資格として発行する。
Verifiable CredentialのJWTをQRコードでウォレットで保存してもらう必要がある。
> [!NOTE]
> VCを発行する機関の認証レベルにもよるが個人の検証は学生証では
> 個人の検証が可能であるのは学生証を発行しているベンダーになる。
> よってベンダーが信頼できる範囲でのみVCが有効であると言える。
> 社会的な流れでは国などの公共機関からの個人証明，またはその委託サービスによる個人証明を使用することで
> VCを使用できるドメインの範囲を保証している。

## Getting started
### how setup
node.js/yarnの環境構築は済んでいる想定
```
yarn add
```
`/data/member.ts`で認証用のデータを保持するようにしています。
また`/lib/signVC.ts`で使用しているDIDは自身のものを使用するなど変更してください。

https://github.com/lCyou/did-web-issuer/blob/d5ed52a72adfa45e33426ebb2c4a2534077491d8/lib/signVC.ts#L12~L16
OpenID プロバイダーの発行者識別子のように./well-known/did.jsonまたは/did.jsonにconfigを書いておくことでWebサービスが使うが定義できる。
>[!NOTE]
> #### github pagesを使用してdidを作成する
> > GitHub Pages は静的サイト ホスティング サービスです。これを使って、GitHub のリポジトリから HTML、CSS、JavaScript ファイルを直接取得し、任意でビルド プロセスを通じてファイルを実行し、Web サイトを公開することができます。
> https://docs.github.com/ja/pages/getting-started-with-github-pages/about-github-pages
> 
>  ルートの隠しフォルダ`.sample/`は読み込まれないので_config.ymlに以下のような設定を追記してください。
> ```yaml:_config.yml
>  include: [".sample"]
> ```


### demo page
以下ページでデモを公開しています。ユーザーデータは以下を使用するとVCが発行できます。<br>
https://did-web-issuer.vercel.app/
```json
{
        "name": "dummy data",
        "yearOfAdmission": "2020",
        "studentId": "2010370001",
        "department": "Informatics",
        "faculty": "Syber Security"
}
```
## Licence
Apache License Version 2.0
