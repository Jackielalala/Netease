var id=parseInt(location.search.match(/id=([^&])*/)[1])
$.ajax({
    url:'./music.json',
    type:'GET'
}).done(function(response){
    var $music=response;/*一般情况下最好进行赋值，以免更改了获取的数据*/
    var song=$music.filter(function(item){
        return item.id===id;/*filter这种筛选子数组的方法很好用*/
    })[0];
    $('.descript h1').text(song.name);
    var audio=document.createElement('audio');
    audio.src=song.url;
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



    setInterval(function(){
        var seconds=audio.currentTime;
        var mins=Math.floor(seconds/60);
        var left=seconds-mins*60;
        var time=pad(mins)+':'+pad(left);
        for(var i=0;i<$('.lyric p').length;i++){
            if($('.lyric p').eq(i).attr('time')<=time&&$('.lyric p').eq(i+1).attr('time')>time){
                var position=-($('.lyric p').eq(i).offset().top-$('.lyric').offset().top)+'px';
                $('.lyric').css('transform',`translateY(${position})`)
                $('.lyric p').eq(i).css('color','white');
            }
        }  
    },1000)
    function pad(num){
        return num>=10?num+'':'0'+num;
    }

    var $lyrics=song.lyric.split('\n');/*split将字符串分为一个数组*/
    var array=$lyrics.map(function(string){/*map遍历*/
        var reg=/^\[(.+)\](.*)$/g;/*加括号的正则表示的字符串会以数组中单独的元素的形式出现 */
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

    
    
    });

    










