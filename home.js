let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")

function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak)
}

function greetings(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours<16){
        speak("Good afternoon Sir")
    }
    else{
        speak("Good Evening Sir")
    }
}
window.addEventListener('load',()=>{
    greetings()
})

let speechRec=window.SpeechRecognition || window.webkitSpeechRecognition
let recognition= new speechRec()
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText= transcript
    takeCommand(transcript.toLowerCase())
} 

btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display="none"
    voice.style.display="block"
})

function takeCommand(message){
    btn.style.display="flex"
    voice.style.display="none"
    if(message.includes("hello")||message.includes("hey")){
        speak("hello sir, How can I help you? ")
    }
    else if(message.includes("who are you")||message.includes("what are you")){
        speak("I am virtual assistant , created by Rohit Sir")
    }
    else if(message.includes("open youtube")){
        speak("opening youtube")
        window.open("https://www.youtube.com/")
    }
    else if(message.includes("open google")){
        speak("opening google")
        window.open("https://www.google.com/")
    }
    else if(message.includes("open instagram")){
        speak("opening instagram")
        window.open("https://www.instagram.com/")
    }
    else if(message.includes("open facebook")){
        speak("opening facebook")
        window.open("https://www.facebook.com/")
    }
    else if(message.includes("time")){
        let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
    }
    else if(message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short",year:"numeric"})
        speak(date)
    }  
    else if(message.includes("proctor")||message.includes("teacher")){
        speak("Oohh! so, you are carynthia maam whom Rohit sir always talks about. you are his favorite teacher, you are adorable , gorgeous, and kind. Thankyou to be a best teacher for my sir,Nice to meet you maam.")
    }  
    else{
        speak(`This is what i found  regarding ${message.replace("misty","")}`)
        window.open(`https://www.google.com/search?q=${message.replace("misty","")}`)
    }


}