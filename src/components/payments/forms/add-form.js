import React, { useState } from "react";
import moment from "moment";
import Payments from "../models/Payments";
import { Form, Field, Select, Input, InputDate, TextArea, Button } from "@app/form";
import { ModelDataSource } from "@/app/DataSources";
import Dict from "@/components/dicts/models/Dicts";
import notice from "@app/notifications";

const AddForm = props => {

  const [record] = useState(props.data);
  const [bill] = useState(props.data.relationships.bill.attributes);
  const [summa, setSumma] = useState(record.attributes.summa);
  const [ndsSumma, setNdsSumma] = useState(record.attributes.nds_summa);
  const [ndsPercent, setNdsPercent] = useState(record.attributes.nds_percent);
  const [purpose, setPurpose] = useState(record.attributes.purpose);
  const [purposeLength, setPurposeLength] = useState(record.attributes.purpose ? record.attributes.purpose.length : 0);

  let purposeStyle = {
    fontSize: "12px",
    margin: "10px 0",
    padding: "10px",
    border: "1px dashed #AFB8C9FF",
    color: "#888",
  };

  const submit = async (entity) => {
    await entity.save();
    notice.push(<>Данные успешно сохранены</>, {type: "OK"});
  };

  const changeSummaHandle = (newValue) => {
    let newNdsSumma = summa * ndsPercent / (100 + parseFloat(ndsPercent));
    setNdsSumma(newNdsSumma.toFixed(2));
  };
  const changeNdsHandle = (newValue) => {

  };
  const changeNdsSummaHandle = (newValue) => {

  };

  const recalc = (summa, ndsSumma, ndsPercent) => {
    let newNdsSumma = summa * ndsPercent / (100 + parseFloat(ndsPercent));
    setNdsSumma(newNdsSumma.toFixed(2));
  };

  return (
    <div style={{
      maxWidth: "650px",
      margin: "0 auto"
    }}>
      <Form
        model={Payments}
        initValues={{
          id: props.data.id,
        }}
        onSubmit={submit}
      >

        <div className="fieldset__title">Данные</div>

        <div className="fieldset" style={{ gridTemplateColumns: "1fr" }}>
          <Field>
            <Input
              label="Сумма в RUR"
              name="summa"
              type="float"
              onInput={(newValue, props) => {
                setSumma(newValue);
                recalc(newValue, ndsSumma, ndsPercent);
              }}
            />
          </Field>
        </div>
        <div className="fieldset" style={{ gridTemplateColumns: "48% 48%" }}>
          <Field>
            <Select
              name="nds_percent"
              emptyTitle="Без НДС"
              label="НДС %"
              setData={async () => {
                return await ModelDataSource({
                  model: Dict,
                  constraints: {
                    where: { assoc_table: "nds" }
                  },
                  dataPath: "data.0.data",
                });
              }}
              onSelect={(newValue) => {
                setNdsPercent(newValue);
                recalc(summa, ndsSumma, newValue);
              }}
              optionValueKey="value"
              optionTitle={(record) => `${record.attributes.name}`}
            />
          </Field>
          <Field>
            <Input
              label="НДС сумма"
              name="nds_summa"
              type="float"
              onInput={(newValue) => {
                setNdsSumma(newValue);
                recalc(summa, newValue, ndsPercent);
              }}
            />
          </Field>
        </div>

        <div className="fieldset" style={{ gridTemplateColumns: "30% 30% 30%" }}>

          <Field>
            <InputDate label="Дата оплаты" name="date_payment"/>
          </Field>

          <Field>
            <Select
              name="pay_type"
              label="Вид оплаты"
              setData={async () => {
                return await ModelDataSource({
                  model: Dict,
                  constraints: {
                    where: { assoc_table: "payments_types" }
                  },
                  dataPath: "data.0.data",
                });
              }}
              optionValueKey="value"
              optionTitle={(record) => record.attributes.name}
              onSelect={(newValue) => {
                //recalc();
              }}
            />
          </Field>
          <Field>
            <Input label="Процент оплаты %" name="percent_of_bill" type="float"/>
          </Field>
        </div>

        <div className="fieldset__title">Данные валютного платежа</div>

        <div className="fieldset">
          <Field>
            <Select
              name="vo_code"
              label="Код валютной операции"
              setData={async () => {
                return await ModelDataSource({
                  model: Dict,
                  constraints: {
                    where: { assoc_table: "payments_currency_types" }
                  },
                  dataPath: "data.0.data",
                });
              }}
              optionValueKey="value"
              optionTitle={(record) => `${record.attributes.name} (${record.attributes.value})`}
            />
          </Field>

        </div>

        <div className="fieldset__title">Назначение платежа</div>

        <div className="fieldset" style={{ gridTemplateColumns: "100%" }}>
          <Field>
            <TextArea name="purpose" onInput={(newValue, props) => {
              setPurposeLength(newValue.length);
              setPurpose(newValue);
            }}/>
          </Field>
        </div>

        <div>
          {purposeLength &&
            <div style={purposeStyle}>
              <p style={{ color: "#ccc" }}>Символов назначени: {purposeLength}</p>
              <p>
                (({record.attributes.vo_code})) Счет № {bill.number} от {moment(bill.date)
                .format("DD.MM.Y")},
                % Предоплата
              </p>
              <p>{purpose}</p>
              <p>Сумма {summa}</p>
              <p>
                {!ndsPercent &&
                  <span>Без НДС</span>
                }
                {ndsPercent &&
                  `В т.ч. НДС ${ndsPercent}% ${ndsSumma}`
                }
              </p>
            </div>
          }
        </div>

        <div className="fieldset__title">Примечание / Anmerkungen</div>

        <div className="fieldset" style={{ gridTemplateColumns: "100%" }}>
          <Field>
            <TextArea name="comment" onInput={() => {

            }}/>
          </Field>
        </div>


        <Field>
          <Button
            style={{
              width: "140px",
              marginTop: "20px"
            }}
          />
        </Field>
      </Form>

    </div>
  );
};

export default AddForm;
