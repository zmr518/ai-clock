// 秒表功能
let stopwatchInterval;
let stopwatchTime = 0;
const stopwatchDisplay = document.querySelector('.stopwatch-time');
const stopwatchControls = document.querySelector('.stopwatch .stopwatch-controls');

stopwatchControls.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-start')) {
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            const hours = Math.floor(stopwatchTime / 3600);
            const minutes = Math.floor((stopwatchTime % 3600) / 60);
            const seconds = stopwatchTime % 60;
            stopwatchDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
    } else if (e.target.classList.contains('btn-stop')) {
        clearInterval(stopwatchInterval);
    } else if (e.target.classList.contains('btn-reset')) {
        clearInterval(stopwatchInterval);
        stopwatchTime = 0;
        stopwatchDisplay.textContent = '00:00:00';
    }
}); 