import {FormSchemaType} from "../../form/types";
import FormSchema from "../../form/schema/FormSchema";

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
    placeholder: {ru: 'фамилия', en: 'Ivanov'},
    label: {ru: "Фамилия*", en: "Surname*"},
    rules: [
      {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
    ]
  })
  .setField({
    name: 'post_name',
    component: 'input',
    type: 'text',
    placeholder: {ru: "название должности", en: "post name"},
    label: {ru: 'Должность*', en: 'Post name*'},
    rules: [
      {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
    ]
  })
  .setField({
    name: 'email',
    component: 'input',
    type: 'text',
    placeholder: {ru: "email", en: "email"},
    label: {ru: 'Электронная почта*', en: 'Email*'},
    rules: [
      {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
    ]
  })
  .setField({
    name: 'phone',
    component: 'input',
    type: 'text',
    placeholder: {ru: "", en: ""},
    label: {ru: 'Телефон', en: 'Phone'},
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
  .setButtons([
    {
      label: {ru: 'Отправить заявку', en: 'Sign up'},
      class: 'prb-button blue',
      type: 'submit',
      name: 'login_button',
    }
  ]);


// const formSchema2: FormSchemaType = {

//   fields: {
//     name: {
//       type: 'input',
//       label: {
//         ru: 'Имя*',
//         en: 'Name*',
//       },
//       rules: [
//         {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
//       ]
//     },
//     surname: {
//       type: 'input',
//       label: {
//         ru: 'Фамилия*',
//         en: 'Surname*',
//       },
//       rules: [
//         {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
//       ]
//     },
//     post_name: {
//       type: 'input',
//       label: {
//         ru: 'Должность*',
//         en: 'Post name*',
//       },
//       rules: [
//         {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
//       ]
//     },
//     email: {
//       type: 'input',
//       label: {
//         ru: 'Электронная почта*',
//         en: 'Email*',
//       },
//       rules: [
//         {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
//       ]
//     },
//     phone: {
//       type: 'input',
//       label: {
//         ru: 'Телефон',
//         en: 'Phone',
//       },
//     },
//     password: {
//       type: 'password',
//       label: {
//         ru: 'Пароль*',
//         en: 'Password*',
//       },
//       rules: [
//         {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
//       ],
//     },
//     password_confirm: {
//       type: 'password',
//       label: {
//         ru: 'Пароль повторно*',
//         en: 'Password confirm*',
//       },
//       rules: [
//         {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
//       ],
//     },
//   }
// };

export default formSchema;