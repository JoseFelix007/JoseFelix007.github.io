function picture(){
    document.getElementById('bigpic').style.visibility = "visible";
    document.getElementById('bigpic').style.opacity = 1;
    document.getElementById('back').style.visibility = "visible";
    document.getElementById('back').style.opacity = 1;
}

document.addEventListener('click', musicPlay);
function musicPlay() {
    document.getElementById('playm').play();
    document.removeEventListener('click', musicPlay);
}