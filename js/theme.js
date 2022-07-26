var darkLightBtn = document.getElementById('darkLight');
var mood = 'light';
var theme = document.getElementById('theme');
var star_color = document.getElementById('star_color');

function darkLight(data) {
    if (mood == 'dark') {
        darkLightBtn.classList.add('fa-sun');
        darkLightBtn.classList.remove('fa-moon');
        mood = 'light';
        theme.href = './css/style_2.css';
    } else {
        darkLightBtn.classList.add('fa-moon');
        darkLightBtn.classList.remove('fa-sun');
        mood = 'dark';
        theme.href = './css/style_1.css';
    }
}


// Background
var body = document.getElementById('body');
var bg_img = document.getElementById('bg_img');
var bg = 2;

function toggleBg() {
    var bg_url = 'url(./img/bg_' + bg + '.jpg)';
    body.style.backgroundImage = bg_url;
    bg_img.src = './img/bg_' + bg + '.jpg';
    bg++;
    if (bg > 6) {
        bg = 1;
    }
}

function randomStar() {
    var color = 'rgb(' + getColorCode() + ', ' + getColorCode() + ', ' + getColorCode() + ')';
    star_color.innerHTML = ':root {--sc: ' + color + ';}';
}

function getColorCode() {
    var code = Math.random() * 255;
    code = Math.round(code);
    return code;
}

function changeFont(data) {
    if (data.id == 'ar') {
        var elm = '@font-face {font-family: Arabic Font; src: url(../fonts/' + data.value + '.ttf);}';
    } else if (data.id == 'bn') {
        var elm = '@font-face {font-family: Bangla Font; src: url(../fonts/' + data.value + '.ttf);}';
    }
    var ID = data.id + '_font';
    document.getElementById(ID).innerHTML = elm;
    hideOptions(data.id);
}

function showOptions(data) {
    var ID = data.id + '_options';
    document.getElementById(ID).style.display = 'block';
}

function hideOptions(data) {
    var ID = data + '_options';
    document.getElementById(ID).style.display = 'none';
}

function changeFontSize(data) {
    var ar_size_style = document.getElementById("ar_size_style");
    var bn_size_style = document.getElementById("bn_size_style");
    var ar_size = document.getElementById("ar_size");
    var bn_size = document.getElementById("bn_size");
    var arFontSize = ar_size.innerText;
    var bnFontSize = bn_size.innerText;

    switch (data.id) {
        case 'ar-':
            arFontSize--;
            ar_size_style.innerHTML = '.ar{font-size: ' + arFontSize + 'px;}';
            ar_size.innerText = arFontSize;
            break;
        case 'ar+':
            arFontSize++;
            ar_size_style.innerHTML = '.ar{font-size: ' + arFontSize + 'px;}';
            ar_size.innerText = arFontSize;
            break;
        case 'bn-':
            bnFontSize--;
            bn_size_style.innerHTML = '.bn,.pr {font-size: ' + bnFontSize + 'px;}';
            bn_size.innerText = bnFontSize;
            break;
        case 'bn+':
            bnFontSize++;
            bn_size_style.innerHTML = '.bn,.pr {font-size: ' + bnFontSize + 'px;}';
            bn_size.innerText = bnFontSize;
            break;
    }
}