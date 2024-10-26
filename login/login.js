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
