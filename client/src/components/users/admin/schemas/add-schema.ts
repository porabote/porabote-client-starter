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
    name: 'surname',
    component: 'input',
    type: 'text',
    placeholder: {ru: "Фамилия", en: "Surname"},
    label: {ru: 'Фамилия*', en: 'Surname*'},
    rules: [
      {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
    ],
  })
  .setField({
    name: 'post_name',
    component: 'input',
    type: 'text',
    placeholder: {ru: "Должность", en: "Post"},
    label: {ru: 'Должность*', en: 'Post*'},
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
    label: {ru: 'Телефон', en: 'Phone'},
  })
  .setField({
    name: 'email',
    component: 'input',
    type: 'text',
    placeholder: {ru: "email", en: "email"},
    label: {ru: 'Электронная почта', en: 'Email'},
  })
  .setField({
    name: 'status',
    component: 'select',
    type: 'text',
    label: {ru: 'Статус', en: 'Status'},
    data: [
      {id: 'new', name: 'Новый'},
      {id: 'invited', name: 'Приглашён'},
      {id: 'external', name: 'Внешний'},
      {id: 'active', name: 'Активен'},
      {id: 'fired', name: 'Уволен'},
    ],
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