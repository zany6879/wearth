var CITY_DATA_KEY = "CITY_DATA";
var cityArray = [{
    name: "广州",
    count: 0,
    dateTime: new Date().getTime()
}, {
    name: "上海",
    count: 0,
    dateTime: new Date().getTime()
}, {
    name: "西安",
    count: 0,
    dateTime: new Date().getTime()
}, {
    name: "北京",
    count: 0,
    dateTime: new Date().getTime()
}, {
    name: "天津",
    count: 0,
    dateTime: new Date().getTime()
}, {
    name: "深圳",
    count: 0,
    dateTime: new Date().getTime()
}, {
    name: "武汉",
    count: 0,
    dateTime: new Date().getTime()
}, {
    name: "渭南",
    count: 0,
    dateTime: new Date().getTime()
}];

function getCity() {
    var cityData = localStorage.getItem(CITY_DATA_KEY);

    if (!cityData) {
        localStorage.setItem(CITY_DATA_KEY, JSON.stringify(cityArray));
        return cityArray;
    } else {
        return JSON.parse(cityData);
    }
}


function addCity(city) {
    var cityList = getCity();
    var isHave = cityList.some(function (value, index) {
        if (value.name == city) {
            cityList[index].count++;
            cityList[index].dateTime = new Date().getTime();
            return true;
        } else {
            return false;
        }
    });
    if (!isHave) {
        cityList.push({
            name: city,
            count: 1,
            dateTime: new Date().getTime()
        })
    }
    localStorage.setItem(CITY_DATA_KEY, JSON.stringify(cityList));
}

//按次数排序
function getCityOrderByTimes(number) {

    var cityData = getCity();
    cityData.sort(function (a, b) {
        return b.count - a.count;
    });
    return !number ? cityData : cityData.splice(0,number);

}


//按最后点击时间
function getCityOrderByDate(number) {
    var cityData = getCity();
    console.log(cityData);
    cityData.sort(function (a, b) {
        return b.dateTime - a.dateTime;
    });
    console.log(cityData);
    return !number ? cityData : cityData.splice(0,number);
}