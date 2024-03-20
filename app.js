const express = require('express')
const {engine} = require('express-handlebars')
const app = express()
const port = 3000

const fs = require('fs')

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.redirect('/shorturl')
})

app.get('/shorturl',(req,res)=>{
    res.render('index')
})

app.get('/shorten',(req,res)=>{
    const inputurl = req.query.url
    const shortUrl = shorten(inputurl)
    res.render('short',{shortUrl})
})

//修改
app.get('/shorturl/:id', (req, res) => {
    const id = req.params.id
    res.send(`read shorturl: ${id}`)
})

app.listen(port,()=>{
    console.log(`express server is running on http://localhost:${port}`)
})


function randomNum(){
    const number = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let word = ''
    for (let i=0 ; i<5 ; i++) {
        word += number[Math.floor(Math.random()*62)]
    }
    return word
}

let newUrl = {
    "id": "5d6gh",
    "original": "www.yahoo.com"
}

function shorten(inputurl){
    fs.readFile('./url.json', function (err, urlInfo){
        if (err) { 
            return console.error(err)
        }

        let id = randomNum()
        newUrl.push({
            id: id,
            original: inputurl
        })

        let str = JSON.stringify(newUrl);
        //將字串符傳入您的 json 文件中
        fs.writeFile('./url.json', str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('Add new url to urlInfo...')
        })
    })
    
    return `http://localhost:3000/${randomNum()}`
}