import React, {useContext} from "react";
import {Form} from "@/app/form";
import {SettingsContext} from "@/app//settings/settings";
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "@/app/auth-wrapper";
import {BalloonContext} from "@/app/balloon/balloon-wrapper";
import formSchema from "./signup-schema";
import FormSchemaFields from "@/app/form/schema/form-schema-fields";
import FormSchemaButtons from "@/app/form/schema/form-schema-buttons";


const SignupForm = () => {

  const {lang} = useContext(SettingsContext);
  const {signUp} = useContext(AuthContext);
  const {showMsg} = useContext(BalloonContext);
  const navigate = useNavigate();

  const configs = {
    signUpSuccess: {
      ru: "Вы успешно зарегистрированы!",
      en: "You are successfully registered!",
    }
  };

  const signUpHandler = async ({values}) => {

    const res = await signUp(values);

    if (typeof res.error != "undefined") {
      showMsg(res.error);
      return;
    } else {
      showMsg(configs.signUpSuccess[lang]);
      navigate('/auth/signIn');
    }
  }

  formSchema.setSubmit(signUpHandler)
    .setLang(lang)
    .setInitialValues({
      // name: "Денис",
      // surname: "Максимов",
      // phone: "+79267064488",
      // email: "maksimov_den@mail.ru",
      // password: "z7893727",
      // password_confirm: "8988",
      // notify_flg: 1,
    });

  formSchema.setButtons([
    {
      label: {ru: 'Зарегистрироваться', en: 'Sign up'},
      class: 'prb-button blue',
      type: 'submit',
      name: 'login_button',
    }
  ]);

  const config = {
    title: {
      ru: 'Регистрация',
      en: 'Sign up',
    }
  }

  return (
    <div className="box login" style={{width: '340px', margin: '0 auto'}}>

      <div className="box-body">
        <Form schema={formSchema}>
          <FormSchemaFields/>
          <div style={{padding: "25px 0"}}>
            <FormSchemaButtons/>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignupForm;
