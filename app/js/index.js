"use strict";

/* eslint-disable linebreak-style */

/* eslint-disable no-undef */
// Реализация на jQuery
$(function () {
  // eslint-disable-next-line func-names
  $('.track__star').click(function () {
    $(this).toggleClass('star_active');
  });
});
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/* eslint-disable linebreak-style */
// Реализация на чистом JS
document.addEventListener('click', function (event) {
  var track = event.target.closest('.track');
  if (!track) return;
  if (event.target.className === 'star') return;
  var progressbar = track.querySelector('.track__progress');

  if (track.classList.contains('track_active')) {
    var progressbarCoord = track.getBoundingClientRect();
    var startOfProgress = progressbarCoord.x;
    var progressbarWidht = progressbarCoord.width;
    var curentCoord = event.clientX; // eslint-disable-next-line no-mixed-operators

    var newProgress = 100 - Math.round((curentCoord - startOfProgress) / progressbarWidht * 100);
    progressbar.style.right = "".concat(newProgress, "%");
  } else {
    var trackList = _toConsumableArray(document.querySelectorAll('.track'));

    trackList.map(function (item) {
      return item.classList.remove('track_active');
    });
    track.classList.toggle('track_active');
    progressbar.style.right = '99%';
  }

  event.preventDefault();
});
//# sourceMappingURL=index.js.map
