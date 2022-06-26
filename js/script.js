var xhr = new XMLHttpRequest();
var xhri = new XMLHttpRequest();
var index = document.getElementById('index');
var docs = document.getElementById('main');
var sura = 1;

xhri.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        var data = JSON.parse(this.responseText);
        var index_elem = '<h2>সূচিপত্র</h2><ol>';
        for (i in data) {
            index_elem += '<li class="a" onclick="loadSura(this)" id="' + data[i].id + '">' + data[i].bn + '</li>';
        }

        index_elem += '</ol>';
        index.innerHTML = index_elem;
        createDOM();
    }
};
xhri.open("GET", "json/sura_names.json", true);
xhri.send();

// Onclick function
function loadSura(ind) {
    stopAudio();
    sura = ind.id;
    createDOM();
}

function createDOM() {
    var text = '<div class="sura" id="' + sura + '"><div class="name"></div>';
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            if (sura != 1) {
                text += '<div class="ayat"><p class="ar">' + data[0].ar + '</p><p class="pr">' + data[0].pr + '</p><p class="bn">' + data[0].bn + '</p></div>';
            }

            for (i in data) {
                if (data[i].sura_id == sura) {
                    text += '<div class="ayat" id="a' + data[i].ayat_id + '"><h1 class="ayat_num">' + data[i].ayat_id + '</h1><p class="ar">' + data[i].ar + '</p><p class="pr">' + data[i].pr + '</p><p class="bn">' + data[i].bn + '</p></div>';
                    verses = data[i].ayat_id;
                }
            }
            text += '</div>';
            docs.innerHTML = text;

            //Adding Name
            xhri.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var data = JSON.parse(this.responseText);
                    document.getElementsByClassName('name')[0].innerHTML = '<h2>' + data[sura - 1].bn + ' (' + data[sura - 1].m_bn + ') - ' + data[sura - 1].ar + '</h2>';
                }
            };
            xhri.open("GET", "json/sura_names.json", true);
            xhri.send();

            docs.scrollTo(0, 0);
        }
    };
    xhr.open("GET", "json/quran.json", true);
    xhr.send();
}