// 闹钟功能
let alarmInterval;
const alarmList = document.querySelector('.alarm-list');
const alarmEditForm = document.querySelector('.alarm-edit-form');
const editTimeInput = document.querySelector('.edit-time');
const weekdayCheckboxes = document.querySelectorAll('.weekday-selector input[type="checkbox"]');
let editingAlarmItem = null;

// 星期几的中文表示
const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

// 保存闹钟列表到本地存储
function saveAlarmsToStorage() {
    const alarms = [];
    document.querySelectorAll('.alarm-item').forEach(item => {
        alarms.push({
            time: item.querySelector('.alarm-time').textContent,
            days: item.querySelector('.alarm-days').textContent
        });
    });
    localStorage.setItem('alarms', JSON.stringify(alarms));
}

// 从本地存储加载闹钟列表
function loadAlarmsFromStorage() {
    const alarms = JSON.parse(localStorage.getItem('alarms') || '[]');
    alarmList.innerHTML = ''; // 清空现有闹钟
    
    alarms.forEach(alarm => {
        const alarmItem = document.createElement('div');
        alarmItem.className = 'alarm-item';
        alarmItem.innerHTML = `
            <div class="alarm-time">${alarm.time}</div>
            <div class="alarm-days">${alarm.days}</div>
            <div class="alarm-actions">
                <button class="btn-edit">编辑</button>
                <button class="btn-delete">删除</button>
            </div>
        `;
        alarmList.appendChild(alarmItem);
    });
}

// 检查闹钟时间
function checkAlarm() {
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, '0') + ':' + 
                       now.getMinutes().toString().padStart(2, '0');
    const currentDay = now.getDay();

    console.log('当前时间:', currentTime, '当前星期:', weekdays[currentDay]);

    document.querySelectorAll('.alarm-item').forEach(item => {
        const time = item.querySelector('.alarm-time').textContent;
        const days = item.querySelector('.alarm-days').textContent;
        
        console.log('检查闹钟:', time, '重复日期:', days);
        
        if (time === currentTime && days.includes(weekdays[currentDay])) {
            console.log('闹钟触发!');
            // 播放提示音
            const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
            audio.play().catch(() => {});
        }
    });
}

// 开始检查闹钟
function startAlarmCheck() {
    if (!alarmInterval) {
        alarmInterval = setInterval(checkAlarm, 1000);
        console.log('开始检查闹钟');
    }
}

// 停止检查闹钟
function stopAlarmCheck() {
    if (alarmInterval) {
        clearInterval(alarmInterval);
        alarmInterval = null;
    }
}

// 显示编辑表单
function showEditForm(alarmItem) {
    editingAlarmItem = alarmItem;
    const time = alarmItem.querySelector('.alarm-time').textContent;
    const days = alarmItem.querySelector('.alarm-days').textContent;
    
    editTimeInput.value = time;
    weekdayCheckboxes.forEach(checkbox => {
        checkbox.checked = days.includes(weekdays[parseInt(checkbox.value)]);
    });
    
    alarmEditForm.style.display = 'block';
}

// 隐藏编辑表单
function hideEditForm() {
    alarmEditForm.style.display = 'none';
    editingAlarmItem = null;
}

// 保存闹钟设置
function saveAlarm() {
    if (!editingAlarmItem) return;
    
    const time = editTimeInput.value;
    const selectedDays = Array.from(weekdayCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => weekdays[parseInt(checkbox.value)])
        .join(' ');
    
    editingAlarmItem.querySelector('.alarm-time').textContent = time;
    editingAlarmItem.querySelector('.alarm-days').textContent = selectedDays;
    
    hideEditForm();
    saveAlarmsToStorage(); // 保存到本地存储
}

// 删除闹钟
function deleteAlarm(alarmItem) {
    alarmItem.remove();
    saveAlarmsToStorage(); // 保存到本地存储
}

// 添加新闹钟
function addNewAlarm() {
    const alarmItem = document.createElement('div');
    alarmItem.className = 'alarm-item';
    alarmItem.innerHTML = `
        <div class="alarm-time">00:00</div>
        <div class="alarm-days">周一 周二 周三 周四 周五</div>
        <div class="alarm-actions">
            <button class="btn-edit">编辑</button>
            <button class="btn-delete">删除</button>
        </div>
    `;
    alarmList.appendChild(alarmItem);
    saveAlarmsToStorage(); // 保存到本地存储
}

// 事件监听
alarmList.addEventListener('click', (e) => {
    const target = e.target;
    const alarmItem = target.closest('.alarm-item');
    
    if (target.classList.contains('btn-edit')) {
        showEditForm(alarmItem);
    } else if (target.classList.contains('btn-delete')) {
        deleteAlarm(alarmItem);
    }
});

document.querySelector('.btn-save').addEventListener('click', saveAlarm);
document.querySelector('.btn-cancel').addEventListener('click', hideEditForm);

// 页面加载时加载闹钟并开始检查
loadAlarmsFromStorage();
startAlarmCheck();

// 页面卸载时停止检查闹钟
window.addEventListener('unload', stopAlarmCheck); 