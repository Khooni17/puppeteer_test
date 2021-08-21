const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    let cookies = []

    for (let c of cookies) {
        await page.setCookie(c);
        console.log('setting');
    }
    await page.goto('https://old.cs.money/')
    const client = page._client

    client.on('Network.webSocketCreated', ({requestId, url}) => {
        console.log('Network.webSocketCreated', requestId, url)
    })

    client.on('Network.webSocketClosed', ({requestId, timestamp}) => {
        console.log('Network.webSocketClosed', requestId, timestamp)
    })

    client.on('Network.webSocketFrameSent', ({requestId, timestamp, response}) => {
        console.log('Network.webSocketFrameSent', requestId, timestamp, response.payloadData)
    })

    client.on('Network.webSocketFrameReceived', ({requestId, timestamp, response}) => {
        console.log('Network.webSocketFrameReceived', requestId, timestamp, response.payloadData)
    })
})()
