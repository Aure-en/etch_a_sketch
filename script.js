/*Main Elements*/

let etchASketch = document.querySelector('.main__etch-a-sketch');
let sizeInput = document.querySelector(".menu__size_input");
let colorInput = document.querySelector(".menu__color_input");
let resetButton = document.querySelector(".menu__reset");
let leftKnob = document.querySelector(".main__left-knob");

let current;
let color = "#000";
let size = 16;
let previousKey;
let currentKey;

    //Keyboard Controls
let keys = new Map();
keys.set('ArrowLeft', false)
    .set('ArrowRight', false)
    .set('ArrowUp', false)
    .set('ArrowDown', false);


/*Functions*/

    //Setup related functions

function createGrid(size) {

    for (let i = 0 ; i < size**2 ; i++) {
        etchASketch.innerHTML+=`<li></li>`
    }

    etchASketch.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`

}

function reset() {
    for (let li of etchASketch.querySelectorAll('li')) {
        li.style.backgroundColor='';
    }
    current = null;
}

function changeSize(event) {

    reset();

    size = event.target.value;
    if (size > 50) size = 50;
    if (size < 1) size = 1;
    etchASketch.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;

    while (etchASketch.querySelectorAll('li').length > size**2) {
        etchASketch.lastElementChild.remove();
    }

    while (etchASketch.querySelectorAll('li').length < size**2) {
        etchASketch.innerHTML+=`<li></li>`;
    }

}

function changeColor(event) {
    color = colorInput.value;
}

    //Painting related functions

function paintModern(event) {

    if (event.target.tagName != "LI") return;
    event.target.style.backgroundColor = color;
    etchASketch.addEventListener("pointermove", mousePaint);
    etchASketch.addEventListener("touchmove", mousePaint);

}

function mousePaint(event) {

    if (event.target.tagName != "LI") return;
    event.preventDefault();
    event.target.style.backgroundColor = color;
    current = event.target;
    document.addEventListener("pointerup", () => etchASketch.removeEventListener("pointermove", mousePaint));
    document.addEventListener("touchend", () => etchASketch.removeEventListener("touchmove", mousePaint));

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

function defineCurrent() {
    if (!current) {
        current = etchASketch.querySelectorAll('li')[etchASketch.querySelectorAll('li').length - size];
        current.style.backgroundColor = color;
    }
}

function checkKeys() {
    if (keys.get('ArrowUp') && keys.get('ArrowLeft')) {
        paintUpLeft();
        return;
    }

    if (keys.get('ArrowUp') && keys.get('ArrowRight')) {
        paintUpRight();
        return;
    }

    if (keys.get('ArrowDown') && keys.get('ArrowLeft')) {
        paintDownLeft();
        return;
    }

    if (keys.get('ArrowDown') && keys.get('ArrowRight')) {
        paintDownRight();
        return;
    }

    if (keys.get('ArrowLeft')) {
        paintLeft();
        return;
    }

    if (keys.get('ArrowRight')) {
        paintRight();
        return;
    }

    if (keys.get('ArrowUp')) {
        paintUp();
        return;
    }

    if (keys.get('ArrowDown')) {
        paintDown();
        return;
    }

}

function trackKeys(event) {
    if (event.type == 'keydown' && event.repeat == false) {
        if (event.code != 'ArrowUp' && event.code != 'ArrowDown' && event.code != 'ArrowLeft' && event.code != 'ArrowRight') return;
        keys.set(event.code, true);
        checkKeys();
    }

    if (event.type == 'keyup') {
        keys.set(event.code, false);
    }
}

function ignoreKeys(previousKey, currentKey) {
    if (currentKey - previousKey < 20) return true
    return false;
}

        //Paint the next div in that direction, unless we reached a border.
function paintLeft() {
    if (!current.previousElementSibling || Array.from(current.parentNode.children).indexOf(current) % size == 0) return;
    current = current.previousElementSibling;
    current.style.backgroundColor = color;
}

function paintRight() {
    if (!current.nextElementSibling || (Array.from(current.parentNode.children).indexOf(current) + 1) % size == 0) return;
    current = current.nextElementSibling;
    current.style.backgroundColor = color;
}

function paintUp() {
    if (!etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) - size]
    || Array.from(current.parentNode.children).indexOf(current) < size) { 
        return;
    }
    current = etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) - size];
    current.style.backgroundColor = color;
}

function paintDown() {
    if (!etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) + size]
    || Array.from(current.parentNode.children).indexOf(current) >= etchASketch.querySelectorAll('li').length - size) {
        return;
    }
    current = etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) + size];
    current.style.backgroundColor = color;
}

function paintUpLeft() {
    if (!etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) - size - 1]
    || Array.from(current.parentNode.children).indexOf(current) % size == 0
    || Array.from(current.parentNode.children).indexOf(current) < size) {
        return;
    }
    current = etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) - size - 1];
    current.style.backgroundColor = color;
}

function paintUpRight() {
    if (!etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) - size + 1]
    || Array.from(current.parentNode.children).indexOf(current) < size
    || (Array.from(current.parentNode.children).indexOf(current) + 1) % size == 0) {
        return;
    }
    current = etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) - size + 1];
    current.style.backgroundColor = color;
}

function paintDownLeft() {
    if (!etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) + size - 1]
    || Array.from(current.parentNode.children).indexOf(current) >= etchASketch.querySelectorAll('li').length - size
    || Array.from(current.parentNode.children).indexOf(current) % size == 0) {
        return;
    }
    current = etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) + size - 1];
    current.style.backgroundColor = color;
}

function paintDownRight() {
    if (!etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) + size + 1]
    || Array.from(current.parentNode.children).indexOf(current) >= etchASketch.querySelectorAll('li').length - size
    || (Array.from(current.parentNode.children).indexOf(current) + 1) % size == 0) return;
    current = etchASketch.querySelectorAll('li')[Array.from(current.parentNode.children).indexOf(current) + size + 1];
    current.style.backgroundColor = color;
}

/*Event Listeners*/

etchASketch.addEventListener("mousedown", paintModern);
etchASketch.addEventListener("touchstart", paintModern)
resetButton.addEventListener("click", reset);
sizeInput.addEventListener("change", changeSize);
colorInput.addEventListener("change", changeColor);
document.querySelector(".main__left-knob").addEventListener("click", function(event) {
    if (event.target.tagName != 'I') return;
    defineCurrent();
})

window.addEventListener("keydown", defineCurrent)
window.addEventListener("keydown", trackKeys);
window.addEventListener("keyup", trackKeys);

createGrid(size);
paintTraditional();