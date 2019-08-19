/** 填充0 */
export const fillWithZero = (target: number | string, length: number) => {
  return (Array(length).join('0') + target).slice(-length);
};

/**
 * 默认将日期格式化为 YYYY-MM-DD
 * @param date Date类型的时间
 * @param field 时间显示粒度
 */
export const formatDate = (
  date: Date,
  field: 'year' | 'month' | 'day' = 'day'
) => {
  const yearStr = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthStr = fillWithZero(month, 2);
  const day = date.getDate();
  const dayStr = fillWithZero(day, 2);
  switch (field) {
    case 'year':
      return `${yearStr}`;
    case 'month':
      return `${yearStr}-${monthStr}`;
    case 'day':
      return `${yearStr}-${monthStr}-${dayStr}`;
  }
};

export type CalendarDateInfo = {
  /** 当前月的第几天1 ~ 31 */
  date: number;
  /** 是否是当前月份的日期 */
  currentMonth: boolean;
  /** 完整的时间表示 YYYY-MM-DD */
  fullDateStr: string;
};

/**
 * 计算current增加add天后是周几
 * @param current 当前是第几天
 * @param add 要加多少天
 */
const calcWeekDay = (current: number, add: number) => {
  return (current + add) % 7;
};

/**
 * 获取一个月的所有日期，以及填充在前面和后面的部分其它月份的日期
 * @param date 属于目标月份的Date对象
 * @param startDay 一行的起点  比如以周一为起点 此时startDay = 1，以周日为起点，此时startDay = 0
 */
export const getDateListByMonth = (date: Date, startDay: number) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  /** 一周的最后一天 */
  const weekEndDay = calcWeekDay(startDay, 6);
  let result: CalendarDateInfo[] = [];
  /** 先获取该月份的起点 */
  date.setDate(1);
  // @ts-ignore
  let dateObj = new Date(date);
  dateObj.setDate(1);

  /** 前面一部分非当前月的日期 */
  for (let day = startDay; day != date.getDay(); day = calcWeekDay(day, 1)) {
    dateObj.setFullYear(year);
    dateObj.setMonth(month);
    dateObj.setDate(date.getDate() - (date.getDay() - day));
    result.push({
      date: dateObj.getDate(),
      currentMonth: false,
      fullDateStr: formatDate(dateObj, 'day')
    });
  }
  /** 当前月的日期 */
  while (date.getMonth() === month) {
    result.push({
      date: date.getDate(),
      currentMonth: true,
      fullDateStr: formatDate(date, 'day')
    });
    date.setDate(date.getDate() + 1);
  }
  /** 后面一部分非当前月的日期 */
  for (let day = date.getDay(); day != weekEndDay; day = calcWeekDay(day, 1)) {
    result.push({
      date: date.getDate(),
      currentMonth: false,
      fullDateStr: formatDate(date, 'day')
    });
    date.setDate(date.getDate() + 1);
  }
  result.push({
    date: date.getDate(),
    currentMonth: false,
    fullDateStr: formatDate(date, 'day')
  });
  if (result.length === 35) {
    date.setDate(date.getDate() + 1);
    for (
      let day = date.getDay();
      day != weekEndDay;
      day = calcWeekDay(day, 1)
    ) {
      result.push({
        date: date.getDate(),
        currentMonth: false,
        fullDateStr: formatDate(date, 'day')
      });
      date.setDate(date.getDate() + 1);
    }
    result.push({
      date: date.getDate(),
      currentMonth: false,
      fullDateStr: formatDate(date, 'day')
    });
  }
  return result;
};

/** 获取指定日期所在周的所有天
 * @param date 属于目标星期的Date对象
 * @param startDay 一行的起点  比如以周一为起点 此时startDay = 1，以周日为起点，此时startDay = 0
 */
export const getDateListByWeek = (date: Date, startDay: number) => {
  date.setDate(date.getDate() - ((date.getDay() - startDay + 7) % 7));
  /** 一周的最后一天 */
  const weekEndDay = calcWeekDay(startDay, 6);
  let result: CalendarDateInfo[] = [];
  while (date.getDay() !== weekEndDay) {
    result.push({
      date: date.getDate(),
      currentMonth: true,
      fullDateStr: formatDate(date, 'day')
    });
    date.setDate(date.getDate() + 1);
  }
  result.push({
    date: date.getDate(),
    currentMonth: true,
    fullDateStr: formatDate(date, 'day')
  });
  return result;
};
