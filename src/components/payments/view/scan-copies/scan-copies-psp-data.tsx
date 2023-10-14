import React, {useState, useEffect} from 'react';
import Grid from "@/app/grid";
import {Form, Field, Button, Input, Select} from "/app/form";
import Icon, {DoneIcon, CloseIcon} from "@/app/ui/icons";
import ModelDataSource from "/app/DataSources/ModelDataSource";
import Departments from "@/components/departments/models/Departments";
import Payments from "../../models/Payments";

const ScanCopiesPspData = (props) => {

  const [nomenclatures, setNomenclatures] = useState([]);
  const [psps, setPsps] = useState([]);

  useEffect(() => {
    getRecord();
  }, []);

  const getRecord = async () => {
    let payment = await new Payments().setWith(['bill.purchase_nomenclatures.purchase_request']).get(props.id);
    setNomenclatures(payment.relationships.bill.attributes.purchase_nomenclatures || []);

    let psps = payment.attributes.data_json ? JSON.parse(payment.attributes.data_json)["info"] : [];
    if (typeof psps == "object") psps = Object.keys(psps).map(index => psps[index]);
    setPsps(psps);
  }

  const addPsp = async (entity) => {

    let psps = {info: []};

    let payment = await new Payments().get(props.id);
    let paymentEntity = Payments.createEntity(payment.attributes);

    if (payment.attributes.data_json) {
      psps = JSON.parse(payment.attributes.data_json);
    }

    psps.info.push(entity.attributes);
    paymentEntity.setAttribute("data_json", JSON.stringify(psps));

    let res = await paymentEntity.save();
    getRecord();
  }

  const deletePsp = async (deleteIndex) => {
    let psps = {info: []};

    let payment = await new Payments().get(props.id);
    let paymentEntity = Payments.createEntity(payment.attributes);

    if (payment.attributes.data_json) {
      psps = JSON.parse(payment.attributes.data_json);
    }

    var info = psps.info.filter(function (value, index, arr) {
      return index != deleteIndex;
    });
    psps.info = info;

    paymentEntity.setAttribute("data_json", JSON.stringify(psps));

    let res = await paymentEntity.save();
    getRecord();
  }

  let pspsList = {};
  nomenclatures.forEach(nmcl => {
    if (nmcl.purchase_request) {// || (nmcl.purchase_request.psps) && !nmcl.purchase_request.psps.length
      if (typeof pspsList[nmcl.purchase_request.id] == "undefined") {
        pspsList[nmcl.purchase_request.id] = nmcl.purchase_request.psps;
      }
    }
  });

  return (
    <div>

      <div>
        <h4>Данные PSP из заявок на закупку</h4>
      </div>
      <Grid key={0} grid-template-columns="220px 1fr">
        <div className="head">
          <div>№ заявки на закупку</div>
          <div>Указанные менеджером PSP элементы</div>
        </div>
        {Object.keys(pspsList).map((prId) => {
          return (
            <div key={prId}>
              <div>{prId}</div>
              <div>{pspsList[prId]}</div>
            </div>
          );
        })}
      </Grid>

      <div style={{paddingTop: "30px"}}>
        <h4>Добавить данные PSP</h4>
      </div>

      <Form
        setEntity={() => Payments.createEntity({object_name: ""})}
        onSubmit={addPsp}
      >

        <div className="form-fieldset" style={{gridTemplateColumns: "18% 18% 18% 18% 18%"}}>
          <Field>
            <Select
              name="object_id"
              label="Обьект"
              setData={async () => {
                return await ModelDataSource({
                  model: Departments,
                  constraints: {
                    whereNotNull: ['code'],
                  },
                });
              }}
              onSelect={(newValue, formContext, props, dataStorage, dataStorageMap) => {
                let object_name = dataStorage[dataStorageMap[newValue]].attributes.name;
                formContext.setAttribute("object_name", object_name);
              }
              }
              optionValueKey="id"
              optionTitle={(record) => `${record.attributes.code} ${record.attributes.name}`}
            />
          </Field>

          <Field>
            <Input
              type="float"
              label="Стоимость"
              name="summa"
            />
          </Field>

          <Field>
            <Input
              label="Локация"
              name="location"
            />
          </Field>

          <Field>
            <Input
              label="PSP элементы"
              name="psp"
            />
          </Field>

          <Field>
            <Button label="Добавить" style={{width: '140px', marginTop: '32px'}}>
              <Icon
                fill="#BEBEBE"
                fillHover="#FFFFFF"
                size="22"
                style={{
                  paddingRight: "10px",
                }}
              >
                <DoneIcon/>
              </Icon>
            </Button>

          </Field>

        </div>

      </Form>


      {/*<div>*/}
      {/*  <h4>Данные PSP</h4>*/}
      {/*</div>*/}
      <Grid key={4} grid-template-columns="120px 120px 1fr 120px 120px 120px">
        <div className="head">
          <div>Номер</div>
          <div>Сумма</div>
          <div>Объект</div>
          <div>Локация</div>
          <div>PSP Элементы</div>
          <div></div>
        </div>
        {psps.map((item, index) => {
          return (
            <div key={index}>
              <div>Номер</div>
              <div>{item.summa}</div>
              <div>{item.object_name}</div>
              <div>{item.location}</div>
              <div>{item.psp}</div>
              <div>
                <span onClick={() => deletePsp(index)}>
                  <Icon size={12}>
                    <CloseIcon/>
                  </Icon>
                  </span>
              </div>
            </div>
          );
        })}
      </Grid>


    </div>
  );
}

export default ScanCopiesPspData;
