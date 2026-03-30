/**
 * K.E. CARMEL SCHOOL — ADMISSION INQUIRY BACKEND (v2.1)
 * Self-healing: Locates or initializes the sheet automatically.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); 

  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // ERROR FIX: If script is not bound to a sheet, ss will be null.
    if (!ss) {
      throw new Error("Script is not bound to a Spreadsheet. Please open the Sheet, then go to Extensions > Apps Script.");
    }

    var sheetName = "Inquiries"; 
    var sheet = ss.getSheetByName(sheetName) || ss.getSheets()[0];
    
    if (!sheet) {
       throw new Error("No visible sheets found in the spreadsheet!");
    }

    // Map the fields from HomeAdmission.jsx
    sheet.appendRow([
      new Date(), 
      data.studentName || 'N/A', 
      data.guardianName || 'N/A', 
      data.studentClass || 'N/A', 
      data.mobile || 'N/A', 
      data.address || 'N/A'
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/** Pre-flight check / Permissions prompt */
function doGet() {
  return ContentService.createTextOutput("KECS Admission Bridge is ACTIVE.").setMimeType(ContentService.MimeType.TEXT);
}
