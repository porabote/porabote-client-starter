import React, {useState, useEffect, useContext} from "react";
import DatePicker from 'react-date-picker';
import moment from 'moment';
import {FormContext} from "@/app/form";
import {FieldChildType} from "../types";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const InputDate = (props: FieldChildType<any>) => {

  let context = useContext(FormContext);

  const [startDate, setStartDate] = useState(new Date());

  const setStartHandler = (value: Date) => {
    setStartDate(value);
  }

  const onChangeHandler = (date: Date) => {

    if (context) {
      context.setValue(props.name || "", moment(date).format('YYYY-MM-DD HH:mm:ss'));
    }
    setStartDate(date);

    if (typeof props.onSelect == "function") {
      props.onSelect(date, {context, ...props});
    }
  }

  useEffect(() => {
    let value = props.value;
    if (typeof props.value == "string" && props.value.length > 0) {
      value = new Date(props.value);
    }
    setStartDate(value);
  }, []);

  const convertDate = (inputFormat: string) => {
    function pad(s: number) {
      return (s < 10) ? '0' + s : s;
    }
    let d = new Date(inputFormat)
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
  }

  return (
    <div>

      <div className="form_item">
        <label className="form_item__label">{props.label}</label>

        <DatePicker
          format="dd.MM.yy"
          selected={setStartHandler}
          value={startDate}
          disableCalendar={props.disableCalendar || false}
          onChange={onChangeHandler}
          isClearable
        />
      </div>

    </div>
  )
}

export default InputDate;
