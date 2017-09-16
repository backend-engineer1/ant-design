---
category: Components
type: Data Display
cols: 1
title: Calendar
---

Container for displaying data in calendar form.

## When To Use

When data is in the form of dates, such as schedules, timetables, prices calendar, lunar calendar. This component also supports Year/Month switch.

## API

**Note:** Part of the Calendar's locale is read from `value`. So, please set the locale of `moment` correctly.

```jsx
import moment from 'moment';

// It's recommended to set locale in entry file globaly.
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

<Calendar
  dateCellRender={dateCellRender}
  monthCellRender={monthCellRender}
  onPanelChange={onPanelChange}
  onSelect={onSelect}
/>
```

| Property         | Description           | Type     | Default       |
|--------------|----------------|----------|--------------|
| value        | The current selected date | [moment](http://momentjs.com/) | current date     |
| defaultValue | The date selected by default | [moment](http://momentjs.com/) | default date     |
| mode         | The display mode of the calendar | `month` \| `year` | `month`  |
| fullscreen   | Whether to display in full-screen   | boolean     | `true`         |
| dateCellRender      | Customize the display of the date cell, the returned content will be appended to the cell | function(date: moment): ReactNode | - |
| monthCellRender     | Customize the display of the month cell, the returned content will be appended to the cell | function(date: moment): ReactNode | - |
| dateFullCellRender  | Customize the display of the date cell, the returned content will override the cell | function(date: moment): ReactNode | - |
| monthFullCellRender | Customize the display of the month cell, the returned content will override the cell | function(date: moment): ReactNode | - |
| locale       | The calendar's locale | object   | [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json)  |
| onPanelChange| Callback for when panel changes | function(date: moment, mode: string) | - |
| onSelect     | Callback for when a date is selected | function(date: moment）              | - |
| disabledDate | Function that specifies the dates that cannot be selected | (currentDate: moment) => boolean | - |
