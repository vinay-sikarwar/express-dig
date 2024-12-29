// npm run start( in terminal to run this code )
import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT ||3000;

// app.get("/", (req, res) => {
//     res.send("Hello from vinay!")
// })

// app.get("/ice-tea", (req, res) => {
//   res.send("What do you prefer");
// });

// app.get("/twitter", (req, res) => {
//   res.send("it's my twitter account");
// });

app.use(express.json()) // any data that comes in json format we accept that

let teaData = []
let nextId = 1

// add a new tea
app.post('/teas', (req, res) => {
    const {name, price} =req.body                              // body is given by express js
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

// get all tea
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})

//get a tea with id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))     // It goes to every single object of the array or entity of the array
    // so far we have been accepting everything inside the body. But if you ae sending me anything inside the URL, you extract that via "params"
    if(!tea) {
        return res.status(404).send("Tea not found")
    }
    res.status(200).send(tea)
})


// update
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find((t) => t.id === parseInt(req.params.id)); 

    if (!tea) {
      return res.status(404).send("Tea not found");
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

// delete tea

app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1) {
        return res.status(404).send('tea not found')
    }
    teaData.splice(index, 1)
    return res.status(204).send("delete");
})

app.listen(port, () => {
    console.log(`Server is runnig at port ${port}...`);
})