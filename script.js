const exchangeRates = {
    "USD": { "EUR": 0.85, "SAR": 3.75, "YER": 250.00, "EGP": 15.7, "GBP": 0.73, "AED": 3.67, "KWD": 0.31, "BHD": 0.38, "OMR": 0.38, "QAR": 3.64, "JOD": 0.71, "LBP": 1507.5, "CNY": 6.45, "JPY": 110.00 },
    "EUR": { "USD": 1.18, "SAR": 4.4, "YER": 295.00, "EGP": 18.5, "GBP": 0.86, "AED": 4.32, "KWD": 0.36, "BHD": 0.44, "OMR": 0.45, "QAR": 4.29, "JOD": 0.83, "LBP": 1778.85, "CNY": 7.60, "JPY": 129.70 },
    "SAR": { "USD": 0.27, "EUR": 0.23, "YER": 66.67, "EGP": 4.18, "GBP": 0.19, "AED": 0.98, "KWD": 0.08, "BHD": 0.10, "OMR": 0.10, "QAR": 0.97, "JOD": 0.19, "LBP": 402.00, "CNY": 1.72, "JPY": 29.33 },
    "YER": { "USD": 0.004, "EUR": 0.0034, "SAR": 0.015, "EGP": 0.063, "GBP": 0.0029, "AED": 0.015, "KWD": 0.0012, "BHD": 0.0015, "OMR": 0.0015, "QAR": 0.015, "JOD": 0.0028, "LBP": 6.03, "CNY": 0.026, "JPY": 0.44 }
};

const symbolMap = {
    'USD': '$', 'EUR': '€', 'SAR': 'ر.س', 'YER': 'ر.ي', 'EGP': 'ج.م',
    'GBP': '£', 'AED': 'د.إ', 'KWD': 'د.ك', 'BHD': 'د.ب', 'OMR': 'ر.ع',
    'QAR': 'ر.ق', 'JOD': 'د.أ', 'LBP': 'ل.ل', 'CNY': '¥', 'JPY': '¥'
};

// عند الضغط على زر التبديل
document.getElementById('swap-btn').addEventListener('click', () => {
    const fromSelect = document.getElementById('from-currency');
    const toSelect = document.getElementById('to-currency');
    [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
    updateCurrencySymbol();
    convertCurrency();
});

// تحديث الرمز الظاهر
function updateCurrencySymbol() {
    const fromCurrency = document.getElementById('from-currency').value;
    document.getElementById('currency-symbol').textContent = symbolMap[fromCurrency] || fromCurrency;
}

// تنفيذ التحويل
function convertCurrency() {
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount) || amount <= 0) {
        alert('يرجى إدخال مبلغ صالح');
        return;
    }

    if (fromCurrency === toCurrency) {
        alert('يرجى اختيار عملات مختلفة');
        return;
    }

    const rate = exchangeRates[fromCurrency]?.[toCurrency];
    if (!rate) {
        alert('عذراً، لا توجد بيانات تحويل لهذه العملات');
        return;
    }

    const convertedAmount = amount * rate;
    displayResult(amount, convertedAmount, rate, fromCurrency, toCurrency);
}

// عرض النتيجة
function displayResult(originalAmount, convertedAmount, rate, fromCurrency, toCurrency) {
    const resultDiv = document.getElementById('result');

    resultDiv.querySelector('.amount').innerHTML = `
        ${originalAmount.toFixed(2)} ${symbolMap[fromCurrency]} = 
        <strong>${convertedAmount.toFixed(2)} ${symbolMap[toCurrency]}</strong>
    `;
    resultDiv.querySelector('.rate').textContent = 
        `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
    
    resultDiv.classList.add('show');
}

// تحديث سعر الصرف كل دقيقة (اختياري)
setInterval(() => {
    if (document.getElementById('amount').value) {
        convertCurrency();
    }
}, 60000);

// تحديث الرموز عند تغيير العملة
document.getElementById('from-currency').addEventListener('change', updateCurrencySymbol);
updateCurrencySymbol();
