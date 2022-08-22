const generateOperand = () => {
  return Math.trunc(Math.random() * 9 + 1);
};

const generateOperatorIndex = () => {
  return Math.trunc(Math.random() * 3);
};

const hideElement = (...elements) => {
  for (const element of elements) {
    element.classList.add('hidden');
  }
};

const showElement = (...elements) => {
  for (const element of elements) {
    element.classList.remove('hidden');
  }
};

const toggleElement = element => {
  element.classList.toggle('hidden');
};

const generateResult = (firstOperand, secondOperand, operator) => {
  if (operator === '+') return firstOperand + secondOperand;
  else if (operator === '-') return firstOperand - secondOperand;
  else if (operator === 'x') return firstOperand * secondOperand;
};

const generateQuestion = () => {
  firstOperand = generateOperand();
  secondOperand = generateOperand();
  operator = DEFAULT_OPERATOR[generateOperatorIndex()];

  firstOperandEl.textContent = firstOperand;
  secondOperandEl.textContent = secondOperand;
  operatorEl.textContent = operator;

  result = generateResult(firstOperand, secondOperand, operator);
};
