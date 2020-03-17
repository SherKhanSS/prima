jQuery("document").ready(function($){

var navMain = $('.main-nav');
var pageHeaderLink = $('.page-header__link');
var pageHeaderWrapper = $('.page-header__wrapper');
var siteList = $('.site-list');

const listItems = document.querySelectorAll('.site-list__sub-menu');
const testLists = document.querySelectorAll('.sub-menu');
const testSvg = document.querySelectorAll('.site-list__img');

const clearOpenSubMenu = function () {
  for (let i = 0; i < listItems.length; i++) {
    // let item = listItems[i];
    let list = testLists[i];
    let svg = testSvg[i];
    list.classList.remove('sub-menu--activ');
    svg.classList.remove('site-list__img--activ');
  }
}

navMain.removeClass("main-nav--nojs");

$(document).ready(function(){
$('.main-nav__toggle').click(function () {
  if(navMain.hasClass('main-nav--closed')) {
    navMain.removeClass('main-nav--closed');
    navMain.addClass('main-nav--opened');
    clearOpenSubMenu();
  } else {
    navMain.addClass('main-nav--closed');
    navMain.removeClass('main-nav--opened');
  }
  });
});

$(document).ready(function(){
$('.page-main').click(function () {
  if(navMain.hasClass('main-nav--opened')) {
    navMain.removeClass('main-nav--opened');
    navMain.addClass('main-nav--closed');
    pageHeaderLink.removeClass('page-header__link--close');
    pageHeaderWrapper.removeClass('nav--open');
    clearOpenSubMenu();
  }
  });
});

// $(document).ready(function(){
// $('.site-list').click(function () {
//   if(navMain.hasClass('main-nav--opened')) {
//     navMain.removeClass('main-nav--opened');
//     navMain.addClass('main-nav--closed');
//     pageHeaderLink.removeClass('page-header__link--close');
//     pageHeaderWrapper.removeClass('nav--open');
//   }
//   });
// });

$(window).scroll(function () {
	if ($(this).scrollTop() > 100) {
		pageHeaderWrapper.addClass("page-header--scroll");
	} else {
		pageHeaderWrapper.removeClass("page-header--scroll");
	}
});



$(document).ready(function(){
 $('.main-nav__toggle').click(function () {
 	$('.page-header__link').toggleClass('page-header__link--close');
  $('.page-header__wrapper').toggleClass('nav--open');
 	});
 });



const addListMouseoverListener = function (item, list, svg) {
  item.addEventListener('mouseover', function () {
      list.classList.add('sub-menu--activ');
      svg.classList.add('site-list__img--activ');
    });
};

const addListMouseoutListener = function (item, list, svg) {
  item.addEventListener('mouseout', function () {
      list.classList.remove('sub-menu--activ');
      svg.classList.remove('site-list__img--activ');
    });
};

const addListClickListener = function (svg, list) {
  svg.addEventListener('click', function () {
      list.classList.toggle('sub-menu--activ');
      svg.classList.toggle('site-list__img--activ');
    });
};

for (let i = 0; i < listItems.length; i++) {
  let item = listItems[i];
  let list = testLists[i];
  let svg = testSvg[i];
  addListMouseoverListener(item, list, svg);
  addListMouseoutListener(item, list, svg);
  addListClickListener(svg, list);
}

});

// печать на странице

var CharTimeout = 100; // скорость печатания
	var StoryTimeout = 2500; // время ожидания перед переключением

	var Summaries = new Array();
	var SiteLinks = new Array();

		Summaries[0] = 'Диагностика бесплодия';
		SiteLinks[0] = 'https://www.centereko.ru/';
		Summaries[1] = 'Программы ЭКО';
		SiteLinks[1] = 'https://www.centereko.ru/';
		Summaries[2] = 'Суррогатное материнство';
		SiteLinks[2] = 'https://www.centereko.ru/';
		Summaries[3] = 'ЭКО по ОМС';
		SiteLinks[3] = 'https://www.centereko.ru/';

	function startTicker(){
		massiveItemCount =  Number(Summaries.length); //количество элементов массива

		CurrentStory     = -1;
		CurrentLength    = 0;

		AnchorObject     = document.getElementById("Ticker");
		runTheTicker();
	}

	function runTheTicker(){
		var myTimeout;

		if(CurrentLength == 0){
			CurrentStory++;
			CurrentStory      = CurrentStory % massiveItemCount;
			StorySummary      = Summaries[CurrentStory].replace(/"/g,'-');
			AnchorObject.href = SiteLinks[CurrentStory];
		}

		AnchorObject.innerHTML = StorySummary.substring(0,CurrentLength) + znak();

		if(CurrentLength != StorySummary.length){
			CurrentLength++;
			myTimeout = CharTimeout;
		} else {
			CurrentLength = 0;
			myTimeout = StoryTimeout;
		}

		setTimeout("runTheTicker()", myTimeout);
	}

	function znak(){
		if(CurrentLength == StorySummary.length) return "";
		else return "|";
	}

  startTicker();

  // счетчик на главной

  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
      var t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }
// сюда писать дату
  let deadline = new Date("2020-04-16");
  initializeClock('countdown', deadline);

// стилизация видоса из ютюб

$(document).on('click','.js-videoPoster',function(e) {
  //отменяем стандартное действие button
  e.preventDefault();
  var poster = $(this);
  // ищем родителя ближайшего по классу
  var wrapper = poster.closest('.js-videoWrapper');
  videoPlay(wrapper);
});

//вопроизводим видео, при этом скрывая постер
function videoPlay(wrapper) {
  var iframe = wrapper.find('.js-videoIframe');
  // Берем ссылку видео из data
  var src = iframe.data('src');
  // скрываем постер
  wrapper.addClass('videoWrapperActive');
  // подставляем в src параметр из data
  iframe.attr('src',src);
}

// слайдер
(function ($) {
var hwSlideSpeed = 700;
var hwTimeOut = 3000;
var hwNeedLinks = true;
var slilinkss = true;
$(document).ready(function(e) {
	$('.slide').css(
		{"position" : "absolute",
		 "top":'0', "left": '0'}).hide().eq(0).show();
	var slideNum = 0;
	var slideTime;
	slideCount = $("#slider .slide").size();
	var animSlide = function(arrow){
		clearTimeout(slideTime);
		$('.slide').eq(slideNum).fadeOut(hwSlideSpeed);
		if(arrow == "next"){
			if(slideNum == (slideCount-1)){slideNum=0;}
			else{slideNum++}
			}
		else if(arrow == "prew")
		{
			if(slideNum == 0){slideNum=slideCount-1;}
			else{slideNum-=1}
		}
		else{
			slideNum = arrow;
			}
		$('.slide').eq(slideNum).fadeIn(hwSlideSpeed, rotator);
		$(".control-slide.active").removeClass("active");
		$('.control-slide').eq(slideNum).addClass('active');
		}
if(hwNeedLinks){
var $linkArrow = $('<a id="prewbutton" href="#">&lt;</a><a id="nextbutton" href="#">&gt;</a>')
	.prependTo('#slider');
	$('#nextbutton').click(function(){
		animSlide("next");
		return false;
		})
	$('#prewbutton').click(function(){
		animSlide("prew");
		return false;
		})
}
	var $adderSpan = '';
	$('.slide').each(function(index) {
			$adderSpan += '<span class = "control-slide">' + index + '</span>';
		});
	$('<div class ="sli-links">' + $adderSpan +'</div>').appendTo('#slider-wrap');
	$(".control-slide:first").addClass("active");
	$('.control-slide').click(function(){
	var goToNum = parseFloat($(this).text());
	animSlide(goToNum);
	});
	var pause = false;
	var rotator = function(){
			if(!pause){slideTime = setTimeout(function(){animSlide('next')}, hwTimeOut);}
			}
	$('#slider-wrap').hover(
		function(){clearTimeout(slideTime); pause = true;},
		function(){pause = false; rotator();
		});
	rotator();
if (!slilinkss)  $('.sli-links').css({"display" : "none"});
});
})(jQuery);

// $(".site-list__item").click(function() {
//   var index = $(this).parent().children().index(this);
//   $('.site-list__item').removeClass('site-list__item--active');
//   $('.site-list__item:nth-child(' + (index + 1) + ')').addClass('site-list__item--active');
// });
