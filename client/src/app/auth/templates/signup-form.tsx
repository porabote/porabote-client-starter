import React, {useContext} from "react";
import {Form, Input, Button, Select} from "@/app/form";
import PasswordEyeIcon from "@/app/ui/icons/forms/PasswordEyeIcon";
import Icon from "@/app/ui/icons";
import {SettingsContext} from "../../settings/settings";
import {FormSchemaType} from "@/app/form/types";
import {InputDate} from "@/app/form";
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../auth-wrapper";
import {BalloonContext} from "@/app/balloon/balloon-wrapper";
import formSchema from "./signup-schema";
import FormSchemaFields from "../../form/schema/form-schema-fields";
import FormSchemaButtons from "../../form/schema/form-schema-buttons";


const SignupForm = () => {

  const {lang} = useContext(SettingsContext);
  const {signUp} = useContext(AuthContext);
  const {showMsg} = useContext(BalloonContext);
  const navigate = useNavigate();

  const signUpHandler = ({values}) => {
    const callback = (response) => {
      if (response.error) {
        showMsg(response.error);
        return;
      }

      navigate('/auth/signIn');
    }
    signUp(values, callback);
  }

  formSchema.setSubmit(signUpHandler)
    .setLang(lang)
    .setInitialValues({
      // name: 'Den',
      // email: 'maksimov_den@mail.ru',
      // surname: 'Ma',
      // password: 'z7893727',
      // password_confirm: 'z7893727',
      // post_name: 'секретарь',
    });

  const config = {
    title: {
      ru: 'Регистрация',
      en: 'Sign up',
    }
  }

  return (
    <div className="box login" style={{width: '420px', margin: '0 auto'}}>

      <h2 style={{padding: '40px 0 20px 0'}}>{config.title[lang]}</h2>

      <div className="box-body">
        <Form
          onSubmit={signUpHandler}
          schema={formSchema}>

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

        <div
          style={{
            padding: "0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "space-between",
            alignContent: "space-between"
          }}>
          <NavLink to={"/auth/signIn"}>Вход</NavLink>
        </div>

      </div>
    </div>
  );
};

export default SignupForm;
