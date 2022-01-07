function makeInput(id) {
  const $input = document.createElement('input');
  $input.id = id;
  $input.name = name;
  return $input;
}

function validation() {
	
	let message = '';

	if (this.id == 'form-control-0' || this.id == 'form-control-1') {
      if(this.value.length < 2) {
        message = 'Please, enter a value greater than 2 symbols';
      }
   }
   if (this.id == 'form-control-2') {
      if(/\D/.test(this.value)) {
        message = 'Enter only numbers';
      }
   }
   if (this.id == 'form-control-3') {
      if(!this.value.includes('@')) {
        message = 'Email does not contain @';
      }
   }
   if (this.id == 'form-control-4') {
      if(this.value.length < 8) {
        message = 'Please, enter a value greater than 8 symbols';
      }
   }
  
  
  document.getElementById('form-text-' + this.id[13]).innerHTML = message;

}

function makeTextInput(id, name) {
  let  $input = makeInput(id);
  let message = 'Too short value';
  $input.classList.add('form-control'); //*
  //$input.classList.add('form-control-' + id);
  $input.id = ('form-control-' + id) //*
  $input.type = 'text';
  $input.addEventListener( "change" , validation);
  return $input;
}

function makeCheckboxInput(id) {
  const $input = makeInput(id);
  $input.classList.add('form-check-input');
  $input.type = 'checkbox';
  return $input;
}

function makeLabel(id, label) {
  const $label = document.createElement('label');
  $label.innerHTML = label;
  $label.for = id;
  return $label;
}

function makeTextLabel(id, label) {
  const $label = makeLabel(id, label);
  $label.classList.add('form-label');
  return $label;
}

function makeCheckboxLabel(id, label) {
  const $label = makeLabel(id, label);
  $label.classList.add('form-check-label');
  return $label;
} 

function makeHelbBlock(message = '', id) {
  const $helpBlock = document.createElement('div');
  $helpBlock.classList.add('form-text');
  $helpBlock.id = ('form-text-' + id); //*
  $helpBlock.innerHTML = message;
  return $helpBlock;
}

function makeField() {
  const $field = document.createElement('div');
  $field.classList.add('mb-3');  
  return $field;
}

function makeCheckboxField(id, name) {
  const $field = makeField();
  $field.classList.add('form-check');
  $field.appendChild(makeCheckboxInput(id));
  $field.appendChild(makeCheckboxLabel(id, name));
  $field.appendChild(makeHelbBlock('', id));
  return $field;
}

function makeTextField(id, name) {
  const $field = makeField();
  $field.appendChild(makeTextLabel(id, name));
  $field.appendChild(makeTextInput(id, name));
  $field.appendChild(makeHelbBlock('', id));
  return $field;
}

class FormBuilder{

  constructor() {
    this._fields = [];
    this._id = 0;
  }

  addTextField(property){
    this._fields.push(makeTextField(this._id++, property));
    return this;
  }

  addCheckboxField(property){
    this._fields.push(makeCheckboxField(this._id++, property));
    return this;
  }

  build(){
    const $form = document.createElement('form');
    for(let field of this._fields) {
      $form.appendChild(field);
    }

    const $submit = document.createElement('button');
    $submit.innerHTML = 'Submit';
    $submit.classList.add('btn');
    $submit.classList.add('btn-primary');
    $form.appendChild($submit);

    return $form;
  }
}

let builder = new FormBuilder();

let form = builder
    .addTextField('First Name')
    .addTextField('Last Name')
    .addTextField('Telephone number')
    .addTextField('E-mail')
    .addTextField('Password')
    .addCheckboxField('RememberMe')
    .build();

document.querySelector('.container').appendChild(form);