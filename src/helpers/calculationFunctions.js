const calcTotalHours = (hoursArray) => {
  return hoursArray.reduce((acc, hours) => acc + hours, 0).toFixed(1);
};

export { calcTotalHours };
