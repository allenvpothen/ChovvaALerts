const nameInput = document.querySelector(".name")
const nameOutput = document.querySelector(".nameDupe")
nameInput.addEventListener("input", nameReverser);
function nameReverser() {
    let realNameArray = nameInput.value.split("")
    let reversedNameArray = realNameArray.reverse();
    let reversedName = reversedNameArray.join("")
    nameOutput.value = reversedName;
}
