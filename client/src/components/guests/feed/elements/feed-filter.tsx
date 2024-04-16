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
        <SearchInput onChange={onChangeSearchInput} placeholder="Найти гостя по имени или телефону"/>
      </div>

      <div className={`feed_page_filter-wrap ${isFiltersOpen ? "active" : ""}`}>

        <div className="feed_page_filter-wrap__fieldset" style={{gridTemplateColumns: "15% 15% 20% 20% 20%"}}>
          <Select
            classModifier="filter-min"
            isEmpty={true}
            name="notify_flg"
            onSelect={(e, props) => {
              if (props.newValue === 1) {
                setFilter('where', {notify_flg: props.newValue});
              } else {
                setFilter('where', {notify_flg: {operand: 'IS NULL', value: 0}});
              }
            }}
            data={[
              {id: 1, name: 'Да'},
              {id: 0, name: 'Нет'}
            ]}
            inputElement="div"
            label="Подписан на смс:"/>
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
            label="Последний клуб"/>

          <div className="filter__date-between-block">
            <InputDate
              onSelect={(props) => {
                setFilter('whereBetween', {created_at: {period: {from: props.newValue}}});
              }}
              name="whereBetween.created_at.period.from"
              classModifier="filter-min" label="Регистрация с"/>
            <InputDate
              onSelect={(props) => {
                setFilter('whereBetween', {created_at: {period: {to: props.newValue}}});
              }}
              classModifier="filter-min"
              label="по"/>
          </div>

          <div className="filter__date-between-block">
            <InputDate name="whereBetween.payments.period.from" classModifier="filter-min" label="Период трат с"/>
            <InputDate name="whereBetween.payments.period.to" classModifier="filter-min" label="по"/>
          </div>

          <div className="filter__date-between-block">
            <InputDate
              onSelect={(props) => {
                setFilter('custom', {last_visit_date_from: props.newValue});
              }}
              classModifier="filter-min"
              label="Посл. визит с"/>
            <InputDate
              onSelect={(props) => {
                setFilter('custom', {last_visit_date_to: props.newValue});
              }}
              classModifier="filter-min" label="по"/>
          </div>

        </div>

        <div className="feed_page_filter-wrap__fieldset" style={{gridTemplateColumns: "15% 15% 20% 20% 20%"}}>

          <Select
            onSelect={(e, props) => {
              setFilter('where', {level_id: props.newValue});
            }}
            isEmpty={true}
            classModifier="filter-min"
            name="level_id"
            data={levels}
            optionTitle={record => record.title}
            inputElement="div"
            label="Уровень трат:"/>
          <div></div>

          <div className="filter__date-between-block">
            <Input
              onChange={(e, props) => {
                console.log(999, props.newValue);
                setFilter('custom', {spanding_sum_from: props.newValue});
              }}
              classModifier="filter-min"
              label="Траты, руб с"/>
            <Input
              onChange={(e, props) => {
                setFilter('custom', {spanding_sum_to: props.newValue});
              }}
              classModifier="filter-min"
              label="по"/>
          </div>

          <div className="filter__date-between-block">
            <Input name="whereBetween.points.value.from" classModifier="filter-min" label="ВУ с"/>
            <Input name="whereBetween.points.value.to" classModifier="filter-min" label="по"/>
          </div>

          <div className="filter__date-between-block">
            <Input name="whereBetween.sum_average.value.from" classModifier="filter-min" label="Средний чек с"/>
            <Input name="whereBetween.sum_average.value.to" classModifier="filter-min" label="по"/>
          </div>

        </div>

        <div className="feed_page_filter-wrap__fieldset"
             style={{gridTemplateColumns: "15% 15% 20% 20% 20%", paddingTop: '10px'}}>
          <div>
            <Checkbox name="where.block_flg" label="Черный список" />
          </div>
          <div>
            <Checkbox name="where.mib_flg" label="Человек в черном" />
          </div>
          <div>
            <Checkbox name="where.waste_last_visit_only_flg" label="Траты за последний визит" />
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