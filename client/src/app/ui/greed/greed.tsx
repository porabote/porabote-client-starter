import React, {Children, useContext, useState} from 'react';
import {Cell, Row, Table} from "@/app/ui/table";
import {SettingsContext} from "@app/settings/settings";
import GreedRow from "@app/ui/greed/greed-row";
import ObjectMapper from "@app/collections/ObjectMapper";

const Greed = (props) => {

  const {lang} = useContext(SettingsContext);

  const buiildMap = () => {
    let map = {};
    Children.map(props.children, child => {
      if (child.props.name) { //console.log(22, child.props.name,child.props);
        map[child.props.name] = {...child.props};
      }
    });

    if (props.map) {
      map = ObjectMapper.mergeDeep(map, props.map);
    }

    return map;
  }

  const [cols, setCols] = useState([]);
  const [colsWidths, setColsWidths] = useState(null);
  const [map, setMap] = useState(buiildMap());

  const buildHead = () => {
    let sizes = [];
    let row =
      <Row class="head">
        {Object.keys(map).map((colName) => {

          let conf = map[colName];
          let colSize = "100px";
          if (conf.width) {
            colSize = conf.width;
          }
          sizes.push(colSize);

          return (
            <Cell key={colName}>
              {conf.label && conf.label[lang]}
            </Cell>
          );
        })}
    </Row>;
    if (colsWidths === null) {
      setColsWidths(sizes.join(" "));
    }
    return row;
  }

  const head = buildHead();

  return (
    <Table class="striped" map={map} gridTemplateColumns={colsWidths}>
      {head}
      {props.records.map((record, index) => {
        return React.createElement(GreedRow, {
          ...props,
          key: record.id,
          columns: props.children,
          record: record,
          map,
        });
      })}
    </Table>
  );
};

export default Greed;