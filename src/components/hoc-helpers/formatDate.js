import { format } from 'date-fns';

const formatDate = (date) => {
    return format(new Date(date), 'do MMMM yyyy');
}

export default formatDate;