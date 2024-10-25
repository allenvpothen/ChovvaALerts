const nameInput = document.querySelector(".name")
const nameOutput = document.querySelector(".nameDupe")
const submitButton = document.querySelector(".submit")
nameInput.addEventListener("input", nameReverser);
function nameReverser() {
    let realNameArray = nameInput.value.split("")
    let reversedNameArray = realNameArray.reverse();
    let reversedName = reversedNameArray.join("")
    nameOutput.value = reversedName;
}
const form = document.getElementById("userForm");
form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    
    const name = nameInput.value;
    const age = ageInput.value;

   
    localStorage.setItem("name", name);
    localStorage.setItem("age", age);

   
    window.location.href = "../main/main.html"; // Change "nextPage.html" to your desired page
});
submitButton.addEventListener("mouseover", () => {
    const randomX = Math.random() * 5; 
    const randomY = Math.random() * 3; 
    submitButton.style.transform = "translate("+ randomX+ "rem,"+randomY+"rem)";
});