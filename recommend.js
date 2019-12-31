var index = location.search.match(/\d+/g)[0];

if(index == 1){
    $('.container>img').attr('src',"http://p1.music.126.net/PwW6fy9hY3IIXeM98gaE8w==/109951163722224626.webp?imageView&amp;thumbnail=246x0&amp;quality=75&amp;tostatic=0&amp;type=webp")
    $('.info>h3').text('第二封 “唯有你想见我 我们见面才有意义')
    
}else if(index==2){
    $('.container>img').attr('src',"http://p1.music.126.net/4egjX0tpZLeYLX87UlgIKQ==/109951163714943722.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp")
    $('.info>h3').text('与月光为邻，当个夜旅人。')
}else if(index==3){
    $('.container>img').attr('src',"http://p1.music.126.net/4egjX0tpZLeYLX87UlgIKQ==/109951163714943722.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp")
    $('.info>h3').text('「八组鹅」的圣诞精选歌单')
}else if(index==4){
    $('.container>img').attr('src',"http://p1.music.126.net/o6umpa2EhymgGJRANMODpQ==/3241360282158217.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp")
    $('.info>h3').text('八组鹅の圣诞歌单')
}else if(index==5){
    $('.container>img').attr('src',"http://p1.music.126.net/-YXIivm0fzi9_F_ik5esOQ==/109951163702538317.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp")
    $('.info>h3').text('愿你每日欢喜多于悲 这个冬季再冷有人陪')
}else if(index==6){
    $('.container>img').attr('src',"http://p1.music.126.net/AqO0rDQCX51clV5-SkaGfg==/109951163578009092.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp")
    $('.info>h3').text('治愈率100％：抚慰在感情中受伤的心')
}

$.ajax({
    url:'./music.json',
    method:'GET'
}).done(function(ret){
    ret.map(function(item){
        var $node =$(`
        <li>
            <a href='./song.html?id=${item.id}'> 
                <p class='song'>${item.name}</p>
                <div class='box'>
                    <svg class='sq'>
                        <use xlink:href='#icon-sq'></use>
                    </svg>
                    <span class='singer'>${item.singer}</span>
                </div>
                <span class="iconfont icon-play"></span>
            </a>
        </li>`)
        $node.appendTo('.recommend-music')
    })
    $('.icon-loading').remove();
}).fail(function(err){
    console.log(new Error('error'));
}).always(function(){
    console.log('ok');
})
$('.icon-play').on('click',function(){
    this.style.color = '#ccc';
})