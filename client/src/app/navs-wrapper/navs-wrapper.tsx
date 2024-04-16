import React, {createContext, useState, useEffect} from 'react';
import Api from "@/services";
import {NavBarLinkType} from "./types";
import ApiService from "@/services/api-service";

type AuthPropsType = {
  children: React.ReactNode;
};

const initialValues = {
  navs: [],
  setNavs: Function,
};

export const NavsContext = createContext(initialValues);

const NavsWrapper = (props: AuthPropsType) => {

    // const promoChild = [
    //   {name: 'Активация', link: '/passmen/payments', id: 4, parent_id: null},
    //   {name: 'Типы промо / Смс', link: '/passmen/cashier', id: 4, parent_id: null},
    //   {name: 'Офиц сайты', link: '/passmen/checkins', id: 1, parent_id: null},
    //   {name: 'Тильда', link: '/passmen/offers', id: 2, parent_id: null},
    //   {name: 'Игры', link: '/passmen/points', id: 3, parent_id: null},
    //   {name: 'День рождения', link: '/passmen/points', id: 4, parent_id: null},
    // ];
    //
    // const passmenChild = [
    //   // {name: 'Платежи', link: '/passmen/payments', id: 4, parent_id: null},
    //   {name: 'Интерфейс кассира', link: '/payments/cashier', id: 4, parent_id: null},
    //   {name: 'Чекины', link: '/checkins', id: 1, parent_id: null},
    //   {name: 'Офферы', link: '/offers', id: 2, parent_id: null},
    //   {name: 'Начисления ВУ', link: '/points/accruals', id: 3, parent_id: null},
    //   {name: 'Траты ВУ', link: '/points/spending', id: 4, parent_id: null},
    // ];
    //
    // const guestChild = [
    //   {name: 'Запрет смс', link: '/guests/calls', id: 4, parent_id: null},
    //   {name: 'Запрет звонков', link: '/guests/calls', id: 4, parent_id: null},
    //   {name: 'Гости', link: '/guests', id: 1, parent_id: null},
    //   {name: 'Отправка смс', link: '/guests/calls', id: 2, parent_id: null},
    //   {name: 'Чёрный список', link: '/guests/calls', id: 3, parent_id: null},
    // ];
    //
    // const statChild = [
    //   {name: 'Отписанные', link: '/stat/calls', id: 4, parent_id: null},
    //   {name: 'Промокоды', link: '/stat/calls', id: 4, parent_id: null},
    //   {name: 'Посещения', link: '/stat/calls', id: 1, parent_id: null},
    //   {name: 'Промо-фишки', link: '/stat/calls', id: 2, parent_id: null},
    //   {name: 'Контроль активаций', link: '/stat/calls', id: 3, parent_id: null},
    //   {name: 'Приваты за неделю', link: '/stat/calls', id: 1, parent_id: null},
    //   {name: 'Уровни трат/Визиты', link: '/stat/calls', id: 2, parent_id: null},
    //   {name: 'Караоке (НС)', link: '/stat/calls', id: 3, parent_id: null},
    // ];
    //
    // const navsInit = [
    //   {name: 'Промокоды', link: '/', id: 1, parent_id: null, children: promoChild},
    //   {name: 'Passmen', link: '/', id: 2, parent_id: null, children: passmenChild},
    //   {name: 'Посетители', link: '/', id: 3, parent_id: null, children: guestChild},
    //   {name: 'Статистика', link: '/', id: 4, parent_id: null, children: statChild},
    // ]
    //
    //   const [navs, setNavs] = useState(navsInit);
    //
    //   const setNavsHandler = (navs: NavBarLinkType[]) => {
    //     setNavs([...navs]);
    //   }

    const [navs, setNavs] = useState([]);

    useEffect(() => {
      getNavs();
    }, []);


    const getNavs = async () => {
      const navs = await ApiService.get("/navs/action/getTree");
      setNavs(navs.data);
    }

    const setNavsHandler = (navs: NavBarLinkType[]) => {
      setNavs([...navs]);
    }

    return (
      <NavsContext.Provider value={{navs, setNavs: setNavsHandler}}>
        {props.children}
      </NavsContext.Provider>
    );
  }
;

export default NavsWrapper;