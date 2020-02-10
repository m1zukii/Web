//过滤选择变化
function clickFilter() {
    $(".fi").hover(function () {
            $(this).css("cursor", "pointer");
        }, function () {
        }
    );
    $(".fi").click(function () {
            $(this).siblings().removeClass("choose");
            $(this).addClass("choose");
            var type = $(this).text();
            if (type == "所有") {
                $(".product").show();
            } else if (type == "有机蔬菜") {
                $(".product").hide();
                $(".vegetable").show();
            } else if (type == "有机水果") {
                $(".product").hide();
                $(".fruit").show();
            } else if (type == "有机果汁") {
                $(".product").hide();
                $(".juice").show();
            }
        }
    );
}

//购物车图标显示隐藏
function mouseinout() {
    $(".product").mouseenter(function () {
            $(this).children(".img").children("img.cart").show();
        }
    ).mouseleave(function () {
            $(this).children(".img").children("img.cart").hide();
        }
    );
}

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
        // alert('打开数据库成功');
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
    // alert("成功添加到购物车");
    $("#hidesuccess").css({"right": "-200px"}).show().animate({"right": "+=400px"}, 2000).fadeOut(4000)
        .children("div").text(name);
}

//点击跳转商品详情
function bindClick() {
    $(".product").click(function () {
            var name = $(this).children(".detail").children(".name").text();
            var class1 = $(this)[0].className;
            var category;
            if (class1.indexOf("vegetable") != -1) {
                category = "vegetable";
            } else if (class1.indexOf("fruit") != -1) {
                category = "fruit";
            } else if (class1.indexOf("juice") != -1) {
                category = "juice";
            }
            name = encodeURIComponent(name);
            var pic = $(this).children(".img").children("img").attr("src");
            var temp = $(this).children(".detail").children("p.price:has(ins)");
            var length = temp.length;
            var price;
            if (length == 0) {
                price = $(this).children(".detail").children("p.price").text().trim();
                var i = price.length - 1;
                price = price.substr(0, i);
            } else {
                price = temp.children("ins").text();
                var i = price.length - 1;
                price = price.substr(0, i);
            }
            location.href = "productDetail.html?name=" + name + "&category=" + category + "&pic=" + pic + "&price=" + price;
        }
    );
    //添加购物车
    $("img.cart").click(function (event) {
            event.stopPropagation();
            var product = $(this).parent().parent();
            var name = product.children(".detail").children(".name").text();
            var number = 1;
            var pic = product.children(".img").children("img").attr("src");
            var temp = product.children(".detail").children("p.price:has(ins)");
            var length = temp.length;
            var price;
            if (length == 0) {
                price = product.children(".detail").children("p.price").text().trim();
                var i = price.length - 1;
                price = price.substr(0, i);
            } else {
                price = temp.children("ins").text();
                var i = price.length - 1;
                price = price.substr(0, i);
            }
            addPro(myDB.db, name, number, pic, price);
        }
    );
}

$(function () {
        openDB(myDB.name, myDB.version);
        clickFilter();
        bindClick();
        mouseinout();
    }
);