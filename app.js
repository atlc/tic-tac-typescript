var cells = document.querySelectorAll('.row > div');
cells.forEach(function (cell) { return cell.addEventListener('click', cellHit); });
console.log(cells);
function cellHit() {
    var eventTarget = event.target;
    console.log(eventTarget.textContent);
}
