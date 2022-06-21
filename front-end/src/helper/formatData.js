import { format } from 'date-fns';

function formatData(data) {
  const date = new Date(data.toString());
  const formatedDate = format(date, 'dd/MM/yyyy');
  return formatedDate;
}

export default formatData;
