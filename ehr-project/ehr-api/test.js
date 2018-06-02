const puppeteer = require('puppeteer')
const devices = require('./utils/DeviceDescriptors')
const screeshot = async(url, key,deeper)=> {
    const browser = await puppeteer.launch({
        headless : true,
        timeout : 0,
        args : ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.emulate(devices['iPhone 6 Plus']);

    // 等待网络状态为空闲的时候才继续执行
    try {
        await page.goto(url)

        // await page.waitFor(10*1000); // 等待1000毫秒
        // c-accomplishments-certificate-image
        console.log(await page.content())
        await page.waitForSelector(".rc-PageFooter", {timeout : 60000})
        console.log('2')
        await page.evaluate(() => {
            document.querySelector('.c-accomplishments-header').style.display = 'none'
            document.querySelector('.rc-PageFooter').style.display = 'none';
            document.querySelector('.c-accomplishments-table-body').style.paddingTop = 0;
            document.querySelector('.c-accomplishments-table-body').style.paddingBottom = 0;
            document.querySelector('.bt3-col-sm-7>h4').style.marginTop = '15px';
            document.querySelector('.bt3-row').style.display = 'none'
            document.querySelectorAll('.bt3-col-sm-7 p')[4].style.display = 'none';
            document.querySelector('.bt3-col-sm-7 div').style.display = 'none';
            let tableHeaders = document.querySelectorAll('.c-accomplishments-table-header')
            for (let val of tableHeaders) {
                val.style.display = 'none'
            }
            let elements = document.querySelectorAll('.c-accomplishments-table-subheader');
            elements[0].style.display = 'none';
            elements[0].nextSibling.style.display = 'none';
            elements[1].style.display = 'none';
            elements[1].nextSibling.style.display = 'none';
            elements[1].nextSibling.nextSibling.style.display = 'none'
            window.scrollBy(0, window.innerHeight);

        });
        // rc-PageFooter
        await page.screenshot({
            path : `./static/screenshots/${key}.jpeg`,
            type : 'jpeg',
            quality : 100,
            // fullPage: true
        })
        let staticPath = `/screenshots/${key}.jpeg`
        browser.close()
        return staticPath
    } catch (e) {
        if (deeper<5){
            return screeshot(url,key,deeper+1)
        } else {
            return ''
        }
    }
}
screeshot('https://www.coursera.org/account/accomplishments/verify/YZRBPPPT9WP4', 'YZRBPPPT9WP4',0)