import React from "react";
import {NavLink} from "react-router-dom";
import {Form, Field, Input, Button, Select} from "@/app/form";
import Logo from "@/resources/svg/logo.svg";
import PasswordEyeIcon from "@/app/ui/icons/forms/PasswordEyeIcon";
import Icon from "@/app/ui/icons";
import {FormContextType} from "@/app/form/types";
import Api from "@/services";
import {AUTH_URL, APP_DOMAIN_BASE} from "@/configs";

const LoginForm = () => {

  const initValues = {
    password: "z7893727",
    username: "maksimov_den@mail.ru",
  };

  const signIn = async (context: FormContextType): Promise<any> => {
    const res = await Api.post('/auth/signIn', {...context.values}, {
      url: AUTH_URL,
    });

    // if (res.error) {
    //   alert(res.error);
    //   return;
    // }

    const {accessToken, refreshToken} = res.data;
    // console.log(res);
    // console.log(refreshToken);

    const resRT = await Api.auth('/auth/refreshToken', {refreshToken}, {
      url: `https://${APP_DOMAIN_BASE}:7000`,
      credentials: "omit",
    });
    console.log(resRT);
    // document.body.appendChild({refreshToken});
    //
    // const map = window.open(`https://${APP_DOMAIN_BASE}:7000`, "Map", "status=0,title=0,height=600,width=800,scrollbars=1");

  }

  return (
    <div className="box login" style={{width: '360px', margin: '0 auto'}}>

      <div style={{display: 'flex', padding: '30px 15px 10px 15px'}}>
        <img alt="Bourlesque" style={{width: "110px"}} src={Logo}/>
      </div>

      <div className="box-body">
        <Form
          onSubmit={signIn}
          initValues={initValues}>
          <Field>
            <Input placeholder="email" label="Электронная почта" name="username"/>
          </Field>

          <Field>
            <Input
              placeholder="*****"
              label="Пароль"
              name="password"
              type="password"
              elementProps={{
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
              }}
            />
          </Field>

          <Field>
            <Select
              label="Аккаунт"
              data={[{name: 'Россия', id: 1}, {name: 'Армения', id: 2}]}
              name="account_id">
            </Select>
          </Field>

          <div style={{padding: "25px 0"}}>

            <Button
              className="prb-button blue"
              type="submit"
              label="Войти"/>

          </div>

          <div
            style={{
              padding: "15px 0",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <NavLink to={"/auth/forgotPassword/"}>Восстановить пароль</NavLink>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
