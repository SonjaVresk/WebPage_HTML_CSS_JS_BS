
/* Izmjena obrasca za prijavu i registraciju po klasi hidden*/

document.getElementById("registrirajSe").addEventListener("click", registerForm);

function registerForm() {
  document.querySelector("#loginForm").classList.add("hidden")
  document.querySelector("#registerFormId").classList.remove("hidden")
}

/* Prijava */

document.getElementById("loginForm").addEventListener("submit", login);

function login(e) {
  e.preventDefault()  //sprječava defaultni submit jer button unutar forme defaultno izvršava submit
  const formData = {
    //vrijednosti iz inputa:
    username: document.querySelector("#formUsername").value,  
    password: document.querySelector("#formPassword").value
  }
  document.querySelector("form").reset(); //reload stranice da izbriše podatke iz obrasca

  fetch("https://fulek.com/data/api/user/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(result => {
      if(result.isSuccess){        
        document.querySelector(".signedInUser").textContent = result.data.username
        sessionStorage.setItem("username", JSON.stringify(result.data.username))
        sessionStorage.setItem("myToken", JSON.stringify(result.data.token))
        console.log(result.data.token)     
        
        document.querySelector(".loginMessage").classList.remove("hidden");
        document.querySelector(".loginMessage").textContent = "Uspješna prijava :) Na početnu stranicu za 3, 2, 1";

        setTimeout(function() {
          window.location.assign("index.html");
         }, 3000)
        
      }
      if(!result.isSuccess){
        document.querySelector(".loginMessage").classList.remove("hidden")
        document.querySelector(".loginMessage").textContent = "User not found."
      } 
      console.log("Odgovor:", result) //ispis response podataka u konzoli      
    })
    
    .catch(error => {
      console.log("Greška:", error)
    })
}

/* Registracija */

document.getElementById("registerFormId").addEventListener("submit", register);

function register(e) {
  e.preventDefault()
  const formData = {
    username: document.querySelector("#formUsernameRegister").value,
    password: document.querySelector("#formPasswordRegister").value
  }

  fetch("https://fulek.com/data/api/user/register", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(result => {
      if(result.isSuccess){
       document.querySelector("#registerButton").classList.add("hidden")
       //document.querySelector("#registerMessage").textContent = "Registration sucesful!"
       document.querySelector("#registerMessage").classList.remove("hidden")
        setTimeout(function() {
          document.querySelector("#registerFormId").classList.add("hidden")
          document.querySelector("#loginForm").classList.remove("hidden")
        }, 2000)
      } 
      if(result.errorMessages.includes('User exists!')){
        document.querySelector("#registerMessage").textContent = 'User already exists!'
        document.querySelector("#registerMessage").classList.remove("hidden")
      }
      /* console.log("Success:", result) */
    })
    .catch((error) => {
      console.log("Error:", error)
    })
}


/* Odjava */

function logOut () {
  sessionStorage.removeItem("username")
  sessionStorage.removeItem("myToken")
  window.location.assign('index.html');
}

