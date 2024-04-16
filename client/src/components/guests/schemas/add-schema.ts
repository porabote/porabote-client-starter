import FormSchema from "@/app/form/schema/FormSchema";

const formSchema = new FormSchema()
  .setField({
    name: 'name',
    component: 'input',
    type: 'text',
    placeholder: {ru: "имя", en: "name"},
    label: {ru: 'Имя*', en: 'Name*'},
    rules: [
      {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
    ],
  })
  .setField({
    name: 'phone',
    valueFormat: "integer",
    mask: "+99999999999999",
    component: 'inputMask',
    type: 'text',
    placeholder: {ru: "", en: ""},
    label: {ru: 'Телефон*', en: 'Phone*'},
    rules: [
      {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
    ],
  })
  .setField({
    name: 'birth',
    type: 'date',
    component: 'input-date',
    label: {ru: 'Дата рождения', en: 'Birth date'},
  })
  .setField({
    name: 'email',
    component: 'input',
    type: 'text',
    placeholder: {ru: "email", en: "email"},
    label: {ru: 'Электронная почта', en: 'Email'},
  })
  .setField({
    name: 'password',
    component: 'input',
    type: 'password',
    placeholder: {ru: "", en: ""},
    label: {ru: 'Пароль', en: 'Password'},
  })
  .setButtons([
    {
      label: {ru: 'Сохранить', en: 'Save'},
      class: 'prb-button blue',
      type: 'submit',
      name: 'login_button',
    }
  ]);

export default formSchema;