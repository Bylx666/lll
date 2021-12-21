# This is the Dev Document
Despite trying for long, I cannot code gracefully as the others. But all my operation can reference from JavaScript APIs in [MDN](https://developer.mozilla.org/).  
I **reject all JavaScript frames** including nodejs, vue and jquary. They are fine, fun and easy to use, but I can not take interest of them. Please do not pull requests of your codes including a new frame. If you really like, just fork it and remake the codes yours. I may get inspiration from your renew project with your love.  
If you are using jquary, I think you could reference <https://youmightnotneedjquery.com/> for a instant of `$()` codes.  
***
## Get Started
***You Need Knowledge About Git And GitHUB!***  
Fork  
`git clone https://github.com/Bylx666/lll.git`  
`git pull`  
编辑完
`git push`  
PR
### Are you ones good at finding happiness?
If so, please learn to inject new songs about Love Live.  
#### New Songs
The database I use is the `data.js`. There I have vared a songList in JSON. Despite never heard of it, you can know what to do.  
```javascript
    '{' +
    '"tt":"NEO SKY, NEO MAP!" ,'+
    '"at":"虹ヶ咲学園スクールアイドル同好会" ,'+
    '"cvr":"neoSkyNeoMap" ,'+
    '"nid":"1492603231"'+
    '},' +
```
Just copy them, then paste in new line at the bottom of the whole file, but above
```javascript
']'
)
```
Now, change the values. `tt` means title, `at` means singer, `cvr` means the file name of the covername in `imgs/cover/` and `nid` mean the id in Netease music <https://music.163.com/>. I have no resource to store all the song media files, so please use a Netease music id for a linkable media file.  
Repeat operations above, if your collection is finished, delect the comma at the last line that there is the only `}`. Final codes may like this:
```javascript
...
    '},' +
    '{' +
    '"tt":"NEO SKY, NEO MAP!" ,'+
    '"at":"虹ヶ咲学園スクールアイドル同好会" ,'+
    '"cvr":"neoSkyNeoMap" ,'+
    '"nid":"1492603231"'+
    '}' +
    ']'
)
```
The cover file might be found in Browser Dev Tools, and the `nid` is in the link of chosen song page, there is usually `?id=...`. Just copy the id here.
#### New pictures
If you have favorite pictures about Love Live, and you would like to share, please copy them to `imgs/bg/` folder. Then you have to rename it or the system cannot scan of it. If your picture is vertical, rename it with `p` and a number after the current biggest number. If your picture is not `jpg` file, please directly change the file suffix into `jpg`. Usually the browser will not return anything wrong. If your picture is horitical, rename it with `c` and the one bigger number than the most.
#### If anything is ready, refresh your `index.html` and you can find your work.