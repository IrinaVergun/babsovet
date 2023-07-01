const { google } = require('googleapis');
const { v4: uuidv4 } = require('uuid');

const TABLES = {
  users: 'Users',
  events: 'Events',
}

/*
  Google Sheets as DB abstraction
*/
class Database {
  constructor({ serviceAccountKeyFile, sheetId }) {
    this.serviceAccountKeyFile = serviceAccountKeyFile;
    this.sheetId = sheetId;
  }

  async _getClient() {
    const auth = new google.auth.GoogleAuth({
      keyFile: this.serviceAccountKeyFile,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const authClient = await auth.getClient();
    return google.sheets({
      version: 'v4',
      auth: authClient,
    });
  }

  async _readGoogleSheet(tabName, range) {
    const googleSheetClient = await this._getClient();
    const res = await googleSheetClient.spreadsheets.values.get({
      spreadsheetId: this.sheetId,
      range: `${tabName}!${range}`,
    });

    return res.data.values;
  }

  async _writeGoogleSheet(tabName, range, data) {
    const googleSheetClient = await this._getClient();
    await googleSheetClient.spreadsheets.values.append({
      spreadsheetId: this.sheetId,
      range: `${tabName}!${range}`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        "majorDimension": "ROWS",
        "values": data
      },
    })
  }

  async getUsers() {
    const data = await this._readGoogleSheet(TABLES.users, 'A:B');
    return data.map(([id, password]) => ({ id, password }))
  }

  async createEvent({ title, start, end, allDay, owner }) {
    const id = uuidv4();
    const event = [id, title, start, end, allDay, owner];
    await this._writeGoogleSheet(TABLES.events, 'A:F', [event]);
    return {
      id,
      title,
      start,
      end,
      allDay,
      owner
    }
  }
}

module.exports = Database;