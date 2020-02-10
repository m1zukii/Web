function find(str) {
    return document.getElementById(str);
}
//注册
function loadSubmit() {
    $("#submit").click(function () {
            //判断表单是否填写完整
            var p1 = find("password").value;
            var p2 = find("passwordR").value;
            var p3 = find("firstname").value;
            var p4 = find("lastname").value;
            var p5 = find("phonenumber").value;
            var p6 = find("username").value;
            var p7 = find("password").value;
            var p8 = find("email").value;
            var p9 = find("postid").value;
            var p10 = find("address").value;
            var obj = document.getElementById("country"); //定位id
            var index = obj.selectedIndex; // 选中索引
            var text1 = obj.options[index].text; // 选中文本
            if (text1 == "请选择你的国家") {
                alert("表单填写不完整，请仔细检查");
                return;
            }
            var obj = document.getElementById("job"); //定位id
            var index = obj.selectedIndex; // 选中索引
            var text2 = obj.options[index].text; // 选中文本
            if (text2 == "请选择你的职业") {
                alert("表单填写不完整，请仔细检查");
                return;
            }
            if (p1.length == 0 || p2.length == 0 || p3.length == 0 || p4.length == 0
                || p5.length == 0 || p6.length == 0 || p7.length == 0 || p8.length == 0
                || p9.length == 0 || p10.length == 0) {
                alert("表单填写不完整，请仔细检查");
                return;
            }
            //判断密码填写相同
            if (p1 != p2) {
                alert("两次输入的密码不同，重新输入");
                return;
            }
            localStorage.setItem("firstname", p3);
            localStorage.setItem("lastname", p4);
            var sex;
            if (find("sexMan").checeked) {
                sex = "man";
            } else {
                sex = "woman";
            }
            localStorage.setItem("sex", sex);
            localStorage.setItem("phonenumber", p5);
            localStorage.setItem("username", p6);
            localStorage.setItem("password", p7);
            localStorage.setItem("email", p8);
            localStorage.setItem("postid", p9);
            localStorage.setItem("country", text1);
            localStorage.setItem("job", text2);
            localStorage.setItem("address", p10);
            alert("注册成功");
        }
    );
}
$(function () {
        loadSubmit();
    }
);