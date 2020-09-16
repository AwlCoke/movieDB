import { format } from 'date-fns';

const toValid = (date) => {
  if (date instanceof Date && !Number.isNaN(date)) return date;
  if (!Number.isNaN(new Date(date).getTime())) return new Date(date).getTime();
  return NaN;
};

const formatDate = (date) => {
  const res = toValid(date);
  return !Number.isNaN(res) ? format(res, 'do MMMM yyyy') : 'Date of release is unknown';
};

export default formatDate;
