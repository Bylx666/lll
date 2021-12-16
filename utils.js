var lastRandomNumber
var fadeCd = 0

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
      content.addEventListener('touchstart',function (e) {
        touched = true
        start = e.targetTouches[0].pageY
      })
      content.addEventListener('touchmove',function (e) {
        if(!touched) {return}
        now = ( - e.targetTouches[0].pageY + start ) / 12 + end
        if(now < 0) { now = 0 }
        else if(now > track.offsetHeight - thumb.offsetHeight) { now = track.offsetHeight - thumb.offsetHeight }
        thumb.style.top = now + "px"
        content.style.top = "calc(10rem - " + now / scrollBarHeight + "px)"
        if(window.getSelection) {window.getSelection().removeAllRanges()}
        e.preventDefault()
      }, { passive: false })
      content.addEventListener('touchend',function () {
        touched = false
        end = thumb.offsetTop
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