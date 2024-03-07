import React, {useContext} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {Form} from "@/app/form";
import Logo from "@/resources/svg/logo.svg";
import PasswordEyeIcon from "@/app/ui/icons/forms/PasswordEyeIcon";
import Icon from "@/app/ui/icons";
import {AuthContext} from "../auth-wrapper";
import {SettingsContext} from "../../settings/settings";
import FormSchema from "@/app/form/schema/FormSchema";
import FormSchemaFields from "@/app/form/schema/form-schema-fields";
import FormSchemaButtons from "@/app/form/schema/form-schema-buttons";
import {BalloonContext} from "../../balloon/balloon-wrapper";

const SigninForm = () => {

  const {lang} = useContext(SettingsContext);
  const {signIn} = useContext(AuthContext);
  const {showMsg} = useContext(BalloonContext);
  const navigate = useNavigate();

  const signInHandler = ({values}) => {

    const callbackSuccess = (response) => {
      if (response.error) {
        showMsg(response.error);
        return;
      }

      navigate('/');
    }

    const callbackError = (response) => {
      showMsg(response.error);
      return;
    }

    signIn(values, callbackSuccess, callbackError);
  }

  const formSchema = new FormSchema()
    .setSubmit(signInHandler)
    .setLang(lang)
    .setButtons([
      {
        label: {ru: 'Войти', en: 'Sign in'},
        class: 'prb-button blue',
        type: 'submit',
        name: 'login_button',
      }
    ])
    .setField({
      name: 'username',
      component: 'input',
      type: 'text',
      placeholder: {ru: "email", en: "email"},
      label: {ru: 'Электронная почта*', en: 'Email*'},
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
      name: 'account_id',
      type: 'select',
      component: 'select',
      inputElement: 'div',
      isEmpty: true,
      data: [{name: 'Россия', id: 1}, {name: 'Армения', id: 2}],
      label: {ru: 'Аккаунт*', en: 'Account*'},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    });

  formSchema.setInitialValues({
    account_id: 2,
    username: '',
    password: '',
  });

  formSchema.getField('password').setProp('elementProps',  {
    icons: [
      <Icon
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
    <div className="box login" style={{width: '360px', margin: '0 auto'}}>

      <div style={{display: 'flex', padding: '30px 15px 10px 15px'}}>
        <img alt="Bourlesque" style={{width: "110px"}} src={Logo}/>
      </div>

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
          <NavLink to={"/auth/signUp"}>Регистрация</NavLink>
          <NavLink to={"/auth/forgotPassword"}>Забыл пароль</NavLink>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;