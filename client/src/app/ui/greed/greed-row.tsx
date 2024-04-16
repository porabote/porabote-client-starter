import React, {Children} from 'react';
import {Cell, Row} from "@/app/ui/table";
import ObjectMapper from "@app/collections/ObjectMapper";

const GreedRow = (props) => {

  return (
    <Row {...props}>
      {Object.keys(props.map).map((cellName, index) => {

        let conf = props.map[cellName];

        let value = "";
        if (typeof conf.render == "function") {
          value = conf.render(props.record);
        } else {
          value = ObjectMapper.get(conf.dataKey, props.record);
        }
        return (<Cell key={cellName}>{value}</Cell>);

      })}
    </Row>
  );
};

export default GreedRow;