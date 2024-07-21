const formEl = document.querySelector('form');
const inputEl = document.querySelector('input');
const textareaEl = document.querySelector('textarea');
const localStorageKey = 'feedback-form-state';
let formData = { email: '', message: '' };

checkLocalStorage(formEl);

function checkLocalStorage(form) {
  const parsedFormData = JSON.parse(localStorage.getItem(localStorageKey));

  if (parsedFormData === null) {
    return;
  }

  formData = parsedFormData;

  for (const key in parsedFormData) {
    if (parsedFormData.hasOwnProperty(key)) {
      form.elements[key].value = parsedFormData[key];
    }
  }
}

const onFormInput = event => {
  const fieldName = event.target.name;
  const fieldValue = event.target.value.trim();

  formData[fieldName] = fieldValue;
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
};

const onFormSubmit = event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    return alert('Fill please all fields');
  }

  console.log(formData);

  localStorage.removeItem(localStorageKey);
  formData = { email: '', message: '' };
  formEl.reset();
};

function addPlaceholderText(event) {
  if (event.target === inputEl || event.target === textareaEl) {
    event.target.placeholder = 'Type area';
  }
}

function removePlaceholderText(event) {
  if (event.target === inputEl || event.target === textareaEl) {
    event.target.placeholder = '';
  }
}

formEl.addEventListener('input', onFormInput);
formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('focus', addPlaceholderText, true);
formEl.addEventListener('blur', removePlaceholderText, true);
window.addEventListener('load', () => (inputEl.placeholder = 'Type area'));
