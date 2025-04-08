// 计时器功能
let timerInterval;
let remainingTime = 0;
const timerDisplay = document.querySelector('.timer-display');
const timerInputs = document.querySelectorAll('.timer-input input');
const timerControls = document.querySelector('.timer-controls');

// 使用事件委托方式绑定事件
timerControls.addEventListener('click', (e) => {
    const target = e.target;
    
    if (target.classList.contains('btn-start')) {
        if (remainingTime === 0) {
            const hours = parseInt(timerInputs[0].value) || 0;
            const minutes = parseInt(timerInputs[1].value) || 0;
            const seconds = parseInt(timerInputs[2].value) || 0;
            remainingTime = hours * 3600 + minutes * 60 + seconds;
        }

        if (remainingTime > 0) {
            timerInterval = setInterval(() => {
                remainingTime--;
                const hours = Math.floor(remainingTime / 3600);
                const minutes = Math.floor((remainingTime % 3600) / 60);
                const seconds = remainingTime % 60;
                timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                
                if (remainingTime === 0) {
                    clearInterval(timerInterval);
                    // 播放提示音
                    const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
                    audio.play().catch(() => {});
                }
            }, 1000);
        }
    } else if (target.classList.contains('btn-stop')) {
        clearInterval(timerInterval);
    } else if (target.classList.contains('btn-reset')) {
        clearInterval(timerInterval);
        remainingTime = 0;
        timerDisplay.textContent = '00:00:00';
        timerInputs.forEach(input => input.value = '');
    }
});

// 输入验证
timerInputs.forEach(input => {
    input.addEventListener('input', () => {
        let value = parseInt(input.value);
        if (isNaN(value)) value = 0;
        if (value < 0) value = 0;
        if (value > parseInt(input.max)) value = parseInt(input.max);
        input.value = value;
    });
}); 