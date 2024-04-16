import React, {useState} from 'react';
import ButtonsRadioToggler from "@app/ui/toggler/buttons-radio-toggler";
import {Button, Select} from "@app/form";
import moment from "moment/moment";
import ApiService from "@/services/api-service";

const DaileReportFilter = () => {

  const setDaysFilterListInit = () => {
    let days = [];
    let dayCurrent = moment(new Date()).subtract(-1, "days");
    for (let i = 0; i < 8; i++) {

      let to = dayCurrent.subtract(1, "days");
      let from = dayCurrent.clone().subtract(1, "days");

      let dayItem = {
        name: `${from.format("DD.MM.YYYY")} - ${to.format("DD.MM.YYYY")}`,
        id: `${from.format("YYYY-MM-DD")}:${to.format("YYYY-MM-DD")}`
      }
      days.push(dayItem)
    }

    return days;
  }
  const [daysFilterList, setDaysFilterList] = useState(setDaysFilterListInit);
  const [payType, setPayType] = useState(null);
  const [period, setPeriod] = useState(null);

  const changePayType = ({value}) => {
    console.log(value);
  }


  const downloadReport = () => {
    ApiService.get("/payments/action/downloadDailyReport/");
  }

  return (
    <div style={{display: "flex", padding: '0px 0 20px 0'}}>
      <div>
        <ButtonsRadioToggler onSelect={changePayType}>
          <div data-value="">Все</div>
          <div data-value="3">Столы</div>
          <div data-value="4">Фишки</div>
          <div data-value="5">Бар</div>
          <div data-value="2">Хостес</div>
        </ButtonsRadioToggler>
      </div>

      <div style={{paddingLeft: '30px', width: '210px'}}>
        <Select
          classModifier="filter-min"
          inputElement="div"
          data={daysFilterList}
          name="period"
        />
      </div>

      <div>
        <Button onClick={downloadReport} label="Выгрузить отчёта за смену xlsx" class="prb-button filter_btn_excel"/>
      </div>
    </div>
  );
};

export default DaileReportFilter;