/* Variables getted of the HTML document */
const cardsContainer = document.getElementById('cardsContainer')
const atkSelectionSection = document.getElementById('attack-selection')
const playerPetButton = document.getElementById('petButton')
const restartButton = document.getElementById('restartButton')
const petSelectionSection = document.getElementById('pet-selection')
const playerPetSpan = document.getElementById('playerPet')
const enemyPetSpan = document.getElementById('enemyPet')
const playerImg = document.getElementById('playerImg')
const enemyImg = document.getElementById('enemyImg')
const playerLivesSpan = document.getElementById('playerLives')
const enemyLivesSpan = document.getElementById('enemyLives')
const battleResult = document.getElementById('battle-result')
const playerFightAtk = document.getElementById('player-atk')
const enemyFightAtk = document.getElementById('enemy-atk')
const attackButtons = document.getElementById('attack-buttons')
const mapSection = document.getElementById('viewMap')
const map = document.getElementById('map')
map.width = window.innerWidth*0.6
map.height = window.innerWidth*0.45
/* Variables used for the JS code */
let playerID = null
let enemyID = null
let playerLives = 3
let playerAtks = []
let enemyLives = 3
let enemyAtks = []
let mokepons = []
let enemyMokepons = []
let mokeponCard
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputPydos
let inputTucapalma
let inputLangostelvis
let playerPet
let enemyPet
let fireButton
let watterButton
let groundButton
let buttons = []
let canvas2D = map.getContext("2d")
let interval
let backgroundMapImg = new Image()
backgroundMapImg.src = './assets/mokemap.png'

//Class, pets and attacks definition
class Mokepon{
    constructor(newName, newPhoto, newLive, mapPhoto, id=null){
        this.id = id
        this.name = newName
        this.photo = newPhoto
        this.live = newLive
        this.attacks = []
        //Size of the Mokepong img determinated from the map size
        this.width = map.width/8
        this.height = this.width
        //Position Random of the Mokepon from the map size
        this.x = random(0, map.height-this.height)
        this.y = random(0, map.width-this.width)
        //Making the Image for the movement
        this.photoMove = new Image()
        this.photoMove.src = mapPhoto
        this.xVelocity = 0
        this.yVelocity = 0
    }

    //Metodh of the class/object that make the draw at the canvas
    drawSelf(){
        canvas2D.drawImage(
            this.photoMove,
            this.x,
            this.y,
            this.width,
            this.height
    )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')
let langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5, './assets/langostelvis.png')
let pydos = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5, './assets/pydos.png')
let tucapalma = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5, './assets/tucapalma.png')

hipodoge.attacks.push(
    {name: 'WATTER💧', id: 'watter'},
    {name: 'WATTER💧', id: 'watter'},
    {name: 'WATTER💧', id: 'watter'},
    {name: 'FIRE🔥', id: 'fire'},
    {name: 'GROUND🌱', id: 'ground'}
)
capipepo.attacks.push(
    {name: 'GROUND🌱', id: 'ground'},
    {name: 'GROUND🌱', id: 'ground'},
    {name: 'GROUND🌱', id: 'ground'},
    {name: 'WATTER💧', id: 'watter'},
    {name: 'FIRE🔥', id: 'fire'},
)
ratigueya.attacks.push(
    {name: 'FIRE🔥', id: 'fire'},
    {name: 'FIRE🔥', id: 'fire'},
    {name: 'FIRE🔥', id: 'fire'},
    {name: 'WATTER💧', id: 'watter'},
    {name: 'GROUND🌱', id: 'ground'}
)
pydos.attacks.push(
    {name: 'WATTER💧', id: 'watter'},
    {name: 'WATTER💧', id: 'watter'},
    {name: 'WATTER💧', id: 'watter'},
    {name: 'FIRE🔥', id: 'fire'},
    {name: 'GROUND🌱', id: 'ground'}
)
tucapalma.attacks.push(
    {name: 'GROUND🌱', id: 'ground'},
    {name: 'GROUND🌱', id: 'ground'},
    {name: 'GROUND🌱', id: 'ground'},
    {name: 'WATTER💧', id: 'watter'},
    {name: 'FIRE🔥', id: 'fire'},
)
langostelvis.attacks.push(
    {name: 'FIRE🔥', id: 'fire'},
    {name: 'FIRE🔥', id: 'fire'},
    {name: 'FIRE🔥', id: 'fire'},
    {name: 'WATTER💧', id: 'watter'},
    {name: 'GROUND🌱', id: 'ground'}
)

mokepons.push(hipodoge, capipepo, ratigueya, pydos, tucapalma, langostelvis)

/* //For cicle to Copy every original mokepon for a "copy" to Enemy Mokepons using Object.assign
mokepons.forEach(mokepon => {
    let newMokepon = new Mokepon()
    newMokepon = Object.assign(newMokepon, mokepon)
    enemyMokepons.push(newMokepon)
});
//Delete 3 random Mokepons of the Enemy Mokepons array
for (let i = 0; i < 3; i++) {
    let enemy = random(0,enemyMokepons.length-1)
    enemyMokepons.splice(enemy,1)
}
//Add a Random position for every Enemy Mokepon
enemyMokepons.forEach(mokepon => {
    mokepon.x = random(mokepon.width+2, map.width-mokepon.width)
    mokepon.y = random(mokepon.height+2, map.height-mokepon.height)
}) */

//////////////////////  ============================================================================  ///////////////////////
//Start the functions at the order of the game line
function startGame(){
    mapSection.style.display = 'none'
    mokepons.forEach((mokepon) =>{
        mokeponCard = `
            <input type="radio" name="pet" id=${mokepon.name} />
            <label class="mokepon-card" for=${mokepon.name}>
                <h2>${mokepon.name}</h2>
                <img src=${mokepon.photo} alt=${mokepon.name}>
            </label>
        `
        cardsContainer.innerHTML += mokeponCard
    })

    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')
    inputPydos = document.getElementById('Pydos')
    inputTucapalma = document.getElementById('Tucapalma')
    inputLangostelvis = document.getElementById('Langostelvis')

    playerPetButton.addEventListener('click', playerPetSelect)

    restartButton.addEventListener('click', function (){
            location.reload()
    })

    joinGame()
}

function joinGame() {
    fetch("http://172.23.16.135:8080/joinGame").then(function(res){
        if (res.ok) {
            res.text().then(function(response){
                playerID = response
            })
        }
    })
}

function playerPetSelect(){    
    /* Check every input for copy the Pet Object at PlayerPet (when don't select any pet and reload the game
        and put the Pet name at playerPetSpan variable for "print" its attacks latter  */
    playerPet = new Mokepon()
    if (inputHipodoge.checked) {
        playerPet = Object.assign(playerPet, mokepons[0])
    } else if (inputCapipepo.checked) {
        playerPet = Object.assign(playerPet, mokepons[1])
    } else if (inputRatigueya.checked) {
        playerPet = Object.assign(playerPet, mokepons[2])
    } else if (inputPydos.checked) {
        playerPet = Object.assign(playerPet, mokepons[3])
    }else if (inputTucapalma.checked) {
        playerPet = Object.assign(playerPet, mokepons[4])
    }else if (inputLangostelvis.checked) {
        playerPet = Object.assign(playerPet, mokepons[5])
    }else {
        alert("You DON'T select any pet")
        return 
    }

    petSelectionSection.style.display = 'none'   
    mapSection.style.display = 'flex'
    selectPlayerPet(playerPet.name)
    makeMap()
}

function selectPlayerPet(playerPetName){
    fetch(`http://172.23.16.135:8080/mokepon/${playerID}`, {
        method:"post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: playerPetName
        })
    })
    console.log(playerPetName)
}

// Collect the sequence of the Player attacks and make the random enemy attacks
function AtkSequence(enemyMokepon){
    mapSection.style.display = 'none'
    atkSelectionSection.style.display = 'flex'

    playerPetSpan.innerHTML = playerPet.name

    /* Enemy pet crashed */
    enemyPet = enemyMokepon
    enemyID = enemyPet.id
    enemyPetSpan.innerHTML = enemyPet.name

    // Add Player and Enemy Mokepon elected image
    playerImg.innerHTML += `<img src=${playerPet.photo} alt=${playerPet.name}>`
    enemyImg.innerHTML += `<img src=${enemyPet.photo} alt=${enemyPet.name}>`
    
    /* Traverse the Player's Mokepon attacks array and take one by one and inject this attacks to the HTML 
    the attackButtons is the DIV id where are the buttons*/
    playerPet.attacks.forEach(attack => {
        attackButtons.innerHTML += `
            <button id="${attack.id}" class="attack-button B_Atk">${attack.name}</button>
        `
    })

    buttons = document.querySelectorAll('.B_Atk')

    buttons.forEach((button) => {
        button.addEventListener('click', (eve) =>{
            playerAtks.push(eve.target.textContent)
            button.disabled = true
            // If the five attacks was be happend, start the combat
            if(playerAtks.length == 5){
                sendAttacks()
            }
        })
    })
}

function sendAttacks(){
    fetch(`http://172.23.16.135:8080/mokepon/${playerID}/attacks`, {
        method:"post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            attacks: playerAtks
        })
    })
    interval = setInterval(getEnemyAttacks, 1000)
}

function getEnemyAttacks() {
    fetch(`http://172.23.16.135:8080/mokepon/${enemyID}/attacks`).then((res)=>{
        if (res.ok) {
            res.json().then(({attacks})=>{
                if (attacks.length === 5) {
                    enemyAtks = attacks
                    combat()
                    clearInterval(interval)
                }
            })
        }
    })
}

function combat(){
    for(let i = 0; i < 5; i++){
        if (playerAtks[i] == enemyAtks[i]) {
            messageCreate("TIE :/", playerAtks[i], enemyAtks[i])
            playerLivesSpan.innerHTML = playerLives
        }else if((playerAtks[i] == 'FIRE🔥' && enemyAtks[i] == 'GROUND🌱') || (playerAtks[i] == 'WATTER💧' && enemyAtks[i] == 'FIRE🔥') || (playerAtks[i] == 'GROUND🌱' && enemyAtks[i] == 'WATTER💧')) {
            messageCreate("WIN!", playerAtks[i], enemyAtks[i])
            enemyLives--
            enemyLivesSpan.innerHTML = enemyLives
        }else {
            messageCreate("LOSE", playerAtks[i], enemyAtks[i])
            playerLives--
            playerLivesSpan.innerHTML = playerLives
        }
    }
    checklives()
}

function checklives() {
    if (enemyLives < playerLives) {
        finalMessageCreate("CONGRATSSSS YOU WWWIIINNNNN! 🐱‍👤🤘🎉")
    } else {
        finalMessageCreate('Mabye at next time, sorry 😪😵🦾')
    }
}

function messageCreate(result, playerAtk, enemyAtk){
    let playerAtkSelected = document.createElement('p')
    let enemyAtkSelected = document.createElement('p')

    battleResult.innerHTML = result
    playerAtkSelected.innerHTML = playerAtk
    enemyAtkSelected.innerHTML = enemyAtk

    playerFightAtk.appendChild(playerAtkSelected)
    enemyFightAtk.appendChild(enemyAtkSelected)
}

function finalMessageCreate(finalResult) {
    battleResult.innerHTML = finalResult
    restartButton.style.display = 'block'
}

function makeMap(){
    //draw the img at the initial position
    drawCanvas(0,0)
    interval = setInterval(moveCanvas, 100)
    //Code for check the key pressed and change the img position
    document.addEventListener("keydown", function(keyboard){
        switch (keyboard.key) {
            case "ArrowUp":
            case "w":
                drawCanvas(0,-10)
                break;
            case "ArrowDown":
            case "s":
                drawCanvas(0,10)
                break;
            case "ArrowRight":
            case "d":
                drawCanvas(10,0)
                break;
            case "ArrowLeft":
            case "a":
                drawCanvas(-10,0)
                break;
            default:
                break;
        }
    })
}

function drawCanvas(x,y){
    //change the attribute of the Object for move the img
    playerPet.x += x
    playerPet.y += y
    //Clean the canvas from 0,0 to canvas/map "end", before draw new positioned img
    canvas2D.clearRect(0, 0, map.width, map.height)
    canvas2D.drawImage(backgroundMapImg, 0, 0, map.width, map.height)
    enemyMokepons.forEach(mokepon => {
        mokepon.drawSelf()
    })
    playerPet.drawSelf()
}

function changePetVelocity(x,y){
    playerPet.xVelocity = x
    playerPet.yVelocity = y
    moveCanvas()
}

//Mainly Function for map, because it's runing by interval
function moveCanvas(){
    //change the attribute of the Object for move the img
    playerPet.x += playerPet.xVelocity
    playerPet.y += playerPet.yVelocity
    //Clean the canvas from 0,0 to canvas/map "end", before draw new positioned img
    canvas2D.clearRect(0, 0, map.width, map.height)
    
    sendPosition(playerPet.x, playerPet.y)

    //Form of check colision made by course teacher 
    /* for (let i = 0; i < 3; i++) {
        if(playerPet.x > enemyMokepons[i].x+100 ||
            playerPet.x+100 < enemyMokepons[i].x ||
            playerPet.y > enemyMokepons[i].y+100 ||
            playerPet.y+100 < enemyMokepons[i].y){
        }else{
            console.log("PETS CRASHHEDDDD")
        }
    } */
    
    canvas2D.drawImage(backgroundMapImg, 0, 0, map.width, map.height)
    enemyMokepons.forEach(mokepon => {
        mokepon.drawSelf()
        //Check the player and enemy mokepons colision
        if((playerPet.x < mokepon.x+playerPet.width &&
            playerPet.y < mokepon.y+playerPet.width) &&
            (playerPet.x+playerPet.width > mokepon.x &&
            playerPet.y+playerPet.width > mokepon.y)){
                AtkSequence(mokepon)
                clearInterval(interval)
        }
    })
    playerPet.drawSelf()
}

function sendPosition(x, y) { 
    fetch(`http://172.23.16.135:8080/mokepon/${playerID}/position`, {
        method:"post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    }).then((res) =>{if (res.ok){
        res.json().then(({enemies}) =>{
            enemyMokepons = enemies.map(enemy => {
                let newMokepon = new Mokepon()
                mokepons.forEach(mokepon => {
                    if (mokepon.name === enemy.mokepon.name){
                        newMokepon = Object.assign(newMokepon, mokepon)
                        newMokepon.x = enemy.mokepon.x
                        newMokepon.y = enemy.mokepon.y
                        newMokepon.id = enemy.id
                    }
                })
                return newMokepon
            })
        })
    }})
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', startGame)