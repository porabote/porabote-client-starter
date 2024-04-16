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
import formSchema from "../schemas/add-schema";


const Add = (props) => {

  const {lang} = useContext(SettingsContext);
  const {signUp} = useContext(AuthContext);
  const {showMsg} = useContext(BalloonContext);
  const {closeModal} = useContext(ModalContext);
  const navigate = useNavigate();

  const configs = {
    submitSuccess: {
      ru: "Запись сохранена",
      en: "Record saved!",
    }
  };

  const [rolesList, setRolesList] = useState([]);

  const getDicts = async () => {
    const rolesList = await Api.get("/user-passmen/action/getRoles");
    setRolesList(rolesList.data);
  }

  useEffect(() => {
    getDicts();
  }, []);

  if (!rolesList.length) {
    return <p></p>;
  }

  const config = {
    title: {
      ru: 'Сохранить',
      en: 'Sign up',
    }
  }

  formSchema.setField({
    name: 'role_id',
    type: 'select',
    label: {ru: 'Роль*', en: 'Role*'},
    component: 'select',
    inputElement: 'div',
    isEmpty: true,
    data: rolesList,
    optionTitle: (record) => {
      return record[`name`];
    },
    rules: [
      {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
    ],
  })
  .setField({
    name: 'notify_flg',
    type: 'checkbox',
    component: 'checkbox',
    label: {ru: 'Получать уведомления', en: 'Receive notifications'},
  });

  if (props.data) {
    formSchema.setInitialValues(props.data);
  } else {
    formSchema.setInitialValues({
      role_id: 1,
    });
  }

  const submitHandler = async ({values}) => {

    if (props.data) {
      updateRecord(values);
      return;
    }
    const res = await ApiService.post("/user-passmen/action/add", values);

    if (typeof res.error != "undefined") {
      showMsg(res.error);
      return;
    } else {
      showMsg(configs.submitSuccess[lang]);
      closeModal();
    }
  }

  const updateRecord = async (values) => {

    const res = await ApiService.post("/guests/action/update", values);

    if (typeof res.error != "undefined") {
      showMsg(res.error);
      return;
    } else {
      showMsg(configs.submitSuccess[lang]);
      closeModal();
    }
  }

  formSchema.setSubmit(submitHandler);

  return (
    <div className="box" style={{width: '540px', margin: '0 auto'}}>
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
