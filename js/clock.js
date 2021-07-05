const clock = document.querySelector("h1");

function getClock(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");                          //시간
    const minutes = String(date.getMinutes()).padStart(2,"0");                      //분
    const seconds = String(date.getSeconds()).padStart(2,"0");                      //초
    clock.innerText = `${hours}:${minutes}:${seconds}`;                             //시간:분:초
}

getClock();
setInterval(getClock, 1000);