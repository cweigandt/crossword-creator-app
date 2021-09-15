export const newPuzzleObjFromTemplate = (puzzleObj) => {
  const copy = { ...puzzleObj };
  copy.template = copy.template.map((row) => row.map((el) => el));
  delete copy['elements'];
  return copy;
};

export const copyTextToClipboard = (text) => {
  if (!navigator.clipboard) {
    alert('Unable to copy to clipboard');
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Async: Copying to clipboard was successful!');
    },
    function (err) {
      console.error('Async: Could not copy text: ', err);
    }
  );
};
