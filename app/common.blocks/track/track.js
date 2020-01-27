/* eslint-disable linebreak-style */
// Реализация на чистом JS

document.addEventListener('click', (event) => {
  const track = event.target.closest('.track');
  if (!track) return;
  if (event.target.className === 'star') return;

  const progressbar = track.querySelector('.track__progress');

  if (track.classList.contains('track_active')) {
    const progressbarCoord = track.getBoundingClientRect();
    const startOfProgress = progressbarCoord.x;
    const progressbarWidht = progressbarCoord.width;
    const curentCoord = event.clientX;
    // eslint-disable-next-line no-mixed-operators
    const newProgress = 100 - Math.round((curentCoord - startOfProgress) / progressbarWidht * 100);
    progressbar.style.right = `${newProgress}%`;
  } else {
    const trackList = [...document.querySelectorAll('.track')];
    trackList.map((item) => item.classList.remove('track_active'));
    track.classList.toggle('track_active');
    progressbar.style.right = '99%';
  }

  event.preventDefault();
});
