var nameInput = document.getElementById('name').value;
const ageInput = document.getElementById("age")
const submitButton = document.querySelector(".submit")

const form = document.getElementById("userForm");
form.addEventListener("submit", (event) => {
    event.preventDefault();     
   
    const age = ageInput.value;  
    var nameInput = document.getElementById('name').value;
    localStorage.setItem('name', nameInput);
    localStorage.setItem("age", age);

   
    window.location.href = "../main/main.html";
});
submitButton.addEventListener("mouseover", () => {
    const randomX = Math.random() * 5; 
    const randomY = Math.random() * 3; 
    submitButton.style.transform = "translate("+ randomX+ "rem,"+randomY+"rem)";
});