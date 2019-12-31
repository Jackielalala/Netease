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

$('.recommend li').on('click','a',function(){
    var index=$(this).attr('index');
   
    $(this).attr('href',`./recommend.html?index=${index}`);
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
        $('.output').empty();
        $('.result').empty();
    };/*当0.3s内还在输入时不要显示上一个字搜索出的对应歌名,函数防抖 */
    timer=setTimeout(function(){
        //$('input').empty();
        $.ajax({
            url:'./search.json',
            type:'GET',
            dataType:'json'
        }).done(function(response){
                var item=response.filter(function(item){
                        return item.name.indexOf(value)>=0;
                    })[0];/*这里注意是val(),不是value（）*/   
                var $tip=$('<p></p>');
                $tip.text('搜索'+value).appendTo('.output');
                if(item){
                    var $node=$(`<a href="./song.html?id=${item.id}"><p></p></a>`);/*只有按ES6的方法`...`创建元素时${}才生效*/
                    $node.text(item.name).appendTo('.result');
                }else{
                    var $node=$('<p></p>');
                    $node.text('未搜索到结果').appendTo('.result');
                }
            },300)
        })
})




