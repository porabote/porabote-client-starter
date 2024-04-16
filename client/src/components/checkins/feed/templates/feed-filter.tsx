import React, {useContext} from 'react';
import {InputDate, Select, Input, Button, Checkbox} from "@app/form";
import {DataSourceContext} from "@app/data-source/data-source-wrapper";
import SearchInput from "@app/ui/search-input";

const FeedFilter = () => {

  const {
    dicts,
    isFiltersOpen,
    isDictsLoaded,
    setFilter,
    fetchData,
  } = useContext(DataSourceContext);

  const onChangeSearchInput = (e, {value}) => {
    setFilter('orWhere', {name: {operand: 'like', value}, phone: {operand: 'LIKE', value}});
  }

  if (!isDictsLoaded) {
    return <div>loading</div>;
  }

  const {
    clubs,
    levels,
  } = dicts;

  return (
    <>
      <div className="feed_page__search-panel">
        <SearchInput onChange={onChangeSearchInput} placeholder="Найти телефону"/>
      </div>

      <div className={`feed_page_filter-wrap ${isFiltersOpen ? "active" : ""}`}>

        <div className="feed_page_filter-wrap__fieldset" style={{gridTemplateColumns: "30% 30% 10% 10%"}}>

          <Select
            onSelect={(e, props) => {
              setFilter('where', {club_id: props.newValue});
            }}
            classModifier="filter-min"
            name="club_id"
            isEmpty={true}
            data={clubs}
            optionTitle={record => record.name_ru}
            inputElement="div"
            label="Клуб"/>

          <div className="filter__date-between-block">
            <InputDate
              onSelect={(props) => {
                setFilter('where', {created_at: {operand: '>=', value: props.newValue}});
              }}
              name="whereBetween.created_at.period.from"
              classModifier="filter-min" label="Период с"/>
            <InputDate
              onSelect={(props) => {
                setFilter('where', {created_at: {operand: '<=', value: props.newValue}});
              }}
              classModifier="filter-min"
              label="по"/>
          </div>

          <div className="flex-center" style={{paddingTop: '30px'}}>
            <Button onClick={() => fetchData()} label="Найти" class="prb-button filter_btn"/>
          </div>
          <div className="flex-center" style={{paddingTop: '30px'}}>
            <Button class="prb-button filter_btn" label="Очистить"/>
          </div>
        </div>


      </div>
    </>);
};

export default FeedFilter;