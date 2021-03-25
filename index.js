const express = require('express');
const bodyparser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');


const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./script")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/homepage.html'));
});

app.post('/getResult', async (req, res) => {
    console.log("Inside Post");
    const rollArray = req.body.inputRoll.split(",");
    let promiseResult = [];
    rollArray.forEach(roll => {
        let ans = fetch("https://terriblytinytales.com/testapi?rollnumber=" + roll);
        promiseResult.push(ans);

    });
    Promise.all(promiseResult)
        .then(d => {
            let lis = [];
            d.forEach(pr => {
                lis.push(Promise.resolve(pr.text().then(ff => [pr.url.slice(49), ff])))
            })
            Promise.all(lis)
                .then(ds => {

                    return res.jsonp(ds)
                })
            console.log("Result sent Successfuly");
        })
        .catch(e => {
            console.log(e)
        })

})

app.listen(3000, (req, res) => {
    console.log("Server Running at 3000");
});
