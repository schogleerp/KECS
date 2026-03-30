/**
 * K.E. CARMEL SCHOOL — SECURE PAYMENT BRIDGE (v2.2)
 * Enhanced: Custom Filenames & Fee-Specific Subfolders
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); 

  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // 1. Log to correct Sheet tab (Tuition Fee or Bus Fee)
    var sheetName = data.head === 'Tuition Fee' ? 'Tuition Fee' : 'Bus Fee';
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) throw new Error("Sheet '" + sheetName + "' missing!");

    // 2. Smart Folder & Naming Logic
    var screenshotUrl = "No Photo Uploaded";
    
    // Use the fileName and folderPath parameters we are now sending from the frontend
    if (data.screenshot && data.fileName) {
      // Create hierarchy: KECS Payments -> Year -> MonthName -> Fee Head
      var root = getOrCreateFolder(DriveApp.getRootFolder(), "KECS Payments");
      var yearFolder = getOrCreateFolder(root, new Date().getFullYear().toString());
      
      // Extract month name (e.g., "Apr" from "04. Apr")
      var monthName = data.month.split('.')[1] ? data.month.split('.')[1].trim() : data.month;
      var monthFolder = getOrCreateFolder(yearFolder, monthName);
      
      // NEW: Create subfolder for the specific Fee Head (Tuition Fee / Bus Fee)
      var feeHeadFolder = getOrCreateFolder(monthFolder, data.head);
      
      // Use the structured fileName sent by the frontend: [Class]_[Student]_[Fee].jpg
      var finalFileName = data.fileName || "unnamed_receipt.jpg";
      
      var blob = Utilities.newBlob(
        Utilities.base64Decode(data.screenshot), 
        data.screenshotMime || 'image/jpeg', 
        finalFileName
      );
      
      var file = feeHeadFolder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      screenshotUrl = file.getUrl();
    }

    // 3. Log data to the sheet row
    sheet.appendRow([
      new Date(), 
      data.studentName, 
      data.className, 
      data.section || '---', 
      data.month, 
      data.amount, 
      data.transactionId, 
      screenshotUrl
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "result": "success", "url": screenshotUrl }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/** Helper: Find or Create Folder by Name */
function getOrCreateFolder(parent, name) {
  var folders = parent.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : parent.createFolder(name);
}

/** Force Permissions Prompt */
function doGet() {
  DriveApp.getStorageUsed();
  return ContentService.createTextOutput("KECS Payment Bridge is ACTIVE.").setMimeType(ContentService.MimeType.TEXT);
}
