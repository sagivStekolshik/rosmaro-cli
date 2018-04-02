// a replacement function to pra.promise() until it will work proparly again
import ora from 'ora'

export default async (action, { succesText = " ", failText = " ", spinner = new Ora() } = {}) => {
  if (typeof action.then !== 'function') {
    throw new TypeError('Parameter `action` must be a Promise');
  }

  // const spinner = new Ora({ text, color });
  spinner.start();

  try {
    const res = await action
    spinner.succeed(res.text ? res.text : succesText);
    return res
  }
  catch (err) {
    spinner.fail(err ? err : failText);
    return err
  }

  // action
  //   .then(
  //     res => {
  //       spinner.succeed(res.text ? res.text : succesText);
  //       return res
  //     })
  //   .catch(err => {
  //     spinner.fail(err ? err : failText);
  //     return err
  //   })
}