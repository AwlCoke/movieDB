import { format } from 'date-fns';

const toValid = (date) => {
    if (date instanceof Date && !isNaN(date)) return date;
    if (!isNaN(new Date(date).getTime())) return new Date(date).getTime();
    return NaN;
}

const formatDate = (date) => {
    const res = toValid(date)
    return !isNaN(res) ? format(res, 'do MMMM yyyy') : 'Date of release is unknown';
}

// const formatDate = (date) => {
//     return format(new Date(date), 'do MMMM yyyy');
// }

export default formatDate;