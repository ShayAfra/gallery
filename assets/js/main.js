/*
	Multiverse by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Hack: Enable IE workarounds.
		if (browser.name == 'ie')
			$body.addClass('ie');

	// Touch?
		if (browser.mobile)
			$body.addClass('touch');

	// Transitions supported?
		if (browser.canUse('transition')) {

			// Play initial animations on page load.
				$window.on('load', function() {
					window.setTimeout(function() {
						$body.removeClass('is-preload');
					}, 100);
				});

			// Prevent transitions/animations on resize.
				var resizeTimeout;

				$window.on('resize', function() {

					window.clearTimeout(resizeTimeout);

					$body.addClass('is-resizing');

					resizeTimeout = window.setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

				});

		}

	// Scroll back to top.
		$window.scrollTop(0);

	// Panels.
		var $panels = $('.panel');

		$panels.each(function() {

			var $this = $(this),
				$toggles = $('[href="#' + $this.attr('id') + '"]'),
				$closer = $('<div class="closer" />').appendTo($this);

			// Closer.
				$closer
					.on('click', function(event) {
						$this.trigger('---hide');
					});

			// Events.
				$this
					.on('click', function(event) {
						event.stopPropagation();
					})
					.on('---toggle', function() {

						if ($this.hasClass('active'))
							$this.triggerHandler('---hide');
						else
							$this.triggerHandler('---show');

					})
					.on('---show', function() {

						// Hide other content.
							if ($body.hasClass('content-active'))
								$panels.trigger('---hide');

						// Activate content, toggles.
							$this.addClass('active');
							$toggles.addClass('active');

						// Activate body.
							$body.addClass('content-active');

					})
					.on('---hide', function() {

						// Deactivate content, toggles.
							$this.removeClass('active');
							$toggles.removeClass('active');

						// Deactivate body.
							$body.removeClass('content-active');

					});

			// Toggles.
				$toggles
					.removeAttr('href')
					.css('cursor', 'pointer')
					.on('click', function(event) {

						event.preventDefault();
						event.stopPropagation();

						$this.trigger('---toggle');

					});

		});

		// Global events.
			$body
				.on('click', function(event) {

					if ($body.hasClass('content-active')) {

						event.preventDefault();
						event.stopPropagation();

						$panels.trigger('---hide');

					}

				});

			$window
				.on('keyup', function(event) {

					if (event.keyCode == 27
					&&	$body.hasClass('content-active')) {

						event.preventDefault();
						event.stopPropagation();

						$panels.trigger('---hide');

					}

				});

	// Header.
		var $header = $('#header');

		// Links.
			$header.find('a').each(function() {

				var $this = $(this),
					href = $this.attr('href');

				// Internal link? Skip.
					if (!href
					||	href.charAt(0) == '#')
						return;

				// Redirect on click.
					$this
						.removeAttr('href')
						.css('cursor', 'pointer')
						.on('click', function(event) {

							event.preventDefault();
							event.stopPropagation();

							window.location.href = href;

						});

			});

	// Footer.
		var $footer = $('#footer');

		// Copyright.
		// This basically just moves the copyright line to the end of the *last* sibling of its current parent
		// when the "medium" breakpoint activates, and moves it back when it deactivates.
			$footer.find('.copyright').each(function() {

				var $this = $(this),
					$parent = $this.parent(),
					$lastParent = $parent.parent().children().last();

				breakpoints.on('<=medium', function() {
					$this.appendTo($lastParent);
				});

				breakpoints.on('>medium', function() {
					$this.appendTo($parent);
				});

			});

	// Main.
		var $main = $('#main');

		// Thumbs.
			$main.children('.thumb').each(function() {

				var	$this = $(this),
					$image = $this.find('.image'), $image_img = $image.children('img'),
					x;

				// No image? Bail.
					if ($image.length == 0)
						return;

				// Image.
				// This sets the background of the "image" <span> to the image pointed to by its child
				// <img> (which is then hidden). Gives us way more flexibility.

					// Set background.
						$image.css('background-image', 'url(' + $image_img.attr('src') + ')');

					// Set background position.
						if (x = $image_img.data('position'))
							$image.css('background-position', x);

					// Hide original img.
						$image_img.hide();

			});

		// Poptrox.
			$main.poptrox({
				baseZIndex: 20000,
				caption: function($a) {

					var s = '';

					$a.nextAll().each(function() {
						s += this.outerHTML;
					});

					return s;

				},
				fadeSpeed: 300,
				onPopupClose: function() { $body.removeClass('modal-active'); },
				onPopupOpen: function() { $body.addClass('modal-active'); },
				overlayOpacity: 0,
				popupCloserText: '',
				popupHeight: 150,
				popupLoaderText: '',
				popupSpeed: 300,
				popupWidth: 150,
				selector: '.thumb > a.image',
				usePopupCaption: true,
				usePopupCloser: true,
				usePopupDefaultStyling: false,
				usePopupForceClose: true,
				usePopupLoader: true,
				usePopupNav: true,
				windowMargin: 50
			});

			// Hack: Set margins to 0 when 'xsmall' activates.
				breakpoints.on('<=xsmall', function() {
					$main[0]._poptrox.windowMargin = 0;
				});

				breakpoints.on('>xsmall', function() {
					$main[0]._poptrox.windowMargin = 50;
				});

})(jQuery);









// let fileNames = []
// let artUsed = []

// for(let i = 1; i <= 331; i++){
// 	fileNames[i-1]= `${i}.jpeg`
// }


// function getRandomPhotoNumber() {
// 	let randNum = Math.round(Math.random() * (331 - 13) + 13)
// 	if(!artUsed.includes(randNum)){
// 		artUsed.push(randNum)
// 		console.log(randNum)
// 		return randNum
// 	}else{
// 		getRandomPhotoNumber()
// 	}
//   }


//   document.querySelector('#moreArt').addEventListener('click', changeArt)
//   function changeArt(){
// 	let newArtOne = getRandomPhotoNumber()
// 	let thumbArtOne = `images/thumbs/${newArtOne}.jpeg`
// 	let fullArtOne = `images/fulls/${newArtOne}.jpeg`
// 	console.log(thumbArtOne)
// 	console.log(fullArtOne)
// 	document.querySelector('#fullOne').href = fullArtOne
// 	document.querySelector('#thumbOne').src = thumbArtOne
// 	document.querySelector('#titleOne').innerText = newArtOne

// }

// document.querySelector('#moreArt').addEventListener('click', changeArt)

// function changeArt(){
// 	let newArtOne = getRandomPhotoNumber()
// 	let newArtTwo = getRandomPhotoNumber()
// 	let newArtThree = getRandomPhotoNumber()
// 	let newArtFour = getRandomPhotoNumber()
// 	let newArtFive = getRandomPhotoNumber()
// 	let newArtSix = getRandomPhotoNumber()
// 	let newArtSeven = getRandomPhotoNumber()
// 	let newArtEight = getRandomPhotoNumber()
// 	let newArtNine = getRandomPhotoNumber()
// 	let newArtTen = getRandomPhotoNumber()
// 	let newArtEleven = getRandomPhotoNumber()
// 	let newArtTwelve = getRandomPhotoNumber()
// 	let stringArtOne = String(newArtOne)+'.jpeg'
// 	let stringArtTwo = String(newArtTwo)+'.jpeg'
// 	let stringArtThree = String(newArtThree)+'.jpeg'
// 	let stringArtFour = String(newArtFour)+'.jpeg'
// 	let stringArtFive = String(newArtFive)+'.jpeg'
// 	let stringArtSix = String(newArtSix)+'.jpeg'
// 	let stringArtSeven = String(newArtSeven)+'.jpeg'
// 	let stringArtEight = String(newArtEight)+'.jpeg'
// 	let stringArtNine = String(newArtNine)+'.jpeg'
// 	let stringArtTen = String(newArtTen)+'.jpeg'
// 	let stringArtEleven = String(newArtEleven)+'.jpeg'
// 	let stringArtTwelve = String(newArtTwelve)+'.jpeg'
// 	let thumbArtOne ="images/thumbs/"+stringArtOne
// 	let thumbArtTwo ="images/thumbs/"+stringArtTwo
// 	let thumbArtThree ="images/thumbs/"+stringArtThree
// 	let thumbArtFour ="images/thumbs/"+stringArtFour
// 	let thumbArtFive ="images/thumbs/"+stringArtFive
// 	let thumbArtSix ="images/thumbs/"+stringArtSix
// 	let thumbArtSeven ="images/thumbs/"+stringArtSeven
// 	let thumbArtEight ="images/thumbs/"+stringArtEight
// 	let thumbArtNine ="images/thumbs/"+stringArtNine
// 	let thumbArtTen ="images/thumbs/"+stringArtTen
// 	let thumbArtEleven ="images/thumbs/"+stringArtEleven
// 	let thumbArtTwelve ="images/thumbs/"+stringArtTwelve
// 	let fullArtOne ="images/fulls/"+stringArtOne
// 	let fullArtTwo ="images/fulls/"+stringArtTwo
// 	let fullArtThree ="images/fulls/"+stringArtThree
// 	let fullArtFour ="images/fulls/"+stringArtFour
// 	let fullArtFive ="images/fulls/"+stringArtFive
// 	let fullArtSix ="images/fulls/"+stringArtSix
// 	let fullArtSeven ="images/fulls/"+stringArtSeven
// 	let fullArtEight ="images/fulls/"+stringArtEight
// 	let fullArtNine ="images/fulls/"+stringArtNine
// 	let fullArtTen ="images/fulls/"+stringArtTen
// 	let fullArtEleven ="images/fulls/"+stringArtEleven
// 	let fullArtTwelve ="images/fulls/"+stringArtTwelve

// 	console.log(fullArtOne)
// 	console.log(thumbArtOne)
// 	console.log(newArtOne)

// 	document.querySelector('#fullOne').href = fullArtOne
// 	document.querySelector('#thumbOne').src = thumbArtOne
// 	document.querySelector('#titleOne').innerText = newArtOne

// 	document.querySelector('#fullTwo').href = fullArtTwo
// 	document.querySelector('#thumbTwo').src = thumbArtTwo
// 	document.querySelector('#titleTwo').innerText = newArtTwo

// 	document.querySelector('#fullThree').href = fullArtThree
// 	document.querySelector('#thumbThree').src = thumbArtThree
// 	document.querySelector('#titleThree').innerText = newArtThree

// 	document.querySelector('#fullFour').href = fullArtFour
// 	document.querySelector('#thumbFour').src = thumbArtFour
// 	document.querySelector('#titleFour').innerText = newArtFour

// 	document.querySelector('#fullFive').href = fullArtFive
// 	document.querySelector('#thumbFive').src = thumbArtFive
// 	document.querySelector('#titleFive').innerText = newArtFive

// 	document.querySelector('#fullSix').href = fullArtSix
// 	document.querySelector('#thumbSix').src = thumbArtSix
// 	document.querySelector('#titleSix').innerText = newArtSix

// 	document.querySelector('#fullSeven').href = fullArtSeven
// 	document.querySelector('#thumbSeven').src = thumbArtSeven
// 	document.querySelector('#titleSeven').innerText = newArtSeven

// 	document.querySelector('#fullEight').href = fullArtEight
// 	document.querySelector('#thumbEight').src = thumbArtEight
// 	document.querySelector('#titleEight').innerText = newArtEight

// 	document.querySelector('#fullNine').href = fullArtNine
// 	document.querySelector('#thumbNine').src = thumbArtNine
// 	document.querySelector('#titleNine').innerText = newArtNine

// 	document.querySelector('#fullTen').href = fullArtTen
// 	document.querySelector('#thumbTen').src = thumbArtTen
// 	document.querySelector('#titleTen').innerText = newArtTen

// 	document.querySelector('#fullEleven').href = fullArtEleven
// 	document.querySelector('#thumbEleven').src = thumbArtEleven
// 	document.querySelector('#titleEleven').innerText = newArtEleven

// 	document.querySelector('#fullTwelve').href = fullArtTwelve
// 	document.querySelector('#thumbTwelve').src = thumbArtTwelve
// 	document.querySelector('#titleTwelve').innerText = newArtTwelve
	
// }
