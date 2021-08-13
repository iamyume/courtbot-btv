import moment from 'moment';

import ICase from '../../../models/icase';
import CaseDao from '../dao/case';
import dbConnect from '../utils/db-connect';

function toCase(o) {
  return new Case(
    `${o.docket}-${o.county}-${o.division}`,
    o.docket,
    o.date,
    `${o.street} ${o.city}, VT`
  );
}

export default class Case extends ICase {
  static getWebsite() {
    return `https://www.vermontjudiciary.org/court-hearings`;
  }

  static getNumberRegex() {
    return /.+-.+-.+/;
  }

  static async findAll({ number, startDate, endDate }) {
    await dbConnect();

    let params = {};

    if (number) {
      params.docket = number;
    }
    if (startDate || endDate) {
      params.date = {};
    }
    if (startDate) {
      params.date.$gt = startDate;
    }
    if (endDate) {
      params.date.$lt = endDate;
    }
    const cases = await CaseDao.find(params).lean().exec();

    return cases.map(toCase);
  }

  static async getTestCase() {
    return new Case(
      `testcase`,
      `testcase`,
      moment().startOf('day').add(1, 'days').add(11, 'hours').toDate(),
      `65 State Street Montpelier, VT`
    );
  }

  static async getHelpText() {
    return `Reply with a docket number to sign up for a reminder. Docket numbers look like 3 sets of numbers or characters. For example: 123-45-67 or 123-CR-45.`;
  }

  static async getTimezone() {
    return 'America/New_York';
  }
}