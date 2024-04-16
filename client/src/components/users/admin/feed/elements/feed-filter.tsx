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
    setFilter('orWhere', {name: {operand: 'like', value}, surname: {operand: 'like', value}, email: {operand: 'LIKE', value}});
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
        <SearchInput onChange={onChangeSearchInput} placeholder="Найти пользователя по имени или email"/>
      </div>

      <div className={`feed_page_filter-wrap ${isFiltersOpen ? "active" : ""}`}>

        <div className="feed_page_filter-wrap__fieldset"
             style={{gridTemplateColumns: "15% 15% 20% 20% 20%", paddingTop: '10px'}}>
          <div>
            <Checkbox name="where.block_flg" label="Черный список" />
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