import React, {useEffect, useState, useRef} from 'react';
import Icon, {DoneIcon} from "/app/ui/icons";
import {Button} from "/app/form";
import Payments from "../../models/Payments";
import File from "@/app/components/files/models/file";
import modal from "@/app/modal";
import ScanCopiesScansSelectSignatories from "./scan-copies-scans-select-signatories";
import DragAndDropArea from "@/app/drag-and-drop";
import notice from "@app/notifications";
import {API_URL} from "@configs";

const ScanCopiesScans = (props) => {

  const dragItem = useRef(null);

  useEffect(() => {
    props.getScanFiles();
  }, []);

  const setPspTable = async (scanFileId) => {
    let scans = await Payments.setPspTable(scanFileId, props.record.id);
    notice.push(<p>Таблица была обновлена</p>, {type: "OK"});
    props.getScanFiles();
  }

  const setSignature = (scanFileId) => {
    modal.open(<ScanCopiesScansSelectSignatories
      title="Вставить/Обновить подпись"
      scanFileId={scanFileId}
      recordId={props.record.id}
      getScanFiles={props.getScanFiles}
    />);
  }

  const saveAxis = async (ev, top: number, left: number, elProps: {}) => {
    let recordImg = await new File().get(elProps.id);

    let imgEntity = File.createEntity(recordImg.attributes);
    let dataJson = JSON.parse(imgEntity.getAttribute("data_json"));
    if (!dataJson) dataJson = {};
    dataJson['axis'] = {top, left};

    imgEntity.setAttribute("data_json", JSON.stringify(dataJson));
    imgEntity.save();

  }

  return (
    <div style={{width: "1000px", margin: "0 auto"}}>

      {props.scans.map((scan) => {

        let scanUrl = `${API_URL}/${scan.uri}`;

        let imgWidth = 0;
        let imgHeight = 0;

        const img = new Image();
        img.src = scanUrl;
        img.onload = function () {
          imgWidth = this.width;
          imgHeight = this.height;
        }

        return (
          <div key={scan.id} style={{padding: 0, position: "relative"}}>

            <div className="payment-file__panel">

              <div className="buttons-panel">
                <Button onClick={() => setPspTable(scan.id)} label="Вставить/Обновить PSP таблицу"
                        style={{width: "260px"}}>
                  <Icon>
                    <DoneIcon style={{
                      fill: "#9ba6b8",
                      paddingRight: "10px",
                      width: "24px",
                      height: "24px",
                    }}/>
                  </Icon>
                </Button>

                <Button onClick={() => setSignature(scan.id)} label="Вставить/Обновить подпись"
                        style={{width: "240px"}}>
                  <Icon>
                    <DoneIcon style={{
                      fill: "#9ba6b8",
                      paddingRight: "10px",
                      width: "24px",
                      height: "24px",
                    }}/>
                  </Icon>
                </Button>
              </div>
            </div>

            <div className="payment-file__list" style={{padding: 0, display: "inline-block"}}>

              <DragAndDropArea className="payment-file__list__img__wrap" onStop={saveAxis}>

                <img key={scan.id} src={scanUrl} className="payment-file__list__img"/>

                {scan.child &&
                  scan.child.map((img) => {

                    let dataJson = img.data_json ? JSON.parse(img.data_json) : {};

                    return <img
                      top={dataJson.axis ? dataJson.axis.top : 400}
                      left={dataJson.axis ? dataJson.axis.left : 50}
                      draggable={true}
                      key={img.id}
                      src={`https://api.thyssen24.ru/${img.uri}`}
                      id={img.id}
                    />;
                  })
                }

              </DragAndDropArea>
            </div>


          </div>
        );
      })}

    </div>
  );
};

export default ScanCopiesScans;
