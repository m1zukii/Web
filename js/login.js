//判断是否已经登录 和记住密码
function load() {
    var rmb = localStorage.getItem("rmb");
    if (rmb == "true") {
        $("#username").val(localStorage.getItem("username"));
        $("#password").val(localStorage.getItem("password"));
        document.getElementById("rmbPwd").checked = true;
    }
}

$(function () {
        load();
        //登录判断
        $("#loginbtn").click(function () {
                var username = $("#username").val();
                var password = $("#password").val();
                var a_username = localStorage.getItem("username");
                var a_password = localStorage.getItem("password");
                if ((username == a_username) && (password == a_password)) {
                    var x = window.screen.width / 2;
                    var y = window.screen.height / 2;
                    $("#hidelogindiv").text("登录成功").show().fadeOut(3000);
                    localStorage.setItem("login", "true");
                    var rmb = $("#rmbPwd").is(":checked");
                    if (rmb == true) {
                        localStorage.setItem("rmb", "true");
                    } else {
                        localStorage.setItem("rmb", "false");
                    }
                    $("#topbarlogin").text(username).attr("href", "#");
                } else {
                    var y = window.screen.height / 2;
                    $("#hidelogindiv").text("用户名或密码不正确，重新输入").show().fadeOut(3000);
                }
            }
        );
    }
);