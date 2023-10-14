import React, {useState, useEffect} from 'react';
import Grid from "/app/grid";
import Bills from "@/components/bills/models/Bills";
import moment from "moment";
import Icon, {RefreshIcon, LinkToIcon} from "@/app/ui/icons";
import Payments from "@/components/payments/models/Payments";

const ScanCopiesBillFiles = (props) => {

    const [files, setFiles] = useState([])

    useEffect(() => {
      getBill();
    }, []);

    const getBill = async () => {
      const bill = await new Bills().setWith(["files"]).get(props.record.attributes.bill_id);
      const files = bill.relationships.files || [];
      setFiles(files);
    }

    const updateScanCopies = async (recordId: number, billId: number) => {
      let res = await Payments.updateScanFiles(recordId, billId);
      props.getScanFiles();
    }

    return (
      <div>
        <h4>Загруженные к счёту файлы</h4>

        <Grid grid-template-columns="70px 150px 1fr 100px 100px">
          <div className="head">
            <div>ID</div>
            <div>Дата</div>
            <div>Название</div>
            <div>Ссылка</div>
            <div>Обновить</div>
          </div>
          {files.map(item => {

            if (item.attributes.label != "bill") return <span key={item.id}></span>;

            return (
              <div key={item.id}>
                <div>{item.id}</div>
                <div>{moment(item.attributes.date_created).format("DD.MM.Y")}</div>
                <div>{item.attributes.basename}</div>
                <div>
                <span onClick={() => {
                  window.open(item.attributes.uri, "_blank");
                }}>
                  <Icon>
                    <LinkToIcon/>
                  </Icon>
                  </span>
                </div>
                <div>
                  <span onClick={() => updateScanCopies(props.record.id, item.id)}>
                    <Icon>
                      <RefreshIcon/>
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
;

export default ScanCopiesBillFiles;
