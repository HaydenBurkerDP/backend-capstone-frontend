export const displayDate = (dateString) => {
  if (!dateString) return "mm/dd/yyyy";
  const date = new Date(dateString);
  const [day, month, year] = getDayMonthYear(date);

  return `${month}/${day}/${year}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const [day, month, year] = getDayMonthYear(date);

  return `${year}-${month}-${day}`;
};

const getDayMonthYear = (date) => {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  day = ("0" + day).slice(-2);
  month = ("0" + month).slice(-2);
  year = ("000" + year).slice(-4);
  return [day, month, year];
};
