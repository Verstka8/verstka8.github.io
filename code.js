
const HTML_EN_code1 = `<div onclick="run(1)" class="text a pointer">Basics</div>
<div onclick = "run(2)" class="text a pointer" >Practice</div>
<div onclick="run(2)" class="text a pointer">Test</div>
<style></style>`
var language = false
var lang_name = false
var gEval = eval;

function load_voice(name_voice) {
	gEval(`if(typeof ${name_voice} == "undefined") {var ${name_voice} = new Pizzicato.Sound('./audio/${name_voice}.mp3')}`)
}

function play_voice (name_voice) {
	gEval(`${name_voice}.play()`)
}
var this_voice = false

function load_lang(lang_name_noMod) {
    lang_name = `${lang_name_noMod}_${lang_name_mod_var}`
    print('lang_name')
    print(lang_name)
    gEval(`if (typeof ${lang_name} == "undefined") {load_lang2 ("${lang_name}")}`)
}

function load_lang2 (lang_name) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            gEval(`var ${lang_name} = ${xhttp.responseText}`)
            gEval(`run_language (${lang_name})`)
            print ` ${lang_name}`
        }
    };
    xhttp.open("GET", `${lang_name}.js`, true);
    xhttp.send();
}







































