
const HTML_EN_code1 = `<div onclick="run(1)" class="text a pointer">Basics</div>
<div onclick = "run(2)" class="text a pointer" >Practice</div>
<div onclick="run(2)" class="text a pointer">Test</div>
<style></style>`
var language = false
var gEval = eval;

function load_voice(name_voice) {
	gEval(`if(typeof ${name_voice} == "undefined") {var ${name_voice} = new Pizzicato.Sound('./audio/${name_voice}.mp3')}`)
}

function play_voice(name_voice) {
	gEval(`${name_voice}.play()`)
}
var this_voice = false







































