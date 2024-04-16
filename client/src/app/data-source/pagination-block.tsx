import React, {useContext} from 'react';
import {DataSourceContext} from "@app/data-source/data-source-wrapper";
import StringFormat from "@app/collections/string-format";

const PaginationBlock = (props) => {

  const {meta} = useContext(DataSourceContext);

  if (!meta) {
    return <div></div>;
  }

  let showedCount = (meta && typeof meta.offset != "undefined") ? meta.offset + meta.perPage : 'загрузка';


  return (
    <div>
      <div className="lazy-load__info">
        <span
          key="showed">Показано <span className="button_lazy-load__digital"> {showedCount} </span> из <span key="count" className="button_lazy-load__digital"> {StringFormat.priceFormatInt(meta.count)} </span>
        </span>
      </div>
    </div>
  );

}

export default PaginationBlock;