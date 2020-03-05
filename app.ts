const cells = document.querySelectorAll('.row > div');

cells.forEach(cell => cell.addEventListener('click', cellHit));

console.log(cells);


function cellHit() {
    let eventTarget:HTMLInputElement = <HTMLInputElement>event.target;
    console.log(eventTarget.textContent);
}