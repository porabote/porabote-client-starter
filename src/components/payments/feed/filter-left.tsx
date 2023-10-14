import React, {useState, useEffect} from "react";
//import { useAppSelector } from "@/app/hooks/hooks";
import { Field, Select, InputDate } from "@/app/form";
import { ModelDataSource } from "@/app/DataSources";
import Departments from "@/components/departments/models/Departments";
import Contractors from "../../contractors/models/Contractors";
import DateSource from "@/app/calendar/date-source";

const FilterLeft = () => {

  let weeksList = DateSource.getWeeksList();
  useEffect(() => {
  }, []);

  const onSelect = (newValue, formContext, elementProps) => {
    formContext.entity.setAttribute('index_records_ids', [], 'replace');
    formContext.submit();
  }

  return (

    <React.Fragment>
      <div className="content__filter__left__title">Фильтр</div>

      <Field>
        <Select
          onSelect={onSelect}
          name="where.object_id"
          label="Объект:"
          setData={async () => {
            return await ModelDataSource({
              model: Departments,
              constraints: {
                where: { label: "object" }
              },
              //dataPath: "data.0.data",
            });
          }}
          optionValueKey="id"
          optionTitle={(record) => `${record.attributes.name}`}
        />
      </Field>

      <Field>
        <Select
          onSelect={onSelect}
          name="where.contractor_id"
          label="Поставщик:"
          setData={async () => {
            let data = await new Contractors().setLimit(10000).get();
            return data.data;
          }}
          optionValueKey="id"
          optionTitle={(record) => `${record.attributes.name}`}
        />
      </Field>

      <Field>
        <Select
          onSelect={onSelect}
          name="where.client_id"
          label="Плательщик:"
          setData={async () => {
            let data = await new Contractors().setWhere({type: "self"}).setLimit(100).get();
            return data.data;
          }}
          optionValueKey="id"
          optionTitle={(record) => `${record.attributes.name}`}
        />
      </Field>

      <Field>
        <InputDate name="whereBetween.date_payment.period.from" onSelect={onSelect} label="В плане оплат с"/>
      </Field>
      <Field>
        <InputDate name="whereBetween.date_payment.period.to" onSelect={onSelect} label="В плане оплат по"/>
      </Field>

      <Field>
        <Select
          onSelect={onSelect}
          name="where.pay_week"
          label="Неделя:"
          setData={() => DateSource.getWeeksList()}
          optionValueKey="number"
          optionTitle={(record) => `${record.attributes.name}`}
        />
      </Field>

    </React.Fragment>
  );

}

export default FilterLeft;
