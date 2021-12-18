
function init() {
    picBackground()
    exhibit()
    music()
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
    for(var i = 1;i<19;i++){
        var div = "<div class=\"nom\" onclick=\"showPicture(\'c"+i+"\')\"><div class=\"pic bg/c"+i+"\"></div><div class=\"title\">c"+i+".jpg</div></div>"
        document.getElementById('exhibition').innerHTML += div
    }
    for(var i = 1;i<22;i++){
        var div = "<div class=\"nom\" onclick=\"showPicture(\'p"+i+"\')\"><div class=\"pic bg/p"+i+"\"></div><div class=\"title\">p"+i+".jpg</div></div>"
        document.getElementById('exhibition').innerHTML += div
    }
    picBackground()
}

function music(){
    for(var i = 0;i < musicData.length;i++){
        var div = "<div class=\"nom\" onclick=\"play(\'"+i+"\',\'"+musicData[i].url+"\',\'"+musicData[i].cvr+"\');goTo(\'music\',\'player\')\"><div class=\"pic cover/"+musicData[i].cvr+"\"></div><div class=\"title\">"+musicData[i].tt+"</div><div class=\"subtitle\">"+musicData[i].at+"</div></div>"
        document.getElementById('music').innerHTML += div
    }

    var cookieOrder = getCookie('lastPlayingOrder')
    var cookieSong = getCookie('thisSong')
    var node = document.getElementsByClassName('player_subutton')[0]
    if(cookieOrder != "") { 
        node.style.backgroundImage = "url('imgs/icons/"+cookieOrder+".svg')"
        node.setAttribute('onclick',"changePlayingOrder()")
        currentStatus = cookieOrder
     }else { currentStatus = 'repeat' }

    if(cookieSong != "") { 
        thisSong = cookieSong
     }else { thisSong = 0 }
     
    document.querySelector('.play_cover').style.backgroundImage = "url(imgs/cover/"+musicData[thisSong].cvr+".jpg)"
    document.querySelector('.play_title').innerHTML = musicData[thisSong].tt
    document.getElementById('musicMedia').setAttribute('src',musicData[thisSong].url)
    lyric()
    picBackground()
}

function lyric(){
    var id = musicData[thisSong].url.substring(
        musicData[thisSong].url.indexOf('=') + 1
        )
    var xhr = new XMLHttpRequest()
    var lyric
    document.querySelector('.play_lyric').innerHTML = ''
    xhr.open('get','https://sukmusicapi.vercel.app/lyric?id='+id)
    xhr.send()
    xhr.onreadystatechange = function () { 
        if(xhr.readyState == 4 && xhr.status == 200){
            lyric = xhr.response
            if(lyric != undefined) lyricParse()
         }
     }
    function lyricParse() { 
        lyric = JSON.parse(lyric).lrc.lyric.split('\n')
        for(var i = 0; i < lyric.length; i++) {
            var time = lyric[i].substring(1,lyric[i].indexOf(']'))
            var minute = parseFloat(time.substring(0,lyric[i].indexOf(':') + 1))
            var second = parseFloat(time.substring(lyric[i].indexOf(':')))
            var time = second + minute * 60
            timeArray = timeArray.concat([time])

            var content = lyric[i].substring(lyric[i].indexOf(']') + 1)
            document.querySelector('.play_lyric').innerHTML += "<div class='lyric_texts'>"+content+"</div>"
         }
     }
}