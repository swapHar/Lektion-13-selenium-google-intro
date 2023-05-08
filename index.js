// We want to pull out Builder, By, Key and until from selenium library
const {Builder, By, Key, until} = require('selenium-webdriver');
// We import should() from chai
const should = require('chai').should();

/* one more way to write funtion

(async function googleSearch() {

}) (); */

async function googleSearch() {
    
    let driver = await new Builder().forBrowser('firefox').build();

    try{
        //go to google.com
        await driver.get('http://www.google.com');
        // Find the accept cookies button
        let cookieButton = await driver.findElements(By.css('.QS5gu.sy4vM'));
        // Click the accept cookies button
        await cookieButton[1].click();
        // wait until the element is located, in this case search bar
        await driver.wait(until.elementsLocated(By.name('q')),10000);
        // Selenium is too fast , better wait 1 second / 1000 ms
        await driver.sleep(1000);
        // write something in search bar and push enter
        await driver.findElement(By.name('q')).sendKeys('Selenium',Key.ENTER);

        // Wait until elements are located
        await driver.wait(until.elementLocated(By.css('h3')),10000);

        // get the link text
        let firstlink = await driver.findElement(By.css('h3'));
        let linkText = await firstlink.getText();
        console.log(linkText);

        // Assert linkText
        linkText.should.equal('Selenium');

        if(linkText === 'Selenium') {
            await firstlink.click();
        } else{
            console.log('First link is not "Selenium".');
        }

        // wait until site loads and displays a title
        await driver.wait(until.titleContains('Selenium'),10000);
        // Get the title
        let title = await driver.getTitle();
        // Assert the title
        title.should.include('Selenium'); 

    } catch(error) {
        console.log(error);
    } finally{
        await driver.quit();
        console.log('Test run successfully');
    }

}

googleSearch();