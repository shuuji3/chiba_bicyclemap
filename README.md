# ちば自転車走りやすさマップ (fork)

千葉市の「[自転車走りやすさマップ](https://www.city.chiba.jp/kensetsu/doro/bicycle/soukoukankyouseibi.html)」をオンライン地図にしたプロジェクト。 

リンク切れなどで動かなくなっていた[smellman/chiba_bicyclemap](https://github.com/smellman/chiba_bicyclemap)をフォークして、修正を加えたもの。元は[BootLeaf](https://github.com/bmcbride/bootleaf)がベースになっている。


## 追加・修正内容

- デフォルトの背景地図を[OpenStreetMap Foundation Japanが管理しているmaptiler-basic-ja](https://wiki.openstreetmap.org/wiki/Japan/OSMFJ_Tileserver)に変更
- [国土地理院の航空写真タイル](https://maps.gsi.go.jp/development/ichiran.html#seamlessphoto)を追加
- 駐輪場・自転車店レイヤをデフォルト表示に変更
- 表示名を「千葉市 自転車走りやすさマップ」に変更
- ベンダーライブラリをローカルに配置してCDN依存を解消
