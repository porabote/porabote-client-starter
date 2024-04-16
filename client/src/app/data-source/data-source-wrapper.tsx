import React, {createContext, useState, useEffect, useRef} from "react";
import Api from "@/services/api-service";

export const DataSourceContext = createContext({
  dicts: {},
  records: [],
  filterMap: [],
  greedMap: [],
  formMap: [],
});

type PropsType = {
  children?: React.ReactNode;
  modelName: string;
  relations?: string[];
  setDicts?: Function;
  filterMap?: any[];
  greedMap?: any[];
  formMap?: any[];
  isFiltersOpen?: boolean;
}

const DataSourceWrapper = (props: PropsType) => {

  const pageRef = useRef(1);

  const filterInit = {
    where: {},
    whereBetween: {},
    orWhereGrouped: [],
    whereIn: {},
    orWhere: {},
    custom: {},
  };

  const initMeta = {
    count: 0, // total count of records
    limit: 50,
   // offset: 0,
    //page: page,
    perPage: 0, // total count of loaded records
    lastId: 0,
  }

  const [records, setRecords] = useState([]);
  const [dicts, setDicts] = useState({});
  const [isDictsLoaded, setIsDictsLoaded] = useState(false);
  const [meta, setMeta] = useState({...initMeta});
  const [isLoading, setIsLoading] = useState(true);
  const [rels, setRels]  = useState([]);
  const [filter, setFilter] = useState(filterInit);
  const [isFiltersOpen, setIsFiltersOpen] = useState(props.isFiltersOpen || false);
  const [relations, setRelations] = useState(props.relations || []);

  const [filterMap, setFilterMap] = useState(props.filterMap || []);
  const [greedMap, setGreedMap] = useState(props.greedMap || []);
  const [formMap, setFormMap] = useState(props.formMap || []);

  useEffect(() => {
    fetchData();
    fetchDicts();
  }, []);

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  }

  const fetchDicts = async () => {
    if (typeof props.setDicts == "function") {
      const dicts = await props.setDicts();
      setDictsHandle(dicts);
    }
    setIsDictsLoaded(true);
  }

  const setDictsHandle = (data) => {
    setDicts(
      {
        ...dicts,
        ...data,
      }
    );
  }

  const setFilterHandler = (operand: string, value: any, reset = false) => {
    if (!reset) {
      filter[operand] = Object.assign(filter[operand], value);
    } else {
      filter[operand] = value;
    }
    fetchData({dropData: true});
  }

  const fetchData = async (options = {}) => {

    if (options.dropData) {
      pageRef.current = 1;
    }

    const res = await Api.post(`/${props.modelName}/get`,
      {
        ...filter,
        orderBy: {id: "desc"},
        limit: 50,
        relations,
        page: pageRef.current,
      },
      {});

    if (options.dropData) {
      setRecords([
        ...res.data,
      ]);
    } else {
      setRecords([
        ...records,
        ...res.data,
      ]);
    }

    setMeta({
      ...meta,
      ...res.meta,
    });

    pageRef.current++;
  }

  const setPage = (page: number) => {
    pageRef.current = page;
  }

  return(
    <DataSourceContext.Provider value={{
      records,
      dicts,
      setDicts: setDictsHandle,
      isDictsLoaded,
      isLoading,
      setIsLoading,
      fetchData,
      setFilter: setFilterHandler,
      isFiltersOpen,
      toggleFilters,
      greedMap,
      filterMap,
      formMap,
      meta,
      setPage,
    }}>
      {props.children}
    </DataSourceContext.Provider>
  );
}

export default DataSourceWrapper;