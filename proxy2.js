const puppeteer = require('puppeteer');
const proxyChain = require('proxy-chain');

(async() => {
    const oldProxyUrl = 'http://proxy_user+DE:proxy_password@x.botproxy.net:8080';
    const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

    // Prints something like "http://127.0.0.1:45678"
    console.log(newProxyUrl);

    const browser = await puppeteer.launch({
        args: [`--proxy-server=${newProxyUrl}`],
        headless: false,
    });
})();