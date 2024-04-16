import React, {useContext, useEffect, useState} from "react";
import {Form} from "@/app/form";
import {SettingsContext} from "@/app/settings/settings";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "@/app/auth-wrapper";
import {BalloonContext} from "@/app/balloon/balloon-wrapper";
import FormSchemaFields from "@/app/form/schema/form-schema-fields";
import FormSchemaButtons from "@/app/form/schema/form-schema-buttons";
import FormSchema from "../../../app/form/schema/FormSchema";
import Api from "../../../services/api-service";
import ApiService from "../../../services/api-service";
import {ModalContext} from "../../../app/modal/modal-wrapper";


const Add = () => {

  const {lang} = useContext(SettingsContext);
  const {signUp} = useContext(AuthContext);
  const {showMsg} = useContext(BalloonContext);
  const {closeModal} = useContext(ModalContext);
  const navigate = useNavigate();

  const configs = {
    submitSuccess: {
      ru: "Пункт добавлен",
      en: "Record was added!",
    }
  };

  const [parentsList, setParentsList] = useState([]);

  const submitHandler = async ({values}) => {

    const res = ApiService.post("/menus/action/add", values);

    if (typeof res.error != "undefined") {
      showMsg(res.error);
      return;
    } else {
      showMsg(configs.submitSuccess[lang]);
      closeModal();
    }
  }

  const getDicts = async () => {
    const parentsList = await Api.get("/menus/action/getUserMenu");
    setParentsList(parentsList.data);
  }

  useEffect(() => {
    getDicts();
  }, []);

  if (!parentsList.length) {
    return <p></p>;
  }

  const formSchema = new FormSchema()
    .setField({
      name: 'title_ru',
      component: 'input',
      type: 'text',
      label: {ru: 'Название Ru*', en: 'Name RU*'},
      placeholder: {ru: "Название", en: "name"},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    .setField({
      name: 'title_en',
      component: 'input',
      type: 'text',
      label: {ru: 'Название En *', en: 'Name En*'},
      placeholder: {ru: "Название", en: "name"},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    .setField({
      name: 'link',
      component: 'input',
      type: 'text',
      label: {ru: 'Ссылка', en: 'Link'},
      placeholder: {ru: "/", en: "/"},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    .setField({
      name: 'parent_id',
      type: 'select',
      label: {ru: 'Родитель*', en: 'Parent*'},
      component: 'select',
      inputElement: 'div',
      isEmpty: true,
      data: parentsList,
      optionTitle: (record) => {
        return record[`title_${lang}`];
      }
    })
    .setButtons([
      {
        label: {ru: 'Зарегистрироваться', en: 'Sign up'},
        class: 'prb-btn-login',
        type: 'submit',
        name: 'login_button',
      }
    ]);

  formSchema.setSubmit(submitHandler)
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

export default Add;
