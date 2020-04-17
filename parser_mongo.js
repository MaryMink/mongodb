const { Builder, By, Key, until } = require('selenium-webdriver');
const MongoClient = require("mongodb").MongoClient;
   
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
(async function pars() {

    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.get('https://www.google.com/search?q=web&oq=web&aqs=chrome..69i57j0l3j69i61l2j69i60l2.998j0j7&sourceid=chrome&ie=UTF-8');
        await driver.wait(until.elementLocated(By.id('center_col')));

        for (let i = 1; i < 9; i++) {
            let j = i + 2;
            var name = await (await driver.findElement(By.xpath('//*[@id="rso"]/div[' + j + ']/div/div[1]/a/h3'))).getText();
            var link = await (await driver.findElement(By.xpath('//*[@id="rso"]/div[' + j + ']/div/div[1]/a'))).getAttribute('href');
            var data = `${i}) ${name} - ${link}`;
            console.log(data);
        }
        driver.quit();
    } catch (err) {
        Console.log(err)
    }
    mongoClient.connect(err => {
        const collection = mongoClient.db("googlezap").collection("inquiries");

        collection.insertOne(data, function(err, result) {

            if (err) {
                return console.log(err);
            }
            console.log(result.ops);
            mongoClient.close();
        });
    });
})();