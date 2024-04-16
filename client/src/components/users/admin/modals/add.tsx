import React, {useContext, useEffect, useState} from "react";
import {Form} from "@/app/form";
import {SettingsContext} from "@/app/settings/settings";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "@/app/auth-wrapper";
import {BalloonContext} from "@/app/balloon/balloon-wrapper";
import FormSchemaFields from "@/app/form/schema/form-schema-fields";
import FormSchemaButtons from "@/app/form/schema/form-schema-buttons";
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

  // const [rolesList, setRolesList] = useState([]);
  //
  // const getDicts = async () => {
  //   const rolesList = await Api.get("/user-passmen/action/getRoles");
  //   setRolesList(rolesList.data);
  // }

  // useEffect(() => {
  //   getDicts();
  // }, []);
  //
  // if (!rolesList.length) {
  //   return <p></p>;
  // }

  const config = {
    title: {
      ru: 'Сохранить',
      en: 'Sign up',
    }
  }

  formSchema.setField({
    name: 'is_su',
    type: 'checkbox',
    component: 'checkbox',
    label: {ru: 'Суперпользователь', en: 'Super user'},
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
    const res = await ApiService.post("/users/create", values);

    if (typeof res.error != "undefined") {
      showMsg(res.error);
      return;
    } else {
      showMsg(lang == 'ru' ? "Запись сохранена" : "Record saved!");
      closeModal();
    }
  }

  const updateRecord = async (values) => {

    const res = await ApiService.post("/users/action/update", values);

    if (typeof res.error != "undefined") {
      showMsg(res.error);
      return;
    } else {
      showMsg(lang == 'ru' ? "Запись сохранена" : "Record saved!");
      closeModal();
    }
  }

  formSchema.setSubmit(submitHandler);

  return (
    <div className="box" style={{width: '540px', margin: '0 auto'}}>
      <div className="box-body">
        <Form schema={formSchema}>
          <FormSchemaFields/>
          <div style={{display: 'flex', alignContent: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
            <div style={{padding: "25px 0", width: '140px'}}>
              <FormSchemaButtons/>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Add;
