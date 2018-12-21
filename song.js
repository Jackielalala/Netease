$(function(){
    $.ajax({
        url:'./lyric.json',
        type:'GET',
        dataType:'json'
    }).done(function(ret){
        var {lyric}=ret;
        var array=lyric.split('\n');/*将字符串以'\n'进行分割，分为数组*/
        array=array.map(function(string){/*map遍历*/
            var reg=/^\[(.+)\](.*)$/g;
            var matches=reg.exec(string);/*可以在控制台检验取出来的是什么值*/
            if(matches){
                return {time:matches[1],lyric:matches[2]}/*返回一个新数组*/
            }
        })
        array.map(function(object){
            var $lyric=$('.lyric');
            var $p=$('<p></p>')
            $p.attr('time',object.time).text(object.lyric);
            $p.appendTo($lyric);
        })
    })
    var audio=document.createElement('audio');
    audio.src='http://m10.music.126.net/20181220165259/3b94a5dbf4938be5baa9f81fc4cbffdc/ymusic/3c9e/439c/d816/0f5c0962d2c3067a35bf7163bea08424.mp3';
    audio.oncanplay=function(){
        audio.play();
        $('.light').addClass('playing');
        $('.cover').addClass('playing');
        $('.iconbox').addClass('playing1');
    }
    $('.cover').on('click',function(){
        audio.pause();
        $('.iconbox').removeClass('playing1');
        $('.light').removeClass('playing');
        $('.cover').removeClass('playing');
    })
    $('.icon').on('click',function(){
        audio.play();
        $('.iconbox').addClass('playing1');
        $('.light').addClass('playing');
        $('.cover').addClass('playing');
    })
  
})


