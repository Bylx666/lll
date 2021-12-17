var lastRandomNumber
var fadeCd = 0
var songProgress

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

function play(musicURL,musicCover){
    var media = document.getElementById('musicMedia')
    var button = document.getElementsByClassName('player_button')[1]
    button.style.backgroundImage = "url('imgs/icons/pause.svg')"
    button.setAttribute('onclick','pause()')
    if(musicURL == 'button') { media.play(); return }
    document.querySelector('.play_cover').style.backgroundImage = "url(imgs/cover/"+musicCover+".jpg)"
    media.setAttribute('src',musicURL)
    media.play()
    var pe = document.getElementById('playerEntrance')
    pe.onclick = function () { goTo('music','player') }
    if(songProgress == undefined) { musicProgress() }
}
function pause() { 
    var media = document.getElementById('musicMedia')
    var button = document.getElementsByClassName('player_button')[1]
    button.style.backgroundImage = "url('imgs/icons/play.svg')"
    button.setAttribute('onclick','play(\'button\')')
    media.pause()
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
        if(now == total) { pause() }
    },500)

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
    bar.addEventListener('touchend', der)
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
        notice('ヘッダーをクリックして全画面表示から抜けますください。'
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
        if(!activePageSelector().className.includes('scrollable')) {
            document.getElementById('scrollbar').style.display = 'none'
        }
        else{document.getElementById('scrollbar').style.display = 'flex'; scrollBar()}
    },310)
 }

 function scrollBar() { 
    var thumb = document.getElementsByClassName('scrollthumb')[0]
    var track = document.getElementById('scrollbar')
    var content = activePageSelector()
    var view = document.documentElement.clientHeight
    var all = document.documentElement.scrollHeight
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
    thumb.addEventListener('touchstart',function (e) { 
        clicked = true
        start = e.targetTouches[0].pageY
     })
    document.onmousemove = function (e) {
        if(!clicked) {return}
        now = e.pageY - start + end
        if(now < 0) { now = 0 }
        else if(now > track.offsetHeight - thumb.offsetHeight) { now = track.offsetHeight - thumb.offsetHeight }
        thumb.style.top = now + "px"
        content.style.top = "calc(10rem - " + now / scrollBarHeight + "px)"
        if(window.getSelection) {window.getSelection().removeAllRanges()}
     }
    document.addEventListener('touchmove',function (e) {
        if(!clicked) {return}
        now = e.targetTouches[0].pageY - start + end
        if(now < 0) { now = 0 }
        else if(now > track.offsetHeight - thumb.offsetHeight) { now = track.offsetHeight - thumb.offsetHeight }
        thumb.style.top = now + "px"
        content.style.top = "calc(10rem - " + now / scrollBarHeight + "px)"
        if(window.getSelection) {window.getSelection().removeAllRanges()}
        e.preventDefault()
     }, { passive: false })
    document.onmouseup = function () {
        clicked = false
        end = thumb.offsetTop
     }
    document.addEventListener('touchend',function () {
        clicked = false
        end = thumb.offsetTop
     })
    
     var touched = false
     document.onwheel = wheel
     function wheel(event) { 
        now += event.deltaY / 5
        if(now < 0) { now = 0 }
        else if(now > track.offsetHeight - thumb.offsetHeight) { now = track.offsetHeight - thumb.offsetHeight }
        thumb.style.top = now + "px"
        content.style.top = "calc(10rem - " + now / scrollBarHeight + "px)"
        end = thumb.offsetTop
      }
      document.addEventListener('touchstart',function (e) {
        touched = true
        start = e.targetTouches[0].pageY
      })
      document.addEventListener('touchmove',function (e) {
        if(clicked) {return}
        if(!touched) {return}
        now = ( - e.targetTouches[0].pageY + start ) / 6 + end
        if(now < 0) { now = 0 }
        else if(now > track.offsetHeight - thumb.offsetHeight) { now = track.offsetHeight - thumb.offsetHeight }
        thumb.style.top = now + "px"
        content.style.top = "calc(10rem - " + now / scrollBarHeight + "px)"
        if(window.getSelection) {window.getSelection().removeAllRanges()}
        e.preventDefault()
      }, { passive: false })
      document.addEventListener('touchend',function () {
        end = thumb.offsetTop
        touched = false
      })
  }

 function showPicture(order) { 
     document.getElementsByClassName('show_picture_container')[0].style.backgroundImage = "url(imgs/bg/"+order+".jpg)"
     goTo('exhibition','show_picture')
  }

 function notice(content,hojyuu) { 
    document.getElementsByClassName('notice_content')[0].innerHTML = content
    document.getElementsByClassName('notice_hojyuu')[0].innerHTML = hojyuu
    document.getElementById('notice').style.opacity = 1
    document.getElementById('notice').style.display = 'flex'
    setTimeout(function(){document.getElementById('notice').style.opacity = 0},4000)
    setTimeout(function(){document.getElementById('notice').style.display = 'none'},5000)
  }