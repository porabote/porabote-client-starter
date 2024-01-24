import React, {MouseEventHandler} from "react";
import {NavLink} from "react-router-dom";
//import { check, login } from "../auth-service";
import {
  Form,
  Field,
  Input,
  Button,
  Select,
  Option,
} from "@/app/form";
import Logo from "@/resources/svg/logo.svg";
import PasswordEyeIcon from "@/app/ui/icons/forms/PasswordEyeIcon";
import Icon from "@/app/ui/icons";
import {FormContextType} from "@/app/form/types";

const LoginForm = (props: {}) => {

  const initValues = {
    password: "z7893727",
    client_id: "3",
  };

  const login = (context: FormContextType): void => {
    console.log(context.values);
  }

  return (
    <div className="box login" style={{width: '360px', margin: '0 auto'}}>

      <div style={{display: 'flex', padding: '30px 15px 10px 15px'}}>
        <img style={{width: "110px"}} src={Logo}/>
      </div>

      <div className="box-body">
        <Form
          onSubmit={login}
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
              name="account_id">
              {
                [{name: 'test1', id: 1}, {name: 'test2', id: 2}].map((datum, index) => {
                  console.log(datum);
                  return (
                    <Option value={datum.id} key={index}>
                      {datum.name}
                    </Option>
                  )
                })
              }
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
