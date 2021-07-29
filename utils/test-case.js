import moment from 'moment';
import Case from '../models/case.js';

const TEST_CASE_DOCKET = 'testcase';

const createCase = async () => {
  const c = new Case({
    docket: TEST_CASE_DOCKET,
    // set the date to the next day @ 11:00 AM
    date: moment().startOf('day').add(1, 'days').add(11, 'hours').toDate(),
    street: '65 State Street',
    city: 'Montpelier',
  });
  c.save();
  return c;
};

const updateTime = async () => {
  Case.findOneAndUpdate({
    docket: TEST_CASE_DOCKET
  },{
    docket: TEST_CASE_DOCKET,
    // set the date to the next day @ 11:00 AM
    date: moment().startOf('day').add(1, 'days').add(11, 'hours').toDate(),
    street: '65 State Street',
    city: 'Montpelier',
  }, {
    upsert: true,
  }).exec();
};

export default {
  createCase,
  updateTime,
};