document.addEventListener('DOMContentLoaded', function () {

    window.addEventListener("keydown", function (e) {
        if (e.ctrlKey && [65, 66, 67, 70, 73, 80, 83, 85, 86].includes(e.which)) {
            e.preventDefault();
        }
    });

    document.addEventListener("keypress", function (e) {
        if (e.ctrlKey && [65, 66, 67, 70, 73, 80, 83, 85, 86].includes(e.which)) {
            e.preventDefault();
        }
    });

    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.keyCode == 123 || e.keyCode == 18) return false;
    };

    document.oncontextmenu = function (e) {
        var n = e.target || e.srcElement;
        if (n.nodeName != "A") return false;
    };

    document.ondragstart = function () {
        return false;
    };
});
