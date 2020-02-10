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
        //初始化页面数据
        var transaction = myDB.db.transaction('cart', 'readwrite');
        var store = transaction.objectStore('cart');
        var request = store.openCursor();
        request.onsuccess = function (event) {
            var cursor = event.target.result;
            //遍历游标
            if (cursor) {
                var pic = cursor.value.pic;
                var name = cursor.value.name;
                var price = cursor.value.price;
                var number = cursor.value.number;
                var tr = $("<tr class='data'></tr>");
                var td1 = $("<td class='pic'><div><img src='" + pic + "' alt='' width='120'  </div></td>");
                tr.append(td1);
                var td2 = $("<td class='name'>" + name + "</td>");
                tr.append(td2);
                var td3 = $("<td class='number'>" + number + "</td>");
                tr.append(td3);
                var td4 = $("<td class='price'>" + price + "￥</td>");
                tr.append(td4);
                var td5 = $("<td class='total'>" + (number * price) + "￥</td>");
                tr.append(td5);
                var td6 = $("<td class='remove'><div><img src='img/icon/remove.svg' width='40' class='removeimg' onclick='deleteA(this.parentNode.parentNode.parentNode.rowIndex)'></div></td>");
                tr.append(td6);
                $("#carttable").append(tr);
                cursor.continue();
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

//删除商品
function deleteA(index) {
    var tr = $("#carttable tr:eq(" + index + ")").children(".name").text();
    var tx = myDB.db.transaction('cart', 'readwrite');
    var objectStore = tx.objectStore('cart');
    objectStore.delete(tr);
    var table = document.getElementById("carttable");
    table.deleteRow(index);
};

//跳转结算页面
function checkout() {
    $("#checkoutbtn").click(function () {
            location.href = "checkout.html";
        }
    );
}

window.onload = function () {
    openDB(myDB.name, myDB.version);
};
$(function () {
        checkout();
    }
);