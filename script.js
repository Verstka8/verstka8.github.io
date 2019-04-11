//############################################
// JQuery
//############################################
var $, Close_full_screen, Font_size, Full_screen, Lang_toggle, Language_active, Theme_dark, Theme_lite, allSlides, allSlidesLength, autoHover, back, clearIntervalMini, closeFullScreen, download_voice, fullScreen, full_screen, id, menu, menu_off, menu_toggle, next, numberNextSlide, options, parse_col, parse_row, parse_slide, pause, print, rewind, rewind_pause, rewind_play, run, run_language, setI, slider, time;

$ = function(selector) {
  return document.querySelectorAll(selector);
};

id = function(selector) {
  return document.getElementById(selector);
};

print = function(data) {
  return console.log(data);
};

//############################################
// SCRIPT
//############################################
menu = id('menu');

full_screen = id('full_screen');

options = id('options');

menu_toggle = function() {
  menu.classList.toggle('see');
};

menu_off = function() {
  return menu.classList.remove('see');
};

Theme_dark = function() {
  full_screen.classList.remove('Theme_lite');
  full_screen.classList.add('Theme_dark');
  id('Light').classList.remove('menu_item_active');
  return id('Dark').classList.add('menu_item_active');
};

Theme_lite = function() {
  full_screen.classList.remove('Theme_dark');
  full_screen.classList.add('Theme_lite');
  id('Dark').classList.remove('menu_item_active');
  return id('Light').classList.add('menu_item_active');
};

Theme_dark();

//############################################
// CORE
//############################################
slider = id('body');

numberNextSlide = -1;

rewind = id('rewind');

rewind_pause = id('rewind_pause');

rewind_play = id('rewind_play');

allSlides = 0;

allSlidesLength = 0;

time = 88;

setI = setInterval(function() {
  return next();
}, time);

clearIntervalMini = function() {
  clearInterval(setI);
  setI = setInterval(function() {
    return next();
  }, time);
  return console.log(time);
};

//#####################################
run_language = function(language) {
  var button_rewind, i_b_r, key, results, val;
  numberNextSlide = -1;
  allSlides = language;
  allSlidesLength = language.length;
  time = 88;
  id('rewind').innerHTML = '';
  clearIntervalMini();
  i_b_r = -1;
  results = [];
  for (key in allSlides) {
    val = allSlides[key];
    i_b_r++;
    button_rewind = document.createElement("div");
    button_rewind.classList.add("rewind_item");
    button_rewind.setAttribute("onclick", "run(" + i_b_r + ")");
    results.push(rewind.appendChild(button_rewind));
  }
  return results;
};

parse_slide = function(arr) {
  var DOM_slide, i, len, val;
  slider.innerHTML = '';
  for (i = 0, len = arr.length; i < len; i++) {
    val = arr[i];
    DOM_slide = document.createElement('div');
    DOM_slide.setAttribute('class', Object.keys(val)[0]);
    if (Object.keys(val)[0] === 'html') {
      DOM_slide.innerHTML = val.html;
      slider.appendChild(DOM_slide);
    }
    if (Object.keys(val)[0] === 'col') {
      slider.appendChild(parse_col(val, DOM_slide));
    }
    if (Object.keys(val)[0] === 'line') {
      slider.appendChild(parse_row(val, DOM_slide));
    }
  }
};

parse_col = function(obj, DOM_slide) {
  var DOM_col, i, key, len, val, val2;
  for (key in obj) {
    val = obj[key];
    for (i = 0, len = val.length; i < len; i++) {
      val2 = val[i];
      DOM_col = document.createElement('div');
      DOM_col.setAttribute('class', Object.keys(val2)[0]);
      DOM_slide.appendChild(parse_row(val2, DOM_col));
    }
  }
  // console.log DOM_slide
  return DOM_slide;
};

parse_row = function(arr_obj, DOM_col) {
  var div, i, key, key0, len, val, val2, val3;
  for (key0 in arr_obj) {
    val2 = arr_obj[key0];
    for (i = 0, len = val2.length; i < len; i++) {
      val3 = val2[i];
      for (key in val3) {
        val = val3[key];
        if (key.substring(0, 4) === 'html') {
          div = document.createElement('div');
          div.setAttribute('class', key);
          div.innerHTML = val;
          DOM_col.appendChild(div);
        } else {
          div = document.createElement('div');
          div.setAttribute('class', key);
          div.textContent = val;
          DOM_col.appendChild(div);
        }
      }
    }
  }
  return DOM_col;
};

//#####################################
next = function() {
  var allSlidesLength__;
  allSlidesLength__ = allSlidesLength;
  allSlidesLength__--;
  if (numberNextSlide < allSlidesLength__) {
    numberNextSlide++;
    return run();
  }
};

download_voice = function(numberSlideVoice) {
  var numberSlideVoiceNext;
  load_voice(allSlides[numberSlideVoice].slide.voice);
  numberSlideVoiceNext = numberSlideVoice;
  numberSlideVoiceNext++;
  if (numberSlideVoiceNext < allSlidesLength) {
    return load_voice(allSlides[numberSlideVoiceNext].slide.voice);
  }
};

run = function(number) {
  console.log(number);
  number++;
  if (number) {
    number--;
    numberNextSlide = number;
  }
  if (numberNextSlide < allSlidesLength) {
    if (numberNextSlide >= 0) {
      rewind_play.style.display = 'none';
      rewind_pause.style.display = 'block';
      time = allSlides[numberNextSlide].slide.time;
      clearIntervalMini();
      // console.log allSlides[numberNextSlide].slide.time
      parse_slide(allSlides[numberNextSlide].slide.see);
      autoHover(numberNextSlide);
      if (this_voice) {
        this_voice.stop();
      }
      gEval('this_voice = ' + allSlides[numberNextSlide].slide.voice);
      if (this_voice) {
        this_voice.play();
      }
      download_voice(numberNextSlide);
    }
  }
};

back = function() {
  if (numberNextSlide > 0) {
    numberNextSlide--;
    return run();
  }
};

pause = function() {
  clearInterval(setI);
  rewind_pause.style.display = 'none';
  rewind_play.style.display = 'block';
  if (this_voice) {
    return this_voice.stop();
  }
};

autoHover = function(number) {
  var i_rewind, val;
  i_rewind = 0;
  for (val in allSlides) {
    rewind.childNodes[i_rewind].classList.remove("rewind_active");
    i_rewind++;
  }
  return rewind.childNodes[number].classList.add("rewind_active");
};

fullScreen = id('fullScreen');

closeFullScreen = id('closeFullScreen');

Language_active = function(lang) {
  $('.Language_item')[0].classList.remove('menu_item_active');
  $('.Language_item')[1].classList.remove('menu_item_active');
  $('.Language_item')[2].classList.remove('menu_item_active');
  $('.Language_item')[3].classList.remove('menu_item_active');
  $('.Language_item')[4].classList.remove('menu_item_active');
  $('.Language_item')[5].classList.remove('menu_item_active');
  return id(lang).classList.add('menu_item_active');
};

Full_screen = function() {
  fullScreen.style.display = 'none';
  closeFullScreen.style.display = 'block';
  if (document.documentElement.requestFullscreen) {
    return document.documentElement.requestFullscreen();
  } else {
    if (document.documentElement.mozRequestFullScreen) {
      return document.documentElement.mozRequestFullScreen();
    } else {
      if (document.documentElement.webkitRequestFullscreen) {
        return document.documentElement.webkitRequestFullscreen();
      } else {
        if (document.documentElement.msRequestFullscreen) {
          return document.documentElement.msRequestFullscreen();
        }
      }
    }
  }
};

Close_full_screen = function() {
  closeFullScreen.style.display = 'none';
  fullScreen.style.display = 'block';
  if (document.exitFullscreen) {
    return document.exitFullscreen();
  } else {
    if (document.mozCancelFullScreen) {
      return document.mozCancelFullScreen();
    } else {
      if (document.webkitExitFullscreen) {
        return document.webkitExitFullscreen();
      } else {
        if (document.msExitFullscreen) {
          return document.msExitFullscreen();
        }
      }
    }
  }
};

Lang_toggle = function(Lang) {
  var EN, Lang_apply, Lang_interface_active, RU, SPA, ZHO;
  EN = {
    Language: 'Language',
    Theme: 'Theme',
    Font_size: 'Font size',
    Support: 'Support',
    Author: 'Author',
    Light: 'Light',
    Dark: 'Dark'
  };
  RU = {
    Language: 'Язык',
    Theme: 'Тема',
    Font_size: 'Размер шрифта',
    Support: 'Поддержка',
    Author: 'Автор',
    Light: 'Светлая',
    Dark: 'Темная'
  };
  SPA = {
    Language: 'Idioma',
    Theme: 'Tema',
    Font_size: 'Tamaño de fuente',
    Support: 'Apoyo',
    Author: 'Autor',
    Light: 'Ligero',
    Dark: 'Oscuro'
  };
  ZHO = {
    Language: '语言',
    Theme: '主题',
    Font_size: '字体大小',
    Support: '支持',
    Author: '作者',
    Light: '光',
    Dark: '黑'
  };
  Lang_apply = function(obj) {
    var key, results, val;
    results = [];
    for (key in obj) {
      val = obj[key];
      results.push(id(key).innerHTML = val);
    }
    return results;
  };
  Lang_interface_active = function(lang) {
    // Lang_items = $ '.Lang_item'
    $('.Lang_item')[0].classList.remove('menu_item_active');
    $('.Lang_item')[1].classList.remove('menu_item_active');
    $('.Lang_item')[2].classList.remove('menu_item_active');
    $('.Lang_item')[3].classList.remove('menu_item_active');
    return id(lang).classList.add('menu_item_active');
  };
  if (Lang === 'RU') {
    Lang_apply(RU);
    Lang_interface_active('RU');
  }
  if (Lang === 'EN') {
    Lang_apply(EN);
    Lang_interface_active('EN');
  }
  if (Lang === 'SPA') {
    Lang_apply(SPA);
    Lang_interface_active('SPA');
  }
  if (Lang === 'ZHO') {
    Lang_apply(ZHO);
    return Lang_interface_active('ZHO');
  }
};

if (navigator.language === 'ru-RU') {
  //  || 'ua-UA' || 'ru-UA' || 'ru' || 'ua' || 'uk'
  Lang_toggle("RU");
}

if (navigator.language === 'en-EN') {
  //  || 'EN' || "en" || "en-US" || "en-EG" || "en-AU" || "en-GB" || "en-CA" || "en-NZ" || "en-IE" || "en-ZA" || "en-JM" || "en-BZ" || "en-TT"
  Lang_toggle("EN");
}

if (navigator.language === 'zh-CN') {
  //  || 'zh' || "zh-TW" || "zh-HK" || "zh-SG" || 'zh-ZH'
  Lang_toggle("ZHO");
}

if (navigator.language === 'es-ES') {
  //  || 'es' || "es-AR" || "es-GT" || "es-CR" || "es-PA" || "es-DO" || "es-MX" || "es-VE" || "es-CO" || "es-PE" || "es-EC" || "es-CL" || "es-UY" || "es-PY" || "es-BO" || "es-SV" || "es-HN" || "es-NI" || "es-PR"
  Lang_toggle("SPA");
}

Font_size = function(size) {
  var f_size, font_size;
  f_size = id('html').style.fontSize;
  f_size = f_size.substring(0, 2);
  font_size = +f_size + size;
  id('html').style.fontSize = font_size + 'px';
  return id('Font_size_data').innerHTML = id('html').style.fontSize;
};

Font_size();
