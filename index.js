//line: C9Q2C8CQ2
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjY0MmFiYWZhLTViZGQtNDdiZC1iYzMyLTJkMDNlZmM2NzUyNSIsImlhdCI6MTY1NDM0MDQ2Nywic3ViIjoiZGV2ZWxvcGVyLzNjOGJjOTcxLTYyMmEtNmZhMi03ZTE5LTNhZDZlNGVjYzlkYSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI5MC41MS4yMDguMTk0Il0sInR5cGUiOiJjbGllbnQifV19.SruWRtNipZzzmOXb_xbpGX_LZU4YowiFXBWf4E47cBBz8JXgAMyDlkLEZT65zpClJMYyAPG6UC4IMZNcNUvswQ"
const express = require('express')
const axios = require('axios')
const app = express();
const bodyParser = require("body-parser");
let tag = new String();
const db = require('quick.db')

console.log("Voici les liens disponible:\n\nVoir le joueur: http://localhost:3000 \nVoir le clan du joueur: http://localhost:3000/clan \nVoir les cartes et coffres du joueur: http://localhost:3000/cartes")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

if(db.get('user')) db.delete('user')

let mycards = {
  'Knight': 'https://api-assets.clashroyale.com/cards/300/jAj1Q5rclXxU9kVImGqSJxa4wEMfEhvwNQ_4jiGUuqg.png',
  'Archers': 'https://api-assets.clashroyale.com/cards/300/W4Hmp8MTSdXANN8KdblbtHwtsbt0o749BbxNqmJYfA8.png',
  'Goblins': 'https://api-assets.clashroyale.com/cards/300/X_DQUye_OaS3QN6VC9CPw05Fit7wvSm3XegXIXKP--0.png',
  'Giant': 'https://api-assets.clashroyale.com/cards/300/Axr4ox5_b7edmLsoHxBX3vmgijAIibuF6RImTbqLlXE.png',
  'P.E.K.K.A': 'https://api-assets.clashroyale.com/cards/300/MlArURKhn_zWAZY-Xj1qIRKLVKquarG25BXDjUQajNs.png',
  'Minions': 'https://api-assets.clashroyale.com/cards/300/yHGpoEnmUWPGV_hBbhn-Kk-Bs838OjGzWzJJlQpQKQA.png',
  'Balloon': 'https://api-assets.clashroyale.com/cards/300/qBipxLo-3hhCnPrApp2Nn3b2NgrSrvwzWytvREev0CY.png',
  'Witch': 'https://api-assets.clashroyale.com/cards/300/cfwk1vzehVyHC-uloEIH6NOI0hOdofCutR5PyhIgO6w.png',
  'Barbarians': 'https://api-assets.clashroyale.com/cards/300/TvJsuu2S4yhyk1jVYUAQwdKOnW4U77KuWWOTPOWnwfI.png',
  'Golem': 'https://api-assets.clashroyale.com/cards/300/npdmCnET7jmVjJvjJQkFnNSNnDxYHDBigbvIAloFMds.png',
  'Skeletons': 'https://api-assets.clashroyale.com/cards/300/oO7iKMU5m0cdxhYPZA3nWQiAUh2yoGgdThLWB1rVSec.png',
  'Valkyrie': 'https://api-assets.clashroyale.com/cards/300/0lIoYf3Y_plFTzo95zZL93JVxpfb3MMgFDDhgSDGU9A.png',
  'Skeleton Army': 'https://api-assets.clashroyale.com/cards/300/fAOToOi1pRy7svN2xQS6mDkhQw2pj9m_17FauaNqyl4.png',
  'Bomber': 'https://api-assets.clashroyale.com/cards/300/12n1CesxKIcqVYntjxcF36EFA-ONw7Z-DoL0_rQrbdo.png',
  'Musketeer': 'https://api-assets.clashroyale.com/cards/300/Tex1C48UTq9FKtAX-3tzG0FJmc9jzncUZG3bb5Vf-Ds.png',
  'Baby Dragon': 'https://api-assets.clashroyale.com/cards/300/cjC9n4AvEZJ3urkVh-rwBkJ-aRSsydIMqSAV48hAih0.png',
  'Prince': 'https://api-assets.clashroyale.com/cards/300/3JntJV62aY0G1Qh6LIs-ek-0ayeYFY3VItpG7cb9I60.png',
  'Wizard': 'https://api-assets.clashroyale.com/cards/300/Mej7vnv4H_3p_8qPs_N6_GKahy6HDr7pU7i9eTHS84U.png',
  'Mini P.E.K.K.A': 'https://api-assets.clashroyale.com/cards/300/Fmltc4j3Ve9vO_xhHHPEO3PRP3SmU2oKp2zkZQHRZT4.png',
  'Spear Goblins': 'https://api-assets.clashroyale.com/cards/300/FSDFotjaXidI4ku_WFpVCTWS1hKGnFh1sxX0lxM43_E.png',
  'Giant Skeleton': 'https://api-assets.clashroyale.com/cards/300/0p0gd0XaVRu1Hb1iSG1hTYbz2AN6aEiZnhaAib5O8Z8.png',
  'Hog Rider': 'https://api-assets.clashroyale.com/cards/300/Ubu0oUl8tZkusnkZf8Xv9Vno5IO29Y-jbZ4fhoNJ5oc.png',
  'Minion Horde': 'https://api-assets.clashroyale.com/cards/300/Wyjq5l0IXHTkX9Rmpap6HaH08MvjbxFp1xBO9a47YSI.png',
  'Ice Wizard': 'https://api-assets.clashroyale.com/cards/300/W3dkw0HTw9n1jB-zbknY2w3wHuyuLxSRIAV5fUT1SEY.png',
  'Royal Giant': 'https://api-assets.clashroyale.com/cards/300/mnlRaNtmfpQx2e6mp70sLd0ND-pKPF70Cf87_agEKg4.png',
  'Guards': 'https://api-assets.clashroyale.com/cards/300/1ArKfLJxYo6_NU_S9cAeIrfbXqWH0oULVJXedxBXQlU.png',
  'Princess': 'https://api-assets.clashroyale.com/cards/300/bAwMcqp9EKVIKH3ZLm_m0MqZFSG72zG-vKxpx8aKoVs.png',
  'Dark Prince': 'https://api-assets.clashroyale.com/cards/300/M7fXlrKXHu2IvpSGpk36kXVstslbR08Bbxcy0jQcln8.png',
  'Three Musketeers': 'https://api-assets.clashroyale.com/cards/300/_J2GhbkX3vswaFk1wG-dopwiHyNc_YiPhwroiKF3Mek.png',
  'Lava Hound': 'https://api-assets.clashroyale.com/cards/300/unicRQ975sBY2oLtfgZbAI56ZvaWz7azj-vXTLxc0r8.png',
  'Ice Spirit': 'https://api-assets.clashroyale.com/cards/300/lv1budiafU9XmSdrDkk0NYyqASAFYyZ06CPysXKZXlA.png',
  'Fire Spirit': 'https://api-assets.clashroyale.com/cards/300/16-BqusVvynIgYI8_Jci3LDC-r8AI_xaIYLgXqtlmS8.png',
  'Miner': 'https://api-assets.clashroyale.com/cards/300/Y4yWvdwBCg2FpAZgs8T09Gy34WOwpLZW-ttL52Ae8NE.png',
  'Sparky': 'https://api-assets.clashroyale.com/cards/300/2GKMkBrArZXgQxf2ygFjDs4VvGYPbx8F6Lj_68iVhIM.png',
  'Bowler': 'https://api-assets.clashroyale.com/cards/300/SU4qFXmbQXWjvASxVI6z9IJuTYolx4A0MKK90sTIE88.png',
  'Lumberjack': 'https://api-assets.clashroyale.com/cards/300/E6RWrnCuk13xMX5OE1EQtLEKTZQV6B78d00y8PlXt6Q.png',
  'Battle Ram': 'https://api-assets.clashroyale.com/cards/300/dyc50V2cplKi4H7pq1B3I36pl_sEH5DQrNHboS_dbbM.png',
  'Inferno Dragon': 'https://api-assets.clashroyale.com/cards/300/y5HDbKtTbWG6En6TGWU0xoVIGs1-iQpIP4HC-VM7u8A.png',
  'Ice Golem': 'https://api-assets.clashroyale.com/cards/300/r05cmpwV1o7i7FHodtZwW3fmjbXCW34IJCsDEV5cZC4.png',
  'Mega Minion': 'https://api-assets.clashroyale.com/cards/300/-T_e4YLbuhPBKbYnBwQfXgynNpp5eOIN_0RracYwL9c.png',
  'Dart Goblin': 'https://api-assets.clashroyale.com/cards/300/BmpK3bqEAviflqHCdxxnfm-_l3pRPJw3qxHkwS55nCY.png',
  'Goblin Gang': 'https://api-assets.clashroyale.com/cards/300/NHflxzVAQT4oAz7eDfdueqpictb5vrWezn1nuqFhE4w.png',
  'Electro Wizard': 'https://api-assets.clashroyale.com/cards/300/RsFaHgB3w6vXsTjXdPr3x8l_GbV9TbOUCvIx07prbrQ.png',
  'Elite Barbarians': 'https://api-assets.clashroyale.com/cards/300/C88C5JH_F3lLZj6K-tLcMo5DPjrFmvzIb1R2M6xCfTE.png',
  'Hunter': 'https://api-assets.clashroyale.com/cards/300/VNabB1WKnYtYRSG7X_FZfnZjQDHTBs9A96OGMFmecrA.png',
  'Executioner': 'https://api-assets.clashroyale.com/cards/300/9XL5BP2mqzV8kza6KF8rOxrpCZTyuGLp2l413DTjEoM.png',
  'Bandit': 'https://api-assets.clashroyale.com/cards/300/QWDdXMKJNpv0go-HYaWQWP6p8uIOHjqn-zX7G0p3DyM.png',
  'Royal Recruits': 'https://api-assets.clashroyale.com/cards/300/jcNyYGUiXXNz3kuz8NBkHNKNREQKraXlb_Ts7rhCIdM.png',
  'Night Witch': 'https://api-assets.clashroyale.com/cards/300/NpCrXDEDBBJgNv9QrBAcJmmMFbS7pe3KCY8xJ5VB18A.png',
  'Bats': 'https://api-assets.clashroyale.com/cards/300/EnIcvO21hxiNpoI-zO6MDjLmzwPbq8Z4JPo2OKoVUjU.png',
  'Royal Ghost': 'https://api-assets.clashroyale.com/cards/300/3En2cz0ISQAaMTHY3hj3rTveFN2kJYq-H4VxvdJNvCM.png',
  'Ram Rider': 'https://api-assets.clashroyale.com/cards/300/QaJyerT7f7oMyZ3Fv1glKymtLSvx7YUXisAulxl7zRI.png',
  'Zappies': 'https://api-assets.clashroyale.com/cards/300/QZfHRpLRmutZbCr5fpLnTpIp89vLI6NrAwzGZ8tHEc4.png',
  'Rascals': 'https://api-assets.clashroyale.com/cards/300/KV48DfwVHKx9XCjzBdk3daT_Eb52Me4VgjVO7WctRc4.png',
  'Cannon Cart': 'https://api-assets.clashroyale.com/cards/300/aqwxRz8HXzqlMCO4WMXNA1txynjXTsLinknqsgZLbok.png',
  'Mega Knight': 'https://api-assets.clashroyale.com/cards/300/O2NycChSNhn_UK9nqBXUhhC_lILkiANzPuJjtjoz0CE.png',
  'Skeleton Barrel': 'https://api-assets.clashroyale.com/cards/300/vCB4DWCcrGbTkarjcOiVz4aNDx6GWLm0yUepg9E1MGo.png',
  'Flying Machine': 'https://api-assets.clashroyale.com/cards/300/hzKNE3QwFcrSrDDRuVW3QY_OnrDPijSiIp-PsWgFevE.png',
  'Wall Breakers': 'https://api-assets.clashroyale.com/cards/300/_xPphEfC8eEwFNrfU3cMQG9-f5JaLQ31ARCA7l3XtW4.png',
  'Royal Hogs': 'https://api-assets.clashroyale.com/cards/300/ASSQJG_MoVq9e81HZzo4bynMnyLNpNJMfSLb3hqydOw.png',
  'Goblin Giant': 'https://api-assets.clashroyale.com/cards/300/SoW16cY3jXBwaTDvb39DkqiVsoFVaDWbzf5QBYphJrY.png',
  'Fisherman': 'https://api-assets.clashroyale.com/cards/300/U2KZ3g0wyufcuA5P2Xrn3Z3lr1WiJmc5S0IWOZHgizQ.png',
  'Magic Archer': 'https://api-assets.clashroyale.com/cards/300/Avli3W7BxU9HQ2SoLiXnBgGx25FoNXUSFm7OcAk68ek.png',
  'Electro Dragon': 'https://api-assets.clashroyale.com/cards/300/tN9h6lnMNPCNsx0LMFmvpHgznbDZ1fBRkx-C7UfNmfY.png',
  'Firecracker': 'https://api-assets.clashroyale.com/cards/300/c1rL3LO1U2D9-TkeFfAC18gP3AO8ztSwrcHMZplwL2Q.png',
  'Mighty Miner': 'https://api-assets.clashroyale.com/cards/300/Cd9R56yraxTvJiD8xJ2qT2OdsHyh94FqOAarXpbyelo.png',
  'Elixir Golem': 'https://api-assets.clashroyale.com/cards/300/puhMsZjCIqy21HW3hYxjrk_xt8NIPyFqjRy-BeLKZwo.png',
  'Battle Healer': 'https://api-assets.clashroyale.com/cards/300/KdwXcoigS2Kg-cgA7BJJIANbUJG6SNgjetRQ-MegZ08.png',
  'Skeleton King': 'https://api-assets.clashroyale.com/cards/300/dCd69_wN9f8DxwuqOGtR4QgWhHIPIaTNxZ1e23RzAAc.png',
  'Archer Queen': 'https://api-assets.clashroyale.com/cards/300/p7OQmOAFTery7zCzlpDdm-LOD1kINTm42AwIHchZfWk.png',
  'Golden Knight': 'https://api-assets.clashroyale.com/cards/300/WJd207D0O1sN-l1FTb8P9KhYL2oF5jY26vRUfTUW3FQ.png',
  'Skeleton Dragons': 'https://api-assets.clashroyale.com/cards/300/qPOtg9uONh47_NLxGhhFc_ww9PlZ6z3Ry507q1NZUXs.png',
  'Mother Witch': 'https://api-assets.clashroyale.com/cards/300/fO-Xah8XZkYKaSK9SCp3wnzwxtvIhun9NVY-zzte1Ng.png',
  'Electro Spirit': 'https://api-assets.clashroyale.com/cards/300/WKd4-IAFsgPpMo7dDi9sujmYjRhOMEWiE07OUJpvD9g.png',
  'Electro Giant': 'https://api-assets.clashroyale.com/cards/300/_uChZkNHAMq6tPb3v6A49xinOe3CnhjstOhG6OZbPYc.png',
  'Cannon': 'https://api-assets.clashroyale.com/cards/300/nZK1y-beLxO5vnlyUhK6-2zH2NzXJwqykcosqQ1cmZ8.png',
  'Goblin Hut': 'https://api-assets.clashroyale.com/cards/300/l8ZdzzNLcwB4u7ihGgxNFQOjCT_njFuAhZr7D6PRF7E.png',
  'Mortar': 'https://api-assets.clashroyale.com/cards/300/lPOSw6H7YOHq2miSCrf7ZDL3ANjhJdPPDYOTujdNrVE.png',
  'Inferno Tower': 'https://api-assets.clashroyale.com/cards/300/GSHY_wrooMMLET6bG_WJB8redtwx66c4i80ipi4gYOM.png',
  'Bomb Tower': 'https://api-assets.clashroyale.com/cards/300/rirYRyHPc97emRjoH-c1O8uZCBzPVnToaGuNGusF3TQ.png',
  'Barbarian Hut': 'https://api-assets.clashroyale.com/cards/300/ho0nOG2y3Ch86elHHcocQs8Fv_QNe0cFJ2CijsxABZA.png',
  'Tesla': 'https://api-assets.clashroyale.com/cards/300/OiwnGrxFMNiHetYEerE-UZt0L_uYNzFY7qV_CA_OxR4.png',
  'Elixir Collector': 'https://api-assets.clashroyale.com/cards/300/BGLo3Grsp81c72EpxLLk-Sofk3VY56zahnUNOv3JcT0.png',
  'X-Bow': 'https://api-assets.clashroyale.com/cards/300/zVQ9Hme1hlj9Dc6e1ORl9xWwglcSrP7ejow5mAhLUJc.png',
  'Tombstone': 'https://api-assets.clashroyale.com/cards/300/LjSfSbwQfkZuRJY4pVxKspZ-a0iM5KAhU8w-a_N5Z7Y.png',
  'Furnace': 'https://api-assets.clashroyale.com/cards/300/iqbDiG7yYRIzvCPXdt9zPb3IvMt7F7Gi4wIPnh2x4aI.png',
  'Goblin Cage': 'https://api-assets.clashroyale.com/cards/300/vD24bBgK4rSq7wx5QEbuqChtPMRFviL_ep76GwQw1yA.png',
  'Goblin Drill': 'https://api-assets.clashroyale.com/cards/300/eN2TKUYbih-26yBi0xy5LVFOA0zDftgDqxxnVfdIg1o.png',
  'Fireball': 'https://api-assets.clashroyale.com/cards/300/lZD9MILQv7O-P3XBr_xOLS5idwuz3_7Ws9G60U36yhc.png',
  'Arrows': 'https://api-assets.clashroyale.com/cards/300/Flsoci-Y6y8ZFVi5uRFTmgkPnCmMyMVrU7YmmuPvSBo.png',
  'Rage': 'https://api-assets.clashroyale.com/cards/300/bGP21OOmcpHMJ5ZA79bHVV2D-NzPtDkvBskCNJb7pg0.png',
  'Rocket': 'https://api-assets.clashroyale.com/cards/300/Ie07nQNK9CjhKOa4-arFAewi4EroqaA-86Xo7r5tx94.png',
  'Goblin Barrel': 'https://api-assets.clashroyale.com/cards/300/CoZdp5PpsTH858l212lAMeJxVJ0zxv9V-f5xC8Bvj5g.png',
  'Freeze': 'https://api-assets.clashroyale.com/cards/300/I1M20_Zs_p_BS1NaNIVQjuMJkYI_1-ePtwYZahn0JXQ.png',
  'Mirror': 'https://api-assets.clashroyale.com/cards/300/wC6Cm9rKLEOk72zTsukVwxewKIoO4ZcMJun54zCPWvA.png',
  'Lightning': 'https://api-assets.clashroyale.com/cards/300/fpnESbYqe5GyZmaVVYe-SEu7tE0Kxh_HZyVigzvLjks.png',
  'Zap': 'https://api-assets.clashroyale.com/cards/300/7dxh2-yCBy1x44GrBaL29vjqnEEeJXHEAlsi5g6D1eY.png',
  'Poison': 'https://api-assets.clashroyale.com/cards/300/98HDkG2189yOULcVG9jz2QbJKtfuhH21DIrIjkOjxI8.png',
  'Graveyard': 'https://api-assets.clashroyale.com/cards/300/Icp8BIyyfBTj1ncCJS7mb82SY7TPV-MAE-J2L2R48DI.png',
  'The Log': 'https://api-assets.clashroyale.com/cards/300/_iDwuDLexHPFZ_x4_a0eP-rxCS6vwWgTs6DLauwwoaY.png',
  'Tornado': 'https://api-assets.clashroyale.com/cards/300/QJB-QK1QJHdw4hjpAwVSyZBozc2ZWAR9pQ-SMUyKaT0.png',
  'Clone': 'https://api-assets.clashroyale.com/cards/300/mHVCet-1TkwWq-pxVIU2ZWY9_2z7Z7wtP25ArEUsP_g.png',
  'Earthquake': 'https://api-assets.clashroyale.com/cards/300/XeQXcrUu59C52DslyZVwCnbi4yamID-WxfVZLShgZmE.png',
  'Barbarian Barrel': 'https://api-assets.clashroyale.com/cards/300/Gb0G1yNy0i5cIGUHin8uoFWxqntNtRPhY_jeMXg7HnA.png',
  'Heal Spirit': 'https://api-assets.clashroyale.com/cards/300/GITl06sa2nGRLPvboyXbGEv5E3I-wAwn1Eqa5esggbc.png',
  'Giant Snowball': 'https://api-assets.clashroyale.com/cards/300/7MaJLa6hK9WN2_VIshuh5DIDfGwm0wEv98gXtAxLDPs.png',
  'Royal Delivery': 'https://api-assets.clashroyale.com/cards/300/LPg7AGjGI3_xmi7gLLgGC50yKM1jJ2teWkZfoHJcIZo.png'
}


let allcards = {
  "Knight": "Chevalier",
  "Archers": "Archers",
  "Goblins": "Goblins",
  "Giant": "Géant",
  "P.E.K.K.A": "P.E.K.K.A",
  "Minions": "Gargouille",
  "Balloon": "Ballon",
  "Witch": "Sorcière",
  "Barbarians": "Barabares",
  "Golem": "Golem",
  "Skeletons": "Squelettes",
  "Valkyrie": "Valkyrie",
  "Skeleton Army": "Armée de squelettes",
  "Bomber": "Bombardier",
  "Musketeer": "Mousquetaire",
  "Baby Dragon": "Bébé dragon",
  "Prince": "Prince",
  "Wizard": "Sorcier",
  "Mini P.E.K.K.A": "Mini P.E.K.K.A",
  "Spear Goblins": "Gobelins à lances",
  "Giant Skeleton": "Squelette géant",
  "Hog Rider": "Chevaucheur de cochons",
  "Minion Horde": "Horde de gargouille",
  "Ice Wizard": "Sorcier de glace",
  "Royal Giant": "Géant royale",
  "Guards": "Gardes",
  "Princess": "Princesse",
  "Dark Prince": "Prince ténébreux",
  "Three Musketeers": "Trois mousquetaires",
  "Lava Hound": "Molosse de lave",
  "Ice Spirit": "Esprit de glace",
  "Fire Spirit": "Esprit de feu",
  "Miner": "Mineur",
  "Sparky": "Zappy",
  "Bowler": "Bouliste",
  "Lumberjack": "Bûcheron",
  "Battle Ram": "Bélier de combat",
  "Inferno Dragon": "Dragon de l'enfer",
  "Ice Golem": "Golem de glace",
  "Mega Minion": "Méga gargouille",
  "Dart Goblin": "Gobelin à serbacane",
  "Goblin Gang": "Gang de gobelins",
  "Electro Wizard": "Électro-sorcier",
  "Elite Barbarians": "Barabares d'élite",
  "Hunter": "Chasseur",
  "Executioner": "Bourreau",
  "Bandit": "Voleuse",
  "Royal Recruits": "Recrus royales",
  "Night Witch": "Sorcière de la nuit",
  "Bats": "Chauve-souris",
  "Royal Ghost": "Fantôme",
  "Ram Rider": "Cavabélier",
  "Zappies": "Électrocuteurs",
  "Rascals": "Fripons",
  "Cannon Cart": "Charrette à cannons",
  "Mega Knight": "Méga chevalier",
  "Skeleton Barrel": "Fût à squelettes",
  "Flying Machine": "Machine volante",
  "Wall Breakers": "Sapeur",
  "Royal Hogs": "Cochons royaux",
  "Goblin Giant": "Gobelin géant",
  "Fisherman": "Pécheur",
  "Magic Archer": "Archer magique",
  "Electro Dragon": "Électro-dragon",
  "Firecracker": "Artificière",
  "Elixir Golem": "Golem d'élixir",
  "Battle Healer": "Guérisseuse",
  "Skeleton King": "Roi squelette",
  "Archer Queen": "Rêne des archers",
  "Golden Knight": "Chevalier d'or",
  "Skeleton Dragons": "Dragons squelettes",
  "Mother Witch": "Mamie sorcière",
  "Electro Spirit": "Électro-esprit",
  "Electro Giant": "Électro-géant",
  "Cannon": "Cannon",
  "Goblin Hut": "Cabane de gobelins",
  "Mortar": "Mortier",
  "Inferno Tower": "Tour de l'enfer",
  "Bomb Tower": "Tour à bombes",
  "Barbarian Hut": "Cabane de barbare",
  "Tesla": "Tesla",
  "Elixir Collector": "Extracteur d'élixir",
  "X-Bow": "Arc-x",
  "Tombstone": "Pierre tombale",
  "Furnace": "Fournaise",
  "Goblin Cage": "Cage à gobelin",
  "Goblin Drill": "Foreuse gobeline",
  "Fireball": "Boulle de feu",
  "Arrows": "Flèche",
  "Rage": "Rage",
  "Rocket": "Rocket",
  "Goblin Barrel": "Fût à gobelin",
  "Freeze": "Gel",
  "Mirror": "Mirroir",
  "Lightning": "Foudre",
  "Zap": "Électrocution",
  "Poison": "Poison",
  "Graveyard": "Cimetière",
  "The Log": "Bûche",
  "Tornado": "Tornade",
  "Clone": "Clone",
  "Earthquake": "Séisme",
  "Barbarian Barrel": "Fût à barbares",
  "Heal Spirit": "Esprit de guérison",
  "Giant Snowball": "Méga boule de neige",
  "Royal Delivery": "Colis royale",
  }

app.get('/home', async(req, res) => {
  if(!db.get('user')) return res.render('pages/error', {
    title: "Clash Royale",
    message: `Veuillez entrer un tag Clash Royale valide pour avoir accès aux statistiques du joueur`
  })
  else {
    let { firstName } = req.body;
    if(firstName == undefined) firstName = db.get('user')
    const response = await axios(`https://api.clashroyale.com/v1/players/${encodeURIComponent(firstName)}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).catch(console.error);
    if(!response) return res.render('pages/error', {
      title: "Clash Royale",
      message: `Veuillez entrer un tag Clash Royale valide pour avoir accès aux statistiques du joueur`
    })
      if(response.status !== 200) return res.render('pages/error', {
        title: "Clash Royale",
        message: `Veuillez entrer un tag Clash Royale valide pour avoir accès aux statistiques du joueur`
      })
      let curent = new String;
      response.data.currentDeck.forEach(troop => {
          curent += `${mycards[troop.name]}`
      })

      db.set('user', `${firstName}`)
    
      res.render('pages/player', {
        title: 'Clash Royale',
        message: [`Pseudo: ${response.data.name}`, `Tag: ${response.data.tag}`,
        `Xp: ${response.data.expLevel} (${response.data.expPoints})`,
        `Étoiles: ${response.data.starPoints}`,
        `Arène: ${response.data.arena.name.replace('Arena', 'Arène')}`,
        `Total de dons donnés: ${response.data.totalDonations}`,
        `Total de dons reçus: ${response.data.donationsReceived}`,
        `Victoire du jour de guerre: ${response.data.warDayWins || "0"}`,
        `Nombre de combats gagnés: ${response.data.wins}`,
        `Nombre de combats perdus: ${response.data.losses}`,
        `Total de combats: ${response.data.battleCount}`,
        `Trophées actuel: ${response.data.trophies}`,
        `Record de trophées: ${response.data.bestTrophies}`,
        `Clan: ${response.data.clan.name} - ${response.data.clan.tag}`]
      })
  }
})


app.post('/home', async(req, res) => {
    const { firstName } = req.body;
    const response = await axios(`https://api.clashroyale.com/v1/players/${encodeURIComponent(firstName)}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).catch(console.error);
    if(!response) return res.render('pages/error', {
      title: "Clash Royale",
      message: `Veuillez entrer un tag Clash Royale valide pour avoir accès aux statistiques du joueur`
    })
      if(response.status !== 200) return res.render('pages/error', {
        title: "Clash Royale",
        message: `Veuillez entrer un tag Clash Royale valide pour avoir accès aux statistiques du joueur`
      })
      let curent = new String;
      response.data.currentDeck.forEach(troop => {
          curent += `${mycards[troop.name]}`
      })
      let badges = ['badge']
      response.data.badges.forEach(badge => {
        badges.push(badge.iconUrls.large)
      })

      db.set('user', `${firstName}`)
    
      res.render('pages/player', {
        title: 'Clash Royale',
        message: [`Pseudo: ${response.data.name}`, `Tag: ${response.data.tag}`,
        `Xp: ${response.data.expLevel} (${response.data.expPoints})`,
        `Étoiles: ${response.data.starPoints}`,
        `Arène: ${response.data.arena.name.replace('Arena', 'Arène')}`,
        `Total de dons donnés: ${response.data.totalDonations}`,
        `Total de dons reçus: ${response.data.donationsReceived}`,
        `Victoire du jour de guerre: ${response.data.warDayWins || "0"}`,
        `Nombre de combats gagnés: ${response.data.wins}`,
        `Nombre de combats perdus: ${response.data.losses}`,
        `Total de combats: ${response.data.battleCount}`,
        `Trophées actuel: ${response.data.trophies}`,
        `Record de trophées: ${response.data.bestTrophies}`,
        `Clan: ${response.data.clan.name} - ${response.data.clan.tag}`]
      })
});


app.get('/classement', async function(req, res) {
  return res.render('pages/error', {
    title: "Clash Royale",
    message: `CLASSEMENT EN DÉVELOPPEMENT ! Veuillez entrer un tag Clash Royale valide pour avoir accès aux statistiques du joueur`
  })
  const cc = await axios(`https://api.clashroyale.com/v1/locations/global/seasons`, {
    method: 'GET',
    headers: {
      Authorization: "Bearer " + token
    }
  }).catch(console.error)
  let cc2 = cc.data.items
  console.log(cc2.slice(-1))
  let ok = cc2.slice(-1)
  console.log("cc" + ok[0].id)
  /*const response = await axios(`https://api.clashroyale.com/v1/locations/global/seasons/${ok[0].id}/rankings/players`, {
    method: "GET",
    headers: {
      Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjIxNzJjYWZkLTdhY2ItNDI3OC1hZjFlLWYwNjdhYmRlOWNmMSIsImlhdCI6MTY1MTk0MzI5NSwic3ViIjoiZGV2ZWxvcGVyLzNjOGJjOTcxLTYyMmEtNmZhMi03ZTE5LTNhZDZlNGVjYzlkYSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI4Ni4xOTMuMzQuMTUwIl0sInR5cGUiOiJjbGllbnQifV19.CL_g428iymNTvSjkfag6ExK36phMkDqOIUM0rTbXChGPPlCd42Pzul2v3XCBvO8N5My0dLFaT1Dz484X2j-LmA"
    }
  }).catch(console.error)*/
  const response = await axios(`https://api.clashroyale.com/v1/locations/57000087/rankings/players`, {
    method: 'GET',
    headers: {
      Authorization: "Bearer " + token
    }
  }).catch(console.error)
  console.log(response)
  let data = response.data.items
  let array = data.slice(0, 10)
  console.log(array)

  res.render('pages/classement', {
    title: 'Clash Royale',
    message: `cc`
  })

})

app.get('/cartes', async function(req, res) {
  const wesg = await axios(`https://api.clashroyale.com/v1/players/${encodeURIComponent(db.get('user'))}`, {
  method: 'GET',
  headers: {
    Authorization: 'Bearer '+ token
  }
}).catch(console.error);
if(!wesg) return res.render('pages/error', {
  title: "Clash Royale",
  message: `Veuillez entrer un tag Clash Royale valide pour avoir accès aux statistiques du joueur`
})
if(wesg.status !== 200) return res.render('pages/error', {
  title: "Clash Royale",
  message: `Veuillez entrer un tag Clash Royale valide pour avoir accès aux statistiques du joueur`
})
  const response = await axios(`https://api.clashroyale.com/v1/players/${encodeURIComponent(db.get('user'))}/upcomingchests`, {
  method: 'GET',
  headers: {
    Authorization: 'Bearer ' + token
  }
}).catch(console.error);
if(!response) return res.render('pages/error', {
  title: "Clash Royale",
  message: `Veuillez entrer un tag Clash Royale valide pour avoir accès aux statistiques du joueur`
})
if(response.status !== 200) return res.render('pages/error', {
  title: "Clash Royale",
  message: `Veuillez entrer un tag Clash Royale valide pour avoir accès aux statistiques du joueur`
})
console.log(response.data)
let curent = [];
        wesg.data.currentDeck.forEach(troop => {
            curent.push(`${mycards[troop.name]}`)
        })

        let legend = "Aucune donnée"
        let magique = "Aucune donnée"
        let smagique = "Aucune donnée"
        let argent = "Aucune donnée"
        let or = "Aucune donnée"
        let cage = "Aucune donnée"
        let geant = "Aucune donnée"
        let epic = "Aucune donnée"
        let coffre1 = 0
        let coffre2 = 0
        let coffre3 = 0
        let coffre4 = 0
        let coffre5 = 0
        let coffre6 = 0
        let coffre7 = 0
        response.data.items.forEach(item => {
          if(item.name == 'Silver Chest') {
            if(coffre1 === 0) {
              coffre1 = 1
              argent = `${item.index + 1} coffres`
            }
          } else if(item.name == 'Golden Chest') {
            if(coffre2 === 0) {
              coffre2 = 1
              or = `${item.index + 1} coffres`
            }
          } else if(item.name == 'Gold Crate') {
            if(coffre3 === 0) {
              coffre3 = 1
              cage = `${item.index + 1} coffres`
            }
          } else if(item.name == 'Giant Chest') {
            if(coffre4 === 0) {
              coffre4 = 1
              geant = `${item.index + 1} coffres`
            }
          } else if(item.name == 'Magical Chest') {
            if(coffre5 === 0) {
              coffre5 = 1
              magique = `${item.index + 1} coffres`
            }
          } else if(item.name == 'Legendary Chest') {
            if(coffre6 === 0) {
              coffre6 = 1
              legend = `${item.index + 1} coffres`
            }
          } else if(item.name == 'Epic Chest') {
            if(coffre7 === 0) {
              coffre7 = 1
              epic = `${item.index + 1} coffres`
            }
          } 
        })
res.render('pages/player', {
  title: 'Clash Royale',
  message: [`Pseudo: ${wesg.data.name}`,
  `Tag: ${wesg.data.tag}`,
  `Deck actuel:`,
  curent,
  `Carte préféré: ${mycards[wesg.data.currentFavouriteCard.name]}`,
  `Prochain coffre en argent: ${argent}`,
  `Prochain coffre en or: ${or}`,
  `Prochaine cage d'or: ${cage}`,
  `Prochain coffre géant: ${geant}`,
  `Prochain coffre magique: ${magique}`,
  `Prochain coffre super magique: ${smagique}`,
  `Prochain coffre épique: ${epic}`,
  `Prochain coffre légendaire: ${legend}`]
})
})



app.get('/clan', async function(req, res) {
  const wesg = await axios(`https://api.clashroyale.com/v1/players/${encodeURIComponent(db.get('user'))}`, {
  method: 'GET',
  headers: {
    Authorization: 'Bearer ' + token
  }
}).catch(console.error);
if(!wesg) return res.render('pages/error', {
  title: "Clash Royale",
  message: `Veuillez entrer un tag Clash Royale valide pour avoir accès aux statistiques du joueur`
})
if(wesg.status !== 200) return res.render('pages/error', {
  title: "Clash Royale",
  message: `Veuillez entrer un tag Clash Royale valide pour avoir accès aux statistiques du joueur`
})
  const response = await axios(`https://api.clashroyale.com/v1/clans/${encodeURIComponent(wesg.data.clan?.tag)}`, {
  method: 'GET',
  headers: {
    Authorization: 'Bearer ' + token
  }
}).catch(console.error);
if(!response) return res.render('pages/error', {
  title: "Clash Royale",
  message: `Veuillez entrer un tag Clash Royale valide pour avoir accès aux statistiques du joueur`
})
if(response.status !== 200) return res.render('pages/error', {
  title: "Clash Royale",
  message: `Veuillez entrer un tag Clash Royale valide pour avoir accès aux statistiques du joueur`
})
let type = "Ouvert";
if(response.data.type === 'close') type = "Fermé"
else if(response.data.type === 'inviteOnly') type = "Sur invitation"
let chef = "Aucun ???"
response.data.memberList.forEach(member => {
  if(member.role === 'leader') chef = `${member.name} (${member.tag})`
})
console.log(response.data)

res.render('pages/player', {
  title: 'Clash Royale',
  message: [
    `Badge: ${response.data.badgeUrls}`,
    `Clan: ${response.data.name}`,
    `Tag: ${response.data.tag}`,
    `Type: ${type}`,
    `Description: ${response.data.description}`,
    `Score de clan: ${response.data.clanScore}`,
    `Trophées de guerre du clan: ${response.data.clanWarTrophies}`,
    `Trophées requis: ${response.data.requiredTrophies}`,
    `Don hebdomadaire: ${response.data.donationsPerWeek}`,
    `Membre: ${response.data.members}`,
    `Chef: ${chef}`
  ]
})
})

app.get('/', async function(req, res) {
  /*const response = await axios(`https://api.clashroyale.com/v1/players/${encodeURIComponent(db.get('user'))}`, {
  method: 'GET',
  headers: {
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjIxNzJjYWZkLTdhY2ItNDI3OC1hZjFlLWYwNjdhYmRlOWNmMSIsImlhdCI6MTY1MTk0MzI5NSwic3ViIjoiZGV2ZWxvcGVyLzNjOGJjOTcxLTYyMmEtNmZhMi03ZTE5LTNhZDZlNGVjYzlkYSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI4Ni4xOTMuMzQuMTUwIl0sInR5cGUiOiJjbGllbnQifV19.CL_g428iymNTvSjkfag6ExK36phMkDqOIUM0rTbXChGPPlCd42Pzul2v3XCBvO8N5My0dLFaT1Dz484X2j-LmA'
  }
}).catch(console.error);
if(!response) return res.render('pages/error', {
  title: "Clash Royale",
  message: `Veuillez entrer un tag Clash Royale valide pour avoir accès aux statistiques du joueur`
})
  if(response.status !== 200) return res.render('pages/error', {
    title: "Clash Royale",
    message: `Veuillez entrer un tag Clash Royale valide pour avoir accès aux statistiques du joueur`
  })
  let curent = new String;
  response.data.currentDeck.forEach(troop => {
      curent += `\n${allcards[troop.name] || troop.name} - Level ${troop.level}`
  })

  res.render('pages/player', {
    title: 'Clash Royale',
    message: [`Pseudo: ${response.data.name}`, `Tag: ${response.data.tag}`,
    `Xp: ${response.data.expLevel} (${response.data.expPoints})`,
    `Étoiles: ${response.data.starPoints}`,
    `Arène: ${response.data.arena.name.replace('Arena', 'Arène')}`,
    `Total de dons donnés: ${response.data.totalDonations}`,
    `Total de dons reçus: ${response.data.donationsReceived}`,
    `Victoire du jour de guerre: ${response.data.warDayWins || "0"}`,
    `Nombre de combats gagnés: ${response.data.wins}`,
    `Nombre de combats perdus: ${response.data.losses}`,
    `Total de combats: ${response.data.battleCount}`,
    `Trophées actuel: ${response.data.trophies}`,
    `Record de trophées: ${response.data.bestTrophies}`,
    `Clan: ${response.data.clan.name} - ${response.data.clan.tag}`]
  })*/
  res.redirect('http://localhost:3000/home')
})
app.listen(process.env.port || 3000);

//console.log('Running at Port ' + `${process.env.port || 3000} ` + `Lien: http://localhost:${process.env.port || 3000}/ \nLe clan: http://localhost:${process.env.port || 3000}/clan \nLes cartes: http://localhost:${process.env.port || 3000}/cartes`);