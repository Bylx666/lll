
function init() {
    picBackground()
    exhibit()
    document.getElementsByTagName('html')[0].style.fontSize = document.getElementById('background').clientHeight / 100 +"px"
    if(document.getElementById('background').clientWidth<document.getElementById('background').clientHeight){
        backgroundImageAlter('p')
        var home = document.getElementById('home').style
        home.flexDirection = 'column'
        home.transform = 'translate(-50%,0)'
        home.top = '12rem'
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
        }
        else{
            alterTransition()
            backgroundImageUrl = "imgs/bg/c"+randomNumber(18,1)+".jpg";
            
        }
    },5000)
    // clearInterval(changeBackgroundImage)
}
function exhibit(){
    for(var i = 1;i<18;i++){
        var div = "<div class=\"nom\"><div class=\"pic bg/c"+i+"\"></div><div class=\"title\">c"+i+".jpg</div></div>"
        document.getElementById('exhibition').innerHTML += div
    }
    for(var i = 1;i<21;i++){
        var div = "<div class=\"nom\"><div class=\"pic bg/p"+i+"\"></div><div class=\"title\">p"+i+".jpg</div></div>"
        document.getElementById('exhibition').innerHTML += div
    }
    picBackground()
}

function goToExhibition(){
    goTo('home','exhibition')
    document.getElementById('header').setAttribute('onclick','goTo(\'exhibition\',\'home\')')
}