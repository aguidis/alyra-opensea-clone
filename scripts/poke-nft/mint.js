const PokemonNFT = artifacts.require("PokemonNFT");

// Go to https://www.convertcsv.com/csv-to-json.htm
// Then convert the content of assets/metadata_urls.csv to json
const data = [
    {
        "ITEM": "Bulbasaur",
        "IPFS_URL": "ipfs://bafyreidzjm42yf6apsxpqjpf7zvurumz32of27g7r7prggj64gguevq4ma/metadata.json"
    },
    {
        "ITEM": "Ivysaur",
        "IPFS_URL": "ipfs://bafyreicpmnpecvz47f7ufjiypbhds6l4oek4enljta6jk6vsdfpcfalgwm/metadata.json"
    },
    {
        "ITEM": "Venusaur",
        "IPFS_URL": "ipfs://bafyreihxzy4s2p2zvt7rl5lc5wwf7eni6zkni5o7m3fw3xfx5sgktxadgi/metadata.json"
    },
    {
        "ITEM": "Charmander",
        "IPFS_URL": "ipfs://bafyreihfoulxoecmkpricu27izvu3qbinq26awfvbapxi3iqou6dyv4svu/metadata.json"
    },
    {
        "ITEM": "Charmeleon",
        "IPFS_URL": "ipfs://bafyreiflhdbsnztkofcba6ve7bf4fuw3jfg64yuwexo26tled3nopid7lu/metadata.json"
    },
    {
        "ITEM": "Charizard",
        "IPFS_URL": "ipfs://bafyreibrdxfwdl5flnt7toentlujlgfs7gs7qqgusc6oj463qhh3qm5ovm/metadata.json"
    },
    {
        "ITEM": "Squirtle",
        "IPFS_URL": "ipfs://bafyreieme6dggykscseaemzljr2lca3opfr6jojb7gzi5yb63zxzmbp6ai/metadata.json"
    },
    {
        "ITEM": "Wartortle",
        "IPFS_URL": "ipfs://bafyreig4znk36h3snp7zhukkptx3ksys5qbihqyfgjehofq3wyr7brjjk4/metadata.json"
    },
    {
        "ITEM": "Blastoise",
        "IPFS_URL": "ipfs://bafyreiextrqrdjsegyvqbkiqa6zga4jo7zzgzgrdokzbxeuazwmlxbllze/metadata.json"
    },
    {
        "ITEM": "Caterpie",
        "IPFS_URL": "ipfs://bafyreihl42kynhpmcpzoatjdzcthxkeryfwgmm4dh7t5zkfcjnobb2mbze/metadata.json"
    },
    {
        "ITEM": "Metapod",
        "IPFS_URL": "ipfs://bafyreiasgouvwkqsxnujmxw2dvfpb5zepnuzrkldxs7jbkrat65avp3yrm/metadata.json"
    },
    {
        "ITEM": "Butterfree",
        "IPFS_URL": "ipfs://bafyreicco4opbflaae74gllnnggwq2ducprop546ywhyi4eohcfwwy3nre/metadata.json"
    },
    {
        "ITEM": "Weedle",
        "IPFS_URL": "ipfs://bafyreiei4pz45wmccq2fi2ojdeym4lczxpgl3kgqo7w4id3rmqwt7sqj6m/metadata.json"
    },
    {
        "ITEM": "Kakuna",
        "IPFS_URL": "ipfs://bafyreidctctezk2tlnfe7igjbmxbbsyg52wpwmstbnhmppfwlwvofgrs6y/metadata.json"
    },
    {
        "ITEM": "Beedrill",
        "IPFS_URL": "ipfs://bafyreidirgubbbrqgnm5okm4uzrr4e2anvq4zym2iblveb2uenkcmzmh7u/metadata.json"
    },
    {
        "ITEM": "Pidgey",
        "IPFS_URL": "ipfs://bafyreig7abvdj6as2p35siihfsvu26mjshztcv5u7bhaozcuy5emzozcce/metadata.json"
    },
    {
        "ITEM": "Pidgeotto",
        "IPFS_URL": "ipfs://bafyreib65nod4u2nmzuxh4j72j7xxnq45yg3oxdpt2ug7wgz2lauhqfynu/metadata.json"
    },
    {
        "ITEM": "Pidgeot",
        "IPFS_URL": "ipfs://bafyreic3iusozm6jefvj5ilfao5g2yqiisrlz4axebc5izq3ljfsyjgts4/metadata.json"
    },
    {
        "ITEM": "Rattata",
        "IPFS_URL": "ipfs://bafyreigyefzq7zguajixlo246klhifugjwbxqc3rhrjld7ddhejsmrjekm/metadata.json"
    },
    {
        "ITEM": "Raticate",
        "IPFS_URL": "ipfs://bafyreidnrya6oolqtjkzzge6tzr4iabt2aprzrslj7ukju3e6vw42gnjbq/metadata.json"
    },
    {
        "ITEM": "Spearow",
        "IPFS_URL": "ipfs://bafyreidccrah5xoqaaxkr4oyd4epy5t74ken5sme7b5wbwdzrkdsnnwcqq/metadata.json"
    },
    {
        "ITEM": "Fearow",
        "IPFS_URL": "ipfs://bafyreigla2x5phsblh63v6ru72djgtowxv3ln4jtanmwsqthpw53fjedcm/metadata.json"
    },
    {
        "ITEM": "Ekans",
        "IPFS_URL": "ipfs://bafyreicv7fntv2wnks6sizdlnig2qvd3z7nn27rw2cgp4p3b4m6d74kiuq/metadata.json"
    },
    {
        "ITEM": "Arbok",
        "IPFS_URL": "ipfs://bafyreiem5ltysowydbzkusmxivvlsljjf5ocoqwpibhcvnaiffceuc7kcq/metadata.json"
    },
    {
        "ITEM": "Pikachu",
        "IPFS_URL": "ipfs://bafyreibpqfubdhux7bh22kreoit5qixdnfks5sjghntfspq7p2bvboqsya/metadata.json"
    },
    {
        "ITEM": "Raichu",
        "IPFS_URL": "ipfs://bafyreiay5fztbmwxc2od3tnmv6trnleozcz3o7j2u4s6qs4ra4mnmx3kjq/metadata.json"
    },
    {
        "ITEM": "Sandshrew",
        "IPFS_URL": "ipfs://bafyreifx7sehqks3cpqec6wdx4uds2sm3y2dy6yagzszdtgmlcyer7wp24/metadata.json"
    },
    {
        "ITEM": "Sandslash",
        "IPFS_URL": "ipfs://bafyreihwlavyhdwmh3xvhanxyda7ltawr45vqtuf2tfk2putnonqd7dwsi/metadata.json"
    },
    {
        "ITEM": "NidoranF",
        "IPFS_URL": "ipfs://bafyreichdjvpsililo4bb7svoxwicga353num4iyxhqglxqcvavbjf56xa/metadata.json"
    },
    {
        "ITEM": "Nidorina",
        "IPFS_URL": "ipfs://bafyreifsbfogstsdiozi2io7cciutddoyaygk3zienabvbuxgoamxvdidq/metadata.json"
    },
    {
        "ITEM": "Nidoqueen",
        "IPFS_URL": "ipfs://bafyreicpnnd55aonhe65ladldq2m3uy5fs5wfwgqi3gocatl2deihnk7vu/metadata.json"
    },
    {
        "ITEM": "NidoranM",
        "IPFS_URL": "ipfs://bafyreie4hd3y3esg4ylfvtysm2txevxkmt3wqyvn4mi6ngh24lbr4lfoga/metadata.json"
    },
    {
        "ITEM": "Nidorino",
        "IPFS_URL": "ipfs://bafyreiflmoed4b25uhdwete4vmv26babgpkjf6fyzx6r7y6ssy5ntci2sy/metadata.json"
    },
    {
        "ITEM": "Nidoking",
        "IPFS_URL": "ipfs://bafyreid7stl5nnh6nbvrdapiaeb3uyqr5sc6ki4puth4myq766xprtlhaq/metadata.json"
    },
    {
        "ITEM": "Clefairy",
        "IPFS_URL": "ipfs://bafyreie3jp2e3rlv7eaibfoyvsa4mr6ou7mb5a2ljjogba4fhc7stwne2e/metadata.json"
    },
    {
        "ITEM": "Clefable",
        "IPFS_URL": "ipfs://bafyreid375gifrfzgm5r3ihhuebaqbmt7kcqor722amo7wxmku4rmdgz3m/metadata.json"
    },
    {
        "ITEM": "Vulpix",
        "IPFS_URL": "ipfs://bafyreigevhhnh2fntjd6mezv34g66quch6vph5itvu4hzctbhji5wh2bfu/metadata.json"
    },
    {
        "ITEM": "Ninetales",
        "IPFS_URL": "ipfs://bafyreieljrrp7dahpalgftcqkifz6e3r6d2g5gp3d7rdqfdolcstuvxzpa/metadata.json"
    },
    {
        "ITEM": "Jigglypuff",
        "IPFS_URL": "ipfs://bafyreia7k6cvpl6poogjharo65fbx7w4oclefas53qn7nzzi6edp2ie2vq/metadata.json"
    },
    {
        "ITEM": "Wigglytuff",
        "IPFS_URL": "ipfs://bafyreibbudyqluzb5t4ntwuyqgyjynxpkccsnqjangwochye635575dtl4/metadata.json"
    },
    {
        "ITEM": "Zubat",
        "IPFS_URL": "ipfs://bafyreifysqhtgqjtoazmcxzi4gf4xnwg3wpgfx2hwfu4qrked3edjv2o5y/metadata.json"
    },
    {
        "ITEM": "Golbat",
        "IPFS_URL": "ipfs://bafyreiamuwdpspolqdjpcwlpthulqd2zrnvye6pquxuem4byffmhncrx5m/metadata.json"
    },
    {
        "ITEM": "Oddish",
        "IPFS_URL": "ipfs://bafyreidpyom2ll2o426evpmzcogyx7m3vkc5snugmk7kxgrcs2pxtqkfg4/metadata.json"
    },
    {
        "ITEM": "Gloom",
        "IPFS_URL": "ipfs://bafyreiaeedvmagjce6bcxg6i3sxxxy4vocuw4zw6pkvrlb5kefaehgxjaq/metadata.json"
    },
    {
        "ITEM": "Vileplume",
        "IPFS_URL": "ipfs://bafyreid3wmmc5yrfenxjak7agigifjlocrpzzckb64opqz7vuv2wvicuvy/metadata.json"
    },
    {
        "ITEM": "Paras",
        "IPFS_URL": "ipfs://bafyreidamfnexklfaditg72utu7ansgcvorixtycujxkvin6w5qfhkpxni/metadata.json"
    },
    {
        "ITEM": "Parasect",
        "IPFS_URL": "ipfs://bafyreicxngufclazb2vbi2hsef4unywabvm75v54vqxsktjovhff7lcnh4/metadata.json"
    },
    {
        "ITEM": "Venonat",
        "IPFS_URL": "ipfs://bafyreiefumbcylgydgxopszpn6pirynig4up5pwmkkhv56ypobs6icx5fa/metadata.json"
    },
    {
        "ITEM": "Venomoth",
        "IPFS_URL": "ipfs://bafyreibjdc6dt27pkeuoraaujz4rzlvn3h2lr47l4h2jsxeqyltqdp5i2q/metadata.json"
    },
    {
        "ITEM": "Diglett",
        "IPFS_URL": "ipfs://bafyreiabvuz7glxtrjjv5cntpkjdpimkoptnxte4dtueijybdhl3gx27aq/metadata.json"
    },
    {
        "ITEM": "Dugtrio",
        "IPFS_URL": "ipfs://bafyreiddxmr7jbg3z7p4z32phio627mreb3cqqwhjb72s2uabkm6eu3aam/metadata.json"
    },
    {
        "ITEM": "Meowth",
        "IPFS_URL": "ipfs://bafyreibnpnugpfvnz425zs4i6z2nv2opebixu2v25zzejxqexyaexlmjuu/metadata.json"
    },
    {
        "ITEM": "Persian",
        "IPFS_URL": "ipfs://bafyreihj7yhwltw6msslvy5dshwpyzsjp7vuluulyglwselt5qbj4d7an4/metadata.json"
    },
    {
        "ITEM": "Psyduck",
        "IPFS_URL": "ipfs://bafyreieiptedkjihhamuc2s47v4qfpzmrcvcxkw5jercgqe6jzhuju7emu/metadata.json"
    },
    {
        "ITEM": "Golduck",
        "IPFS_URL": "ipfs://bafyreibrebupm7nqrm6pqwg3tq2imzxwdofvodj5joxdy2cmk72wgpmtye/metadata.json"
    },
    {
        "ITEM": "Mankey",
        "IPFS_URL": "ipfs://bafyreici6a5l75hubfeyzzxfodfflzb6s42mfp3gn3lcq6ohoz7irxqjyu/metadata.json"
    },
    {
        "ITEM": "Primeape",
        "IPFS_URL": "ipfs://bafyreidmrhi5g4jgji7cxqo2cpkya7yrgitosxwh2wtc2ljagdbk3gcggm/metadata.json"
    },
    {
        "ITEM": "Growlithe",
        "IPFS_URL": "ipfs://bafyreideixoo2wtadpaqufbhi7a3wh2sedb7hile6xwbtaoum5csu67ahq/metadata.json"
    },
    {
        "ITEM": "Arcanine",
        "IPFS_URL": "ipfs://bafyreifaith4xbne3m62piyfxa2txh3yp5p5tc5rlkwgfmjjocgopgkhje/metadata.json"
    },
    {
        "ITEM": "Poliwag",
        "IPFS_URL": "ipfs://bafyreifsqv6ckqyuh4tqaqljkg5gbjqhcbpuh5xfk3w5bmjgw6n4f5k4x4/metadata.json"
    },
    {
        "ITEM": "Poliwhirl",
        "IPFS_URL": "ipfs://bafyreihmrvfkpfvxbvicqaxkzxyvoshdvu6xtc6e73kqnlirsw2uavjzu4/metadata.json"
    },
    {
        "ITEM": "Poliwrath",
        "IPFS_URL": "ipfs://bafyreidpmfmewk34d2cbajuiyzhtu7pvvf2m7wy5stvj3cmvxix5lehhdu/metadata.json"
    },
    {
        "ITEM": "Abra",
        "IPFS_URL": "ipfs://bafyreiah47whaforvjchhtp3vty2znqozzhgkdzlpjhzf5lis3dvh2wyzq/metadata.json"
    },
    {
        "ITEM": "Kadabra",
        "IPFS_URL": "ipfs://bafyreibwyhip7xjkliluv2puaji7wvsts4jxaxn5jout3ipg6xevfeni74/metadata.json"
    },
    {
        "ITEM": "Alakazam",
        "IPFS_URL": "ipfs://bafyreid66dpsfjjdsntetymk2ca4dxn2bwotepfg7siszzky3eagbsjbym/metadata.json"
    },
    {
        "ITEM": "Machop",
        "IPFS_URL": "ipfs://bafyreidsu6k7opymv63lfaib4g6pjydyaiusasa47xt3les2ym45pg4xzm/metadata.json"
    },
    {
        "ITEM": "Machoke",
        "IPFS_URL": "ipfs://bafyreigemlbrcm7laq7k2prpn4pl3s7amjyvt6lku4rg7un3jd3xm5iwp4/metadata.json"
    },
    {
        "ITEM": "Machamp",
        "IPFS_URL": "ipfs://bafyreidjaecua7le6e3m5z56cpvd4xfyd66tq36qvraybu32prteukajp4/metadata.json"
    },
    {
        "ITEM": "Bellsprout",
        "IPFS_URL": "ipfs://bafyreifa4joabxpg22t7fjvo27m2va47eq7z6u6gjckmlk4vlszz362q5u/metadata.json"
    },
    {
        "ITEM": "Weepinbell",
        "IPFS_URL": "ipfs://bafyreif4lzxuwptxrotsh4uyeqvzqyqxihclcxqcw7n6l56s3griqlo2wu/metadata.json"
    },
    {
        "ITEM": "Victreebel",
        "IPFS_URL": "ipfs://bafyreiau4qxp263radqm3ofskotzrcvchacfsr2lgl3hdxhjcoood2jbta/metadata.json"
    },
    {
        "ITEM": "Tentacool",
        "IPFS_URL": "ipfs://bafyreierlo7auxizzbzigrjcaipsjoleal2coqbhljkpeunrbe3etu35wu/metadata.json"
    },
    {
        "ITEM": "Tentacruel",
        "IPFS_URL": "ipfs://bafyreiaaqtshgn46aoqk2bibldqrs4ujk5eex44whtdi3xi3y6j4dnevte/metadata.json"
    },
    {
        "ITEM": "Geodude",
        "IPFS_URL": "ipfs://bafyreibwoa7kmzl5bbjbk25cmz4me2plhbtpowicmwo2dwyj44crggtjxy/metadata.json"
    },
    {
        "ITEM": "Graveler",
        "IPFS_URL": "ipfs://bafyreihac4ieknbmvx6mxjrkarvibsm5ckjk37tucdo7droypoysqr6nta/metadata.json"
    },
    {
        "ITEM": "Golem",
        "IPFS_URL": "ipfs://bafyreigbbvqwheau6yabyhipyf3vt5m54vxob3wbefuzp2gfkoh6ortagi/metadata.json"
    },
    {
        "ITEM": "Ponyta",
        "IPFS_URL": "ipfs://bafyreieznrppr5vfqjnodtrvrzamyjnmwunsiilgqk75btd3kgjrqkiqba/metadata.json"
    },
    {
        "ITEM": "Rapidash",
        "IPFS_URL": "ipfs://bafyreiaweeep6evctmhqvghfk53wtehxa3zragh2f4qef5o5htbx3zi2cm/metadata.json"
    },
    {
        "ITEM": "Slowpoke",
        "IPFS_URL": "ipfs://bafyreibuzugmxakp7dbcgitaqddodc3a7wuveuxrxu3udgjm4j3gvzh7ci/metadata.json"
    },
    {
        "ITEM": "Slowbro",
        "IPFS_URL": "ipfs://bafyreiafvhei4okuqijln7kiln3hosxvhbn56kgq5mdt563mw2d6ekq4l4/metadata.json"
    },
    {
        "ITEM": "Magnemite",
        "IPFS_URL": "ipfs://bafyreihxbolem6slf63gkw4wmlwuctkwlggxdx3754f6wosnvlajy42iie/metadata.json"
    },
    {
        "ITEM": "Magneton",
        "IPFS_URL": "ipfs://bafyreidor5z7azljdaewh52lwr7l7xme2z55hncdihvhp3636jnjut574i/metadata.json"
    },
    {
        "ITEM": "Farfetch'd",
        "IPFS_URL": "ipfs://bafyreiglhdwe7rlgbq6ambdmskxhg2uph32rsgkavjtwte5jwrkve3uak4/metadata.json"
    },
    {
        "ITEM": "Doduo",
        "IPFS_URL": "ipfs://bafyreieztyoby3xpxjvosqpo7eqqu4z2zbucagtma7pzaugxfu47hu7mri/metadata.json"
    },
    {
        "ITEM": "Dodrio",
        "IPFS_URL": "ipfs://bafyreibzwsngpfgzlszecxvldbptkqayyunp5a5sg243le5nxopykdqgm4/metadata.json"
    },
    {
        "ITEM": "Seel",
        "IPFS_URL": "ipfs://bafyreibvb5dngflssximfnud3pdbiwktklukfix5aifxvzg6rloon7skmq/metadata.json"
    },
    {
        "ITEM": "Dewgong",
        "IPFS_URL": "ipfs://bafyreiamvtsscdouexf6npg3l33mtaoexpzvs3uggievxlw7gz53lzh2hm/metadata.json"
    },
    {
        "ITEM": "Grimer",
        "IPFS_URL": "ipfs://bafyreiebo5orddltsav65lq3ptko4osrquoblmkznysy6eug7o44qxuwbq/metadata.json"
    },
    {
        "ITEM": "Muk",
        "IPFS_URL": "ipfs://bafyreiaxq4odivqhm5zc3jrgha6ntgxu3m5sdskk7dxmhb3hd43m2ceo6m/metadata.json"
    },
    {
        "ITEM": "Shellder",
        "IPFS_URL": "ipfs://bafyreibzhbx5wcrl3byibcp6jaqkj3f5nx2poywm546irp3k2hdhnbfvne/metadata.json"
    },
    {
        "ITEM": "Cloyster",
        "IPFS_URL": "ipfs://bafyreibg3zhwhdkamhdvajhy7r6pbdan6hlouhtj5wfgf4e46fibxef4dm/metadata.json"
    },
    {
        "ITEM": "Gastly",
        "IPFS_URL": "ipfs://bafyreifpe5nw2vxajrfw6ayvosnr7jblavzkoavhz4mxkb6adtsf4wbuwy/metadata.json"
    },
    {
        "ITEM": "Haunter",
        "IPFS_URL": "ipfs://bafyreidgthmedohnqm2hb7g7mlzm2girchhnuqezxxaytz53gdxu4akzkq/metadata.json"
    },
    {
        "ITEM": "Gengar",
        "IPFS_URL": "ipfs://bafyreicore6hcvhh5uz7ivpbcmmj6lmtnj4onrpdtedtaiuilv3yhdjay4/metadata.json"
    },
    {
        "ITEM": "Onix",
        "IPFS_URL": "ipfs://bafyreigpvotsqrev72x65pdnpyd7egkiqg4j4r6m5j7zc7edpf77xliewa/metadata.json"
    },
    {
        "ITEM": "Drowzee",
        "IPFS_URL": "ipfs://bafyreiberga5um5zlxu7mziql2is2oly7d25x3ajmzncbve7xu3e2xca44/metadata.json"
    },
    {
        "ITEM": "Hypno",
        "IPFS_URL": "ipfs://bafyreibtmzhu3yoeyklrui4xm333qynktcpexci7v6zz6keoe3bg2e7suu/metadata.json"
    },
    {
        "ITEM": "Krabby",
        "IPFS_URL": "ipfs://bafyreidp6dhbabz4364u7e4hwyzv3u6kpmtjkl7krh2mxg4y2sbkq74bri/metadata.json"
    },
    {
        "ITEM": "Kingler",
        "IPFS_URL": "ipfs://bafyreidia32rcajdyf7t5tyipufhlc7owkcbl4vcrs6txdblu7wt4m7dia/metadata.json"
    },
    {
        "ITEM": "Voltorb",
        "IPFS_URL": "ipfs://bafyreiaw27nqx2cciv5dhskv4fnctj5xztfwcqlmh5yqhygcgkyyvb5jxm/metadata.json"
    },
    {
        "ITEM": "Electrode",
        "IPFS_URL": "ipfs://bafyreiarpoxoopkzmoqydyhrt3h6exivnquo2g33kgskw2u53qifeig7gu/metadata.json"
    },
    {
        "ITEM": "Exeggcute",
        "IPFS_URL": "ipfs://bafyreibjiyvgyx3j6bduskay34rxghk4e77apgr4iovadtpfyys2hrrwsu/metadata.json"
    },
    {
        "ITEM": "Exeggutor",
        "IPFS_URL": "ipfs://bafyreiaqqnwyumeilvsubd5uydpbenrixuhx6t4mrve74xj7ivopaozwfm/metadata.json"
    },
    {
        "ITEM": "Cubone",
        "IPFS_URL": "ipfs://bafyreidcjcfqbsmzhlappzxgkki6rgw6wqm7sdtz3zzb5is2c4kby5yp7a/metadata.json"
    },
    {
        "ITEM": "Marowak",
        "IPFS_URL": "ipfs://bafyreihipymhijhh34w43m2laqkhyavxso2gphehihxdea7ty4hki57g4q/metadata.json"
    },
    {
        "ITEM": "Hitmonlee",
        "IPFS_URL": "ipfs://bafyreiakb3qxszx4dbtiq7sb5qet5dj5qtazndgnt52a4dk2l4fqefttou/metadata.json"
    },
    {
        "ITEM": "Hitmonchan",
        "IPFS_URL": "ipfs://bafyreifcde46czj7sia5jqdc37hkzblx4jgtexqt7ogzmdp7kvnfoysafu/metadata.json"
    },
    {
        "ITEM": "Lickitung",
        "IPFS_URL": "ipfs://bafyreieudkwg2kn3fhzifjtbxr27mz6c3bxbekjltkbuuf3m6zx5sv4u6u/metadata.json"
    },
    {
        "ITEM": "Koffing",
        "IPFS_URL": "ipfs://bafyreifpsf2vzdh52ejlkbljulzygzm4gf3odnqunspsl6pmibl6tfwjsi/metadata.json"
    },
    {
        "ITEM": "Weezing",
        "IPFS_URL": "ipfs://bafyreia7achdx7grskbxaratzpcuu5jtnqum4l7vfblqn27u2egpo727he/metadata.json"
    },
    {
        "ITEM": "Rhyhorn",
        "IPFS_URL": "ipfs://bafyreicxtxr6pwbdlbscya3zys2yrctqseh4zjwktg26jf4wb54dgk3szi/metadata.json"
    },
    {
        "ITEM": "Rhydon",
        "IPFS_URL": "ipfs://bafyreifrzgfobqj7tn6u7qsv6bf2y55kh3bntwlqebyn73dipr32vqeziq/metadata.json"
    },
    {
        "ITEM": "Chansey",
        "IPFS_URL": "ipfs://bafyreidfwl2ksbs6sq4xi7nxqpprf4lpsnsv6zcluhgt3fb4z5pncymzlu/metadata.json"
    },
    {
        "ITEM": "Tangela",
        "IPFS_URL": "ipfs://bafyreibqd55vg7n4acara7bv27zhs2bukogqawjmhtkv3axwcbubyekrf4/metadata.json"
    },
    {
        "ITEM": "Kangaskhan",
        "IPFS_URL": "ipfs://bafyreihgzzqcw7fdlv4fmvtjjbvzswvxkguslpsmkdkzsaaa7kdptkvwlq/metadata.json"
    },
    {
        "ITEM": "Horsea",
        "IPFS_URL": "ipfs://bafyreibycawt6rq5bv6vibjts3nopuhwebmblwtvydamrxt6i3sc7low6m/metadata.json"
    },
    {
        "ITEM": "Seadra",
        "IPFS_URL": "ipfs://bafyreidsurgekzuzpwd6niogbc6ik3ugw3bnxntwpu4sppazyrgldaznzm/metadata.json"
    },
    {
        "ITEM": "Goldeen",
        "IPFS_URL": "ipfs://bafyreiei32ejrgujekdjyhihzzwgrjquikt2u74ikwonyzassawvg7peoa/metadata.json"
    },
    {
        "ITEM": "Seaking",
        "IPFS_URL": "ipfs://bafyreidqp5pvejohqpfulx44w3frizye3gdefzqb64ayjhtgjs5jczcq4e/metadata.json"
    },
    {
        "ITEM": "Staryu",
        "IPFS_URL": "ipfs://bafyreifxysqezfsj7b7w3wtq6h2vku6kcxq2lf7dud74cosaz3qagabdwq/metadata.json"
    },
    {
        "ITEM": "Starmie",
        "IPFS_URL": "ipfs://bafyreicthbm6shfbkphcqeempwjyjy7upgcoeb2dfbxix7y7th7cztvq5y/metadata.json"
    },
    {
        "ITEM": "Mr. Mime",
        "IPFS_URL": "ipfs://bafyreihk3js22hhtfxpkmebw5ljiraeuqq7te6bfx2jqhjxtcngmpbuody/metadata.json"
    },
    {
        "ITEM": "Scyther",
        "IPFS_URL": "ipfs://bafyreihowvisjpowlsamlhhxxm2p4bduplds6qnpueg6m6cszwery33lky/metadata.json"
    },
    {
        "ITEM": "Jynx",
        "IPFS_URL": "ipfs://bafyreiad3ziosiqih7trrt4dr4llzph4mltjyu27lhvobvw2nzdt7lnlfy/metadata.json"
    },
    {
        "ITEM": "Electabuzz",
        "IPFS_URL": "ipfs://bafyreibpbwztpkovn3rfio3zldplnzzysx7mz354x2bw7r6aepf7pxcch4/metadata.json"
    },
    {
        "ITEM": "Magmar",
        "IPFS_URL": "ipfs://bafyreiac77njrmtulwp5mec247ei5gclk257r7ycyraozt2pkeklslkxee/metadata.json"
    },
    {
        "ITEM": "Pinsir",
        "IPFS_URL": "ipfs://bafyreiaylpgbicn4imtpigrvzzuwipaydrogphqmw54yjqntj47zezsv5y/metadata.json"
    },
    {
        "ITEM": "Tauros",
        "IPFS_URL": "ipfs://bafyreiehvkwij54tpqn67cfzqhceqxu3cggiu6xzlckq7htjdofs5njokq/metadata.json"
    },
    {
        "ITEM": "Magikarp",
        "IPFS_URL": "ipfs://bafyreic6zhwts43m7swyc2idxt4yeozniz3cuh4djgry6xswtwbymx2u4m/metadata.json"
    },
    {
        "ITEM": "Gyarados",
        "IPFS_URL": "ipfs://bafyreifzaz63cprm6dvdoz3tnjmvxhektgri2loc2bebcurhzdrse4t5cy/metadata.json"
    },
    {
        "ITEM": "Lapras",
        "IPFS_URL": "ipfs://bafyreifwaynokzjs43gejdtds4p6qnzl34syrfkgom5dlur66b4gprynsu/metadata.json"
    },
    {
        "ITEM": "Ditto",
        "IPFS_URL": "ipfs://bafyreiguvgyx4bjma7yjsbxlmuvsosxdq23zszl3jdaangkxkb7xe3rzs4/metadata.json"
    },
    {
        "ITEM": "Eevee",
        "IPFS_URL": "ipfs://bafyreid5n2gdnjmwcfc7tbnjr426fs7ngzl22zh6j6dnl2zxgu5kafgoh4/metadata.json"
    },
    {
        "ITEM": "Vaporeon",
        "IPFS_URL": "ipfs://bafyreicqz7dzcyxufg6zhwvd4zqx4i4dkx2hsgg455on4qyp6cnnvxspma/metadata.json"
    },
    {
        "ITEM": "Jolteon",
        "IPFS_URL": "ipfs://bafyreie4hefqewxuopjffh3cip6ommh2clmduy4id3276lei6hkrjddexq/metadata.json"
    },
    {
        "ITEM": "Flareon",
        "IPFS_URL": "ipfs://bafyreib5lkl3pyporhpxfsolp6a3ipc75gphadepknohfnpfazlenwma2u/metadata.json"
    },
    {
        "ITEM": "Porygon",
        "IPFS_URL": "ipfs://bafyreihb4s5tbi2dy5eguounk4shisy5yzkcz5xwcw6sqxkrba62bng2lm/metadata.json"
    },
    {
        "ITEM": "Omanyte",
        "IPFS_URL": "ipfs://bafyreif34nodglj6juu7bk5nwfrpwb3vps755ra55mn3vpsltrs7zidpzi/metadata.json"
    },
    {
        "ITEM": "Omastar",
        "IPFS_URL": "ipfs://bafyreiabme3j4zjfumhnq3ay6x3z4rfiwpehibyxlm5tnoprlkpwzn65de/metadata.json"
    },
    {
        "ITEM": "Kabuto",
        "IPFS_URL": "ipfs://bafyreieopaovjr4yul6uvzmw6pm5licpaweizxvdgl7gfjnfkererv4jzq/metadata.json"
    },
    {
        "ITEM": "Kabutops",
        "IPFS_URL": "ipfs://bafyreieh5wlc6gsik6adoe23svgrbtsskdf3vfkw3ww6sitpzag63d7vvm/metadata.json"
    },
    {
        "ITEM": "Aerodactyl",
        "IPFS_URL": "ipfs://bafyreigkhkyj26pvr2zhkjov55pyklnytbci5eqdewbsrndtyuxk3rlv3m/metadata.json"
    },
    {
        "ITEM": "Snorlax",
        "IPFS_URL": "ipfs://bafyreickaycxv4pxi44yaz5urggb62jm7ennskma7lr4xu445xj3u2blwq/metadata.json"
    },
    {
        "ITEM": "Articuno",
        "IPFS_URL": "ipfs://bafyreiegxqzfjpfvct3oatakjygajf4m7253aieplpz7znwyaulqfm6fta/metadata.json"
    },
    {
        "ITEM": "Zapdos",
        "IPFS_URL": "ipfs://bafyreidue3yd4wtrqtexcsxrvd64eleljxczvfzm3y4e2kfqcudi67r5ke/metadata.json"
    },
    {
        "ITEM": "Moltres",
        "IPFS_URL": "ipfs://bafyreidu3pgy5mkiha32bptjjrjbxvdh6wbyil3kruuoy2n3ofk6tps3p4/metadata.json"
    },
    {
        "ITEM": "Dratini",
        "IPFS_URL": "ipfs://bafyreifco6b34xreyhvfln5p3jijxlpkrhdfjy6wl6r5ffnumo75x6ceua/metadata.json"
    },
    {
        "ITEM": "Dragonair",
        "IPFS_URL": "ipfs://bafyreietuw4zbofj77wg3mb4ie5bj3pe4isf7sjn5ta6vx4zarusufaajq/metadata.json"
    },
    {
        "ITEM": "Dragonite",
        "IPFS_URL": "ipfs://bafyreiduk6vaszg46pfcbu3fi5tfa7uoiooqzbcauczojggaxpxmiixc4y/metadata.json"
    },
    {
        "ITEM": "Mewtwo",
        "IPFS_URL": "ipfs://bafyreice4ltqmhc6bnfrnz3rhx3nagnr74zm6frvt4hrf76i32y4o3sisi/metadata.json"
    },
    {
        "ITEM": "Mew",
        "IPFS_URL": "ipfs://bafyreif4bw2vqz7nvanoc43a6lbziokziihxrhfcoytgmgpwtn6qqgnnem/metadata.json"
    }
];

module.exports = async function (callback) {
    try {
        const accounts = await web3.eth.getAccounts();
        const contract = await PokemonNFT.deployed();

        let ownerIndex = 0;

        // Assign 15 pokemon per account
        for (let index = 0; index < data.length; index++) {
            const pokemonNumber = index + 1
            if (pokemonNumber % 15 === 0 && ownerIndex < 9) {
                ownerIndex++

                console.log('new account', ownerIndex, accounts[ownerIndex])
            }

            const owner = accounts[ownerIndex]

            const record = data[index];
            console.log(`Minting: ${record["ITEM"]} (${record["IPFS_URL"]})`);

            await contract.safeMint(owner, record["IPFS_URL"]);
        }

    } catch (error) {
        console.log("error", error);
    }

    callback();
};

