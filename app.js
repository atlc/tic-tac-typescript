var cells = document.querySelectorAll('.row > div');
cells.forEach(function (cell) { return cell.addEventListener('click', cellHit); });
var emptyCells = 9;
function cellHit() {
    var eventTarget = event.target;
    if (eventTarget.textContent === '') {
        emptyCells % 2 ? eventTarget.textContent = 'O' : eventTarget.textContent = 'X';
        emptyCells--;
        console.log("Empty cells: " + emptyCells);
        var isThereAWinner = validateWins();
        if (isThereAWinner) {
            event.stopPropagation();
            var winner = emptyCells % 2 ? 'Congrats! "X" marks the spot!' : '"O" goodness, O wins!';
            alert(winner);
            resetBoard();
        }
    }
    if (emptyCells === 0 && (!validateWins())) {
        alert("Grab yer revolvers, cuz it's a DRAW!");
        resetBoard();
    }
}
function validateWins() {
    var horizontalWin = validateHorizontal();
    var verticalWin = validateVertical();
    var diagonalWin = validateDiagonal();
    return (horizontalWin || verticalWin || diagonalWin);
}
function validateHorizontal() {
    var topRow = (cells[0].textContent !== '' && cells[0].textContent === cells[1].textContent && cells[0].textContent === cells[2].textContent);
    var middleRow = (cells[3].textContent !== '' && cells[3].textContent === cells[4].textContent && cells[3].textContent === cells[5].textContent);
    var bottomRow = (cells[6].textContent !== '' && cells[6].textContent === cells[7].textContent && cells[6].textContent === cells[8].textContent);
    console.log("Horizontal validation:\t" + (topRow || middleRow || bottomRow).toString().toUpperCase() + "\n\tTop row:" + topRow + "\n\tMiddle row:" + middleRow + "\n\tBottom row:" + bottomRow);
    return (topRow || middleRow || bottomRow);
}
function validateVertical() {
    var leftColumn = (cells[0].textContent !== '' && cells[0].textContent === cells[3].textContent && cells[0].textContent === cells[6].textContent);
    var middleColumn = (cells[1].textContent !== '' && cells[1].textContent === cells[4].textContent && cells[1].textContent === cells[7].textContent);
    var rightColumn = (cells[2].textContent !== '' && cells[2].textContent === cells[5].textContent && cells[2].textContent === cells[8].textContent);
    console.log("Vertical validation:\t" + (leftColumn || middleColumn || rightColumn).toString().toUpperCase() + "\n\tLeft column:" + leftColumn + "\n\tMiddle column:" + middleColumn + "\n\tRight column:" + rightColumn);
    return (leftColumn || middleColumn || rightColumn);
}
function validateDiagonal() {
    var topLeftToBottomRight = (cells[0].textContent !== '' && cells[0].textContent === cells[4].textContent && cells[0].textContent === cells[8].textContent);
    var topRightToBottomLeft = (cells[2].textContent !== '' && cells[2].textContent === cells[4].textContent && cells[2].textContent === cells[6].textContent);
    console.log("Diagonal validation:\t" + (topLeftToBottomRight || topRightToBottomLeft).toString().toUpperCase() + "\n\tTL->BR:" + topLeftToBottomRight + "\n\tTR->BL:" + topRightToBottomLeft);
    return (topLeftToBottomRight || topRightToBottomLeft);
}
function resetBoard() {
    if (confirm('Play again?')) {
        emptyCells = 9;
        cells.forEach(function (cell) { return cell.innerHTML = ''; });
    }
}
// Heavily modifying this tampermonkey script to get a hitmarker cursor onclick integration
// https://github.com/Rene-Sackers/MLG-Hitmarker/blob/master/Tampermonkey.js
var mouse = { x: 0, y: 0 };
document.addEventListener('mousemove', function (e) {
    mouse.x = e.pageX || e.clientX;
    mouse.y = e.pageY || e.clientY;
}, false);
var hitmarkerBase = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjA76PVpAAABqklEQVQ4T41Ty2rCUBQMfk3d9zNKCmI1JN6AIIkVEhPjeyOkdN8K7rt3qz/gotkqiF+ggn6Dye2ceGOr9TUQuHBec85MJNd19UKhEJRKJV26E7quF6mmVqtpkqZp34vFgjcajTCbzTKRcxGMMafVakXz+Zzn8/lAMgzjxfO8cLVa8Xq9HuZyuYtMqLjdbkebzYZ3Oh1umuY+FwEGOuF6vaYm0WmTXq+XkmW5iKJou91yMKDvU4T3wE46mETUBOvs/jbJZDIGTaTJYMAdx3kToWNQEzDYLZdLakJs1HK5LNPEhHa1Wn0X6eeBCxMTPplMOFgMoc7XeDyOaVuW5Yu067BtWwXtIXZ/HAwGaTAbgo0pwrdRqVReabrv++l+v/+A9xf21kT4OlRVtbvdbrwC3vEKo9HopsQxYCqLdCapms0mFZmQ9ymRGIeNYJ7zZkNx7LDk2mj0IUIHiclspxJLnPMUEtzEYaQzko5NApDZSGLR5NdsuLhHRTdNApDEWCc2G1bcQVZG9ILZbBbT/mfPM0jMNp1OuaIogYSLP9Pj8GPcAcjM6E90XVf5AShaLyAdryewAAAAAElFTkSuQmCC";
var hitmarkerSoundBase = "https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=HITMARKER&filename=22/223320-8420d601-8a55-42ce-b706-d46e8cc191bd.mp3";
var hitmarkerImage = new Image();
hitmarkerImage.src = hitmarkerBase;
hitmarkerImage.style.position = "absolute";
hitmarkerImage.style.zIndex = "2147483647";
hitmarkerImage.style.display = "none";
hitmarkerImage.style.pointerEvents = "none";
document.body.appendChild(hitmarkerImage);
var hitmarkerSound = document.createElement("audio");
var canPlayAudio = !!(hitmarkerSound.canPlayType && hitmarkerSound.canPlayType('audio/wav; codecs="1"').replace(/no/, '')) && !!(hitmarkerSound.canPlayType && hitmarkerSound.canPlayType('audio/mpeg;').replace(/no/, ''));
if (canPlayAudio) {
    hitmarkerSound.volume = 0.8;
    hitmarkerSound.src = hitmarkerSoundBase;
}
else {
    hitmarkerSound = null;
}
function showHitmarker() {
    hitmarkerImage.style.display = "block";
    hitmarkerImage.style.left = mouse.x - hitmarkerImage.width / 2 + "px";
    hitmarkerImage.style.top = mouse.y - hitmarkerImage.height / 2 + "px";
    setTimeout(function () { hitmarkerImage.style.display = "none"; }, 50);
}
function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}
var enabled = false;
function hit(e) {
    var leftMouse = (e.button == 0);
    if (canPlayAudio && leftMouse) {
        showHitmarker();
        playSound(hitmarkerSound);
    }
}
function toggleHitmarkers() {
    enabled = !enabled;
    if (enabled) {
        document.body.addEventListener("mousedown", hit);
        document.getElementById('hitmarkerButton').innerText = 'TIC-TACTICAL-TOE MODE ENGAGED';
    }
    else {
        document.body.removeEventListener("mousedown", hit);
        document.getElementById('hitmarkerButton').innerText = 'Enable Hitmarkers?';
    }
}
document.getElementById('hitmarkerButton').addEventListener('click', toggleHitmarkers);
