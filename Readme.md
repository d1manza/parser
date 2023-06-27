# Parser
Parser and sender of messages in telegram

## Info
* Launch on Node v18.16.1 and higher
* Use Puppeteer (parsing) 
* Use Sequelize (ORM)
* Use Node-telegram-bot-api (interaction with telegram)
* Use set-interval-async (for use async setInterval)

## Config
path: `./app/config.js`
```js
    cockies: {
        sbermegamarket: {
            'accept': 'application/json',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'content-type': 'application/json',
                'cookie': 'spst=1685351544338_07861293462897579f3f5a84f82f0d41_b350434491ba66d4f19a71c5c6917fb3; spsn=1685351543679_7b2276657273696f6e223a22332e342e31222c227369676e223a226631653239353561626262366565363061303738373635356364386237333766222c22706c6174666f726d223a224c696e7578207838365f3634222c2262726f7773657273223a5b226368726f6d65225d2c2273636f7265223a302e377d; spid=1685351543679_f3fb0571785972513ee72fa646e65c22_plrlrlafbaukuv33; _ym_uid=1685351548799078251; _ym_d=1685351548; adspire_uid=AS.385371699.1685351548; oxxfgh=1724bf82-58c1-4879-8c76-3ce7804fb6cd#1#7776000000#5000#1800000; KFP_DID=8b0f0158-219f-de11-cf88-3170f858ca78; _ym_isad=2; ssaid=ef65ba70-fe00-11ed-a125-b7ec79e4d888; _ym_visorc=b; device_id=efa163d0-fe00-11ed-b5ca-0242ac110003; sbermegamarket_token=96006a10-a93a-4ebd-ab96-9660f42c287e; __zzatw-smm=MDA0dC0cTHtmcDhhDHEWTT17CT4VHThHKHIzd2UbN1ddHBEkWA4hPwsXXFU+NVQOPHVXLw0uOF4tbx5lT14iSFZSfiUgEntnFRtQSxgvS18+bX0yUCs5Lmw=MgQW3A==; adtech_uid=3ae23c0b-4e85-4e0f-b126-892d433166c4:sbermegamarket.ru; top100_id=t1.6795753.1312910045.1685351551286; _sa=SA1.ed70bcd5-1a03-4259-bb79-da2df6e4e848.1685351552; rrpvid=612331018118210; _gcl_au=1.1.1806522705.1685351553; uxs_uid=f1f761d0-fe00-11ed-888e-3bf465c36250; tmr_lvid=a51316b71439f2025b3d5efa774593c5; tmr_lvidTS=1685351553171; _ga=GA1.2.207982886.1685351550; _gid=GA1.2.751091527.1685351553; adrdel=1; rcuid=64746c81ec5f089a2ec1aabe; adrcid=AtspnX3cL0ThyorD9t5jkuQ; flocktory-uuid=2a30326c-c9da-4240-be40-4c5820b85310-7; _gpVisits={"isFirstVisitDomain":true,"idContainer":"10002472"}; tmr_detect=0|1685351555698; last_visit=1685326363247::1685351563247; _gp10002472={"hits":1,"vc":1,"ac":1}; spsc=1685351587589_05979ddd993cd1fa8bbb3dbef725ea2c_a5476469b72f558bb72e6aae99c6a060; cfidsw-smm=jEo1pLRncxmORkWo7IDrodUt0H59pMOUwuw5tzgjrSTIGT1ON43E5SlD/yPM/Hr6KxDuEJDbF/iOzLVikpqz65rXzqB//lRrsFzN8dB0lphPi3ReGggHschYc6YzwFDI9uoVchOf2bmFylMHaQ/lrxyE1x3ZwAekvXguoQ==; cfidsw-smm=jEo1pLRncxmORkWo7IDrodUt0H59pMOUwuw5tzgjrSTIGT1ON43E5SlD/yPM/Hr6KxDuEJDbF/iOzLVikpqz65rXzqB//lRrsFzN8dB0lphPi3ReGggHschYc6YzwFDI9uoVchOf2bmFylMHaQ/lrxyE1x3ZwAekvXguoQ==; region_info={"id":"24"}; address_info={"addressId":"bae50d7a-3e46-4d34-9dcf-fb433a45b266#46#","full":"г Красноярск, ул Норильская, д 46","geo":{"lat":56.056915,"lon":92.702835}}; _gat=1; __tld__=null; t3_sid_6795753=s1.952322242.1685351551288.1685351621874.1.9; _ga_W49D2LL5S1=GS1.1.1685351549.1.1.1685351624.56.0.0',
                'origin': 'https://sbermegamarket.ru',
                'referer': 'https://sbermegamarket.ru/',
                'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
                'sec-ch-ua-mobile': '?1',
                'sec-ch-ua-platform': '"Android"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
                'x-requested-with': 'XMLHttpRequest'
        } //cockies sbermegamarket
    },
    db: {
        host: 'localhost' //host DB,
        port: 5432 //port DB,
        name: 'db_name' //name DB,
        user: 'db_user' //user DB,
        password: 'password' //password DB
},
    tg: {
        token: 'xxx' //token telegram bot
},
    settings: {
        interval: 30 //application launch frequency (minutes)
}
```
