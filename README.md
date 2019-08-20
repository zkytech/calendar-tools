>## calendar-tools-pkg

封装了制作日历所必要的函数

使用方法

`yarn add calendar-tools-pkg`或`npm install calendar-tools-pkg`

|函数|说明|类型|参数说明|
| -------- | ------------------------ | ---------------- |----------|
|formatDate|格式化时间为YYYY-MM-DD（可选时间粒度，最小粒度为天）|`function formatDate(date:Date,field:'day'|'month'|'year'):string`||
|getDateListByMonth|获取一个月的页面所显示的所有时间，可指定一周的起点|`function getDateListByMonth(date: Date,startDay: number): CalendarDateInfo[]`|`date`:目标月份的任意一个Date对象，`startDay`:一周的开始，0代表周日，1代表周一 ，其它同理|
|getDateListByWeek|类似`getDateListByMonth`，不同的是这个函数用于生成周视图|`function getDateListByWeek(date: Date,startDay: number): CalendarDateInfo[]`|同上|

农历信息的生成可以使用[calendar.js](https://github.com/jjonline/calendar.js)，由于这个工具体积较大，且不是必须，这里没有做打包。

