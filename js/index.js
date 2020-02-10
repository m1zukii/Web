var id;
var current = 1;

function find(str) {
    return document.getElementById(str);
}

//点击绑定
function loadClick() {
    $("#nextArrow").click(function () {
            nextHandler();
        }
    );
    $("#prevArrow").click(function () {
            prevHandler();
        }
    );
}

//上一张照片
function prevPic() {
    var bg = find("bg");
    current--;
    if (current == 0) {
        current = 7;
    }
    var src1 = "img/bg_" + current + ".jpg";
    bg.src = src1;
}

function prevHandler() {
    clearTimeout(id);
    id = setTimeout(autoPlay, 3000);
    prevPic();
}

//下一张照片
function nextPic() {
    var bg = find("bg");
    current++;
    if (current == 8) {
        current = 1;
    }
    var src1 = "img/bg_" + current + ".jpg";
    bg.src = src1;
}

function nextHandler() {
    clearTimeout(id);
    id = setTimeout(autoPlay, 3000);
    nextPic();
}

//自动播放
function autoPlay() {
    id = setTimeout(autoPlay, 3000);
    nextPic();
}

$(function () {
        loadClick();
        autoPlay();
    }
);