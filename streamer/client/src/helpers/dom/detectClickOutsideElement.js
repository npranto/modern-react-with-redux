const detectClickOutsideElement = (elemId, cb) => {
  // const elem = document.getElementById(elemId);
  // console.log({ elem });

  window.addEventListener('click', function(e){ 
    const elem = document.getElementById(elemId);
    if (elem && elem.contains(e.target)) {
      console.log('Clicked Inside!');
    } else {
      console.log('Clicked Outside!');
      cb()
    }
  });
}

export default detectClickOutsideElement;