var lastRandomNumber

var fadeCd = 0

var playerEntranceRotate
var isplayerEntranceRotate = false
var playerEntranceRotateKakudo = 0

var songProgress
var lastSong
var thisSong
var nextSong
var currentStatus
var timeArray = []


/** 
 *  @param max The maxium number
 *  @param min The minium number
*/
function randomNumber(max,min) { 
    newRandomNumber = Math.floor(Math.random()*(max-min+1)+min);
    if(lastRandomNumber !== undefined){
        if (newRandomNumber == lastRandomNumber) {
            return newRandomNumber = Math.floor(Math.random()*(max-min+1)+min);
        }
        else{
            lastRandomNumber = newRandomNumber
            return lastRandomNumber;
        }
    }
    else{
        lastRandomNumber = newRandomNumber
        return lastRandomNumber;
    }
 }

function activePageSelector() { 
    var j = document.getElementsByClassName('page').length
    for(var i = 0; i < document.getElementsByClassName('page').length;i++){
        if(document.getElementsByClassName('page')[i].style.display == 'flex'){ 
            return document.getElementsByClassName('page')[i] 
         }
        else{
            j--
            if (j == 0) {
                return document.getElementById('foreground')
            }
            continue
        }
   }
 }

function play(i){
    var media = document.getElementById('musicMedia')
    var button = document.getElementsByClassName('player_button')[1]
    button.style.backgroundImage = "url('imgs/icons/pause.svg')"
    button.setAttribute('onclick','pause()')
    if(songProgress == undefined) { musicProgress() }
    if(!isplayerEntranceRotate) playerEntranceRotate = setInterval (function () { 
        playerEntranceRotateKakudo += 12
        document.querySelector('#playerEntrance').style.transform = 'rotate(' + playerEntranceRotateKakudo + 'deg)';
        if(phone)
        document.querySelector('.play_cover').style.transform = 'translate(-50%) rotate(' + playerEntranceRotateKakudo + 'deg)';

     },200)
    isplayerEntranceRotate = true
    if(i == 'button') { media.play(); return }
    document.querySelector('.play_cover').style.backgroundImage = "url(imgs/cover/"+musicData[i].cvr+".jpg)"
    document.querySelector('.play_title').innerHTML = musicData[i].tt
    media.setAttribute('src','https://music.163.com/song/media/outer/url?id='+musicData[i].nid)
    media.play()
    var pe = document.getElementById('playerEntrance')
    pe.style.backgroundImage = "url(imgs/cover/"+musicData[i].cvr+".jpg)"
    pe.onclick = function () { goTo('music','player') }
    document.cookie = "thisSong="+i+";SameSite=Lax"
    thisSong = i
    lyric()
}
function pause() { 
    var media = document.getElementById('musicMedia')
    var button = document.getElementsByClassName('player_button')[1]
    button.style.backgroundImage = "url('imgs/icons/play.svg')"
    button.setAttribute('onclick','play(\'button\')')
    media.pause()
    if(isplayerEntranceRotate) { clearInterval(playerEntranceRotate); isplayerEntranceRotate = false; }
 }
function musicProgress() { 
    var clicked = false
    var media = document.getElementById('musicMedia')
    var progress = document.querySelector('.music_progress')
    var thumb = document.querySelector('.music_progress_thumb')
    var position
    var songProgress = setInterval(function (){
        if(clicked) { return }
        var now = media.currentTime
        var total = media.duration
        position = now / total * document.documentElement.clientWidth
        progress.style.width = position + "px"
        thumb.style.left = position + "px"
        if(now == total) { next() }
        
        for(var i = 0; i < document.getElementsByClassName('lyric_texts').length; i++){
            if(now > timeArray[i] && now < timeArray[i+1]) {
                for(var j = 0; j < document.getElementsByClassName('lyric_texts').length; j++) {
                    document.getElementsByClassName('lyric_texts')[j].style = ''
                }
                document.querySelector('.play_lyric').style.top = 40 - 5 * i +"rem"
                if(phone)document.querySelector('.play_lyric').style.top = 70 - 5 * i +"rem"
                var currentLyric = document.getElementsByClassName('lyric_texts')[i].style
                currentLyric.height = '10rem';
                currentLyric.fontSize = '5rem';
                currentLyric.color = 'white'
                currentLyric.boxShadow = '0 0 2rem black'
                currentLyric.backgroundColor = 'rgba(0,0,0,0.7)'
                currentLyric.textShadow = '0 0 1rem white'
                return
            }
        }
    },200)
    var start
    var now
    function der(e) { 
        if (clicked) { return }
        if (e.targetTouches != undefined) {
            now = e.targetTouches[0].pageX
        } else{
            now = e.pageX
        }
        progress.style.width = now + "px" 
        thumb.style.left = now + "px" 
        media.currentTime = now / document.documentElement.clientWidth * media.duration
     }
    function moveStart(e) {
        if (e.targetTouches != undefined) {
            start = e.targetTouches[0].pageX
        } else{
            start = e.pageX
        }
        clicked = true
    }
    function move(e){
        if(!clicked){ return }
        if (e.targetTouches != undefined) {
            now = e.targetTouches[0].pageX - start + position
        } else{
            now = e.pageX - start + position
        }
        if (now < 0) { now = 0 }
        if (now > document.documentElement.clientWidth) { now = document.documentElement.clientWidth ;}
        progress.style.width = now + "px" 
        thumb.style.left = now + "px" 
        if(getSelection) document.getSelection().removeAllRanges()
    }
    function moveEnd() { 
        if(!clicked){ return }
        media.currentTime = now / document.documentElement.clientWidth * media.duration
        clicked = false
     }
    thumb.addEventListener('mousedown', moveStart)
    thumb.addEventListener('touchstart', moveStart)
    document.addEventListener('mousemove', move)
    document.addEventListener('touchmove', move)
    document.addEventListener('mouseup', moveEnd)
    document.addEventListener('touchend', moveEnd)
    var bar = document.querySelector('.music_progress_bar')
    bar.addEventListener('mouseup', der)
    bar.addEventListener('touchstart', der)

 }
function lyric(){
    var id = musicData[thisSong].nid
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
        timeArray = []
        lyric = JSON.parse(lyric).lrc.lyric.split('\n')
        for(var i = 0; i < lyric.length; i++) {
            var time = lyric[i].substring(1,8)
            var minute = parseFloat(time.substring(0,lyric[i].indexOf(':') + 1))
            var second = parseFloat(time.substring(lyric[i].indexOf(':')))
            var time = second + minute * 60
            timeArray = timeArray.concat([time])

            var content = lyric[i].substring(lyric[i].indexOf(']') + 1)
            document.querySelector('.play_lyric').innerHTML += "<div class='lyric_texts'>"+content+"</div>"
         }
     }
 }
function changePlayingOrder() { 
    var node = document.getElementsByClassName('player_subutton')[0]
    if(currentStatus == 'repeat') { 
        node.style.backgroundImage = "url('imgs/icons/shuffle.svg')"
        document.cookie = "lastPlayingOrder=shuffle;SameSite=Lax"
        currentStatus = 'shuffle'
     }
    else if(currentStatus == 'shuffle') {
        node.style.backgroundImage = "url('imgs/icons/repeat1.svg')"
        document.cookie = "lastPlayingOrder=repeat1;SameSite=Lax"
        currentStatus = 'repeat1'
    }
    else if(currentStatus == 'repeat1') {
        node.style.backgroundImage = "url('imgs/icons/repeat.svg')"
        document.cookie = "lastPlayingOrder=repeat;SameSite=Lax"
        currentStatus = 'repeat'
    }
    
 }
function next() { 
    pause()
    var nextSong
    var _thisSong = parseInt(thisSong)
    if(currentStatus == 'repeat') {nextSong = _thisSong + 1}
    else if(currentStatus == 'shuffle') {
        nextSong = randomNumber( musicData.length-1 , 0 );
        if(_thisSong == nextSong) nextSong = randomNumber( musicData.length-1 , 0 );
        }
    else if(currentStatus == 'repeat1') {nextSong = _thisSong}
    if(nextSong > musicData.length-1) {nextSong = 0}
    if(nextSong < 0) {nextSong = musicData.length-1}
    play(nextSong)
 }
function last() { 
    var nextSong
    if(currentStatus == 'repeat') {
        nextSong = parseInt(thisSong) - 1; 
        if(nextSong < 0) {nextSong = musicData.length-1}
        play(nextSong)}
    else next()
 }


function picBackground() { 
    for(var i = 0;i<document.getElementsByClassName('pic').length;i++){
        document.getElementsByClassName('pic')[i].style.backgroundImage = "url(imgs/"+document.getElementsByClassName('pic')[i].classList[1]+".jpg)"
    }
 }

 function goToFullscreen(element) {
    if(document.fullscreenElement == null) {
        if (element.requestFullscreen) {
            element.requestFullscreen()
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen()
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullScreen()
        };
        notice('?????????????????????????????????????????????????????????????????????????????????'
            ,'Click the header to escape from fullscreen!'
        )
    }else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
 }

 function goTo(a,b){
    if(fadeCd !== 0) { return }
     if(a==b){
        var A = activePageSelector().style
        var B = document.getElementById('home').style
        fadeCd = 1;
        A.display = 'flex'
        setTimeout(function(){A.display = 'none'; fadeCd = 0},1000) 
        A.opacity = '1'
        B.display = 'flex'
        setTimeout(function(){B.opacity = '1';A.opacity = '0' },10) 
        document.getElementById('home').style.display = "flex"
        document.getElementById('scrollbar').style.display = 'none'
        document.getElementById('header').style.background = 'linear-gradient(75deg, rgba(0,0,0,0) , #E95193)'
        return console.log('goto home')
     }
     if(b == 'player') { document.getElementById('header').style.background = 'none' }
     else { document.getElementById('header').style.background = 'linear-gradient(75deg, rgba(0,0,0,0) , #E95193)' }
    console.log('goto '+b+' from',a)
    document.getElementById('header').setAttribute('onclick','goTo(\"'+b+'\",\"'+a+'\")')
    var A = document.getElementById(a).style
    var B = document.getElementById(b).style
    A.opacity = '0'
    fadeCd = 1;
    setTimeout(function(){A.display = 'none'; fadeCd = 0;},300) 
    B.display = 'flex'
    setTimeout(function(){B.opacity = '1'},10) 

    setTimeout(function(){
        if(phone) return
        if(!activePageSelector().className.includes('scrollable')) {
            document.getElementById('scrollbar').style.display = 'none'
        }
        else{document.getElementById('scrollbar').style.display = 'flex'; scrollBar()}
    },310)
 }

 function scrollBar() { 
    if(phone) return
    var thumb = document.getElementsByClassName('scrollthumb')[0]
    var track = document.getElementById('scrollbar')
    var content = activePageSelector()
    var view = document.querySelector('#scrollbar').offsetHeight
    var all = content.offsetHeight
    var scrollBarHeight = view / all
    thumb.style.height = scrollBarHeight * 100 + "%"
    
    var clicked = false
    var start
    var end = 0
    var now = 0
    thumb.onmousedown = function (e) { 
        clicked = true
        start = e.pageY
     }
    document.onmousemove = function (e) {
        if(!clicked) {return}
        now = e.pageY - start + end
        if(now < 0) { now = 0 }
        else if(now > track.offsetHeight - thumb.offsetHeight) { now = track.offsetHeight - thumb.offsetHeight }
        thumb.style.top = now + "px"
        content.style.top = "calc(10rem - " + now / scrollBarHeight + "px)"
        if(window.getSelection) {window.getSelection().removeAllRanges()}
     }
    document.onmouseup = function () {
        clicked = false
        end = thumb.offsetTop
     }
    
     document.onwheel = wheel
     function wheel(event) { 
        now += event.deltaY / 5
        if(now < 0) { now = 0 }
        else if(now > track.offsetHeight - thumb.offsetHeight) { now = track.offsetHeight - thumb.offsetHeight }
        thumb.style.top = now + "px"
        content.style.top = "calc(10rem - " + now / scrollBarHeight + "px)"
        end = thumb.offsetTop
      }
  }

function showPicture(order) { 
     document.getElementsByClassName('show_picture_container')[0].style.backgroundImage = "url(imgs/bg/"+order+".jpg)"
     goTo('exhibition','show_picture')
  }

function showHeadEffect(order) { 
    for(var i = 0;i<document.getElementsByClassName('headPreviewPic').length;i++)
        document.getElementsByClassName('headPreviewPic')[i].style.backgroundImage = "url(imgs/headSets/"+order+".jpg)"
    goTo('headSets','headPreview')
 }

function notice(content,hojyuu) { 
    document.getElementsByClassName('notice_content')[0].innerHTML = content
    document.getElementsByClassName('notice_hojyuu')[0].innerHTML = hojyuu
    document.getElementById('notice').style.opacity = 1
    document.getElementById('notice').style.display = 'flex'
    setTimeout(function(){document.getElementById('notice').style.opacity = 0},4000)
    setTimeout(function(){document.getElementById('notice').style.display = 'none'},5000)
  }

function getCookie(cname) {
    var ca = document.cookie.split(';')
    for(var i=0; i<ca.length;i++) {
        if(ca[i].includes(cname)) {
            return ca[i].substring(
                ca[i].indexOf('=') + 1
            )
        }
    }
    return ""
}