const PokemonNFT = artifacts.require("PokemonNFT");

// Go to https://www.convertcsv.com/csv-to-json.htm
// Then convert the content of assets/metadata_urls.csv to json
const data = [
    {
        ITEM: "Bulbasaur",
        IPFS_URL: "ipfs://bafyreibz2ayr4upyypwexg2zwa6u6jnqp3krpb6r7mrimzkesmzoynttzu/metadata.json",
    },
    {
        ITEM: "Ivysaur",
        IPFS_URL: "ipfs://bafyreie5df6kmzp3aw74i4mvrwn7j5nhqm6cyz5fr4qprv5ksaxgqx5wam/metadata.json",
    },
    {
        ITEM: "Venusaur",
        IPFS_URL: "ipfs://bafyreif7cvnoioj67kg7e3vbkptng6wrbzxuzqfjqueoi2ach64mxi7uw4/metadata.json",
    },
    {
        ITEM: "Charmander",
        IPFS_URL: "ipfs://bafyreih5h6q4orfyxn4fthxywrmhqrf6u6fzmusvsqvvpftzzavufh25ou/metadata.json",
    },
    {
        ITEM: "Charmeleon",
        IPFS_URL: "ipfs://bafyreigk4pj7kxno2fpfiba43tqyty3jjcrrrt4mjuwitzyadmg7xx7u5y/metadata.json",
    },
    {
        ITEM: "Charizard",
        IPFS_URL: "ipfs://bafyreidsoknrb6obyr6faczpyphy2upl5kpwpvmwafmpautgnpxyyw3igi/metadata.json",
    },
    {
        ITEM: "Squirtle",
        IPFS_URL: "ipfs://bafyreidua35eq7n2wceqg5flaqjowtrsabz4mjblsttghmrrsepafzhsqa/metadata.json",
    },
    {
        ITEM: "Wartortle",
        IPFS_URL: "ipfs://bafyreiespawrybxh6vq7md6mtiuheoqefknx2c4hu6l2u4w462qkcjqebe/metadata.json",
    },
    {
        ITEM: "Blastoise",
        IPFS_URL: "ipfs://bafyreihccczwqlpbf7mhbj7pfc74kizev7iclkha3nsfjrhojyiuz6x3iu/metadata.json",
    },
    {
        ITEM: "Caterpie",
        IPFS_URL: "ipfs://bafyreiakfrsizfoahhin7yhh5t3j5sl25bafngjspsm6xszy7v7uqpgtuu/metadata.json",
    },
    {
        ITEM: "Metapod",
        IPFS_URL: "ipfs://bafyreidull7hsybyh3mt3w3idmz74ugx3xl676fccd7xnge43jvp4ayzpu/metadata.json",
    },
    {
        ITEM: "Butterfree",
        IPFS_URL: "ipfs://bafyreihwpvusz4mny5qrtaus2ytbhhal4iw5sa5qyobrn3tsbzxkkmhe3i/metadata.json",
    },
    {
        ITEM: "Weedle",
        IPFS_URL: "ipfs://bafyreiai5ljcuwfeq64bmha3f5ryiykripkpv5kfqcahm6fyiivdye6aae/metadata.json",
    },
    {
        ITEM: "Kakuna",
        IPFS_URL: "ipfs://bafyreie6jfb33i6ewmnj6rlglnd76pfkj42urvjjlwre7iwhr5k3473cwq/metadata.json",
    },
    {
        ITEM: "Beedrill",
        IPFS_URL: "ipfs://bafyreih7y4hqeo4whn4iyzvd2ix4li4mhaghr45n55hvp2lvwsq4qs47gu/metadata.json",
    },
    {
        ITEM: "Pidgey",
        IPFS_URL: "ipfs://bafyreiaxg5wnsca5uroyakwegywsoptbibb7llj5gpglqgitjupmu5tw3y/metadata.json",
    },
    {
        ITEM: "Pidgeotto",
        IPFS_URL: "ipfs://bafyreia2i67i64ddn3wjtnjbynoutcq32fzx63xlx4lgvaoh43cpvmomu4/metadata.json",
    },
    {
        ITEM: "Pidgeot",
        IPFS_URL: "ipfs://bafyreiboltqtxq6hgvka3n24b3t2qcxrahxcdh657bsifs54igacvarnxu/metadata.json",
    },
    {
        ITEM: "Rattata",
        IPFS_URL: "ipfs://bafyreia4bpkzq64nnhatd37womtmhtybak4hxp6w2tpokq7ndjenq7snya/metadata.json",
    },
    {
        ITEM: "Raticate",
        IPFS_URL: "ipfs://bafyreiatihfxez3nwrcwhic5pltaw2zezvi3rw3rq7rlapzxl7chongtq4/metadata.json",
    },
    {
        ITEM: "Spearow",
        IPFS_URL: "ipfs://bafyreibmcmdilrg2tajehn2nt5kk5iclpkfcf2immx3ksaqccnvcirwqza/metadata.json",
    },
    {
        ITEM: "Fearow",
        IPFS_URL: "ipfs://bafyreiak6a4hnmjnxseqetqzuxwqfcxci2tz7ru3nveldqxqrawr6ijcsm/metadata.json",
    },
    {
        ITEM: "Ekans",
        IPFS_URL: "ipfs://bafyreibvbmkezvy4ki66xscodmzwwzrp2vmhajsqbqszjz4jdaf2gewzey/metadata.json",
    },
    {
        ITEM: "Arbok",
        IPFS_URL: "ipfs://bafyreihb4cu4yypa6pknw22tdyrc2tygm75tnsbz7ytsrip5pl5bs7wmcu/metadata.json",
    },
    {
        ITEM: "Pikachu",
        IPFS_URL: "ipfs://bafyreigaggs6nwgflq75prqdgtf2dxdrdwo5bt34fzzivijqsvzlv6zefe/metadata.json",
    },
    {
        ITEM: "Raichu",
        IPFS_URL: "ipfs://bafyreiewjx4b3ichdpybbcfbgsmn44buroo6ejy2dh7rucho55fkqducke/metadata.json",
    },
    {
        ITEM: "Sandshrew",
        IPFS_URL: "ipfs://bafyreiddpojh7qazlpf6arscvwzrmoatkkqrr64mhaphismkthhghymmxi/metadata.json",
    },
    {
        ITEM: "Sandslash",
        IPFS_URL: "ipfs://bafyreifat3m62dvp44wey6f6yg7apoynnjdjdkmfl2mjnhp3ubeuuevacu/metadata.json",
    },
    {
        ITEM: "NidoranF",
        IPFS_URL: "ipfs://bafyreiddrpuwwhq5r3xduxqnukogohp76ffiygd43fw2cqn3x3ehuaxrde/metadata.json",
    },
    {
        ITEM: "Nidorina",
        IPFS_URL: "ipfs://bafyreiboiy5juivzoqbmn23y34g4sdjwcwpsosrq6tn7ziy6jhvouzslsq/metadata.json",
    },
    {
        ITEM: "Nidoqueen",
        IPFS_URL: "ipfs://bafyreia3rgm46hr3agy26apr2zgpffnv6vb6nlehss35fr4neberq6ncfy/metadata.json",
    },
    {
        ITEM: "NidoranM",
        IPFS_URL: "ipfs://bafyreihxoet624xsvo4kpner4y2mtiu57kjgrn65yxgmzwagq5bfh32r5u/metadata.json",
    },
    {
        ITEM: "Nidorino",
        IPFS_URL: "ipfs://bafyreibnupc7iuuoepgektywq7itge23hng3uizlx4rdfolkq2qbpzt24u/metadata.json",
    },
    {
        ITEM: "Nidoking",
        IPFS_URL: "ipfs://bafyreietcwmdy4s7mkevuod7juwjsruzzpdr46l6vdsos2eh5keejcvnwm/metadata.json",
    },
    {
        ITEM: "Clefairy",
        IPFS_URL: "ipfs://bafyreie7dskphozdosv3cyvzeatll7ttasjxg7w7r2alzjrz3k5pbwdd2y/metadata.json",
    },
    {
        ITEM: "Clefable",
        IPFS_URL: "ipfs://bafyreiedegbqdipfamtoptyyqrtfjb3qf636vile6pagipturft4qa2ava/metadata.json",
    },
    {
        ITEM: "Vulpix",
        IPFS_URL: "ipfs://bafyreiejwiztwc7dzkiogf5d6yk6gtctmen7sodsjmxg36b2fafujv7zpq/metadata.json",
    },
    {
        ITEM: "Ninetales",
        IPFS_URL: "ipfs://bafyreicudnc6cm3m3l54sjd3ucnin7jprars2tppyhvh7buha44hfjf5am/metadata.json",
    },
    {
        ITEM: "Jigglypuff",
        IPFS_URL: "ipfs://bafyreibg3noqt52x6vgf6dmbr3ljpmqmv3sumb7ku4d6u2iobsi4fcan5a/metadata.json",
    },
    {
        ITEM: "Wigglytuff",
        IPFS_URL: "ipfs://bafyreibappxb5xa6bt2garvvlh4ldrfqctidf34oluo7ifg3odmtpuqnci/metadata.json",
    },
    {
        ITEM: "Zubat",
        IPFS_URL: "ipfs://bafyreia2kvnmoihcrxvyja7ep7bpczm75sxzofszsjm3wuc3mxvw3xzczm/metadata.json",
    },
    {
        ITEM: "Golbat",
        IPFS_URL: "ipfs://bafyreie66d3tw2cuqshue5ahf5wofjjiun2om6bkbwtlmkejx26ypsxlcu/metadata.json",
    },
    {
        ITEM: "Oddish",
        IPFS_URL: "ipfs://bafyreigrwor2q3xgbi5kvzoi43ml66h2cnsewdzan6vnpbtdkupjwmtrim/metadata.json",
    },
    {
        ITEM: "Gloom",
        IPFS_URL: "ipfs://bafyreifmxetvd3id4arxtxbaftkbelr6vy7ttrez5o24accdunwixcwdym/metadata.json",
    },
    {
        ITEM: "Vileplume",
        IPFS_URL: "ipfs://bafyreiej2oiqmqe7nwrqmdjknutq73truf2thijldpsjfiwf22enn5y73y/metadata.json",
    },
    {
        ITEM: "Paras",
        IPFS_URL: "ipfs://bafyreie67pthncpbqkiw7lmjsxuzsthbmbfgz2hdgpcvixptt7agcptske/metadata.json",
    },
    {
        ITEM: "Parasect",
        IPFS_URL: "ipfs://bafyreib5b7x7stywed3kfhi2e5b3y5au6kksngzbydnpxzpzywjw3mwfoe/metadata.json",
    },
    {
        ITEM: "Venonat",
        IPFS_URL: "ipfs://bafyreibjb577dp5sb3glkwytzxcohneesfwcqvkgodv7rbtq4xvzdp67jq/metadata.json",
    },
    {
        ITEM: "Venomoth",
        IPFS_URL: "ipfs://bafyreifw5emo367i5p4ptqgs7cx6ysiiblx46k6sdeni75tlbrzh2hupfy/metadata.json",
    },
    {
        ITEM: "Diglett",
        IPFS_URL: "ipfs://bafyreictcq3wwa3b5kzivtwqlcdurj7ghseen75i6pn3tlesmbjtbwjwae/metadata.json",
    },
    {
        ITEM: "Dugtrio",
        IPFS_URL: "ipfs://bafyreicbdr6tvkpafd6ar6hgv76x2zfqbxckhqpcyoditbzy7cauwzhple/metadata.json",
    },
    {
        ITEM: "Meowth",
        IPFS_URL: "ipfs://bafyreidtt3x44tzffde46jzuncz2e7oo2vestxofm5psyjb3nd3nwdkfi4/metadata.json",
    },
    {
        ITEM: "Persian",
        IPFS_URL: "ipfs://bafyreiexypc4fawdcedg3ratysk7fkqaiiksu5xiluk5jkx7nbuyvufd2u/metadata.json",
    },
    {
        ITEM: "Psyduck",
        IPFS_URL: "ipfs://bafyreigdm7bdqz66qlptolv6rfa2pomsa5uyoqyuevzhkdjackzulpvziq/metadata.json",
    },
    {
        ITEM: "Golduck",
        IPFS_URL: "ipfs://bafyreihgbmxbsr5vprggxw7bnwjw5jkhycpfib7o342b7o7dbmtgdiibje/metadata.json",
    },
    {
        ITEM: "Mankey",
        IPFS_URL: "ipfs://bafyreihab7vbdwbidtxisgdbzrjiuagp6kexmbplzf4mg5ifb2qg2sp47e/metadata.json",
    },
    {
        ITEM: "Primeape",
        IPFS_URL: "ipfs://bafyreifb63ebzuveq6fgfvkgiyfftsp3pomqjsfy3r2tof7shkktfirbgu/metadata.json",
    },
    {
        ITEM: "Growlithe",
        IPFS_URL: "ipfs://bafyreicukixs54sov7tdwwrz73uqkd3yeuzevjwdyozqyiwqvrp3fxm64m/metadata.json",
    },
    {
        ITEM: "Arcanine",
        IPFS_URL: "ipfs://bafyreihclbrfhw53bbz3orql2wcr2bd4pybsmg33ulimjybynmu4haxtli/metadata.json",
    },
    {
        ITEM: "Poliwag",
        IPFS_URL: "ipfs://bafyreiduigb2izjamepab2mnx7lbo7hk2odf3utyjaqh5ikx4oadsrtnmm/metadata.json",
    },
    {
        ITEM: "Poliwhirl",
        IPFS_URL: "ipfs://bafyreicmu4une6oqxpymrrl55zmqpo5vgac5bosygxaqkuquro5xnnpgji/metadata.json",
    },
    {
        ITEM: "Poliwrath",
        IPFS_URL: "ipfs://bafyreicj3nw37isnijdcemqobvevv7nxgay5fdek3a4gvt5bhkxt5vnbba/metadata.json",
    },
    {
        ITEM: "Abra",
        IPFS_URL: "ipfs://bafyreic4kvaamcfkixf6vubdpvoy3xairjjynkuvz4ttfwuh7jb37rgteu/metadata.json",
    },
    {
        ITEM: "Kadabra",
        IPFS_URL: "ipfs://bafyreianpgr5v3wtw2z5jpzbebkjlwqi5twzmxllrxptwmclxolzeeqqh4/metadata.json",
    },
    {
        ITEM: "Alakazam",
        IPFS_URL: "ipfs://bafyreidlmngqt26vpnlssvmagvpx3wpelsmoyvht32hcxscehqoeh2jojq/metadata.json",
    },
    {
        ITEM: "Machop",
        IPFS_URL: "ipfs://bafyreigkszgwqarrvhnjngiyroglmhpiwdklqqwhwdvryx3ehklgs3duim/metadata.json",
    },
    {
        ITEM: "Machoke",
        IPFS_URL: "ipfs://bafyreieclqtiraaan576sweh4dplalcsskpknm4oj242x72vdmlarysbt4/metadata.json",
    },
    {
        ITEM: "Machamp",
        IPFS_URL: "ipfs://bafyreics22zrdr7r22vb65wsiznaul73fpwa5fr5rvv5oa4363ln5x5ryi/metadata.json",
    },
    {
        ITEM: "Bellsprout",
        IPFS_URL: "ipfs://bafyreibs6ap46veqalgixuavw5g5h7j3fijn6ovlhel4klhlnbxqpricfe/metadata.json",
    },
    {
        ITEM: "Weepinbell",
        IPFS_URL: "ipfs://bafyreihkynb5lhti4dvmr4m2mjq67va7m3saofnng666u2i3vfu4eyxqdi/metadata.json",
    },
    {
        ITEM: "Victreebel",
        IPFS_URL: "ipfs://bafyreigwpkls6kdatb3kkoovbtcgowd73cn25vcoho6p3oos4fpquonqiq/metadata.json",
    },
    {
        ITEM: "Tentacool",
        IPFS_URL: "ipfs://bafyreifylzfiwgjejlkqtvj6kvd5opsgeog5jcop3pif3pnwhkfg33uuha/metadata.json",
    },
    {
        ITEM: "Tentacruel",
        IPFS_URL: "ipfs://bafyreialkhy7lqpjyidxl3xp5yssdy26yhdyzjruxca7v4raqsfmlzwz7y/metadata.json",
    },
    {
        ITEM: "Geodude",
        IPFS_URL: "ipfs://bafyreifhakqj3eknyyrnedk572na2pcmwi7hwwu3cxbtn7jynz6cqczb5q/metadata.json",
    },
    {
        ITEM: "Graveler",
        IPFS_URL: "ipfs://bafyreigstc7om4wv2oc5wdpp5xs7bc3fejeeh442tnrxqu2sbbzfpe5nj4/metadata.json",
    },
    {
        ITEM: "Golem",
        IPFS_URL: "ipfs://bafyreiay7hcz6gfot43rr6pkuamqqmqouexnwlmt5a2ghkbmokuykspnvy/metadata.json",
    },
    {
        ITEM: "Ponyta",
        IPFS_URL: "ipfs://bafyreig6ucrok5t7bx4pmhsqtpmgotrxq4fvflbxtnbkpolb7dcurzfmfu/metadata.json",
    },
    {
        ITEM: "Rapidash",
        IPFS_URL: "ipfs://bafyreic6g223vshcfxhuih4syknxzwgv5yup3ll5g6t2xo23dm4q6xp5ue/metadata.json",
    },
    {
        ITEM: "Slowpoke",
        IPFS_URL: "ipfs://bafyreib7dwfm72hywnzd657rvd3ifnvn3r3bmhqarxu77tkrpuq7mvpdga/metadata.json",
    },
    {
        ITEM: "Slowbro",
        IPFS_URL: "ipfs://bafyreibrttrbso2sc432ankn3w7bukxpytzqksiuh36gxouwfjp2jw2h5m/metadata.json",
    },
    {
        ITEM: "Magnemite",
        IPFS_URL: "ipfs://bafyreidltdgfnej7em3vsyoe2oyqirjzdgukpsyjxfj7ve64ndstogxhdi/metadata.json",
    },
    {
        ITEM: "Magneton",
        IPFS_URL: "ipfs://bafyreiboj7jsqp54rvxwnigm5wvgiajiggvcfwfgp3kcejyjnyhak6bl6a/metadata.json",
    },
    {
        ITEM: "Farfetch'd",
        IPFS_URL: "ipfs://bafyreicg33bekeppx6ym3nqpspckuncoknvb2xtcwjvlswrwohgljwgcka/metadata.json",
    },
    {
        ITEM: "Doduo",
        IPFS_URL: "ipfs://bafyreicjzvo2t7zd7nca4rib4oxakv5c4gz5ci4xkepyfn6byv4rinxgu4/metadata.json",
    },
    {
        ITEM: "Dodrio",
        IPFS_URL: "ipfs://bafyreidwtgqkbkx5uacxetx3zpn2mppadrhj26yel6ppz7gv5x6bxmiely/metadata.json",
    },
    {
        ITEM: "Seel",
        IPFS_URL: "ipfs://bafyreiabmmyn72o7ye4s42ssntzoavnjo4fjbagovjvo3uqoesvfzhozje/metadata.json",
    },
    {
        ITEM: "Dewgong",
        IPFS_URL: "ipfs://bafyreiaiftqqw3ztiz7m5daxq4n753npqpgj33ffz3cpjs5l2r7hqq57e4/metadata.json",
    },
    {
        ITEM: "Grimer",
        IPFS_URL: "ipfs://bafyreib3ewhgatsgh2w7gordpx6anmwo2qquyhcric6llnmifi52upsvuy/metadata.json",
    },
    {
        ITEM: "Muk",
        IPFS_URL: "ipfs://bafyreidz4gmksjqlna73k2dxhpypvofzllvzmfjh66n4762tjgllfaufpi/metadata.json",
    },
    {
        ITEM: "Shellder",
        IPFS_URL: "ipfs://bafyreidcj2pxlavffgk64iwoqdrswoo2a2wq4vqchza4d3vj3ut4rtfpiy/metadata.json",
    },
    {
        ITEM: "Cloyster",
        IPFS_URL: "ipfs://bafyreih6kj6ckzf526m7mpxgejyhkbggs76vkqq2rbt6xcvdevkdfxczsq/metadata.json",
    },
    {
        ITEM: "Gastly",
        IPFS_URL: "ipfs://bafyreidyudlyqowgkvenerkawhhb6572zvj7yzt5g3slktzfba6dmmfv5e/metadata.json",
    },
    {
        ITEM: "Haunter",
        IPFS_URL: "ipfs://bafyreiaqez2ewek3dib2y7fyvhtzsw3223oe25pk3ct54uuseviu5352gi/metadata.json",
    },
    {
        ITEM: "Gengar",
        IPFS_URL: "ipfs://bafyreihhghe72hnhk63jj4tpuufdlqqe57ggbmiqk3l4gnhhuvrghlkpxu/metadata.json",
    },
    {
        ITEM: "Onix",
        IPFS_URL: "ipfs://bafyreifcrr3zpfvxrkjfqz4g7opcmbsukpnvkxxcktxlrxqnskyuk5chuy/metadata.json",
    },
    {
        ITEM: "Drowzee",
        IPFS_URL: "ipfs://bafyreia7i5as7vzrpav6ekh63lp62tiygmh3fuuaud2vn4qsebg7w7huse/metadata.json",
    },
    {
        ITEM: "Hypno",
        IPFS_URL: "ipfs://bafyreiclkiqbj2oxz7alplutzdnsqsurzoftw3euxdoj4fl5xp5ykobsvm/metadata.json",
    },
    {
        ITEM: "Krabby",
        IPFS_URL: "ipfs://bafyreieu7ve3ltxg36htgfh4bxnqhrheekqcjb6vecd5egd3miveckn3ni/metadata.json",
    },
    {
        ITEM: "Kingler",
        IPFS_URL: "ipfs://bafyreifiaxiqemnwvl3zur3j6lsrjse762mvmrfpnzlpgyoggiubuo5kou/metadata.json",
    },
    {
        ITEM: "Voltorb",
        IPFS_URL: "ipfs://bafyreidd64ox7eqaf3ompkd2t4doyy52v4kiumdc6wbhcqcch5nxgiyu6a/metadata.json",
    },
    {
        ITEM: "Electrode",
        IPFS_URL: "ipfs://bafyreiewrgcnxforbzde55wabf2qdgzdvzqlwecpgnt4ianrvnwoifdilm/metadata.json",
    },
    {
        ITEM: "Exeggcute",
        IPFS_URL: "ipfs://bafyreigp23fi6nnvaoz3eioxwhaves5k7pjmghtahszsbxplwgza2lmpfa/metadata.json",
    },
    {
        ITEM: "Exeggutor",
        IPFS_URL: "ipfs://bafyreig5xpof5pec4no4rpqycbrqh6rya4ccstjk7m3emxw2d6s4bnrjyu/metadata.json",
    },
    {
        ITEM: "Cubone",
        IPFS_URL: "ipfs://bafyreihm4qd5lwi6wtks5lymbfiynkbznhwsq7f3udwel5gmmtijyljkxe/metadata.json",
    },
    {
        ITEM: "Marowak",
        IPFS_URL: "ipfs://bafyreigojhxx4qnffrawngqwrukqnkbq5uedrc4xos72yqvn646i2vdgqu/metadata.json",
    },
    {
        ITEM: "Hitmonlee",
        IPFS_URL: "ipfs://bafyreid7u54ij6gairvpgvxfh5znngus75amjulpwkmfvsp5d6yg7wpgwi/metadata.json",
    },
    {
        ITEM: "Hitmonchan",
        IPFS_URL: "ipfs://bafyreigzbdesxvu4gvd7wpnbaczcxxnieg7rbaikh6wuhc3zkqbbv7wozm/metadata.json",
    },
    {
        ITEM: "Lickitung",
        IPFS_URL: "ipfs://bafyreig2oqvnmjlb5frei76fz2dgzsjxqj6w4n4kdw6z3ukafjd2fjjeei/metadata.json",
    },
    {
        ITEM: "Koffing",
        IPFS_URL: "ipfs://bafyreig5v57worct37rykacw5k6nvz7n5ct5r5vc3qsaoa3bl6oyhynyuy/metadata.json",
    },
    {
        ITEM: "Weezing",
        IPFS_URL: "ipfs://bafyreieruqux7btnrtal4fi3u4rblr7fknzwlzvnwac6rcrtibcpceh2ki/metadata.json",
    },
    {
        ITEM: "Rhyhorn",
        IPFS_URL: "ipfs://bafyreih6g42qnxtg5xbgb3l4jedqkvhnoaf4eyhwhyikgx623eeuo7lo44/metadata.json",
    },
    {
        ITEM: "Rhydon",
        IPFS_URL: "ipfs://bafyreify7beequkrf3mv5cxvqb2cfysgpxzgtcrbadhvs4jneaineaa6z4/metadata.json",
    },
    {
        ITEM: "Chansey",
        IPFS_URL: "ipfs://bafyreicxdy7i4dpyjty2saky532d62kwsgotqiqslq763v34uf5l6qyknm/metadata.json",
    },
    {
        ITEM: "Tangela",
        IPFS_URL: "ipfs://bafyreid526jvv3dsrr4up34hnj4af7rfhb2fk2bliiyh67pouazfe7vk54/metadata.json",
    },
    {
        ITEM: "Kangaskhan",
        IPFS_URL: "ipfs://bafyreibpelvr5mwldzxcj7aax2iyjf7neape62yopf5u2hbw24f3nax2u4/metadata.json",
    },
    {
        ITEM: "Horsea",
        IPFS_URL: "ipfs://bafyreibom5za6wz4j2anvjlezw3x34olavdfn5pwq5gwtvyahhavritf3q/metadata.json",
    },
    {
        ITEM: "Seadra",
        IPFS_URL: "ipfs://bafyreic4xu2omwy3uvzvns742g2pdjernauak3zfwvmdho34ne4kjkvq3y/metadata.json",
    },
    {
        ITEM: "Goldeen",
        IPFS_URL: "ipfs://bafyreidbm2vjdwjaboflex5va54dim37u5miqn4pzrokifusc67o76egdu/metadata.json",
    },
    {
        ITEM: "Seaking",
        IPFS_URL: "ipfs://bafyreic7xsf5kee4o4njc2jtlje2ek7xfkab5dcu25li3lk3fxx2yriaia/metadata.json",
    },
    {
        ITEM: "Staryu",
        IPFS_URL: "ipfs://bafyreiatulxk53ehzzp67wghj7giomuha3linhiz6p4hsgkpkckgkfmyci/metadata.json",
    },
    {
        ITEM: "Starmie",
        IPFS_URL: "ipfs://bafyreieclwxe4nbsyzag5gnt7tmhqxxc2yz56uk6cbxjvxcicm5sprjfmi/metadata.json",
    },
    {
        ITEM: "Mr. Mime",
        IPFS_URL: "ipfs://bafyreigscro2nb47yyurgxib2gjr5dteiaea6tnhq3jyenyjp4cj3x54im/metadata.json",
    },
    {
        ITEM: "Scyther",
        IPFS_URL: "ipfs://bafyreibq6uaqmu6cuao7m452nvzjojfjkximijowpagowf2e4rxvygvdty/metadata.json",
    },
    {
        ITEM: "Jynx",
        IPFS_URL: "ipfs://bafyreic33bslgbhatppinlwmly5ubinlo4ocrr2csbwskf7wbtbencxkpm/metadata.json",
    },
    {
        ITEM: "Electabuzz",
        IPFS_URL: "ipfs://bafyreidqwl7xlxoqnibdk6jve273irs2tognkdajme7eglkovjxs32lk7y/metadata.json",
    },
    {
        ITEM: "Magmar",
        IPFS_URL: "ipfs://bafyreih5uut7jbgn7brqwvbofxohfam4bm4jfy3whkdkxooi32fbp563vq/metadata.json",
    },
    {
        ITEM: "Pinsir",
        IPFS_URL: "ipfs://bafyreiew3bpw254nxfzgfp2e3hw4qpki3q7nyneoczpswyx4sfcaz6gueq/metadata.json",
    },
    {
        ITEM: "Tauros",
        IPFS_URL: "ipfs://bafyreiebfqz5o43qpevdbbll6yuowxo3art6ei2pvl4dupmirdfhvr5uvy/metadata.json",
    },
    {
        ITEM: "Magikarp",
        IPFS_URL: "ipfs://bafyreifemzo2thjgnqikjxlc4p32wssn4tfvmrihisb5ijtgxupyesgis4/metadata.json",
    },
    {
        ITEM: "Gyarados",
        IPFS_URL: "ipfs://bafyreigf4njausush353q5lucoujsrwgpm6fo5ef7a73o5g5qr4okq6dum/metadata.json",
    },
    {
        ITEM: "Lapras",
        IPFS_URL: "ipfs://bafyreighwylkm7b4hs2zn4mnchlngrvybg2cuu36xc5g2tscq4fl6anoti/metadata.json",
    },
    {
        ITEM: "Ditto",
        IPFS_URL: "ipfs://bafyreid5ix7mifyvwmgjvc3gguu2f3bfkxlqo4guedksc7d3osd4qqol7a/metadata.json",
    },
    {
        ITEM: "Eevee",
        IPFS_URL: "ipfs://bafyreieah7xirfuxbvmrwongpufht36pwvymamfh52cfignrhsxtut5zq4/metadata.json",
    },
    {
        ITEM: "Vaporeon",
        IPFS_URL: "ipfs://bafyreiauaejmp4sgr3a7q2md7ratrxsrd7a5vqrfvmqoafy2xn6lzjwvg4/metadata.json",
    },
    {
        ITEM: "Jolteon",
        IPFS_URL: "ipfs://bafyreifga3v3t2pkeqaz27ojwddpcegaulhip3lvw72ux4czzryhdm2nui/metadata.json",
    },
    {
        ITEM: "Flareon",
        IPFS_URL: "ipfs://bafyreicklaapig44y3lwnrdbodfqchf4ol7iijri7nxj762chcdcnfnarm/metadata.json",
    },
    {
        ITEM: "Porygon",
        IPFS_URL: "ipfs://bafyreifv3sg7bnzmcvi3ncaj6r7ys66okzlqd24t5gaahhpub2lyfnx4da/metadata.json",
    },
    {
        ITEM: "Omanyte",
        IPFS_URL: "ipfs://bafyreihhusqf4zsajt2blkafpmuv3fkg7ocfag6cife36nejfuf2erdr2a/metadata.json",
    },
    {
        ITEM: "Omastar",
        IPFS_URL: "ipfs://bafyreihov3hrwchqrg7luso3ro253b6ysbhd3bzbtphw2xkntyvvq43mfu/metadata.json",
    },
    {
        ITEM: "Kabuto",
        IPFS_URL: "ipfs://bafyreicbgx5elogrtbm7o6p7nb3i5wlxuvwsmcmg3hprq54p6zxwbxwgga/metadata.json",
    },
    {
        ITEM: "Kabutops",
        IPFS_URL: "ipfs://bafyreicnzjlho27bvbs3ygsnht46owec36ovpnj47zxquxnjcmotdbgtui/metadata.json",
    },
    {
        ITEM: "Aerodactyl",
        IPFS_URL: "ipfs://bafyreigpzj636chzg7aiyxbanzcggowppjuv3fyqxhkfehkj2hvyya4siy/metadata.json",
    },
    {
        ITEM: "Snorlax",
        IPFS_URL: "ipfs://bafyreice6t73ihajyabgmh6u4egumqcv4ai4tfksfn2cqfommay63zmhe4/metadata.json",
    },
    {
        ITEM: "Articuno",
        IPFS_URL: "ipfs://bafyreihape2ow4ofzwyzh2yq6eocwx7mzocoamcl5qujvxeoynhflntqpa/metadata.json",
    },
    {
        ITEM: "Zapdos",
        IPFS_URL: "ipfs://bafyreieqpxpicf7htta46ukoj5wk65jf7ga67qzjkvt4d2n4coaibwp2t4/metadata.json",
    },
    {
        ITEM: "Moltres",
        IPFS_URL: "ipfs://bafyreie6xyq3pvd6anru27tumtt5ehfvdundwzb4kubgghkpghaazqk5sm/metadata.json",
    },
    {
        ITEM: "Dratini",
        IPFS_URL: "ipfs://bafyreic3jhmisqaikvwjlte24lrcwzmmknbzvxb2cqkywofmdiexi3cy6i/metadata.json",
    },
    {
        ITEM: "Dragonair",
        IPFS_URL: "ipfs://bafyreiahfrkppbgvixya7tj6azw5nqpqv77ujpts4nj3ryvlaxeqkwgu5m/metadata.json",
    },
    {
        ITEM: "Dragonite",
        IPFS_URL: "ipfs://bafyreifcdiqaf3j5zlc253v3jowldfmuhl3vl6w5noy3r4d724rix7x6ai/metadata.json",
    },
    {
        ITEM: "Mewtwo",
        IPFS_URL: "ipfs://bafyreidrklsl674mjsiblwqbxhujciq346ttv77ic7vnjcnvy7almbzjmy/metadata.json",
    },
];

module.exports = async function (callback) {
    try {
        const accounts = await web3.eth.getAccounts();
        const owner = accounts[0];
        const contract = await PokemonNFT.deployed();

        for (let index = 0; index < data.length; index++) {
            const record = data[index];
            console.log(`Minting: ${record["ITEM"]} (${record["IPFS_URL"]})`);

            await contract.safeMint(owner, record["IPFS_URL"]);
        }
    } catch (error) {
        console.log("error", error);
    }

    callback();
};
