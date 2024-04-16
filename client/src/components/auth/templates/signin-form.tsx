import React, {useContext} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {Form} from "@/app/form";
import PasswordEyeIcon from "@/app/ui/icons/forms/PasswordEyeIcon";
import Icon from "@/app/ui/icons";
import {AuthContext} from "@/app/auth-wrapper/auth-wrapper";
import {SettingsContext} from "@/app/settings/settings";
import FormSchema from "@/app/form/schema/FormSchema";
import FormSchemaFields from "@/app/form/schema/form-schema-fields";
import FormSchemaButtons from "@/app/form/schema/form-schema-buttons";
import {BalloonContext} from "@/app/balloon/balloon-wrapper";
import {SIGNIN_API_URL} from "@/configs";
import ApiService from "@/services/api-service";

const SigninForm = () => {

  const {lang, setLang} = useContext(SettingsContext);
  const {signIn} = useContext(AuthContext);
  const {showMsg} = useContext(BalloonContext);
  const navigate = useNavigate();

  const config = {
    title: {
      ru: 'Вход',
      en: 'Login',
    }
  }

  const switchLang = () => {
    setLang(lang == "ru" ? 'en' : 'ru');
  }

  const signInHandler = async ({values}) => {


    const res = await ApiService.post('/auth/signIn', values);//SIGNIN_API_URL

    if (res.error) {
      showMsg(res.error);
      return;
    } else {
      signIn(res.data.accessToken);
      navigate('/');
    }
  }

  const formSchema = new FormSchema()
    .setSubmit(signInHandler)
    .setLang(lang)
    .setField({
      name: 'email',
      component: 'input',
      //  valueFormat: "integer",
      ///  mask: "+99999999999",
      type: 'text',
      label: {ru: 'Email', en: 'Email'},
      placeholder: {ru: "my@mail.com", en: "my@mail.com"},
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
      name: 'account_id',
      type: 'select',
      component: 'select',
      inputElement: 'div',
      isEmpty: true,
      data: [{name: (lang == 'ru') ? 'Россия' : 'Russia', id: 1}, {
        name: (lang == 'ru') ? 'Армения' : 'Armenia',
        id: 2
      }],
      label: {ru: 'Аккаунт*', en: 'Account*'},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    .setButtons([
      {
        label: {ru: 'Войти', en: 'Sign in'},
        class: 'prb-button blue',
        type: 'submit',
        name: 'login_button',
      }
    ]);

  formSchema.setInitialValues({
    // email: 'maksimov_den@mail.ru',
    // password: 'z7893727',
  });

  formSchema.getField('password').setProp('elementProps', {
    icons: [
      <Icon
        fill="#FF0000"
        style={{width: '30px', padding: '11px 20px 0 0'}}
        handleOnMouseDown={(event: React.MouseEvent<HTMLDivElement>, props: { [key: string]: any }) => {
          props.setInputType("text");
        }}
        handleOnMouseUp={(event: React.MouseEvent<HTMLDivElement>, props: { [key: string]: any }) => {
          props.setInputType("password");
        }}
      ><PasswordEyeIcon/></Icon>
    ],
  },);

  return (
    <div className="box login_block" style={{width: '320px', margin: '0 auto'}}>

      {/*<h2 style={{padding: '0px 0 20px 0'}}>{config.title[lang]}</h2>*/}

      <div className="box-body">
        <Form schema={formSchema}>
          <FormSchemaFields/>
          <div style={{padding: "25px 0"}}>
            <FormSchemaButtons/>
          </div>
        </Form>

        <div
          style={{
            padding: "15px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "space-between",
            alignContent: "space-between"
          }}>
          <NavLink to={"/auth/signUp"}>
            {lang == "ru" && "Регистрация"}
            {lang == "en" && "Sign up"}
          </NavLink>
          <NavLink to={"/auth/password-reset"}>
            {lang == "ru" && "Забыл пароль"}
            {lang == "en" && "Forgot password"}
          </NavLink>
        </div>

      </div>
    </div>
  );
};

export default SigninForm;