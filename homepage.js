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