/*Main Elements*/

let etchASketch = document.querySelector('.main__etch-a-sketch');
let sizeInput = document.querySelector(".menu__size_input");
let colorInput = document.querySelector(".menu__color_input");
let resetButton = document.querySelector(".menu__reset");
let leftKnob = document.querySelector(".main__left-knob");
let current;
let color = "#000";
let size = 16;


/*Functions*/

function createGrid(size) {

    for (let i = 0 ; i < size**2 ; i++) {
        etchASketch.innerHTML+=`<li></li>`
    }

    etchASketch.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`
    current = etchASketch.firstElementChild;

}

function paintModern(event) {

    if (event.target.tagName != "LI") return;
    event.target.style.backgroundColor = color;
    etchASketch.addEventListener("mousemove", mousePaint);

}

function mousePaint(event) {

    if (event.target.tagName != "LI") return;
    event.preventDefault();
    event.target.style.backgroundColor = color;
    document.addEventListener("mouseup", () => etchASketch.removeEventListener("mousemove", mousePaint));

}

function paintTraditional() {

    let up = document.querySelector('.main__left_angle_up');
    let down = document.querySelector('.main__left_angle_down');
    let left = document.querySelector('.main__left_angle_left');
    let right = document.querySelector('.main__left_angle_right');

    let upLeft = document.querySelector('.main__right_angle_up_left');
    let upRight = document.querySelector('.main__right_angle_up_right');
    let downLeft = document.querySelector('.main__right_angle_down_left');
    let downRight = document.querySelector('.main__right_angle_down_right');

    left.addEventListener("click", paintLeft);
    right.addEventListener("click", paintRight);
    up.addEventListener("click", paintUp);
    down.addEventListener("click", paintDown);

    upLeft.addEventListener("click", paintUpLeft);
    upRight.addEventListener("click", paintUpRight);
    downLeft.addEventListener("click", paintDownLeft);
    downRight.addEventListener("click", paintDownRight);
    
}

function paintLeft() {
    if (!current.previousElementSibling) return;
    current = current.previousElementSibling;
    current.style.backgroundColor = color;
}

function paintRight() {
    if (!current.nextElementSibling) return;
    current = current.nextElementSibling;
    current.style.backgroundColor = color;
}

function paintUp() {
    if (!etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) - size]) return;
    current = etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) - size];
    current.style.backgroundColor = color;
}

function paintDown() {
    if (!etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) + size]) return;
    current = etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) + size];
    current.style.backgroundColor = color;
}

function paintUpLeft() {
    if (!etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) - size - 1]) return;
    current = etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) - size - 1];
    current.style.backgroundColor = color;
}

function paintUpRight() {
    if (!etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) - size + 1]) return;
    current = etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) - size + 1];
    current.style.backgroundColor = color;
}

function paintDownLeft() {
    if (!etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) + size - 1]) return;
    current = etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) + size - 1];
    current.style.backgroundColor = color;
}

function paintDownRight() {
    if (!etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) + size + 1]) return;
    current = etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) + size + 1];
    current.style.backgroundColor = color;
}

function reset() {
    for (let li of etchASketch.querySelectorAll('li')) {
        li.style.backgroundColor='#fff';
    }
}

function changeSize(event) {

    reset();

    if (event.target.value > 50) event.target.value = 50;
    if (event.target.value < 1) event.target.value = 1;
    etchASketch.style.gridTemplate = `repeat(${event.target.value}, 1fr) / repeat(${event.target.value}, 1fr)`;

    while (etchASketch.querySelectorAll('li').length > event.target.value**2) {
        etchASketch.lastElementChild.remove();
    }

    while (etchASketch.querySelectorAll('li').length < event.target.value**2) {
        etchASketch.innerHTML+=`<li></li>`;
    }

}

function changeColor(event) {
    color = colorInput.value;
}

/*Event Listeners*/

etchASketch.addEventListener("mousedown", paintModern);
resetButton.addEventListener("click", reset);
sizeInput.addEventListener("change", changeSize);
colorInput.addEventListener("change", changeColor);

paintTraditional();

createGrid(size);