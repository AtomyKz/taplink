/**
 * ============================================================================
 * GOOGLE APPS SCRIPT — КОД ДЛЯ GOOGLE SHEETS
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
 * 10. Вставьте URL в файл script.js в переменную GOOGLE_SCRIPT_URL
 * ============================================================================
 */

/**
 * Обрабатывает POST-запросы от сайта
 */
function doPost(e) {
  try {
    // Разрешаем CORS
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };

    // Обработка preflight запроса
    if (e.parameter && e.parameter.method === 'OPTIONS') {
      return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
        .setResponseCode(200)
        .setHeaders(headers);
    }

    // Парсим данные
    const data = JSON.parse(e.postData.contents);
    
    // Получаем активную таблицу
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Получаем или создаём лист за сегодня
    const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd.MM.yyyy');
    let sheet = spreadsheet.getSheetByName(today);
    
    if (!sheet) {
      // Создаём новый лист за сегодня
      sheet = spreadsheet.insertSheet(today);
      
      // Добавляем заголовки столбцов
      const headers = ['Дата и время', 'ФИО', 'Дата рождения', 'Email', 'Телефон', 'Адрес', 'Цель'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Форматируем заголовки
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#00ADEF');
      headerRange.setFontColor('white');
      
      // Автоширина столбцов
      sheet.autoResizeColumns(1, headers.length);
      
      // Закрепляем первую строку
      sheet.setFrozenRows(1);
    }
    
    // Определяем следующую свободную строку
    const lastRow = sheet.getLastRow();
    const nextRow = lastRow + 1;
    
    // Добавляем данные
    const rowData = [
      data.timestamp || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd.MM.yyyy HH:mm:ss'),
      data.fullName || '',
      data.birthDate || '',
      data.email || '',
      data.phone || '',
      data.address || '',
      data.purpose === 'business' ? 'Бизнес-партнер' : 'Покупатель'
    ];
    
    sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);
    
    // Автоширина на случай длинных данных
    sheet.autoResizeColumns(1, rowData.length);
    
    // Возвращаем успех
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'success', 
      message: 'Данные сохранены',
      sheet: today
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: error.toString() 
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setResponseCode(500);
  }
}

/**
 * Обрабатывает GET-запросы (для проверки)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    status: 'ok', 
    message: 'Google Apps Script работает!'
  }))
  .setMimeType(ContentService.MimeType.JSON)
  .setHeaders({
    'Access-Control-Allow-Origin': '*'
  });
}

/**
 * Триггер: автоматически создаёт новый лист каждый день в 00:01
 * Чтобы настроить:
 * 1. В Apps Script нажмите на часы (Триггеры) слева
 * 2. "+ Добавить триггер"
 * 3. Выберите функцию: createDailySheet
 * 4. Выберите источник событий: "По времени"
 * 5. Тип таймера: "Дневной таймер"
 * 6. Время: "с полуночи до 1:00"
 * 
 * ИЛИ запустите эту функцию вручную для создания листа на сегодня
 */
function createDailySheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd.MM.yyyy');
  
  // Проверяем, существует ли уже лист
  let sheet = spreadsheet.getSheetByName(today);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(today);
    
    const headers = ['Дата и время', 'ФИО', 'Дата рождения', 'Email', 'Телефон', 'Адрес', 'Цель'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#00ADEF');
    headerRange.setFontColor('white');
    
    sheet.autoResizeColumns(1, headers.length);
    sheet.setFrozenRows(1);
    
    Logger.log('Создан новый лист: ' + today);
  }
}
