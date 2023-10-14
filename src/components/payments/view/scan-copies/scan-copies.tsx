import React, {useState} from 'react';
import ScanCopiesPspData from "./scan-copies-psp-data";
import ScanCopiesBillFiles from "./scan-copies-bill-files";
import ScanCopiesScans from "./scan-copies-scans";
import Payments from "../../models/Payments";

const ScanCopies = (props) => {

  const [scans, setScans] = useState([]);

  const getScanFiles = async () => {
    let scans = await Payments.getScanFiles(props.data.id);
    setScans(scans.data || []);
  };

  return (
    <div style={{maxWidth: "1024px", margin: "0 auto"}}>
      <ScanCopiesPspData id={props.data.id}/>
      <ScanCopiesBillFiles getScanFiles={getScanFiles} record={props.data}/>
      <ScanCopiesScans scans={scans} getScanFiles={getScanFiles} record={props.data}/>
    </div>
  );
};

export default ScanCopies;
