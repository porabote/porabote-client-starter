import React, {useContext} from 'react';
import {DataSourceContext} from "@app/data-source/data-source-wrapper";
import StringFormat from "@app/collections/string-format";

const LazyLoadBtn = (props) => {

  const {meta, fetchData} = useContext(DataSourceContext);

  if (!meta) {
    return <div></div>;
  }
  
  let isActive = (meta.offset + meta.perPage >= meta.count) ? false : true

  let showedCount = (typeof meta.offset !== "undefined") ? meta.offset + meta.perPage : 'загрузка';

  return (
    <div>
      <div
        className={isActive ? "button_lazy-load" : "button_lazy-load non-active"}
        onClick={() => {
          if (isActive) {
            fetchData();
          }
        }}>
        <span key="showed" className="">Показано
            <span
              className="button_lazy-load__digital"
            > {showedCount} </span> из <span key="count" className="button_lazy-load__digital"> {StringFormat.priceFormatInt(meta.count)} </span>
        </span> показать еще ...
      </div>
    </div>
  );

}

export default LazyLoadBtn;