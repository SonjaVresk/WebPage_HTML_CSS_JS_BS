const textFirst = "Budi izvrstan u onom što vidiš!";
const textErase = "vidiš";
const textSecond = " voliš.";
const textNewLine = "ZAISKRI";
const typingTagOne = document.getElementById("typingAreaOne");
const typingTagTwo = document.getElementById("typingAreaTwo");

let index = 0;
const delayType = 100;
const delayErase = 100;
const delayNewLine = 800;

function type() {
    
    // ispiši prvi dio teksta  
    if(index < textFirst.length) {
        typingTagOne.textContent += textFirst[index];
        index++;
        setTimeout(type, delayType)
    }
    else {
    // izbriši riječ "vidiš"
        setTimeout(() => {

            let indexErase = textErase.length;  //duljina riječi za brisanje
            const stringErase = setInterval(() => {

                typingTagOne.textContent = typingTagOne.textContent.slice(0, -1)    
                indexErase--;

                if(indexErase < 0) {
                    clearInterval(stringErase);
                    setTimeout(replace, delayErase);
                }
            }, delayType);
        }, delayErase);
    }
}

function replace() {
    // napiši riječ "voliš"
    let indexReplace = 0;
    const stringReplace = setInterval(() => {
        typingTagOne.textContent += textSecond[indexReplace];
        indexReplace++;
        if(indexReplace >= textSecond.length){
            clearInterval(stringReplace);
            // prebaci se u novi red
            // napiši riječ ZAISKRI
            setTimeout(()=> {
                typingTagTwo.innerHTML = " ";
                typingTagTwo.innerHTML += "<br/>";
                typeNewLine();
            }, delayNewLine);
        }
    }, delayType);
}

function typeNewLine(){
    let indexNewLine = 0;
    const stringNewLine = setInterval(()=>{
        typingTagTwo.textContent += textNewLine[indexNewLine];
        indexNewLine++;
        if(indexNewLine >= textNewLine.length){
            clearInterval(stringNewLine);
        }
    }, delayType);
}

document.addEventListener("DOMContentLoaded", function() {
    type();
})
