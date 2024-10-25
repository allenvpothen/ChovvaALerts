const nameInput = document.querySelector(".name")

const ageInput = document.querySelector(".age")
const submitButton = document.querySelector(".submit")

const form = document.getElementById("userForm");
form.addEventListener("submit", (event) => {
    event.preventDefault();     
    const name = nameInput.value;
    const age = ageInput.value;  
    localStorage.setItem("name", name);
    localStorage.setItem("age", age);

   
    window.location.href = "../main/main.html";
});
submitButton.addEventListener("mouseover", () => {
    const randomX = Math.random() * 5; 
    const randomY = Math.random() * 3; 
    submitButton.style.transform = "translate("+ randomX+ "rem,"+randomY+"rem)";
});