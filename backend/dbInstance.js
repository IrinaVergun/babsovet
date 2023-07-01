const Database = require('./database')

const DBOptions = {
  serviceAccountKeyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE_PATH,
  sheetId: process.env.GOOGLE_SHEET_ID,
};

const DB = new Database(DBOptions);

module.exports = {
  DB
}