// Audio player
var audio = new Audio();
var bismillah = new Audio();
var ayat = 1;
var verses = 0;
var link = '';
var playing = false;
var ini = true;
var base_link = 'https://download.quranicaudio.com/verses/Alafasy/ogg/';
var file_name = '';

// Auto next on finish
audio.addEventListener('ended', function() {
    finished();
    if (ayat < verses) {
        playNext();
    } else if (ayat == verses) {
        // if (sura < 114) {
        //     stopAudio();
        //     sura += 1;
        //     createDOM();
        //     playAudio();
        // }
    }
});

// Load audio with link
function loadAudio() {
    // link = '../audio/' + sura + '/' + ayat + '.mp3';
    // Online link
    getFileName(sura, ayat);
    link = base_link + file_name;
    audio.src = link;
    audio.load();
}

// Onclick function Play/Pause
function playPause() {
    if (playing) {
        audio.pause();
        playing = false;
    } else {
        if (ini && sura > 1) {
            ini = false;
            // bismillah.src = '../audio/1/1.mp3';
            bismillah.src = base_link + '001001.ogg';
            bismillah.load();
            bismillah.play();
            bismillah.addEventListener('ended', function() {
                playAudio();
            });
        } else {
            playAudio();
        }
        playing = true;
    }
}

function playAudio() {
    loadAudio();
    highLight();
    playing = true;
    audio.play();
}

// Stop audio & reset
function stopAudio() {
    finished();
    audio.pause();
    playing = false;
    ini = true;
    ayat = 1;
    link = '';
}

function playNext() {
    if (ayat < verses && playing) {
        finished();
        audio.pause();
        ayat += 1;
        playAudio();
    }
}

function playPrev() {
    if (ayat > 1 && playing) {
        finished();
        audio.pause();
        ayat -= 1;
        playAudio();
    }
}

// Highlight current ayat
function highLight() {
    var id = 'a' + ayat;
    var a_ayat = document.getElementById(id);
    a_ayat.className = 'a_ayat';
    a_ayat.scrollIntoView();
    document.getElementById('loader').style.width = (ayat / verses) * 100 + '%';
}

function finished() {
    var id = 'a' + ayat;
    document.getElementById(id).className = 'ayat';
    document.getElementById('loader').style.width = 0 + '%';
}


// Make file name with sura & ayat number
function getFileName(sura, ayat) {
    var sl = '';
    var al = '';
    if (sura < 10) {
        sl = '00' + sura;
    } else if (sura < 100 && sura > 9) {
        sl = '0' + sura;
    } else {
        sl = sura;
    }
    if (ayat < 10) {
        al = '00' + ayat;
    } else if (ayat < 100 && ayat > 9) {
        al = '0' + ayat;
    } else {
        al = ayat;
    }
    file_name = sl + al + '.ogg'
}