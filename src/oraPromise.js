// a replacement function to pra.promise() until it will work proparly again
import ora from 'ora'

export default (action, { text, color, succesText, failText } = {}) => {
  if (typeof action.then !== 'function') {
    throw new TypeError('Parameter `action` must be a Promise');
  }

  const spinner = new Ora({ text, color });
  spinner.start(text);

  action
    .then(
      msg => {
        spinner.succeed(msg.text ? msg.text : succesText);
      })
    .catch(err => {
      spinner.fail(err ? err : failText);
    })

  return spinner;
}