import React, { useState, useEffect, useContext } from "react";
import DatePicker from 'react-date-picker';
import moment from 'moment';
import FormContext from "../FormContext";

const InputDate = (props) => {

  let context = useContext(FormContext);

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    let value = props.value;
    if (typeof props.value == "string" && props.value.length > 0) {
      value = new Date(props.value);
    }
    setStartDate(value);
  }, []);

  const convertDate = (inputFormat) => {
    function pad(s) {
      return (s < 10) ? '0' + s : s;
    }

    var d = new Date(inputFormat)
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
  }

  return (
    <div>

      <div className="form_item">
        <label className="form_item__label">{props.label}</label>

        <DatePicker
          format="dd.MM.yy"
          selected={startDate}
          value={startDate}
          onChange={(date) => {

            let dateFormated = (date) ? convertDate(date) : null;
            if (context.entity) {
              context.setAttribute(props.name, dateFormated);
            }
            setStartDate(date);

            if (typeof props.onSelect == "function") {
              props.onSelect(date, context, props);
            }

          }}
          isClearable
        />
      </div>

    </div>
  )
}

export default InputDate;
