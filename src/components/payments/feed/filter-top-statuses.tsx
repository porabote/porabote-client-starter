import React, {useState, useEffect} from 'react';

const FilterTopStatuses = (props) => {

  let [statusId, setStatusId] = useState(props.formContext.entity.getAttribute("where.status_id"));

  let clientId = props.formContext.entity.getAttribute("where.client_id");

  const changeStatus = (statusId) => {

    setStatusId(statusId);
    props.formContext.entity.setAttribute('where.status_id', statusId);
    props.formContext.entity.setAttribute('index_records_ids', [], 'replace');
    props.setAllChecked(false);
    props.formContext.submit();
  }

  return (
    <>
      <div className="feed-top-panel_statuses">
        <a onClick={() => changeStatus("")} className="feed-top-panel_statuses__item">Все</a>
        {props.data.map((item, index) => {
          return <span
            onClick={() => changeStatus(item.id)}
            className={`feed-top-panel_statuses__item ${(item.id == statusId) ? "active" : ""}`}
            key={index}>
          {item.attributes.name}
        </span>
        })}
      </div>
      <div>
        {statusId == 42 && !clientId &&
          <div className="feed-top-panel_statuses__notice">Для просмотра и отправки акцептованных платежей, пожалуйста выбрите плательщика.</div>
        }
      </div>
    </>
  );
};

export default FilterTopStatuses;
