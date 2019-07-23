// $(document).on('turbolinks:load', function(){
// var get_deg_string = function(deg) {
//   var r = '北';
//   if (deg>=11.25) r = '北北東';
//   if (deg>=33.75) r = '北東';
//   if (deg>=56.25) r = '東北東';
//   if (deg>=78.75) r = '東';
//   if (deg>=101.25) r = '東南東';
//   if (deg>=123.75) r = '南東';
//   if (deg>=146.25) r = '南南東';
//   if (deg>=168.75) r = '南';
//   if (deg>=191.25) r = '南南西';
//   if (deg>=213.75) r = '南西';
//   if (deg>=236.25) r = '西南西';
//   if (deg>=258.75) r = '西';
//   if (deg>=281.25) r = '西北西';
//   if (deg>=303.75) r = '北西';
//   if (deg>=326.25) r = '北北西';
//   return r+'の風';
// };

// var get_date_string = function(dt) {
//   var date = new Date(dt*1000);
//   var week = ['日','月','火','水','木','金','土'];
//   var s = date.getFullYear()+'年';
//   s += date.getMonth()+1+'月';
//   s += date.getDate()+'日';
//   s += '（'+week[date.getDay()]+'）';
//   return s;
// };

// var round_val = function(n) {
//   return Math.round(n*10)/10;
// };

// var get_weather_string = function(s) {
//   if (/^01/.test(s)) return '晴れ';
//   if (/^0[234]/.test(s)) return '曇り';
//   if (/^(09|10)/.test(s)) return '雨';
//   if (/^13/.test(s)) return '雪';
//   if (/^11/.test(s)) return '雷';
//   if (/^50/.test(s)) return '霧';
//   return '';
// };

// var weather1 = function(data) {
//   var s = '<p>1. 現在の天気（'+data.name+'）</p>';
//   s += '<ul><li>';
//   s += get_date_string(data.dt)+'<br>';
//   s += '気温：'+round_val(data.main.temp)+'℃<br>';
//   s += '風向：'+get_deg_string(data.wind.deg)+'<br>';
//   s += '風速：'+round_val(data.wind.speed)+'m/s<br>';
//   for (var i in data.weather) {
//     var icon = data.weather[i].icon;
//     s += '天気：'+get_weather_string(icon)+'<br>';
//     s += '<img src="http://openweathermap.org/img/w/'+icon+'.png">';
//   }
//   s += '</li></ul>';
//   $('#weather1').html(s);
// };

// var weather2 = function(data) {
//   var s = '<p>2. 週間天気（'+data.city.name+'）</p>';
//   s += '<ul>';
//   var list = data.list;
//   for (var i = 1; i < list.length; i++) {
//     s += '<li>';
//     s += get_date_string(list[i].dt)+'<br>'
//     s += '風向：'+get_deg_string(list[i].deg)+'<br>';
//     s += '風速：'+round_val(list[i].speed)+'m/s<br>';
//     s += '最高気温：'+round_val(list[i].temp.max)+'℃<br>';
//     s += '最低気温：'+round_val(list[i].temp.min)+'℃<br>';
//     for (var j in list[i].weather) {
//       var icon = list[i].weather[j].icon;
//       s += '天気：'+get_weather_string(icon)+'<br>';
//       s += '<img src="http://openweathermap.org/img/w/'+icon+'.png">';
//     }
//     s += '</li>';
//   }
//   s += '</ul>';
//   $('#weather2').html(s);
// };



function buildHTML(data, i) {
  // var Week = new Array("（日）","（月）","（火）","（水）","（木）","（金）","（土）");
  var date = new Date (data.list[i].dt_txt);
  date.setHours(date.getHours() + 9);
  var month = date.getMonth()+1;
  var day = month + "月" + date.getDate() + "日"  ;
  var icon = data.list[i].weather[0].icon;
  var time = date.getHours() + "：00";
  var html =
  '<div class="weather-report">' +
    '<img src="http://openweathermap.org/img/w/' + icon + '.png">' +
    '<div class="weather-date">' + day + '</div>' +
    '<div class="weather-date">' + time + '</div>' +
    '<div class="weather-main">'+ data.list[i].weather[0].main + '</div>' +
    '<div class="weather-temp">' + Math.round(data.list[i].main.temp) + '℃</div>' +
  '</div>';
  return html
}

window.onload = function(){
// $(function() {
  var API_KEY = '206911cdbd45ea242dd15c70d2652233'
  var city = 'Tokyo';
  var url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',jp&units=metric&APPID=' + API_KEY;
  // console.log(url)
  $.ajax({
    url: url,
    dataType: "json",
    type: 'GET',
  })
  .done(function(data) {
    console.log(data)
    var insertHTML = "";
    var cityName = '<h2>' + data.city.name + '</h2>';
    $('#city-name').html(cityName);
    for (var i = 0; i <= 8; i = i + 1) {
      insertHTML += buildHTML(data, i);
    }
    $('#weather').html(insertHTML);
  })
  .fail(function(data) {
    console.log("失敗しました");
  });
// });
}
// });