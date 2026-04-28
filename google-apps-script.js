/**
 * ============================================================================
 * GOOGLE APPS SCRIPT — КОД ДЛЯ GOOGLE SHEETS (v2)
 * ============================================================================
 * 
 * КАК НАСТРОИТЬ:
 * 1. Откройте Google Sheets и создайте новую таблицу
 * 2. Переименуйте первый лист (например, на "Данные")
 * 3. В меню выберите: Расширения → Apps Script
 * 4. Удалите весь код по умолчанию и вставьте ЭТОТ код
 * 5. Сохраните проект (Ctrl+S / Cmd+S)
 * 6. Нажмите "Развернуть" → "Новое развертывание"
 * 7. Тип: Веб-приложение
 * 8. Кто имеет доступ: "Все"
 * 9. Нажмите "Развернуть" и скопируйте URL
 * 10. Вставьте URL в config.js в поле googleScriptUrl
 * 
 * ВАЖНО: При обновлении кода нужно создать НОВОЕ развертывание,
 * чтобы изменения вступили в силу!
 * ============================================================================
 */

// ===== НАСТРОЙКИ ОФОРМЛЕНИЯ =====
var COLORS = {
  headerBg: '#00ADEF',
  headerText: '#FFFFFF',
  businessBg: '#E8F5E9',
  businessText: '#2E7D32',
  buyerBg: '#FFF3E0',
  buyerText: '#E65100',
  borderColor: '#B0BEC5',
  rowEven: '#FFFFFF',
  rowOdd: '#F5F7FA',
  numberBg: '#ECEFF1'
};

var COLUMN_HEADERS = ['№', 'Дата и время', 'ФИО', 'Дата рождения', 'Email', 'Телефон', 'Адрес', 'Цель', 'ИИН'];
var COL_COUNT = COLUMN_HEADERS.length;

// ===== СОЗДАНИЕ / ОФОРМЛЕНИЕ ЛИСТА =====
function setupSheetHeaders(sheet) {
  // Заголовки
  sheet.getRange(1, 1, 1, COL_COUNT).setValues([COLUMN_HEADERS]);

  var headerRange = sheet.getRange(1, 1, 1, COL_COUNT);
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(10);
  headerRange.setFontFamily('Inter, Arial, sans-serif');
  headerRange.setBackground(COLORS.headerBg);
  headerRange.setFontColor(COLORS.headerText);
  headerRange.setHorizontalAlignment('center');
  headerRange.setVerticalAlignment('middle');
  headerRange.setWrap(true);

  // Высота заголовка
  sheet.setRowHeight(1, 36);

  // Ширина столбцов: №, Дата, ФИО, ДР, Email, Телефон, Адрес, Цель, ИИН
  var widths = [40, 140, 200, 110, 200, 150, 250, 140, 130];
  for (var i = 0; i < widths.length; i++) {
    sheet.setColumnWidth(i + 1, widths[i]);
  }

  // Закрепляем первую строку
  sheet.setFrozenRows(1);

  // Границы заголовка
  headerRange.setBorder(true, true, true, true, true, true, COLORS.borderColor, SpreadsheetApp.BorderStyle.SOLID);
}

// ===== СТИЛИЗАЦИЯ СТРОКИ ДАННЫХ =====
function styleDataRow(sheet, rowNum, isBusiness, rowIndex) {
  var rowRange = sheet.getRange(rowNum, 1, 1, COL_COUNT);

  // Шрифт
  rowRange.setFontSize(10);
  rowRange.setFontFamily('Inter, Arial, sans-serif');
  rowRange.setVerticalAlignment('middle');
  rowRange.setWrap(true);

  // Высота строки
  sheet.setRowHeight(rowNum, 32);

  // Чередование фона (зебра)
  var baseBg = (rowIndex % 2 === 0) ? COLORS.rowEven : COLORS.rowOdd;
  rowRange.setBackground(baseBg);

  // Центрирование для всех столбцов
  rowRange.setHorizontalAlignment('center');
  // ФИО и Адрес — по левому краю (более читаемо)
  sheet.getRange(rowNum, 3).setHorizontalAlignment('left');  // ФИО
  sheet.getRange(rowNum, 7).setHorizontalAlignment('left');  // Адрес

  // Столбец №: серый фон
  var numCell = sheet.getRange(rowNum, 1);
  numCell.setBackground(COLORS.numberBg);
  numCell.setFontWeight('bold');
  numCell.setFontColor('#546E7A');

  // Столбец «Цель»: цветная метка
  var purposeCell = sheet.getRange(rowNum, 8);
  if (isBusiness) {
    purposeCell.setBackground(COLORS.businessBg);
    purposeCell.setFontColor(COLORS.businessText);
    purposeCell.setFontWeight('bold');
  } else {
    purposeCell.setBackground(COLORS.buyerBg);
    purposeCell.setFontColor(COLORS.buyerText);
    purposeCell.setFontWeight('bold');
  }

  // Границы строки
  rowRange.setBorder(true, true, true, true, true, true, COLORS.borderColor, SpreadsheetApp.BorderStyle.SOLID);
}

// ===== ОБРАБОТКА POST =====
function doPost(e) {
  try {
    var corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };

    if (e.parameter && e.parameter.method === 'OPTIONS') {
      return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    // Лист на сегодня
    var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd.MM.yyyy');
    var sheet = spreadsheet.getSheetByName(today);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(today);
      setupSheetHeaders(sheet);
    }

    // Номер строки
    var lastRow = sheet.getLastRow();
    var nextRow = lastRow + 1;
    var rowIndex = nextRow - 1; // для зебры (1-based, заголовок=1)

    var isBusiness = (data.purpose === 'business');
    var purposeLabel = isBusiness ? 'Бизнес-партнер' : 'Покупатель';

    // Данные строки: №, Дата, ФИО, ДР, Email, Телефон, Адрес, Цель, ИИН
    var rowData = [
      rowIndex,
      data.timestamp || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd.MM.yyyy HH:mm:ss'),
      data.fullName || '',
      data.birthDate || '',
      data.email || '',
      data.phone || '',
      data.address || '',
      purposeLabel,
      data.iin || '—'
    ];

    sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);

    // Стилизуем новую строку
    styleDataRow(sheet, nextRow, isBusiness, rowIndex);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Данные сохранены',
      sheet: today
    }))
    .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

// ===== ОБРАБОТКА GET (проверка) =====
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'Google Apps Script v2 работает!'
  }))
  .setMimeType(ContentService.MimeType.JSON);
}

// ===== ТРИГГЕР: СОЗДАНИЕ ЛИСТА НА СЕГОДНЯ =====
/**
 * Чтобы настроить автосоздание:
 * 1. В Apps Script → Триггеры (часы слева)
 * 2. "+ Добавить триггер"
 * 3. Функция: createDailySheet
 * 4. Источник: "По времени" → "Дневной" → "с полуночи до 1:00"
 */
function createDailySheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd.MM.yyyy');

  var sheet = spreadsheet.getSheetByName(today);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(today);
    setupSheetHeaders(sheet);
    Logger.log('Создан новый лист: ' + today);
  }
}
