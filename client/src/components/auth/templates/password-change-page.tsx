import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import FormSchema from "@/app/form/schema/FormSchema";
import {SettingsContext} from "@/app/settings/settings";
import {AuthContext} from "@/app/auth-wrapper/auth-wrapper";
import {BalloonContext} from "@/app/balloon/balloon-wrapper";
import {Form} from "@/app/form";
import FormSchemaFields from "@/app/form/schema/form-schema-fields";
import FormSchemaButtons from "@/app/form/schema/form-schema-buttons";

const PasswordChangePage = () => {

    const {lang, setLang} = useContext(SettingsContext);
    const {signIn} = useContext(AuthContext);
    const {showMsg} = useContext(BalloonContext);
    const navigate = useNavigate();

    const submitSuccess = {
      ru: "Вы успешно зарегистрированы!",
      en: "You are successfully registered!",
    };

    const submitHandler = async ({values}) => {

      const res = '';//await changePassword(values);

      if (res.error) {
        showMsg(res.error);
        return;
      } else {
        navigate('/auth/signIn');
      }

    }


    const formSchema = new FormSchema()
      .setSubmit(submitHandler)
      .setLang(lang)
      .setField({
        name: 'code',
        component: 'inputMask',
        valueFormat: "integer",
        mask: "999999",
        type: 'text',
        placeholder: {ru: "код", en: "code"},
        label: {ru: 'Код из смс', en: 'Sms code'},
        rules: [
          {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
        ]
      })
      .setField({
        name: 'password',
        type: 'password',
        component: 'input',
        placeholder: {ru: "*****", en: "*****"},
        label: {ru: 'Пароль (мин. 6 символов)', en: 'Password (min 6 char)'},
        rules: [
          {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
        ]
      })
      .setField({
        name: 'password_confirm',
        type: 'password',
        component: 'input',
        placeholder: {ru: "*****", en: "*****"},
        label: {ru: 'Пароль (мин. 6 символов)', en: 'Password (min 6 char)'},
        rules: [
          {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
        ]
      })
      .setButtons([
        {
          label: {ru: 'Изменить пароль', en: 'Change password'},
          class: 'prb-btn-login',
          type: 'submit',
          name: 'login_button',
        }
      ]);

    return (
      <div className="box-body">
        <Form schema={formSchema}>

          <FormSchemaFields/>

          <div style={{padding: "25px 0"}}>
            <FormSchemaButtons/>
          </div>

          <div
            style={{
              padding: "15px 0",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "flex-end",
            }}
          >

          </div>
        </Form>
      </div>
    );
  }

export default PasswordChangePage;