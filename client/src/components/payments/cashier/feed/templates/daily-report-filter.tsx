import React, {useContext, useState} from 'react';
import ButtonsRadioToggler from "@app/ui/toggler/buttons-radio-toggler";
import {Button, Select} from "@app/form";
import moment from "moment/moment";
import ApiService from "@/services/api-service";
import {BalloonContext} from "@app/balloon/balloon-wrapper";

const DailyReportFilter = () => {

  const {showMsg} = useContext(BalloonContext);
  
  const [payType, setPayType] = useState(null);
  const [period, setPeriod] = useState(null);

  const setDaysFilterListInit = () => {
    let days = [];
    let dayCurrent = moment(new Date()).subtract(-1, "days");

    setPeriod({
      from: dayCurrent.clone().subtract(2, "days").toISOString(),
      to: dayCurrent.clone().subtract(1, "days").toISOString(),
    });

    for (let i = 0; i < 8; i++) {

      let to = dayCurrent.subtract(1, "days");
      let from = dayCurrent.clone().subtract(1, "days");

      let dayItem = {
        name: `${from.format("DD.MM.YYYY")} - ${to.format("DD.MM.YYYY")}`,
        id: `${from.toISOString()}|${to.toISOString()}`
      }
      days.push(dayItem)
    }

    return days;
  }

  const [daysFilterList, setDaysFilterList] = useState(setDaysFilterListInit);

  const changePayType = ({value}) => {
    setPayType(value);
  }

  const setPeriodHandler = (e, {newValue}) => {
    const [from, to] = newValue.split("|");
    setPeriod({ from, to });
  }

  const downloadReport = async () => {
    const response = await ApiService.get("/payments/action/downloadDailyReport/", {}, {
      query: { period, payType },
    });

    if (response.error) {
      showMsg(response.error);
      return;
    }


    var linkSource = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'+ response.data ;
    var downloadLink = document.createElement("a");
    var fileName = 'clients.xlsx';

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();


    // var url = window.URL.createObjectURL(blob);
    // var a = document.createElement('a');
    // a.href = url;
    // a.download = 'report.xlsx';
    // document.body.appendChild(a);
    // a.click();
    // a.remove();

    // var file = window.URL.createObjectURL(resBlob);
    // window.location.assign(file);
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
          onSelect={setPeriodHandler}
        />
      </div>

      <div>
        <Button onClick={downloadReport} label="Выгрузить отчёта за смену xlsx" class="prb-button filter_btn_excel"/>
      </div>
    </div>
  );
};

export default DailyReportFilter;