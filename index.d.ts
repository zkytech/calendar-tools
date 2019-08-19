/** 天 */
export type CalendarDateInfo = {
  /** 当前月的第几天1 ~ 31 */
  date: number;
  /** 是否是当前月份的日期 */
  currentMonth: boolean;
  /** 完整的时间表示 YYYY-MM-DD */
  fullDateStr: string;
};

/** 填充0
 * @param target 要填充的数字或文本
 * @param length 填充后的文本长度
 */
export function fillWithZero(target: number | string, length: number): string;

/**
 * 默认将日期格式化为 YYYY-MM-DD
 * @param date Date类型的时间
 * @param field 时间显示粒度
 */
export function formatDate(date: Date, field: 'year' | 'month' | 'day'): string;

/**
 * 获取一个月的所有日期，以及填充在前面和后面的部分其它月份的日期
 * @param date 属于目标月份的Date对象
 * @param startDay 一行的起点  比如以周一为起点 此时startDay = 1，以周日为起点，此时startDay = 0
 */
export function getDateListByMonth(
  date: Date,
  startDay: number
): CalendarDateInfo[];

/** 获取指定日期所在周的所有日期
 * @param date 属于目标星期的Date对象
 * @param startDay 一行的起点  比如以周一为起点 此时startDay = 1，以周日为起点，此时startDay = 0
 */
export function getDateListByWeek(
  date: Date,
  startDay: number
): CalendarDateInfo[];
