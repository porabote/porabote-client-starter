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
    ]
  })
  .setField({
    name: 'surname',
    component: 'input',
    type: 'text',
    placeholder: {ru: "Фамилия", en: "Surname"},
    label: {ru: 'Фамилия', en: 'Surname'},
    rules: [
      {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
    ]
  })
  // .setField({
  //   name: 'phone',
  //   component: 'input',
  //   type: 'text',
  //   placeholder: {ru: "", en: ""},
  //   label: {ru: 'Телефон*', en: 'Phone*'},
  // })
  .setField({
    name: 'email',
    component: 'input',
    type: 'text',
    placeholder: {ru: "email", en: "email"},
    label: {ru: 'Электронная почта', en: 'Email'},
    rules: [
      {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
    ]
  })
  .setField({
    name: 'password',
    type: 'password',
    component: 'input',
    placeholder: {ru: "*****", en: "*****"},
    label: {ru: 'Пароль*', en: 'Password*'},
    rules: [
      {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
    ]
  })
  .setField({
    name: 'password_confirm',
    type: 'password',
    component: 'input',
    placeholder: {ru: "*****", en: "*****"},
    label: {ru: 'Пароль повторно*', en: 'Password repeat*'},
    rules: [
      {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
    ]
  })
  // .setField({
  //   name: 'birth',
  //   type: 'date',
  //   component: 'input-date',
  //   label: {ru: 'Дата рождения', en: 'Birth date'},
  // })
  // .setField({
  //   name: 'notify_flg',
  //   type: 'checkbox',
  //   component: 'checkbox',
  //   label: {ru: 'Хочу получать уведомления', en: 'Receive notifications'},
  // })
  .setButtons([
    {
      label: {ru: 'Зарегистрироваться', en: 'Sign up'},
      class: 'prb-btn-login',
      type: 'submit',
      name: 'login_button',
    }
  ]);

export default formSchema;