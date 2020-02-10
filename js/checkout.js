var myDB = {
    name: 'Cart',
    version: 1,
    db: null
};
var idb = 1;
//打开数据库
function openDB(name, version) {
    var version = version || 1;
    var request = window.indexedDB.open(name, version);
    request.onerror = function (e) {
        console.log(e.currentTarget.error.message);
    };
    request.onsuccess = function (e) {
        myDB.db = e.target.result;
        idb = e.target.result;
        var transaction = myDB.db.transaction('cart', 'readwrite');
        var store = transaction.objectStore('cart');
        var request = store.openCursor();
        request.onsuccess = function (event) {
            var cursor = event.target.result;
            var total = 0;
            //初始化结算购物车
            if (cursor) {
                var name = cursor.value.name;
                var price = cursor.value.price;
                var number = cursor.value.number;
                var d1 = $("<div class='name left'>" + name + "*" + number + "</div>");
                var d2 = $("<div class='total left'>" + (number * price) + "￥</div>");
                var d3 = $("<div class='data clear'></div>");
                d3.append(d1);
                d3.append(d2);
                $(".head").after(d3);
                cursor.continue();
                var total = parseInt($(".all .total").text());
                $(".all .total").text("" + (total + (number * price)) + "￥");
            }
        };
    };
    request.onupgradeneeded = function (e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains('cart')) {
            var store = db.createObjectStore('cart', {keyPath: 'name'});
        }
    };
}
window.onload = function () {
    openDB(myDB.name, myDB.version);
};
//初始化用户信息 提示用户登录
function a() {
    var login = localStorage.getItem("login");
    if (login == "true") {
    	$(".receive .title .ll").hide();
        var username = localStorage.getItem("username");
        $("#username").text(username);
        var name = localStorage.getItem("firstname") + localStorage.getItem("lastname");
        $("#name").text(name);
        var address = localStorage.getItem("address");
        $("#address").text(address);
        var phonenumber = localStorage.getItem("phonenumber");
        $("#phonenumber").text(phonenumber);
    }
}
$(function () {
        a();
    }
);