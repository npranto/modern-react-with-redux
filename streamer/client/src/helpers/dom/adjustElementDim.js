const $ = window.$;

export const dim = (elem) => {
  $(elem).dimmer('show');
}

export const removeDim = (elem) => {
  $(elem).dimmer('hide');
}