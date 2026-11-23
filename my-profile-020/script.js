// ==========================================
// ส่วนเดิม: การทักทาย (Greeting)
// ==========================================
const greetingBtn = document.getElementById('greetingBtn');
const greetingMessage = document.getElementById('greetingMessage');

if (greetingBtn && greetingMessage) {
    greetingBtn.addEventListener('click', function () {
        greetingMessage.textContent = 'ยินดีที่ได้รู้จัก แต่ไม่ค่อยอยากรู้จักหรอก';
    });
}

// ==========================================
// 01 Project Filter – ระบบกรองผลงาน
// ==========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // อัปเดตคลาส active ของปุ่มตัวกรอง
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // ดึงหมวดหมู่ที่ต้องการกรองจาก data-filter
        const selectedFilter = button.getAttribute('data-filter');

        // กรองรายการผลงาน
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            // หากเลือก "all" หรือหมวดหมู่ตรงกับที่เลือก ให้แสดงผลงาน
            if (selectedFilter === 'all' || cardCategory === selectedFilter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ==========================================
// 03 Dark Mode – ระบบเปลี่ยนธีม
// ==========================================
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('.theme-icon') : null;
const themeText = themeToggleBtn ? themeToggleBtn.querySelector('.theme-text') : null;

// ฟังก์ชันอัปเดตการแสดงผลและไอคอนของธีม
function applyTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        if (themeIcon) themeIcon.textContent = '☀️';
        if (themeText) themeText.textContent = 'โหมดสว่าง';
        if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'เปลี่ยนเป็นโหมดสว่าง');
    } else {
        document.body.classList.remove('dark-mode');
        if (themeIcon) themeIcon.textContent = '🌙';
        if (themeText) themeText.textContent = 'โหมดมืด';
        if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'เปลี่ยนเป็นโหมดมืด');
    }
}

// ตรวจสอบธีมที่บันทึกไว้ใน localStorage หรือตามการตั้งค่าระบบของผู้ใช้
const savedTheme = localStorage.getItem('theme');
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDarkMode);

// ปรับใช้ธีมเริ่มต้น
applyTheme(initialDarkMode);

// ดักจับเหตุการณ์คลิกปุ่มสลับธีม
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isCurrentDark = document.body.classList.contains('dark-mode');
        const newThemeIsDark = !isCurrentDark;

        applyTheme(newThemeIsDark);
        localStorage.setItem('theme', newThemeIsDark ? 'dark' : 'light');
    });
}
