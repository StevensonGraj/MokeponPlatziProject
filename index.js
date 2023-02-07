const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const players = []

class Mokepon{
    constructor(name){
        this.name = name
        this.x = 0
        this.y = 0
    }
}
class Player{
    constructor(id){
        this.id = id
    }
    assignMokepon(mokepon){
        this.mokepon = mokepon
    }
    assignAttacks(attacks){
        this.attacks = attacks
    }
}
app.get("/joinGame", function(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*")

    const id = `${Math.random()}`
    res.send(id)

    const player = new Player(id)
    players.push(player)
})

app.post("/mokepon/:playerID", function(req, res){
    const playerID = req.params.playerID || ""
    const mokeponName = req.body.mokepon || ""
    const mokepon = new Mokepon(mokeponName)

    const indexPlayer = players.findIndex((player)=> playerID === player.id)
    if (indexPlayer >= 0) {
        players[indexPlayer].assignMokepon(mokepon)
    }

    res.end()
})

app.post("/mokepon/:playerID/position", function(req, res) {
    const playerID = req.params.playerID || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const indexPlayer = players.findIndex((player)=> playerID === player.id)
    if (indexPlayer >= 0) {
        players[indexPlayer].mokepon.x = x
        players[indexPlayer].mokepon.y = y
    }

    const enemies = players.filter((player) => playerID !== player.id)
    res.send({
        enemies
    })
})

app.post("/mokepon/:playerID/attacks", function(req, res) {
    const playerID = req.params.playerID || ""
    const attacks = req.body.attacks || ""

    const indexPlayer = players.findIndex((player)=> playerID === player.id)
    if (indexPlayer >= 0) {
        players[indexPlayer].assignAttacks(attacks)
    }

    res.end
})

app.get("/mokepon/:playerID/attacks", function(req, res) {
    const playerID = req.params.playerID || ""
    const player = players.find((player)=> playerID === player.id)

    res.send({
        attacks: player.attacks || []
    })
})

app.listen(8080, ()=>{
    console.log("Server listening on localhost:8080");
})