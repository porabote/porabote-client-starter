import React, {useContext, useEffect, useState} from "react";
import {Form} from "@/app/form";
import {SettingsContext} from "@/app/settings/settings";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "@/app/auth-wrapper";
import {BalloonContext} from "@/app/balloon/balloon-wrapper";
import FormSchemaFields from "@/app/form/schema/form-schema-fields";
import FormSchemaButtons from "@/app/form/schema/form-schema-buttons";
import FormSchema from "@/app/form/schema/FormSchema";
import Api from "@/services/api-service";
import ApiService from "@/services/api-service";
import {ModalContext} from "@/app/modal/modal-wrapper";


const EditPayment = (props) => {

  const {lang} = useContext(SettingsContext);
  const {showMsg} = useContext(BalloonContext);
  const {closeModal} = useContext(ModalContext);
  const navigate = useNavigate();

  const configs = {
    submitSuccess: {
      ru: "Запись сохранена",
      en: "Record was added!",
    }
  };


  const submitHandler = async ({values}) => {

    const res = ApiService.post("/payments/action/updateRecord", values);

    if (typeof res.error != "undefined") {
      showMsg(res.error);
      return;
    } else {
      showMsg(configs.submitSuccess[lang]);
      props.fetchData();
      closeModal();
    }
  }


  const formSchema = new FormSchema()
    .setField({
      name: 'sum',
      component: 'input',
      type: 'text',
      label: {ru: 'Сумма*', en: 'Sum*'},
      placeholder: {ru: "Сумма", en: "Sum"},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    .setButtons([
      {
        label: {ru: 'Сохранить', en: 'Save'},
        class: 'prb-btn-login',
        type: 'submit',
        name: 'login_button',
      }
    ]);

  formSchema.setSubmit(submitHandler)
    .setLang(lang)
    .setInitialValues({
      sum: props.record.sum,
      id: props.record.id,
    });

  formSchema.setButtons([
    {
      label: {ru: 'Сохранить', en: 'Save'},
      class: 'prb-button blue',
      type: 'submit',
      name: 'login_button',
    }
  ]);

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

export default EditPayment;
