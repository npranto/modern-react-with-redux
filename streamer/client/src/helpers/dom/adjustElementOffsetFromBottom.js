const adjustElementOffsetFromBottom = (elem) => {
  const element = document.querySelector(elem);
  if (element) {
    const elementHeight = element.clientHeight;
    const elementOffsetFromTop = element.offsetTop;
    const windowHeight = window.innerHeight;

    if ((elementHeight + elementOffsetFromTop) >= windowHeight) {
      element.style.position = 'absolute';
      element.style.bottom = '10px';
    }
  }
};

export default adjustElementOffsetFromBottom;
