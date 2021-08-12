export default class ICase {
  /**
   * Url of the website where to find court cases
   * @return {String}
   */
  static getWebsite() {
    throw ('Not Implemented');
  }

  /**
   * generates a regex to use for testing case number inputs
   * @return {RegExp}
   */
  static getNumberRegex() {
    throw ('Not Implemented');
  }

  /**
   * finds all the cases by a given number
   * @param {String} number A number associated with a case like ticket or docket
   * @return {Array.ICase}
   */
  static async findAll(number) {
    throw ('Not Implemented');
  }

  /**
   * generate a testcase for demo purposes where the date is set to sometime the next day
   * @return {ICase}
   */
  static async getTestCase() {
    throw ('Not Implemented');
  }

  /**
   * get a helper text to send to the user for instructions on how to use courtbot
   * @return {String}
   */
  static async getHelpText() {
    throw ('Not Implemented');
  }

  /**
   * 
   * @param {String} uid A unique id for a case
   * @param {String} number A number associated with a case like ticket or docket
   * @param {Date} date Date of when the case takes place
   * @param {String} address Address of where the case takes place
   */
  constructor(uid, number, date, address) {
    this.uid = uid;
    this.number = number;
    this.date = date;
    this.address = address;
  }
}

/**
 * This function returns the instance implementation of ICase
 * @param {String} instance directory to use to get the ICase implementation
 * @returns {ICase}
 */
export async function getCaseModel (instance) {
  return (await import(`../instances/${instance}`)).Case;
};