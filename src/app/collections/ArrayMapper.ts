class ArrayMapper {

  getValueByPath = (path: string | null, source: { [key: string | number]: any | null } | null): any | null => {

    if (!path) return null;

    let pathArray = path.split('.');
    let cursor = source;

    pathArray.map((key) => {
      if (!cursor || typeof cursor[key] == "undefined") {
        cursor = null;
      } else {
        cursor = cursor[key]
      }
    });

    return cursor
  }

  isObject = (item: any) => {
    return (item && typeof item === 'object' && !Array.isArray(item))
  }

  isArray = (item: any) => {
    return (item && Array.isArray(item))
  }

  spliceByKey = (target: any, name: string, index: string) => {
    let splits = name.split('.');

    let cursor = target;
    for (const key in splits) {
      cursor = cursor[splits[key]]
    }
    cursor.splice(index, 1)

    return target
  }

  pushValue = (target: any, name: string, value: string) => {
    let splits = name.split('.');

    let cursor = target;
    for (const key in splits) {
      console.log(key);
      cursor = cursor[splits[key]]
    }

    cursor.push(value)

    return target
  }

  replaceValue = (target: any, source: any) => {

    for (const key in source) {
      if (this.isObject(source[key])) {
        if (!target[key]) Object.assign(target, {[key]: {}})
        this.replaceValue(target[key], source[key])
      } else if (this.isArray(source[key])) {
        target[key] = source[key]
      } else {
        Object.assign(target, {[key]: source[key]})
      }
    }

    return target
  }

  mergeValues = (target: any, source: any) => {

    for (const key in source) {
      if (this.isObject(source[key])) {
        if (!target[key]) Object.assign(target, {[key]: {}})
        this.mergeValues(target[key], source[key])
      } else if (this.isArray(source[key])) {
        if (!target[key]) Object.assign(target, {[key]: []})
        this.mergeValues(target[key], source[key])
      } else {
        Object.assign(target, {[key]: source[key]})
      }
    }

    return target
  }

  sortObject(source: any) {
    let target = {};
    return Object.keys(source).sort().reduce(
      (obj: any, key: string) => {
        obj[key] = source[key];
        return obj;
      },
      {}
    );
  }

  /*
  * Convert string path like 'one.1.two' to Object like {"one": {"1": {"two": 'testValue'}}}
  * */
  buildPathBranch = (path: string, value: any) => {
    let splits = path.split('.');
    splits.reverse()

    let target: {[key: string | number]: any} = {};

    splits.map((key, index) => {
      if (index == 0) {
        target[key] = value
      } else {
        let arr: any = isNaN(parseInt(key)) ? {} : []
        arr[key] = target
        target = arr
      }
    })

    return target
  }

  deleteValue = (target: any, name: string) => {
    let splits = name.split('.');

    let cursor = target;
    for (const key in splits) {
      if (!this.isObject(cursor[splits[key]])) {
        delete cursor[splits[key]];
        break;
      }

      cursor = cursor[splits[key]]
    }

    return target
  }

  setPatch = (suorce: any, name: string, value: any) => {
    let splits = name.split('.');

    let cursor = suorce;
    splits.map((item, index) => {

      if (splits.length == index + 1) {
        cursor[item] = value;
      } else {
        cursor[item] = (typeof cursor[item] == "undefined") ? {} : cursor[item]
        cursor = cursor[item]
      }
    })

    return suorce
  }

}

export default new ArrayMapper()
