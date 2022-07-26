var xhr = new XMLHttpRequest();
var xhri = new XMLHttpRequest();
var index = document.getElementById('index');
var docs = document.getElementById('main');
var settings = document.getElementById('settings');

var sura = 1;

xhri.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        var data = JSON.parse(this.responseText);
        var index_elem = '<h2>সূচিপত্র</h2><button onclick="indexToggle()"><i class="fas fa-x"></i></button><ol>';
        for (i in data) {
            index_elem += '<li onclick="loadSura(this)" id="' + data[i].id + '"><p>' + (i - 1 + 2) + '.</p>' + data[i].bn + '</li>';
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
    if (window.innerWidth < 769) {
        toggle();
    }
}

function createDOM() {
    var sura_link = 'json/sura_' + sura + '.json';
    var text = '<div class="sura" id="' + sura + '"><div class="name"></div>';
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            if (sura != 1) {
                text += '<div class="ayat"><p class="ar">بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ</p><p class="pr">বিছমিল্লাহির রাহমানির রাহিম।</p><p class="bn">শুরু করছি আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু।</p></div>';
            }

            for (i in data) {
                if (data[i].sura_id == sura) {
                    text += '<div class="ayat" id="a' + data[i].ayat_id + '"><h1 class="ayat_num">' + data[i].ayat_id + '</h1><button id="b' + data[i].ayat_id + '" onclick="playCurrent(this)"><i class="fas fa-circle-play"></i></button><p class="ar">' + data[i].ar + '</p><p class="pr">' + data[i].pr + '</p><p class="bn">' + data[i].bn + '</p></div>';
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

            docs.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };
    xhr.open("GET", sura_link, true);
    xhr.send();
}

// Show - Hide index
var index_hidden = true;
var settings_hidden = true;
if (window.innerWidth > 768) {
    index_hidden = false;
    settings_hidden = true;
}

function indexToggle() {
    if (window.innerWidth < 769) {
        if (index_hidden) {
            index.style.display = 'block';
            docs.style.display = 'none';
            settings.style.display = 'none';
            index_hidden = false;
            settings_hidden = true;
        } else {
            index.style.display = 'none';
            settings.style.display = 'none';
            docs.style.display = 'block';
            docs.style.width = '100%';
            index_hidden = true;
        }
    } else {
        if (index_hidden) {
            index.style.display = 'block';
            settings.style.display = 'none';
            docs.style.width = '75%';
            index_hidden = false;
            settings_hidden = true;
        } else {
            index.style.display = 'none';
            settings.style.display = 'none';
            docs.style.width = '100%';
            index_hidden = true;
        }

    }

}

function settingsToggle() {
    if (window.innerWidth < 769) {
        if (settings_hidden) {
            settings.style.display = 'block';
            docs.style.display = 'none';
            index.style.display = 'none';
            settings_hidden = false;
            index_hidden = true;
        } else {
            index.style.display = 'none';
            settings.style.display = 'none';
            docs.style.display = 'block';
            docs.style.width = '100%';
            settings_hidden = true;
        }
    } else {
        if (settings_hidden) {
            settings.style.display = 'block';
            index.style.display = 'none';
            docs.style.width = '75%';
            settings_hidden = false;
            index_hidden = true;
        } else {
            index.style.display = 'none';
            settings.style.display = 'none';
            docs.style.width = '100%';
            settings_hidden = true;
        }

    }
}