
function init() {
    document.getElementsByTagName('html')[0].style.fontSize = document.getElementById('background').clientHeight / 100 +"px"
    if(document.getElementById('background').clientWidth<document.getElementById('background').clientHeight){
        backgroundImageAlter('p')
    }
    else{
        backgroundImageAlter('c')
    }
}
function backgroundImageAlter(screenPosition) {
    document.getElementById('background').style.backgroundImage = "url(imgs/bg/c2.jpg)"
    function alterTransition() { 
        document.getElementById('background').style.opacity = '0'
        setTimeout(function(){
            document.getElementById('background').style.backgroundImage = "url("+backgroundImageUrl+")";
            document.getElementById('background').style.opacity = '1'}
        ,1000)
    }
    var changeBackgroundImage = setInterval(function(){
        if(screenPosition == 'p'){
            alterTransition()
            backgroundImageUrl = "imgs/bg/p"+randomNumber(21,1)+".jpg";
            document.getElementById('background').style.backgroundImage = "url("+backgroundImageUrl+")"
        }
        else{
            alterTransition()
            backgroundImageUrl = "imgs/bg/c"+randomNumber(18,1)+".jpg";
            
        }
    },5000)
    // clearInterval(changeBackgroundImage)
}