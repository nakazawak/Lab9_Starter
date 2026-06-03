
let errorButtons = document.querySelectorAll('#error-btns > button');
let form = document.querySelector('form');

function handleButtonClick(buttonText) 
{
  switch (buttonText) {
    case 'Console Log':
      console.log('This is a log message!');
      break;

    case 'Console Error':
      console.error('This is an error message!');
      break;

    case 'Console Count':
      console.count('console count');
      break;

    case 'Console Warn':
      console.warn('This is a console warning.');
      break;

    case 'Console Assert':
      console.assert(1 === 1, "if passes this message should not be visible");
      console.assert(1 === 2, "if fails this message should be visible");
      break;

    case 'Console Clear':
      console.clear();
      break;

    case 'Console Dir':
      console.dir(form);
      break;

    case 'Console dirxml':
      console.dirxml(form);
      break;

    case 'Console Group Start':
      console.group('A console group');
      console.log('A console group has been created');
      break;

    case 'Console Group End':
      console.log('Ending group');
      console.groupEnd();
      break;

    case 'Console Table':
      console.table([
        {variable: 'X', value: 1},
        {variable: 'Y', value: 2},
        {variable: 'Z', value: 3},
      ]);
      break;

    case 'Start Timer':
      console.time('timerA');
      console.log('Timer has started');
      break;

    case 'End Timer':
      console.timeEnd('timerA');
      break;

    case 'Console Trace':
      console.trace('This is a console trace.');
      break;

    case 'Trigger a Global Error':
    setTimeout(() => {
        throw new Error('GLobal error caught!');
    }, 0);
    break;
  }
}

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

window.onerror = (textContent, src, lineNum, colNum, err) => 
{
    console.log('window.onerror caught a global error:');
    console.log('> Message:', textContent);
    console.log('> Source:', src);
    console.log('> Line #:', lineNum);
    console.log('> Col #:', colNum);
    console.log('> Instance:', err);
    return true;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const resultBox = document.querySelector('output');
  const leftValue = document.querySelector('#first-num').value;
  const rightValue = document.querySelector('#second-num').value;
  const op = document.querySelector('#operator').value;

  try 
  {
    if (leftValue.trim() === '' || isNaN(Number(leftValue))) 
    {
      throw new ValidationError(
        'Please type a real number in the first box.',
        'first-num');
    }

    if (rightValue.trim() === '' || isNaN(Number(rightValue))) 
    {
        throw new ValidationError('Please type a real number in the second box.',
        'second-num');
    }

    const answer = eval(`${leftValue} ${op} ${rightValue}`);
    if (!isFinite(answer)) 
      throw new Error('The result is infinite (did you divide by zero?).');

    resultBox.innerHTML = answer;
  } 
  catch (caughtError) 
  {
    if (caughtError instanceof ValidationError) 
    {
      console.error(`[${caughtError.name}] on #${caughtError.field}: ${caughtError.message}`);
      resultBox.innerHTML = `Check your input: ${caughtError.message}`;
    } else 
    {
      console.error('Something went wrong while calculating:', caughtError.message);
      resultBox.innerHTML = `Oops: ${caughtError.message}`;
    }
  } 
  finally 
  {
    console.log('Calculation attempt finished.');
  }
});

for(let i = 0; i < errorButtons.length; i++) {
  let button = errorButtons[i];
  button.addEventListener('click', function () {
    handleButtonClick(button.textContent);
  });
}
