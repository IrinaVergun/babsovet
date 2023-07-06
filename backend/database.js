const { google } = require('googleapis');
const { v4: uuidv4 } = require('uuid');

const HEADER_ROWS_COUNT = 1;
const GOOGLE_SHEETS_ROWS_NUMERATION_STARTS_FROM = 1;

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

    const data = res.data.values;
    data.shift(); // remove headers row
    return data;
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

  async _updateGoogleSheet(tabName, range, data) {
    const googleSheetClient = await this._getClient();
    await googleSheetClient.spreadsheets.values.update({
      spreadsheetId: this.sheetId,
      range: `${tabName}!${range}`,
      valueInputOption: 'USER_ENTERED',
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

  async _getEventRange(id) {
    const events = await this.getEvents();
    const eventIndex = events.findIndex(event => event.id === id);
    if (eventIndex === -1) {
      return null;
    }
    const rowNumber = eventIndex + GOOGLE_SHEETS_ROWS_NUMERATION_STARTS_FROM + HEADER_ROWS_COUNT;
    return `A${rowNumber}:F${rowNumber}`
  }

  async editEvent(id, { title, start, end, allDay, owner }) {
    const event = [id, title, start, end, allDay, owner];
    const range = await this._getEventRange(id);
    if (!range) {
      return null;
    }

    await this._updateGoogleSheet(TABLES.events, range, [event]);
    return {
      id,
      title,
      start,
      end,
      allDay,
      owner
    }
  }

  async getEvents(owner) {
    const data = await this._readGoogleSheet(TABLES.events, 'A:F');
    const mappedData = data.map(([id, title, start, end, allDay, owner]) => ({
      id,
      title,
      start: Number(start),
      end: Number(end),
      allDay: JSON.parse(allDay.toLowerCase()),
      owner
    }));
    const filteredData = owner ? mappedData.filter(event => event.owner === owner) : mappedData;
    return filteredData;
  }
}

module.exports = Database;