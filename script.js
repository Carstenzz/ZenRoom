//not perfect,,
//if it works, it works

document.querySelector("header").style.display = "none"
document.querySelector("main").style.display = "block"

const background = document.querySelector(".background")
const homeAnim = document.querySelectorAll(".homeAnim")
const placeholder = document.querySelector(".placeholder")
const ambience = document.querySelector(".ambience")

const nature = document.querySelector(".nature")
const natureTitle = document.querySelector(".natureTitle")
const outer = document.querySelectorAll(".outer")
const imgContainer = document.querySelectorAll(".imgContainer")
const outerimg = document.querySelectorAll(".outerimg")
const audio = document.querySelectorAll(".natureAudio")
let rotation = [0, 0, 0]
let time = 500
let index = [0,1,2]
let rotateFast = [0,0,0]
let active = [false, false, false]
let move

const meditate = document.querySelector(".meditate")
const meditateAnim = document.querySelectorAll(".meditateAnim")
const mButton = document.querySelector(".meditateButton")
const meditateText = document.querySelector(".meditateText")
const buttonCircle = document.querySelectorAll(".buttonCircle")
const circleCenter = document.querySelector(".circleCenter")
const buttonText = document.querySelectorAll(".buttonText")
const meditateAudio = document.querySelectorAll(".meditateAudio")
let meditating = false
let breatheIn
let breatheOut

let initiateScroll = window.scrollY + window.innerHeight/2
let appear = [false, false]


//-------------------------------------------------------



window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

window.onscroll = function (e) {
    if((window.scrollY >= ((nature.getBoundingClientRect()).top) && !appear[0])){
        natureTitle.classList.remove("disappear")
        for(let i = 0; i < 3; i++){
            setTimeout(()=>{
                outer[i].classList.remove("disappear")
            }, 1000 + (1000 * i))
        }
        console.log("A")
        appear[0] = true
    }

    if((window.scrollY >= ((meditate.getBoundingClientRect()).top + initiateScroll) && !appear[1])){
        
        for(let i = 0; i < meditateAnim.length; i++){        
            setTimeout(() => {
                meditateAnim[i].style.transform = "translateY(0)"
                meditateAnim[i].style.opacity = 1
                meditateAnim[i].style.transition = "1s"
            }, 100 * i);
        }
        
        setTimeout(()=>{
            mButton.classList.remove("disappear")
        }, 2000)
        appear[1] = true
    }

    background.style.top = (window.scrollY / 4) + "px"
};


ambience.volume = 0.3
let ambiecePlay = false
document.addEventListener("pointerdown", () =>{
    if(!ambiecePlay){
        ambience.play()
        ambiecePlay = true
    }
})

//-------------------------------------------------------


for(let i = 0; i < homeAnim.length; i++){
    homeAnim[i].style.opacity = 0
    homeAnim[i].style.transform = "translateY(10%)"

    setTimeout(() => {
        homeAnim[i].style.transform = "translateY(0)"
        homeAnim[i].style.opacity = 1
        homeAnim[i].style.transition = "1s"
    }, 100 * i + 300);
}

setTimeout(()=>{
    placeholder.style.opacity = 1
    placeholder.style.scale = 1
        setTimeout(()=>{
            placeholder.style.scale = 0.95
        }, 3000)
    setInterval(()=>{
        placeholder.style.scale = 1
        setTimeout(()=>{
            placeholder.style.scale = 0.97
        }, 3000)
    },6000)
}, 2000)


//-------------------------------------------------------------


imgContainer.forEach(container => {
    container.style.filter = "grayscale(100%)"
})

for(let i=0; i < outerimg.length; i ++){
    rotation[i] = Math.floor(Math.random() * 120)

    outerimg[i].addEventListener("pointerdown", e => {
        if(active[i]){
            rotateFast[i] = 0
    
            for(let u = 0; u < 10; u++){
                setTimeout(() => {
                    if(audio[i].volume >= 0.1)
                    audio[i].volume -= 0.1
                }, 100 * u)
            }
            setTimeout(()=>{
                audio[i].pause();
                audio[i].currentTime = 0;
            }, 1001)
    
            outer[i].style.scale = 1
            imgContainer[i].style.filter = "grayscale(100%)"
            outerimg[i].style.filter = "contrast(0%)"
            ambience.volume += 0.07
        }
        else{
            outer[i].style.scale = 1.3
            imgContainer[i].style.filter = "grayscale(0%)"
            outerimg[i].style.filter = "contrast(100%)"
            setTimeout(()=>{
                audio[i].volume = 1
                audio[i].play()
            }, 1001)
            rotateFast[i] = 7
            ambience.volume -= 0.07
        }
        active[i] = !active[i]
    }) 

    setInterval( () => {
        outerimg[i].style.rotate = rotation[i] + "deg"
        rotation[i] -= (2 + rotateFast[i]) //2+7
    } , time)
}


//-------------------------------------------------------------

buttonText[0].style.opacity = 1
buttonText[1].style.opacity = 0

meditateAnim.forEach(anim =>{
    anim.style.opacity = 0
    anim.style.transform = "translateY(10%)"
})  
// })

function startMeditate() {

    if(!meditating){
        for(let i = 0; i < meditateAnim.length; i++){
            setTimeout(() => {
                meditateAnim[i].style.opacity = 0
                meditateAnim[i].style.transform = "translateY(10%)"
            },(50 * i));
        }
        setTimeout(()=>{
            mButton.classList.add("pressed")
        }, meditateAnim.length * 50)
        setTimeout(()=>{
            buttonText[0].style.opacity = 0
        setTimeout(()=>{buttonText[1].style.opacity = 1},700)
            circleCenter.style.background = "radial-gradient(circle, rgb(234, 234, 234) 40%, lightgray 65%, transparent 70%)"
            for(let i = 0; i < buttonCircle.length; i++){
                setTimeout(()=>{
                    buttonCircle[i].style.scale = 1
                }, 100*i)
            }
        }, meditateAnim.length * 50 + 1000)
        setTimeout(()=>{
            meditateAudio[0].currentTime = 0;
            meditateAudio[0].play()
            for(let i = 0; i < buttonCircle.length; i++){
                if(meditating){
                    setTimeout(()=>{
                        buttonCircle[i].style.scale = 0.9
                    }, 3000 - (1000 * i))
                }
            }
            breatheOut = setInterval(() => {
                if(meditating){
                    meditateAudio[0].currentTime = 0;
                    meditateAudio[0].play()
                    for(let i = 0; i < buttonCircle.length; i++){
                        setTimeout(()=>{
                            buttonCircle[i].style.scale = 0.9
                        }, 3000 - (1000 * i))
                    }
                }
            }, 13000);
            setTimeout(()=>{
                for(let i = 0; i < buttonCircle.length; i++){
                    if(meditating){
                        meditateAudio[1].currentTime = 0;
                        meditateAudio[1].play()
                        setTimeout(()=>{
                            buttonCircle[i].style.scale = 1
                        }, 1000*i)
                    }
                }
                breatheIn = setInterval(() => {
                    if(meditating){
                        meditateAudio[1].currentTime = 0;
                        meditateAudio[1].play()
                        for(let i = 0; i < buttonCircle.length; i++){
                            setTimeout(()=>{
                                buttonCircle[i].style.scale = 1
                            }, 1000*i)
                        }
                    }
                }, 13000);
            }, 6500)
        }, meditateAnim.length * 50 + 5500)
    }
    else{
        clearInterval(breatheIn)
        clearInterval(breatheOut)
        setTimeout(()=>{circleCenter.style.background = "(circle, rgb(234, 234, 234) 40%, lightgray 65%)"},1000)
            for(let i = 0; i < buttonCircle.length; i++){
                setTimeout(()=>{
                    for(let u = 0; u<250;u++){
                        setTimeout(()=>{buttonCircle[i].style.scale = 0}, u*10)
                    }
                }, 300 - (100 * i))
            }
        

        setTimeout(()=>{
            mButton.classList.remove("pressed")
            for(let i = 0; i < meditateAnim.length; i++){
                meditateAnim[i].style.opacity = 0
                meditateAnim[i].style.transform = "translateY(10%)"
            
                setTimeout(() => {
                    meditateAnim[i].style.transform = "translateY(0)"
                    meditateAnim[i].style.opacity = 1
                    meditateAnim[i].style.transition = "1s"
                }, 100 * i);
            }
            buttonText[1].style.opacity = 0
            setTimeout(()=>{buttonText[0].style.opacity = 1},700)
        }, 2500)

    }
    meditating = !meditating
}