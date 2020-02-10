function bindClick() {
    //数量-1
    $(".minus").click(function () {
            var text = $("#proQuantity").text();
            var number = parseInt(text);
            if (number == 1)
                return;
            $("#proQuantity").text("" + (number - 1));
        }
    );
    //数量+1
    $(".add").click(function () {
            var text = $("#proQuantity").text();
            var number = parseInt(text);
            $("#proQuantity").text("" + (number + 1));
        }
    );
    //添加按钮
    $("#addbtn").click(function () {
            var name = $("#proName").text().substr(5);
            var number = parseInt($("#proQuantity").text());
            var pic = $("#productPic").attr("src");
            var search = location.search.substr(1).split("&");
            var price = search[3].substr(search[3].indexOf("price=") + 6);
            addPro(myDB.db, name, number, pic, price);
        }
    );
}

var myDB = {
    name: 'Cart',
    version: 1,
    db: null
};
var idb = 1;

function openDB(name, version) {
    var version = version || 1;
    var request = window.indexedDB.open(name, version);
    request.onerror = function (e) {
        console.log(e.currentTarget.error.message);
    };
    request.onsuccess = function (e) {
        myDB.db = e.target.result;
        idb = e.target.result;
    };
    request.onupgradeneeded = function (e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains('cart')) {
            var store = db.createObjectStore('cart', {keyPath: 'name'});
        }
    };
}

//增加商品
function addPro(db, name, number, pic, price) {
    var transaction = db.transaction('cart', 'readwrite');
    var store = transaction.objectStore('cart');
    var pro = {
        "name": name,
        "number": number,
        "pic": pic,
        "price": price
    };
    store.put(pro);
    $("#hidesuccess").css({"right": "-200px"}).show().animate({"right": "+=400px"}, 2000).fadeOut(4000)
        .children("div").text(name);
}

//随机过滤
function random() {
    var j;
    var a = Array();
    var i = 0;
    while (i < 10) {
        j = Math.floor(Math.random() * 15);
        if (a.indexOf(j) == -1) {
            a[i] = j;
            i++;
        }
    }
    return a;
}

//随机显示评论
function filterreply() {
    var a = random();
    for (var i = 0; i < a.length; i++) {
        $(".reply:eq(" + a[i] + ")").hide();
    }
}

$(function () {
        filterreply();
        openDB(myDB.name, myDB.version);
        bindClick();
        //页面根据url的参数进行初始化
        var search = location.search.substr(1).split("&");
        // alert(search);name=%E8%8B%A6%E7%93%9C,category=vegetable
        var name = search[0].substr(5);
        name = decodeURIComponent(name);
        var category = search[1].substr(search[1].indexOf("category=") + 9);
        var pic = search[2].substr(search[2].indexOf("pic=") + 4);
        var price = search[3].substr(search[3].indexOf("price=") + 6);
        $("#proName").text("商品名称:" + name);
        $(".ppname").text(name);
        var temp;
        if (category == "vegetable") {
            temp = "有机蔬菜";
        } else if (category == "fruit") {
            temp = "有机水果";
        } else if (category == "juice") {
            temp = "有机果汁";
        }
        $("#proCategory").text("商品种类:" + temp);
        $("#proPrice").text("商品单价:" + price + "￥");
        var j = Math.floor(Math.random() * 4) + 1;
        var i = 5 - j;
        $(".icon1:gt(" + (j - 1) + ")").hide();
        $(".icon2").hide();
        $(".icon2:lt(" + i + ")").show();
        $("#productPic").attr("src", pic);
        $(".proname").text(name);
    }
);