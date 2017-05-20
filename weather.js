var city = localStorage.getItem('city');
if (!city) {
    city = '西安'
}
$('#city').html(city);
$.ajax({
    url: "https://free-api.heweather.com/v5/weather",
    type: "GET",
    data: {
        city: city,
        key: '41e6f02643304f20a817eea2eb186028'
    },
    success: function (data) {
        a = data['HeWeather5'][0];
        show(a);
        suggestion(a);
    },
    error: function () {
        alert('请刷新网页');
    }
})
function show(now) {
    var qlty = now.aqi.city.aqi +' '+ now.aqi.city.qlty;
    $('#qlty').html(qlty);
    var wind = now.daily_forecast[0].wind.spd;
    $('#wind').html('风力' + wind);
    var nowt = now.now.tmp;
    $('#now-t').html(nowt);
}
//7日天气预报
$(document).ready(function () {
    $.ajax({
        type: 'get',
        async: false,
        url: 'http://api.k780.com:88/?app=weather.future&weaid=' + city + '&appkey=22330&sign=caa92987ffcddd07c3d2a80b70ee6a32&format=json&jsoncallback=data',
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'data',
        success: function (data) {
            b = data['result'];
            showNext(b);
        },
        error: function () {
            alert('fail');
        }
    });
});
for (var i = 0; i < 7; i++) {
    $('h3').after("<div class='row line'> <div class='col-xs-4'> <span class='date'></span> </div> <div class='col-xs-5'> <span class='img1'></span><span class='weather'></span> </div> <div class='col-xs-3'> <span class='minT'></span><span class='border'></span><span class='maxT'></span> </div> </div>");
}
var myWeek = [' 周 日', ' 周 一', ' 周 二', ' 周 三', ' 周 四', ' 周 五', ' 周 六'];
var today = new Date().getDay();
function showNext(all) {
    for (var i = 0; i < all.length; i++) {
        var index = (today + i) % 7;
        var date = all[i].days.substr(5) + myWeek[index];
        var cond = all[i].weather;
        var min = all[i].temp_low + '℃';
        var max = all[i].temp_high + '℃';
        $($('.date')[i]).html(date);
        $($('.weather')[i]).html(cond);
        $($('.minT')[i]).html(min);
        $($('.border')[i]).html("~");
        $($('.maxT')[i]).html(max);
        $($('.minT')[i]).css('color', '#3db65d');
        $($('.maxT')[i]).css('color', '#FF7256');
        if (i == 0) {
            $($('.date')[0]).html(all[0].days.substr(5) + ' 今 日');
        }
        if (i == 1) {
            $($('.date')[1]).html(all[1].days.substr(5) + ' 明 日');
        }
        if (index == 6 || index == 0) {
            $($('.date')[i]).css('color', '#ff0000');
        }
        if ($($('.weather')[i]).html() == '晴') {
            $($('.img1')[i]).css('background-position', '0 -282px');
        } else if ($($('.weather')[i]).html() == '多云转晴') {
            $($('.img1')[i]).css('background-position', '0 -234px');
        }
        else if ($($('.weather')[i]).html() == '晴转多云') {
            $($('.img1')[i]).css('background-position', '0 -234px');
        }
        else if ($($('.weather')[i]).html() == '小雨' || $($('.weather')[i]).html() == '多云转小雨') {
            $($('.img1')[i]).css('background-position', '0 -24px');
        }
        else if ($($('.weather')[i]).html() == '阴') {
            $($('.img1')[i]).css('background-position', '0 -212px');
        }
        else if ($($('.weather')[i]).html() == '中雨') {
            $($('.img1')[i]).css('background-position', '0 260px');
        }
        else if ($($('.weather')[i]).html() == '多云') {
            $($('.img1')[i]).css({'background-position': '0 450px'});
        }

    }
    // 上边天气指数
    var weat = all[0].weather;
    var mint = all[0].temp_low + '℃';
    var maxt = all[0].temp_high + '℃';
    $('#weather').html(weat);
    $('#mix-t').html(mint);
    $('#max-t').html(maxt);
    if (weat == '多云转晴') {
        $('#picture').css('background-image', 'url(image/2.png)')
    }
    if (weat == '晴') {
        $('#picture').css('background-image', 'url(image/3.png)')
    }
    if (weat == '阴') {
        $('#picture').css('background-image', 'url(image/１.png)')
    }
    if (weat == '小雨') {
        $('#picture').css('background-image', 'url(image/5.png)')
    }
    if (weat == '雷阵雨') {
        $('#picture').css('background-image', 'url(image/４.png)')
    }

}

 function suggestion(now) {
    console.log(now.suggestion)
    $('#foot').append("<h3 class='airBrf'></h3><p class='airTxt'></p>")
    $('.airBrf').html("空气指数: "+now.suggestion.air.brf);
    $('.airTxt').html(now.suggestion.air.txt);
    $('#foot').append("<h3 class='comfBrf'></h3><p class='comfTxt'></p>")
    $('.comfBrf').html("舒适指数: "+now.suggestion.comf.brf);
    $('.comfTxt').html(now.suggestion.comf.txt);
    $('#foot').append("<h3 class='cwBrf'></h3><p class='cwTxt'></p>")
    $('.cwBrf').html("洗车指数: "+now.suggestion.cw.brf);
    $('.cwTxt').html(now.suggestion.cw.txt);
    $('#foot').append("<h3 class='fluBrf'></h3><p class='fluTxt'></p>")
    $('.fluBrf').html("感冒指数: "+now.suggestion.flu.brf);
    $('.fluTxt').html(now.suggestion.flu.txt);
    $('#foot h3').css({'background':'#54FF9F'});
    $('p').css({'background':'#838B8B'})
}
function saying() {
    play_xiaoyan($('#city').text() + $('.right').text()+$('#foot').text());
}