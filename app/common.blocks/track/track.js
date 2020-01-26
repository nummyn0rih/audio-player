// Реализация на чистом JS

document.addEventListener('click', (event) => {
    const track = event.target.closest('.track');
    if (!track) return;
    if (event.target.className === 'star') return;

    const trackList = [...document.querySelectorAll('.track')];
    trackList.map((track) => track.classList.remove('track_active'));
    track.classList.toggle('track_active');

    event.preventDefault();
});
