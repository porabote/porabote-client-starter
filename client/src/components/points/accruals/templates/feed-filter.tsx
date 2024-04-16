import React, {useContext, useEffect} from 'react';
import {InputDate, Select, Input, Button, Checkbox} from "@app/form";
import {DataSourceContext} from "@app/data-source/data-source-wrapper";
import SearchInput from "@app/ui/search-input";
import ApiService from "@/services/api-service";

const FeedFilter = () => {

  useEffect(() => {
    tmpMigration();
  }, []);

  const tmpMigration = () => {
    ApiService.get("/migrations/action/migrateLeads/");
  }

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
        <SearchInput onChange={onChangeSearchInput} placeholder="Найти по телефону гостя"/>
      </div>

      <div className={`feed_page_filter-wrap ${isFiltersOpen ? "active" : ""}`}>

        <div className="feed_page_filter-wrap__fieldset" style={{gridTemplateColumns: "20% 20% 140px 100px 100px"}}>
          <Select
            onSelect={(e, props) => {
              setFilter('custom', {last_club_id: props.newValue});
            }}
            classModifier="filter-min"
            name="last_club_id"
            isEmpty={true}
            data={clubs}
            optionTitle={record => record.name_ru}
            inputElement="div"
            label="Клуб"/>

          <div className="filter__date-between-block">
            <InputDate
              onSelect={(props) => {
                setFilter('whereBetween', {created_at: {period: {from: props.newValue}}});
              }}
              name="whereBetween.created_at.period.from"
              classModifier="filter-min" label="Начислено: c "/>
            <InputDate
              onSelect={(props) => {
                setFilter('whereBetween', {created_at: {period: {to: props.newValue}}});
              }}
              classModifier="filter-min"
              label="по"/>
          </div>

          <div>
            <Checkbox name="where.block_flg" label="Без чекина"/>
          </div>

          <div className="flex-center">
            <Button onClick={() => fetchData()} label="Найти" class="prb-button filter_btn"/>
          </div>
          <div className="flex-center">
            <Button class="prb-button filter_btn" label="Очистить"/>
          </div>

        </div>

      </div>
    </>);
};

export default FeedFilter;