let playerAtk
let enemyAtk
let playerLives = 3
let enemyLives = 3

function startGame() {
    let atkSelectionSection = document.getElementById('attack-selection')
    atkSelectionSection.style.display = 'none'

    let restartSection = document.getElementById('restart')
    restartSection.style.display = 'none'
    
    let playerPetButton = document.getElementById('petButton')
    playerPetButton.addEventListener('click', playerPetSelect)

    let fireButton = document.getElementById('fire')
    fireButton.addEventListener('click', fireAtk)
    let watterButton = document.getElementById('watter')
    watterButton.addEventListener('click', watterAtk)
    let groundButton = document.getElementById('ground')
    groundButton.addEventListener('click', groundAtk)

    let restartButton = document.getElementById('restart')
    restartButton.addEventListener('click', function (){
            location.reload()
    })
}

function playerPetSelect() {
    let petSelectionSection = document.getElementById('pet-selection')
    petSelectionSection.style.display = 'none'
    
    let atkSelectionSection = document.getElementById('attack-selection')
    atkSelectionSection.style.display = 'flex'
    
    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let playerPetSpan = document.getElementById('playerPet')
    
    if (inputHipodoge.checked) {
        playerPetSpan.innerHTML = 'Hipodoge'
    } else if (inputCapipepo.checked) {
        playerPetSpan.innerHTML = 'Capipepo'
    } else if (inputRatigueya.checked) {
        playerPetSpan.innerHTML = 'Ratigueya'
    } else {
        alert("You DON'T select any pet")
        return location.reload()
    }

    enemyPetSelect()
}

function enemyPetSelect() {
    let randomPet = random(1,3)
    let enemyPetSpan = document.getElementById('enemyPet')

    if (randomPet == 1) {
        enemyPetSpan.innerHTML = 'Hipodoge'
    } else if (randomPet == 2) {
        enemyPetSpan.innerHTML = 'Capipepo'
    } else {
        enemyPetSpan.innerHTML = 'Ratigueya'
    }
}

function fireAtk() {
    playerAtk = 'fire'
    enemyRandomAtk()
}
function watterAtk() {
    playerAtk = 'watter'
    enemyRandomAtk()
}
function groundAtk() {
    playerAtk = 'ground'
    enemyRandomAtk()
}

function enemyRandomAtk() {
    let randomAtk = random(1,3)
    
    if (randomAtk == 1) {
        enemyAtk = 'fire'
    } else if (randomAtk == 2) {
        enemyAtk = 'watter'
    } else {
        enemyAtk = 'ground'
    }

    combat()
}

function combat() {
    let playerLivesSpan = document.getElementById('playerLives')
    let enemyLivesSpan = document.getElementById('enemyLives')
    
    if(enemyAtk == playerAtk) {
        messageCreate("TIE")
    } else if(playerAtk == 'fire' && enemyAtk == 'ground') {
        messageCreate("WIN!")
        enemyLives--
        enemyLivesSpan.innerHTML = enemyLives
    } else if(playerAtk == 'watter' && enemyAtk == 'fire') {
        messageCreate("WIN!")
        enemyLives--
        enemyLivesSpan.innerHTML = enemyLives
    } else if(playerAtk == 'ground' && enemyAtk == 'watter') {
        messageCreate("WIN!")
        enemyLives--
        enemyLivesSpan.innerHTML = enemyLives
    } else {
        messageCreate("LOSE")
        playerLives--
        playerLivesSpan.innerHTML = playerLives
    }

    checklives()
}

function checklives() {
    if (enemyLives == 0) {
        finalMessageCreate("CONGRATSSSS YOU WWWIIINNNNN! 🐱‍👤🤘🎉")
    } else if (playerLives == 0) {
        finalMessageCreate('Mabye at next time, sorry 😪😵🦾')
    }
}

function messageCreate(result) {
    let battleResult = document.getElementById('battle-result')
    let playerFightAtk = document.getElementById('player-atk')
    let enemyFightAtk = document.getElementById('enemy-atk')

    let playerAtkSelected = document.createElement('p')
    let enemyAtkSelected = document.createElement('p')

    battleResult.innerHTML = result
    playerAtkSelected.innerHTML = playerAtk
    enemyAtkSelected.innerHTML = enemyAtk

    playerFightAtk.appendChild(playerAtkSelected)
    enemyFightAtk.appendChild(enemyAtkSelected)
}

function finalMessageCreate(finalResult) {
    let battleResult = document.getElementById('battle-result')
    
    battleResult.innerHTML = finalResult

    let fireButton = document.getElementById('fire')
    fireButton.disabled = true
    let watterButton = document.getElementById('watter')
    watterButton.disabled = true
    let groundButton = document.getElementById('ground')
    groundButton.disabled = true

    let restarSection = document.getElementById('restart')
    restarSection.style.display = 'block'
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', startGame)
