//悬浮变色
function loadHover() {
    $(".hover").hover(function () {
            $(this).addClass("HoverFont");
        }, function () {
            $(this).removeClass("HoverFont");
        }
    );
    $(".header .nav ul li a").hover(function () {
            $(this).addClass("HoverNav");
        }, function () {
            $(this).removeClass("HoverNav");
        }
    );
}

//语言弹出菜单
function loadPopUpLanguage() {
    $(".language").click(function () {
            $(".PopUpLanguage").toggle();
        }
    );
}

//检查是否登录
function checkLogin() {
    var login = localStorage.getItem("login");
    if (login == "true") {
        var username = localStorage.getItem("username");
        $("#topbarlogin").text(username).attr("href", "#");
    }
};

//点击绑定
function bind() {
    //登出
    $("#popupLogin").click(function () {
        localStorage.setItem("login", "false");
        $("#topbarlogin").text("登录").attr("href", "index.html");
        $(this).toggle();
    });
    //登录
    $("#topbarlogin").click(function () {
            // $("#popupLogin").toggle();
            var text = $(this).text();
            if (text == "登录") {
            } else {
                $("#popupLogin").show();
            }
        }
    );
}

$(function () {
        loadHover();
        bind();
        loadPopUpLanguage();
        checkLogin();
    }
);