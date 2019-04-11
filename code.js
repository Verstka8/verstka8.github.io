const code1 = `<!-- comment -->
<div class= "className" > tag content </div>
Where
<div></div> - tag
class="className" - attribute
tag content - content
<!-- --> - comment(invisible on the web site)`

const code2 = `<div onclick="run(1)" class="text a">Basics</div>
<div onclick = "run(2)" class="text a" >Practice</div>
<div onclick="run(2)" class="text a">Test</div>
<style></style>`

var gEval = eval;
// var EN_HTML = new Pizzicato.Sound('./audio/EN_HTML.wav', function () {
// 	console.log('OK')
// 	// ukradu.play();
// });
// var EN_HTML = false
// var EN_HTML2 = false
// var EN_HTML3 = false


// let all_voice_test = [`EN_HTML`, `EN_HTML2`]
// all_voice_test.forEach(el => load_voice(el))
// var if_loaded_voice = false
// function load_voice(name_voice) {
// 	print(`222222222222222 ${name_voice}`)
// 	test1(name_voice)
// }
// function test1(name_voice) {
// 	gEval(`if (!${name_voice}) {loaded_voice(${name_voice})}`)
// }
function test2(name_voice) {
	gEval(`var ${name_voice} = new Pizzicato.Sound('./audio/${name_voice}.mp3')`)
}
function load_voice(name_voice) {
	print(`3333333333333333 ${name_voice}`)
	test2(name_voice)
}
// function voice_download(numberSlideVoice) {
// 	allSlides[numberNextSlide].slide.voice
// }
function play_voice(name_voice) {
	gEval(`${name_voice}.play()`)
}
var this_voice = false
// gEval(`this_voice = ${EN_HTML}`)

// var EN_HTML = new Pizzicato.Sound('./audio/EN_HTML.wav', function () {
// 	console.log('OK')
// 	EN_HTML.play();
// });







































