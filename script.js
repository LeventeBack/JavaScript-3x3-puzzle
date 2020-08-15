const IMG_SOURCE = "https://source.unsplash.com/450x450?"
const BACKGROUND_POSITIONS = [
    'left top',
    'center top',
    'right top',
    'left center',
    'center center',
    'right center',
    'left bottom',
    'center bottom',
    'right bottom'
]

const selectionForm = document.querySelector('[data-selection-form]')
const selectionInput = document.querySelector('[data-selection]')
const restartButton = document.querySelector('[data-restart-btn]') 
const restartSection = document.querySelector('[data-restart-section]') 

const puzzlePieces = document.querySelectorAll('[data-piece]')
const puzzleCells = document.querySelectorAll('[data-cell]')
const pieceContainer = document.querySelector('[data-piece-container]')
const puzzleContainer = document.querySelector('[data-puzzle-container]')

const puzzleNameSpan = document.querySelector('[data-puzzle-name]')

selectionForm.addEventListener('submit', e=> {
    e.preventDefault()
    selectionForm.classList.add('hidden')
    restartSection.classList.remove('hidden')
    let puzzleName = selectionInput.value.replace(/\s/g, '');
    let selectedSource = IMG_SOURCE + puzzleName;
    createPieces(selectedSource)
    puzzleNameSpan.textContent = puzzleName.toUpperCase();
})

restartButton.addEventListener('click', () => {
   location.reload()
})

puzzlePieces.forEach(piece => {
    piece.addEventListener('dragstart', e => {
        e.target.classList.add('dragging')
    })
    piece.addEventListener('dragend', e => {
        e.target.classList.remove('dragging')
    })
})

puzzleCells.forEach(cell => {
    cell.addEventListener('dragover', e=> {
        e.preventDefault()
        const puzzle = document.querySelector('.dragging')
        const container = e.target;
        if(!container.classList.contains('cell')) return
        container.appendChild(puzzle)
        if(pieceContainer.childElementCount == 0)
           checkWin()
    })
})

pieceContainer.addEventListener('dragover', e => {
    e.preventDefault()
    const puzzle = document.querySelector('.dragging')
    if(puzzle.parentNode != pieceContainer){
        pieceContainer.appendChild(puzzle)
        puzzle.style.top = `${Math.floor(Math.random() * 300)}px`
        puzzle.style.left = `${Math.floor(Math.random() * 300)}px`
    }
})

function createPieces(source){
    puzzlePieces.forEach((puzzlePiece, index) => {
        puzzlePiece.style.backgroundImage = `url(${source})`
        puzzlePiece.style.backgroundPosition = `${BACKGROUND_POSITIONS[index]}`
        puzzlePiece.style.top = `${Math.floor(Math.random() * 300)}px`
        puzzlePiece.style.left = `${Math.floor(Math.random() * 300)}px`
    })
}
function checkWin(){
    const positions = [...puzzleCells].map(cell => {
        return cell.querySelector('.piece').style.backgroundPosition
    })
    if(hasWon(positions)){
        setTimeout(() => {
            pieceContainer.classList.add('hidden')
            puzzleContainer.classList.add('completed')
        }, 400)
        puzzlePieces.forEach(puzzle => {
            puzzle.draggable = false;
        })
    } 
}
function hasWon(positions) {
    for(let i=0; i<positions.length; i++){
        if(positions[i]!==BACKGROUND_POSITIONS[i])
            return false;
    }
    return true;
}