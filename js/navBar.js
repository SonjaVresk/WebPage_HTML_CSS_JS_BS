const nav = document.querySelector(".navbar")

fetch('/navigationBar.html')
.then(res=>res.text())
.then(data=>{
    nav.innerHTML=data
})
.then(() => {
 const navBar = document.querySelector("#navBarNastavni");
    const odjavi = document.querySelector("#signedIn");
    const user = document.querySelector("#signedInName");
    const prijavi = document.querySelector("#signInref");    
 
     if (sessionStorage.getItem("username") != null) {
        navBar.classList.remove("hidden");
        odjavi.classList.remove("hidden");
        user.classList.remove("hidden");
        document.querySelector(".signedInUser").textContent = sessionStorage.getItem("username");
        prijavi.classList.add("hidden");        
     }
     else{
        navBar.classList.add("hidden");
        odjavi.classList.add("hidden");
        user.classList.add("hidden");
        prijavi.classList.remove("hidden");        
     }
})
