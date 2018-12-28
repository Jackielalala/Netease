$.ajax(
    {
        url:'./music.json',/*获取音乐列表的信息*/
        type:'GET'
    }
).done(function(response){
    response.forEach(function(item){
       var $node=$(`<li>
        <a href='./song.html?id=${item.id}'>
        <p>${item.name}</p> 
        <div class="detail">
            <svg class='sq'>
                <use xlink:href='#icon-sq'></use>
            </svg>
            <span>${item.singer}</span>
        </div>
            <svg class='playbtn'>
                <use xlink:href='#icon-play1'></use>
            </svg>         
        </a>
        </li>`) ;
        $node.appendTo('.latestmusic ul');
    });/*${}这个功能很神奇，可以直接获取返回的数组中的元素的属性*/
        $('.loadingpic').remove();
        
}).fail(function(){
    alert('1');
}).always(function(){
    console.log('ok');
})

$('nav ul li p').on('click',function(e){
    $(this).addClass('active').parent().siblings().children().removeClass('active');
    var index=$(this).parent().index();
    $('.page>li').eq(index).addClass('active').siblings().removeClass('active');
})

/*第二个页面 */
$.ajax({
    url:'./example.json',
    type:'GET',
    dataType:'json'
}).done(function(response){
    response.forEach(function(song){
        var $node=$(`                <a href='./song.html?id=${song.id}' class="single">
        <p class="rank">0${song.id}</p>
        <div class="info">
            <p>${song.name}</p>
            <span>${song.singer}</span>
        </div>
        <svg class='playbtn'>
            <use xlink:href='#icon-play1'></use>
        </svg>     
    </a>`) ;/*song.id部分的写法是由问题的，怎么在html里用函数呢*/
    $node.appendTo('.musiclist');
    })
})
/*a元素对应的页面先前已经写过，所以这里不用再写了*/


var timer=undefined;
$('input').on('input',function(){
    var value=$(this).val().trim()
    if(value===''){return};
    if(timer){
        clearTimeout(timer);
    };/*当0.3s内还在输入时不要显示上一个字搜索出的对应歌名 */
    timer=setTimeout(function(){
        var result=search(value);
        if(result!==undefined){
            $node=$('<p></p>');
            $node.text(result.name).appendTo('.output'); 
        }else{
            $node.text('未搜索到结果').appendTo('.output');
        }

    },300)

})

function search(keywords){
    var data=[
        {"id":1,"name":"Everything I Need"},            
        {"id":2,"name":"高明的悲剧"},
        {"id":3,"name":"西域公主"},
        {"id":4,"name":"大眠"},
        {"id":5,"name":"陌生的刚好"},
        {"id":6,"name":"Baby Don't Cry"},
        {"id":7,"name":"起风了"},
        {"id":8,"name":"Romeo"},
        {"id":9,"name":"梦开始的地方"},
        {"id":10,"name":"A swim in the love you give me"}
    ];
    return data.filter(function(item){
    return item.name.indexOf(keywords)>=0;
    })[0];/*这里注意是val(),不是value（）*/   
}

