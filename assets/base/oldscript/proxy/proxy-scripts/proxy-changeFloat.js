function toFloat(num) {
  if (!num) return "0.00"
  var newnum = num.toFixed(7);
  return (Math.floor(newnum * 100) / 100).toFixed(2);
}
module.exports = toFloat;
