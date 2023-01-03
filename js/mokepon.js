/* Variables used for the JS code */
let playerLives = 3
let playerAtks = []
let enemyLives = 3
let enemyAtks = []
let mokepons = []
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

//Class, pets and attacks definition
class Mokepon{
    constructor(newName, newPhoto, newLive){
        this.name = newName
        this.photo = newPhoto
        this.live = newLive
        this.attacks = []
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)
let langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5)
let pydos = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5)
let tucapalma = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5)

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

function startGame() {    
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
}

function playerPetSelect() {
    petSelectionSection.style.display = 'none'
    atkSelectionSection.style.display = 'flex'
    
    /* Check every input and put the Pet name at playerPet variable for "print" its attacks latter 
        I add and "else" when don't select any pet and reload the game */
    if (inputHipodoge.checked) {
        playerPetSpan.innerHTML = inputHipodoge.id
        playerPet = mokepons[0]
    } else if (inputCapipepo.checked) {
        playerPetSpan.innerHTML = inputCapipepo.id
        playerPet = mokepons[1]
    } else if (inputRatigueya.checked) {
        playerPetSpan.innerHTML = inputRatigueya.id
        playerPet = mokepons[2]
    } else if (inputPydos.checked) {
        playerPetSpan.innerHTML = inputPydos.id
        playerPet = mokepons[3]
    }else if (inputTucapalma.checked) {
        playerPetSpan.innerHTML = inputTucapalma.id
        playerPet = mokepons[4]
    }else if (inputLangostelvis.checked) {
        playerPetSpan.innerHTML = inputLangostelvis.id
        playerPet = mokepons[5]
    }else {
        alert("You DON'T select any pet")
        return location.reload()
    }

    /* Enemy pet random select */
    enemyPet = mokepons[random(1,mokepons.length)-1]
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

    /*  */
    fireButton = document.getElementById('fire')
    watterButton = document.getElementById('watter')
    groundButton = document.getElementById('ground')

    buttons = document.querySelectorAll('.B_Atk')
    AtkSequence()
}

// Collect the sequence of the Player attacks and make the random enemy attacks
function AtkSequence(){
    buttons.forEach((button) => {
        button.addEventListener('click', (eve) =>{
            playerAtks.push(eve.target.textContent)
            button.disabled = true
            enemyRandomAtk()
        })
    })
}

function enemyRandomAtk(){
    let enemyAux = enemyPet.attacks
    let randomAtk = random(0,enemyAux.length-1)
    enemyAtks.push(enemyAux[randomAtk].name)
    enemyPet.attacks.splice(randomAtk, 1)

    // If the five attacks was be happend, start the combat
    if(playerAtks.length == 5){
        combat()
    }
}

function combat(){
    for(let i = 0; i < 5; i++){
        if((playerAtks[i] == 'FIRE🔥' && enemyAtks[i] == 'GROUND🌱') || (playerAtks[i] == 'WATTER💧' && enemyAtks[i] == 'FIRE🔥') || (playerAtks[i] == 'GROUND🌱' && enemyAtks[i] == 'WATTER💧')) {
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

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', startGame)