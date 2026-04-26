// ===== КОНФИГУРАЦИЯ =====
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyWA9Ci6gG__jGIHCi6rKIjf3CjV-gIVV2vNSCRExGh1WvzT1EmaNaLe5Pq1zc8TEmQUA/exec';

const CURRENCIES = {
    KZT: { id: 'KZT', symbol: '₸', min: 10000, max: 100000, step: 1000, defaultOrder: 32000 },
    RUB: { id: 'RUB', symbol: '₽', min: 2000, max: 20000, step: 500, defaultOrder: 5000 },
    USD: { id: 'USD', symbol: '$', min: 20, max: 200, step: 5, defaultOrder: 50 }
};

// ===== СОСТОЯНИЕ =====
let currency = 'KZT';
let partners = 30;
let averageOrder = CURRENCIES['KZT'].defaultOrder;

// ===== DOM ЭЛЕМЕНТЫ =====
const form = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');
const backBtn = document.getElementById('backBtn');
const yearSpan = document.getElementById('year');

const partnersSlider = document.getElementById('partnersSlider');
const orderSlider = document.getElementById('orderSlider');
const partnersValue = document.getElementById('partnersValue');
const orderValue = document.getElementById('orderValue');
const orderMin = document.getElementById('orderMin');
const orderMax = document.getElementById('orderMax');
const dailyIncome = document.getElementById('dailyIncome');
const monthlyIncome = document.getElementById('monthlyIncome');

const currencyBtns = document.querySelectorAll('.currency-btn');
const purposeCards = document.querySelectorAll('.purpose-card');

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    yearSpan.textContent = new Date().getFullYear();
    initPurposeCards();
    initCurrencySwitcher();
    initSliders();
    initForm();
    initBackButton();
    updateCalculator();
});

// ===== КАРТОЧКИ ЦЕЛИ =====
function initPurposeCards() {
    purposeCards.forEach(card => {
        const radio = card.querySelector('input[type="radio"]');
        
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT') {
                radio.checked = true;
            }
            updatePurposeSelection();
        });

        radio.addEventListener('change', updatePurposeSelection);
    });
}

function updatePurposeSelection() {
    purposeCards.forEach(card => {
        const radio = card.querySelector('input[type="radio"]');
        if (radio.checked) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
}

// ===== ПЕРЕКЛЮЧАТЕЛЬ ВАЛЮТ =====
function initCurrencySwitcher() {
    currencyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const newCurrency = btn.dataset.currency;
            if (newCurrency === currency) return;

            currencyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currency = newCurrency;
            averageOrder = CURRENCIES[currency].defaultOrder;

            // Обновляем слайдер
            orderSlider.min = CURRENCIES[currency].min;
            orderSlider.max = CURRENCIES[currency].max;
            orderSlider.step = CURRENCIES[currency].step;
            orderSlider.value = averageOrder;

            updateCalculator();
        });
    });
}

// ===== СЛАЙДЕРЫ =====
function initSliders() {
    partnersSlider.addEventListener('input', (e) => {
        partners = parseInt(e.target.value);
        updateCalculator();
    });

    orderSlider.addEventListener('input', (e) => {
        averageOrder = parseInt(e.target.value);
        updateCalculator();
    });
}

// ===== ОБНОВЛЕНИЕ КАЛЬКУЛЯТОРА =====
function updateCalculator() {
    const curr = CURRENCIES[currency];

    partnersValue.textContent = `${partners} чел.`;
    orderValue.textContent = `${averageOrder.toLocaleString('ru-RU')} ${curr.symbol}`;
    orderMin.textContent = `${curr.min.toLocaleString('ru-RU')} ${curr.symbol}`;
    orderMax.textContent = `${curr.max.toLocaleString('ru-RU')} ${curr.symbol}`;

    const daily = Math.floor(partners * averageOrder * 0.015);
    const monthly = daily * 26;

    dailyIncome.textContent = `${daily.toLocaleString('ru-RU')} ${curr.symbol}`;
    monthlyIncome.textContent = `≈ ${monthly.toLocaleString('ru-RU')} ${curr.symbol}`;
}

// ===== ФОРМА =====
function initForm() {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            fullName: formData.get('fullName'),
            birthDate: formData.get('birthDate'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            purpose: formData.get('purpose'),
            timestamp: new Date().toLocaleString('ru-RU')
        };

        // Валидация
        if (!data.purpose) {
            alert('Пожалуйста, выберите цель в Atomy');
            return;
        }

        setLoading(true);

        try {
            // Отправка в Google Sheets
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            // При no-cors мы не можем проверить ответ, но запрос отправляется
            console.log('Данные отправлены в Google Sheets');

        } catch (error) {
            console.error('Ошибка отправки:', error);
        }

        // Показываем успех (даже если fetch с no-cors)
        setTimeout(() => {
            setLoading(false);
            showSuccess();
        }, 1500);
    });
}

function setLoading(loading) {
    if (loading) {
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-content').classList.add('hidden');
        submitBtn.querySelector('.btn-spinner').classList.remove('hidden');
    } else {
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-content').classList.remove('hidden');
        submitBtn.querySelector('.btn-spinner').classList.add('hidden');
    }
}

function showSuccess() {
    form.classList.add('hidden');
    successMessage.classList.remove('hidden');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function initBackButton() {
    backBtn.addEventListener('click', () => {
        form.reset();
        purposeCards.forEach(c => c.classList.remove('selected'));
        successMessage.classList.add('hidden');
        form.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== МАСКА ТЕЛЕФОНА =====
document.querySelector('input[name="phone"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.startsWith('7')) {
        value = value.substring(1);
    }
    
    if (value.startsWith('8')) {
        value = value.substring(1);
    }

    let formatted = '+7';
    if (value.length > 0) {
        formatted += ' (' + value.substring(0, 3);
    }
    if (value.length >= 3) {
        formatted += ') ' + value.substring(3, 6);
    }
    if (value.length >= 6) {
        formatted += '-' + value.substring(6, 8);
    }
    if (value.length >= 8) {
        formatted += '-' + value.substring(8, 10);
    }

    e.target.value = formatted;
});

// ===== ФОРМАТИРОВАНИЕ ДАТЫ =====
document.querySelector('input[name="birthDate"]').addEventListener('blur', function(e) {
    const value = e.target.value;
    if (!value) return;
    
    const date = new Date(value);
    if (isNaN(date.getTime())) {
        e.target.value = '';
    }
});
