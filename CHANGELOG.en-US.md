---
order: 6
title: Change Log
toc: false
timeline: true
---

`antd` follows [Semantic Versioning 2.0.0](http://semver.org/).

#### Release Schedule

- Weekly release: patch version at the end of every week for routine bugfix (anytime for urgent bugfix).
- Monthly release: minor version at the end of every month for new features.
- Major version release is not included in this schedule for breaking change and new features.

---

## 5.1.7

`2023-1-31`

- Input
  - 🐞 Fix Input that unexpected cancel button is shown when `type="search"`. [#40457](https://github.com/ant-design/ant-design/pull/40457) [@MadCcc](https://github.com/MadCcc)
  - 🐞 Fix Input suffix color does not update bug when component status changed. [#40344](https://github.com/ant-design/ant-design/pull/40344) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Switch text layout problem in Safari and Chrome <= 84 with compatible mode. [#40453](https://github.com/ant-design/ant-design/pull/40453) [@Ifeinstein](https://github.com/Ifeinstein)
- 🐞 Fix Progress that throw error when `percent` is `null`. [#40378](https://github.com/ant-design/ant-design/pull/40378) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix List title and avatar be rendered in the wrong position. [#40395](https://github.com/ant-design/ant-design/pull/40395) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Dropdown submenu wrong position. [#40349](https://github.com/ant-design/ant-design/pull/40349)
- 🐞 Fix Badge throw `findDOMNode` warning in StrictMode when `dot` switch. [#40347](https://github.com/ant-design/ant-design/pull/40347)
- 🐞 Fix Message wrong icon color problem. [#40471](https://github.com/ant-design/ant-design/pull/40471) [@Wxh16144](https://github.com/Wxh16144)
- 💄 Adjust Empty component default style in dark theme. [#40447](https://github.com/ant-design/ant-design/pull/40447)
- RTL
  - 💄 Fix Table scroll shadow in RTL mode. [#40441](https://github.com/ant-design/ant-design/pull/40441) [@ds1371dani](https://github.com/ds1371dani)
- TypeScript
  - 🤖 Export ConfigProvider's ThemeConfig type. [#40370](https://github.com/ant-design/ant-design/pull/40370) [@Kamahl19](https://github.com/Kamahl19)

## 5.1.6

`2023-1-20`

- 🐞 Fix DatePicker animation timing function. [#40133](https://github.com/ant-design/ant-design/pull/40133) [@MadCcc](https://github.com/MadCcc)
- Menu
  - 🐞 Fix Tooltip incorrectly shown when Menu collapsed. [#40328](https://github.com/ant-design/ant-design/pull/40328)
  - 🐞 Fix Menu split line style error. [#40268](https://github.com/ant-design/ant-design/pull/40268) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix the console warning of wave effect when bind component unmount before wave effect trigger. [#40307](https://github.com/ant-design/ant-design/pull/40307) [@luo3house](https://github.com/luo3house)
- 🐞 Fix Breadcrumb throw wrong overlay deprecation warning when use `menu` prop. [#40211](https://github.com/ant-design/ant-design/pull/40211) [@candy4290](https://github.com/candy4290)
- 🐞 Fix Modal.useModal hooks `destroyAll` not work as expect. [#40281](https://github.com/ant-design/ant-design/pull/40281) [@ds1371dani](https://github.com/ds1371dani)
- 🐞 Fix `message` global static method `config` setting `duration` not working. [#40232](https://github.com/ant-design/ant-design/pull/40232) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Button text color when containing an `a` tag. [#40269](https://github.com/ant-design/ant-design/pull/40269) [@ds1371dani](https://github.com/ds1371dani)
- 🐞 Fix Radio displaying wrong text color and cursor when `disabled`. [#40273](https://github.com/ant-design/ant-design/pull/40273) [@ds1371dani](https://github.com/ds1371dani)
- 💄 Optimize the calculation logic of focus `outline`, replace `lineWidth` with `lineWidthBold`. [#40291](https://github.com/ant-design/ant-design/pull/40291) [@simonpfish](https://github.com/simonpfish)
- 💄 Rewrite part component style to compatible the browser that not support concat `:not` selector. [#40264](https://github.com/ant-design/ant-design/pull/40264)
- 🌐 Fix missing translation for `pt_BR`. [#40270](https://github.com/ant-design/ant-design/pull/40270) [@rafaelncarvalho](https://github.com/rafaelncarvalho)

## 5.1.5

`2023-1-15`

- 🐞 Fix Checkbox that label not aligned with checkbox. [#40208](https://github.com/ant-design/ant-design/pull/40208)
- 🐞 Fix Button wave effect sometime makes layout shaking. [#40192](https://github.com/ant-design/ant-design/pull/40192)
- 🐞 Fix Select crash problem. [#40158](https://github.com/ant-design/ant-design/pull/40158) [@helloqian12138](https://github.com/helloqian12138)
- 🐞 Fix Timeline custom color displaying wrong classname &amp; alignment overflow. [#39394](https://github.com/ant-design/ant-design/pull/39394) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix Breadcrumb last item color. [#40119](https://github.com/ant-design/ant-design/pull/40119) [@messaooudi](https://github.com/messaooudi)
- 💄 Fix Table sticky table header shadow style. [#40171](https://github.com/ant-design/ant-design/pull/40171) [@Wxh16144](https://github.com/Wxh16144)
- 💄 Fix Segmented item hover radius style. [#40175](https://github.com/ant-design/ant-design/pull/40175) [#40179](https://github.com/ant-design/ant-design/pull/40179)
- TypeScript
  - 🤖 Fix Tabs `onEdit` Callback parameter type problem. [#39926](https://github.com/ant-design/ant-design/pull/39926) [@RSS1102](https://github.com/RSS1102)
- RTL
  - 💄 Fix DatePicker's next &amp; prev icons in RTL mode. [#40238](https://github.com/ant-design/ant-design/pull/40238) [@ds1371dani](https://github.com/ds1371dani)
  - 💄 Fix Badge RTL style when wrap a block element. [#40125](https://github.com/ant-design/ant-design/pull/40125)

## 5.1.4

`2023-1-9`

- 🐞 Fix missing locale file. [#40116](https://github.com/ant-design/ant-design/pull/40116)
- 🐞 Fix Cascader dropdown `placement` in RTL mode. [#40109](https://github.com/ant-design/ant-design/pull/40109) [@3hson](https://github.com/3hson)
- 🐞 Fix animation flicking in some components. [react-component/motion#39](https://github.com/react-component/motion/pull/39)

## 5.1.3

`2023-1-9`

- Table
  - 🛠 Optimize the Table `shouldCellUpdate` logic to increase the secondary rendering speed. [#40063](https://github.com/ant-design/ant-design/pull/40063)
  - 🐞 Fix Table `columns.render` not trigger re-render when render function use closure data. [#40004](https://github.com/ant-design/ant-design/pull/40004)
  - 🐞 Fix when Table filter, the border will be black. [#39938](https://github.com/ant-design/ant-design/pull/39938) [@JarvisArt](https://github.com/JarvisArt)
- Button
  - 🐞 Fix Button wave effect not following screen scroll. [#39954](https://github.com/ant-design/ant-design/pull/39954)
  - 🐞 Fix Button `block` props not work. [#39992](https://github.com/ant-design/ant-design/pull/39992) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Menu custom expand icon cannot be hidden. [#40071](https://github.com/ant-design/ant-design/pull/40071) [@Wxh16144](https://github.com/Wxh16144)
- 💄 Fix circular Progress text not being displayed in rtl mode. [#40103](https://github.com/ant-design/ant-design/pull/40103)
- 💄 Fix horizontal Menu style with `theme="dark"`. [#40105](https://github.com/ant-design/ant-design/pull/40105)
- 🐞 Fix Cascader `notFoundContent` cannot be clicked. [#40067](https://github.com/ant-design/ant-design/pull/40067)
- 🐞 Fix Transfer Checkbox not disabled when itemsLits is empty. [#40038](https://github.com/ant-design/ant-design/pull/40038) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 Fix Checkbox style with `disabled` and `indeterminate`. [#39974](https://github.com/ant-design/ant-design/pull/39974) [@ds1371dani](https://github.com/ds1371dani)
- 🐞 Fix Alert.ErrorBoundary description overflow bug. [#40033](https://github.com/ant-design/ant-design/pull/40033)
- 💄 Fix Tag onClick as undefined, click the mouse to display the border style. [#40023](https://github.com/ant-design/ant-design/pull/40023) [@crazyair](https://github.com/crazyair)
- 💄 Fix Avatar.Group item margin when item is wrapped by other elements. [#39993](https://github.com/ant-design/ant-design/pull/39993)
- 🐞 Fix Submenu arrow transition. [#39945](https://github.com/ant-design/ant-design/pull/39945) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix selection column cover by other cell when fixed. [#39940](https://github.com/ant-design/ant-design/pull/39940) [@kiner-tang](https://github.com/kiner-tang)
- 🌐 Add missing ta_IN translations. [#39936](https://github.com/ant-design/ant-design/pull/39936) [@KIRUBASHANKAR26](https://github.com/KIRUBASHANKAR26)

## 5.1.2

`2022-12-30`

- 🆕 Theme Editor supports uploading themes. [#39621](https://github.com/ant-design/ant-design/pull/39621) [@BoyYangzai](https://github.com/BoyYangzai)
- 💄 Refactor wave effect that can now trigger multiple times. [#39705](https://github.com/ant-design/ant-design/pull/39705) [@li-jia-nan](https://github.com/li-jia-nan)
- Table
  - 🐞 Fix Table `column.filtered` cannot be updated. [#39883](https://github.com/ant-design/ant-design/pull/39883)
  - 🐞 Fix Table fixed column which is sorted or filtered transparent background bug. [#39012](https://github.com/ant-design/ant-design/pull/39012) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 Fix Image preview style conflict with TailwindCSS. [#39914](https://github.com/ant-design/ant-design/pull/39914)
- 🐞 Fix Dropdown `danger` and `disabled` style priority bug. [#39904](https://github.com/ant-design/ant-design/pull/39904) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix App.useApp `modal` default `okText`. [#39884](https://github.com/ant-design/ant-design/pull/39884) [@BoyYangzai](https://github.com/BoyYangzai)
- 💄 Fix Input.Group misplace style when zoom up in windows. [#39842](https://github.com/ant-design/ant-design/pull/39842) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 Fix Slider missing Tooltip appear motion. [#39857](https://github.com/ant-design/ant-design/pull/39857)
- 🐞 Fix QRCode missing expired style. [#39849](https://github.com/ant-design/ant-design/pull/39849) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Tree switcher's background display unexpected in dark theme. [#39838](https://github.com/ant-design/ant-design/pull/39838) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 Fix Menu slide bar style issue when `border` is reset by preset. [#39819](https://github.com/ant-design/ant-design/pull/39819) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix Checkbox not support Tooltip or Popover when it is `disabled`. [#39829](https://github.com/ant-design/ant-design/pull/39829)

## 5.1.1

`2022-12-26`

- 📦 Remove IE and other legacy browsers from browserslist to reduce bundle size.[#38779](https://github.com/ant-design/ant-design/pull/38779)
- ⚡️ Improve Transfer performance when selecting and moving nodes with large data.[#39465](https://github.com/ant-design/ant-design/pull/39465) [@wqs576222103](https://github.com/wqs576222103)
- 🐞 Fix wrong `font-family` of components. [#39806](https://github.com/ant-design/ant-design/pull/39806)
- 🐞 Fix Drawer default props not working when `placement` `open` `width` are `undefined`. [#39782](https://github.com/ant-design/ant-design/pull/39782)
- 🐞 Fix Menu icon animation when collapse it. [#39800](https://github.com/ant-design/ant-design/pull/39800) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix Image preview operation bar is covered during the animation. [#39788](https://github.com/ant-design/ant-design/pull/39788) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix List crash when `pagination.pageSize` is undefined. [#39681](https://github.com/ant-design/ant-design/pull/39681) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix Space `align="baseline"` not working. [#39748](https://github.com/ant-design/ant-design/pull/39748) [@candy4290](https://github.com/candy4290)
- Table
  - 🐞 Fix Table expandable row header has no top left border radius. [#39781](https://github.com/ant-design/ant-design/pull/39781) [@chunsch](https://github.com/chunsch)
  - 🐞 Fix Table header radius missing when has fixed header and columns. [#39723](https://github.com/ant-design/ant-design/pull/39723)
  - 🐞 Fix Table missing `border-bottom` in merged cell and unexpected border color if overlapping。. [#39729](https://github.com/ant-design/ant-design/pull/39729)
  - ⌨️ Improve Table a11y by appling aria-props to table element. [#39700](https://github.com/ant-design/ant-design/pull/39700)
  - ⌨️ Reset `aria-label` in Table column. [#39738](https://github.com/ant-design/ant-design/pull/39738) [@kiner-tang](https://github.com/kiner-tang)
  - 💄 Adds transition animation for Table border. [#39713](https://github.com/ant-design/ant-design/pull/39713) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix Tabs add button color invisible in dark mode. [#39724](https://github.com/ant-design/ant-design/pull/39724)
- 🐞 Fix the problem that the height of the title bar is not enough when Card only has `extra`. [#39646](https://github.com/ant-design/ant-design/pull/39646) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix `justify` and `align` properties are not reactive in Row. [#39704](https://github.com/ant-design/ant-design/pull/39704) [@candy4290](https://github.com/candy4290)
- 🐞 Fix warning in App about two children with the same key. [#39695](https://github.com/ant-design/ant-design/pull/39695) [@Kamahl19](https://github.com/Kamahl19), [#39701](https://github.com/ant-design/ant-design/pull/39701) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 Image preview interactive optimization. [#39812](https://github.com/ant-design/ant-design/pull/39812) [@JarvisArt](https://github.com/JarvisArt)
- 💄 Fix Table filter dropdown wrong active background and dropdown shadow style. [#39805](https://github.com/ant-design/ant-design/pull/39805)
- TypeScript
  - 🤖 Fix missing type defination for Design Token. [#39754](https://github.com/ant-design/ant-design/pull/39754)

## 5.1.0

`2022-12-20`

- 🔥 New App Component which provide global style & static function replacement. [#39046](https://github.com/ant-design/ant-design/pull/39046)
- 🔥 New QRCode Component. [#38948](https://github.com/ant-design/ant-design/pull/38948)
- 🔥 New Watermark Component. [#39064](https://github.com/ant-design/ant-design/pull/39064) [@JarvisArt](https://github.com/JarvisArt)
- 🆕 Mentions support `options` prop. [#38630](https://github.com/ant-design/ant-design/pull/38630) [@heiyu4585](https://github.com/heiyu4585)
- 🆕 FloatButton support `clickOutAutoClose`. [#39501](https://github.com/ant-design/ant-design/pull/39501) [@BoyYangzai](https://github.com/BoyYangzai)
- 🆕 Popconfirm support `description` prop. [#39250](https://github.com/ant-design/ant-design/pull/39250) [@xhh0223](https://github.com/xhh0223)
- 🆕 Modal.confirm support `footer` prop. [#39048](https://github.com/ant-design/ant-design/pull/39048) [@owjs3901](https://github.com/owjs3901)
- 🆕 Table support `rowScope` to set the column range. [#39571](https://github.com/ant-design/ant-design/pull/39571)
- 🆕 Anchor support `items` data configuration option content, which supports nesting through children. [#39034](https://github.com/ant-design/ant-design/pull/39034) [@foryuki](https://github.com/foryuki)
- 🆕 Breakpoints can now follow theme token config. [#39105](https://github.com/ant-design/ant-design/pull/39105) [@azro352](https://github.com/azro352)
- 🆕 Tour prevButtonProps nextButtonProps support `style` `classname` prop. [#38939](https://github.com/ant-design/ant-design/pull/38939) [@ONLY-yours](https://github.com/ONLY-yours)
- 🆕 ConfigProvider support config `select.showSearch`. [#39531](https://github.com/ant-design/ant-design/pull/39531) [@YinDongFang](https://github.com/YinDongFang)
- 🐞 Fix Tabs `inkBar` not show in StrictMode. [#39653](https://github.com/ant-design/ant-design/pull/39653)
- 🐞 Fix Badge component width not being affected by parent element. [#39605](https://github.com/ant-design/ant-design/pull/39605) [@AydenGen](https://github.com/AydenGen)
- Select
  - 🐞 Fix wrong usage of icon color token in Select. [#39644](https://github.com/ant-design/ant-design/pull/39644)
  - 💄 Optimize Select a11y to bind real option element when `virtual=false`. [#39550](https://github.com/ant-design/ant-design/pull/39550)
- 🐞 Fix Tour steps set type=‘primary’ not work. [#39382](https://github.com/ant-design/ant-design/pull/39382) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 Fix disabled style miss when has href on Button. [#39456](https://github.com/ant-design/ant-design/pull/39456) [@BoyYangzai](https://github.com/BoyYangzai)
- 🐞 Fix Segmented icon unexpected margin. [#39575](https://github.com/ant-design/ant-design/pull/39575)
- 🐞 Fix Drawer unexpected warning about `DefaultProps`. [#39562](https://github.com/ant-design/ant-design/pull/39562)
- Menu
  - 🐞 Fix Menu.Submenu will flicker when use `createRoot` to render. [#38855](https://github.com/ant-design/ant-design/pull/38855) [@JarvisArt](https://github.com/JarvisArt)
  - 🛠 Refactor MenuItem to Function Component. [#38751](https://github.com/ant-design/ant-design/pull/38751)
  - 💄 Optimize Menu item style when selected. [#39439](https://github.com/ant-design/ant-design/pull/39439)
- 🛠 LocaleProvider has been deprecated in 4.x (use `<ConfigProvider locale />` instead), we removed the related folder antd/es/locale-provider and antd/lib/locale-provider in 5.x. [#39373](https://github.com/ant-design/ant-design/pull/39373)
- 🛠 Simplified lodash method introduction. [#39599](https://github.com/ant-design/ant-design/pull/39599) [#39602](https://github.com/ant-design/ant-design/pull/39602)
- TypeScript
  - 🤖 Optimize Button DropDown Modal Popconfirm Select Transfer mouse event type definition. [#39533](https://github.com/ant-design/ant-design/pull/39533)
  - 🤖 New export type `FloatButtonGroupProps`. [#39553](https://github.com/ant-design/ant-design/pull/39553)
- 🌐 Localization
  - 🇧🇪 Add `fr_BE` locale. [#39415](https://github.com/ant-design/ant-design/pull/39415) [@azro352](https://github.com/azro352)
  - 🇨🇦 Add `fr_CA` locale. [#39416](https://github.com/ant-design/ant-design/pull/39416) [@azro352](https://github.com/azro352)
  - 🇪🇸 Add `eu_ES` locale. [#39371](https://github.com/ant-design/ant-design/pull/39371) [@Ian-Inizias](https://github.com/Ian-Inizias)

## 5.0.7

`2022-12-13`

- 🐞 Fix Slider's Tooltip missing animation. [#39463](https://github.com/ant-design/ant-design/pull/39463) [@YinDongFang](https://github.com/YinDongFang)
- 🐞 Fix Table unexpected horizontal scroll bar when empty and bordered. [#39455](https://github.com/ant-design/ant-design/pull/39455) [@zjfresh](https://github.com/zjfresh)
- 🐞 Fix Popover arrow background color with customized `color`. [#39517](https://github.com/ant-design/ant-design/pull/39517)
- 🐞 Fix Modal hooks not pass ConfigProvider config correctly. [#39513](https://github.com/ant-design/ant-design/pull/39513)
- 🐞 Fix Radio align issue with custom size. [#39476](https://github.com/ant-design/ant-design/pull/39476)

## 5.0.6

`2022-12-12`

- 🐞 Fix FloatButton `tooltip` property is not support `0` value. [#39425](https://github.com/ant-design/ant-design/pull/39425) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Space wrapped Select not display clear icon problem when mouse hover. [#39468](https://github.com/ant-design/ant-design/pull/39468) [@foryuki](https://github.com/foryuki)
- 💄 Fix Cascader ul has unexpected margin value. [#39436](https://github.com/ant-design/ant-design/pull/39436) [@ZN1996](https://github.com/ZN1996)
- 💄 Fix Input has unexpected padding problem in compact mode. [#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 Optimize Message padding in compact mode. [#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 Fix Radio.Button has unexpected text color in dark mode. [#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 Fix Select has unexpected padding problem in compact mode. [#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 Fix Slider has unexpected size for marking dot. [#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 Optimize Switch color in dark mode. [#39428](https://github.com/ant-design/ant-design/pull/39428)

## 5.0.5

`2022-12-08`

- 🐞 Fix button hover style in Space.Compact. [#39157](https://github.com/ant-design/ant-design/pull/39157) [@foryuki](https://github.com/foryuki)
- 🐞 Fix Tabs active bar missing sometimes in windows Chrome. [#39352](https://github.com/ant-design/ant-design/pull/39352) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 Fix Divider `horizontal` align issue in flex layout. [#39339](https://github.com/ant-design/ant-design/pull/39339)
- 🐞 Fix Popover width in rtl mode. [#39311](https://github.com/ant-design/ant-design/pull/39311)
- 🐞 Fix Popconfirm padding style issue when `wireframe` is `true`. [#39313](https://github.com/ant-design/ant-design/pull/39313) [@MadCcc](https://github.com/MadCcc)
- 💄 Fix Select search input with white space style issue. [#39299](https://github.com/ant-design/ant-design/pull/39299) [@MadCcc](https://github.com/MadCcc)
- 💄 Fix Tree missing selection style. [#39292](https://github.com/ant-design/ant-design/pull/39292)
- 🐞 Fix FloatButton content not align when customize size. [#39282](https://github.com/ant-design/ant-design/pull/39282) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix RangePicker cell hover style. [#39266](https://github.com/ant-design/ant-design/pull/39266)
- 💄 Optimize Button style under Space.Compact. [#39241](https://github.com/ant-design/ant-design/pull/39241) [@foryuki](https://github.com/foryuki)
- 🌐 Fix `vi_VN` i18n mistake. [#39279](https://github.com/ant-design/ant-design/pull/39279) [@nghiepdev](https://github.com/nghiepdev)
- 🌐 Fix `he_IL` i18n mistake. [#39280](https://github.com/ant-design/ant-design/pull/39280) [@Ran-Sagy](https://github.com/Ran-Sagy)
- TypeScript
  - 🤖 Optimize Anchor `onClick` event definition. [#39305](https://github.com/ant-design/ant-design/pull/39305) [@li-jia-nan](https://github.com/li-jia-nan)

## 5.0.4

`2022-12-05`

- Modal
  - 🐞 Fix Modal with long content exceed the panel. [#39249](https://github.com/ant-design/ant-design/pull/39249) [@MuxinFeng](https://github.com/MuxinFeng)
  - 🐞 Fix Modal.info content width when without icon. [#39047](https://github.com/ant-design/ant-design/pull/39047) [@owjs3901](https://github.com/owjs3901)
- 🐞 Fix Tree config `checkable` and `blockNode` not makes `title` stretch issue. [#39209](https://github.com/ant-design/ant-design/pull/39209) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix Dropdown sub menu missing motion. [#39235](https://github.com/ant-design/ant-design/pull/39235)
- 💄 Fix RangePicker time panel padding style. [#39228](https://github.com/ant-design/ant-design/pull/39228)
- 🐞 Fix Card action button round style. [#39210](https://github.com/ant-design/ant-design/pull/39210) [@muxin](https://github.com/muxin)
- 🐞 Fix Badge wave effect color not follow `color`. [#39182](https://github.com/ant-design/ant-design/pull/39182) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Radio disabled status check style. [#39165](https://github.com/ant-design/ant-design/pull/39165) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fixed TextArea count style when `resize` is not `none`. [#39121](https://github.com/ant-design/ant-design/pull/39121) [@51wangping](https://github.com/51wangping)
- 🐞 Fix Transfer clicking the checkbox position cannot be unchecked and onSelectChange is triggered twice. [#39078](https://github.com/ant-design/ant-design/pull/39078) [@edc-hui](https://github.com/edc-hui)
- 🐞 Fix Steps set `size="small"` with progress not fully display. [#39100](https://github.com/ant-design/ant-design/pull/39100) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix Form horizontal layout with `xs` responsive config not work. [#39130](https://github.com/ant-design/ant-design/pull/39130)
- 🐞 Fix message position not correct in RTL. [#39248](https://github.com/ant-design/ant-design/pull/39248) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Switch only set with `checkedChildren` or `unCheckedChildren` content not display. [#39262](https://github.com/ant-design/ant-design/pull/39262)

## 5.0.3

`2022-11-30`

- 🐞 Fix Spin alignment when using `tip`. [#38923](https://github.com/ant-design/ant-design/pull/38923) [@sribich](https://github.com/sribich)
- Menu
  - 🐞 Fix Menu Submenu style when overflowed. [#39093](https://github.com/ant-design/ant-design/pull/39093)
  - 🐞 Fix Menu.Item hover area when trigger active color change. [#39077](https://github.com/ant-design/ant-design/pull/39077) [@Pulset](https://github.com/Pulset)
- 🐞 Fix Input.TextArea resize behavior by adding reset style. [aa92f02](https://github.com/ant-design/ant-design/commit/aa92f02)
- 🐞 Fix Upload default icon color. [#39114](https://github.com/ant-design/ant-design/pull/39114) [@MARKX97](https://github.com/MARKX97)
- 🐞 Fix ssr warning in dev mode caused by dynamic hashId. [#39069](https://github.com/ant-design/ant-design/pull/39069)
- 🐞 Fix FloatButton.Group flicking on closing. [#39061](https://github.com/ant-design/ant-design/pull/39061)
- 🐞 Fix Card.Meta that width is not 100%. [#39026](https://github.com/ant-design/ant-design/pull/39026) [@justanotheranonymoususer](https://github.com/justanotheranonymoususer)

## 5.0.2

`2022-11-27`

- 💄 Fix Card radius style broken when customize `bodyStyle` background color. [#38973](https://github.com/ant-design/ant-design/pull/38973) [@Yukiniro](https://github.com/Yukiniro)
- 💄 Optimize default algorithm for error color. [#38933](https://github.com/ant-design/ant-design/pull/38933)
- 💄 Optimize the style issue in RTL mode. [#38829](https://github.com/ant-design/ant-design/pull/38829) [@Wxh16144](https://github.com/Wxh16144)
- Space.Compact
  - 💄 Optimize Space.Compact style when wrapping a single child component. [#38896](https://github.com/ant-design/ant-design/pull/38896) [@foryuki](https://github.com/foryuki)
  - 💄 Fix Space.Compact component style problem when wrapping Modal, Dropdown, Drawer and other components. [#38870](https://github.com/ant-design/ant-design/pull/38870) [@foryuki](https://github.com/foryuki)
- 🐞 Fix horizontal Menu that has wrong width when is overflow. [#38989](https://github.com/ant-design/ant-design/pull/38989)
- 🐞 Fix Table that the old filter state still takes effect when the list filter column changes. [#38982](https://github.com/ant-design/ant-design/pull/38982)
- 🐞 Fix Select and Pagination incorrect text color in dark theme. [#38979](https://github.com/ant-design/ant-design/pull/38979) [@Dunqing](https://github.com/Dunqing)
- 🐞 Fix that Mentions `options` props not working. [#38968](https://github.com/ant-design/ant-design/pull/38968) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 Fix that `dist/reset.css` may be dropped in production. [#38956](https://github.com/ant-design/ant-design/pull/38956) [@passerV](https://github.com/passerV)
- 🐞 Fix Badge that `showZero` can't be used with custom color. [#38967](https://github.com/ant-design/ant-design/pull/38967) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix Form validation motion flick issue. [#38962](https://github.com/ant-design/ant-design/pull/38962)
- 🐞 Fix Tabs dropdown motion not work. [#38892](https://github.com/ant-design/ant-design/pull/38892)
- 🐞 Fix ConfigProvider that `componentDisabled` is not work. [#38886](https://github.com/ant-design/ant-design/pull/38886) [@lidianhao123](https://github.com/lidianhao123)
- 🐞 Fix Button `block` prop is not working when `shape="round"`. [#38869](https://github.com/ant-design/ant-design/pull/38869) [@jjlstruggle](https://github.com/jjlstruggle)
- 🐞 Fix Dropdown.Button that `dropdownRender` is not executed. [#38862](https://github.com/ant-design/ant-design/pull/38862) [@imoctopus](https://github.com/imoctopus)

## 5.0.1

`2022-11-22`

- 💄 Optimize Empty svg color in dark theme. [#38785](https://github.com/ant-design/ant-design/pull/38785)
- 💄 Fix Form, Input, Select, Tree part style convert to CSS-in-JS missing. [#38742](https://github.com/ant-design/ant-design/pull/38742)
- 💄 Fix animation flick for some components in Firefox. [#38729](https://github.com/ant-design/ant-design/pull/38729)
- Menu
  - 🐞 Fix Menu SubMenu margin style. [#38714](https://github.com/ant-design/ant-design/pull/38714) [@JarvisArt](https://github.com/JarvisArt)
  - 🐞 Fix Menu height in dark theme. [#38741](https://github.com/ant-design/ant-design/pull/38741) [@LuciNyan](https://github.com/LuciNyan)
  - 🐞 Fix Menu SubMenu flicking when expanding. [#38748](https://github.com/ant-design/ant-design/pull/38748) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix that Table expanded icons are not aligned。[#38823](https://github.com/ant-design/ant-design/pull/38823) [@turdiyev](https://github.com/turdiyev)
- 🐞 Fix FloatButton.BackTop missing animation. [#38770](https://github.com/ant-design/ant-design/pull/38770) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 Remove `Moment.js` dependency. [#38762](https://github.com/ant-design/ant-design/pull/38762)
- 🛠 Fix `CompoundedComponent` ts error。[#38666](https://github.com/ant-design/ant-design/pull/38666) [@wangcch](https://github.com/wangcch)
- 🛠 Rollback `lib` in package。[#38832](https://github.com/ant-design/ant-design/pull/38832) [@chunsch](https://github.com/chunsch)

## 5.0.0

`2022-11-18`

🏆 Ant Design 5.0.0 is released, see our [release note](https://github.com/ant-design/ant-design/issues/38671) for more details.

#### Read it before migration

🌟 If you want to migrate to Ant Design 5.0, please check [V4 to V5](/docs/react/migration-v5).

#### Major Changes

- 🔥 New Components
  - 🔥 FloatButton component, and refactor BackTop as child component of FloatButton. [#37520](https://github.com/ant-design/ant-design/pull/37520) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🔥 Tour component. [#37867](https://github.com/ant-design/ant-design/pull/37867) [#38469](https://github.com/ant-design/ant-design/pull/38469) [@heiyu4585](https://github.com/heiyu4585)
- 🔥 New Component Variants
  - 🔥 DatePicker add `presets` to support preset ranges for quick selection. [#38249](https://github.com/ant-design/ant-design/pull/38249)
  - 🔥 Progress `circle` type support responsive `format` text for small size. [#38231](https://github.com/ant-design/ant-design/pull/38231) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🔥 Steps add `inline` type. [#38311](https://github.com/ant-design/ant-design/pull/38311) [@JarvisArt](https://github.com/JarvisArt)
- 💄 New Design
  - 💄 Change primary color to `#1677ff`. [#37254](https://github.com/ant-design/ant-design/pull/37254)
  - 💄 Change basic border radius to `6px`, and support gradient radius. [#37146](https://github.com/ant-design/ant-design/pull/37146) [#37369](https://github.com/ant-design/ant-design/pull/37369)
  - 💄 Optimize transition duration. [#37438](https://github.com/ant-design/ant-design/pull/37438)
  - 💄 Optimize padding and remove border for some components. [#37283](https://github.com/ant-design/ant-design/pull/37283)
    - 💄 Pagination remove border. [#37441](https://github.com/ant-design/ant-design/pull/37441)
    - 💄 Optimize Timeline style. [#37465](https://github.com/ant-design/ant-design/pull/37465)
    - 💄 Optimize Steps style. [#37473](https://github.com/ant-design/ant-design/pull/37473)
  - 💄 Optimize focus style for some components. [#37483](https://github.com/ant-design/ant-design/pull/37483)
  - 💄 Optimize style with large border radius.
    - 💄 Optimize Table hover style. [#37370](https://github.com/ant-design/ant-design/pull/37370)
    - 💄 Optimize Segmented hover style. [#37498](https://github.com/ant-design/ant-design/pull/37498)
    - 💄 Optimize Dropdown hover style. [#37491](https://github.com/ant-design/ant-design/pull/37491)
    - 💄 Optimize close button style for some components like Modal. [#37634](https://github.com/ant-design/ant-design/pull/37634)
    - 💄 Optimize Menu style. [#38009](https://github.com/ant-design/ant-design/pull/38009)
    - 💄 Optimize hover style for some more components. [#37433](https://github.com/ant-design/ant-design/pull/37433)
  - 💄 Optimize Switch transition. [#37658](https://github.com/ant-design/ant-design/pull/37658)
  - 💄 Optimize Anchor ink ball style. [#38616](https://github.com/ant-design/ant-design/pull/38616)
- 🆕 Export object `theme` which contains hooks and algorithms related with theme. [#36302](https://github.com/ant-design/ant-design/pull/36302)
  - 🆕 Add `theme.useToken` hook to get Design Token in context. [#36267](https://github.com/ant-design/ant-design/pull/36267)
  - 🆕 Preset algorithm
    - 🆕 Default algorithm `theme.defaultAlgorithm`. [#36175](https://github.com/ant-design/ant-design/pull/36175)
    - 🆕 Dark algorithm `theme.darkAlgorithm`. [#36546](https://github.com/ant-design/ant-design/pull/36546) [#36656](https://github.com/ant-design/ant-design/pull/36656)
    - 🆕 Compact algorithm `theme.compactAlgorithm`. [#38105](https://github.com/ant-design/ant-design/pull/38105)
- 🆕 ConfigProvider support `theme` prop to modify theme configuration. For more: [Customize Theme](https://ant.design/docs/react/customize-theme).
  - 🆕 Support multiple `algorithm` pipeline. [#37082](https://github.com/ant-design/ant-design/pull/37082)
  - 🆕 Support switching wireframe style. [#37507](https://github.com/ant-design/ant-design/pull/37507)
  - 🆕 Support override Design Token for single component. [#37568](https://github.com/ant-design/ant-design/pull/37568)
- 🆕 Add `locale` directory in package, which contains commonjs locale files. [#38194](https://github.com/ant-design/ant-design/pull/38194) [@chunsch](https://github.com/chunsch)
- 🗑 Do not support IE browser anymore.
- 🗑 Remove package `antd/lib`. [#36362](https://github.com/ant-design/ant-design/pull/36362)
  - 🛠 Change `main` in `package.json` to `dist/antd.js`. [eb8835f](https://github.com/ant-design/ant-design/commit/eb8835fe29b39767c0f5e310f5c69619a75d5840)
- 🗑 Remove `dist/antd.css`, and add `dist/reset.css` to override common styles. [#36224](https://github.com/ant-design/ant-design/pull/36224)
- 🗑 Deprecate `visible` and provide `open` instead in components below. [@yykoypj](https://github.com/yykoypj)
  - 🗑 Tag deprecate `visible`. [#36671](https://github.com/ant-design/ant-design/pull/36671)
  - 🗑 Table deprecate `filterDropdownVisible` and provide `filterDropdownOpen`. [#36747](https://github.com/ant-design/ant-design/pull/36747)
  - 🗑 Drawer deprecate `visible` and provide `open` instead. [#36750](https://github.com/ant-design/ant-design/pull/36750)
  - 🗑 Modal deprecate `visible` and provide `open` instead. [#36774](https://github.com/ant-design/ant-design/pull/36774)
  - 🗑 Dropdown deprecate `visible` and provide `open` instead. [#36799](https://github.com/ant-design/ant-design/pull/36799)
  - 🗑 Tooltip deprecate `visible` and provide `open` instead, Popover and Popconfirm. [#36807](https://github.com/ant-design/ant-design/pull/36807)
- 🗑 Deprecate `dropdownClassName` and provide `popupClassName` instead in components below. [@heiyu4585](https://github.com/heiyu4585)
  - 🗑 AutoComplete deprecate `dropdownClassName` and provide `popupClassName` instead. [#37087](https://github.com/ant-design/ant-design/pull/37087)
  - 🗑 Mentions deprecate `dropdownClassName` and provide `popupClassName` instead. [#37122](https://github.com/ant-design/ant-design/pull/37122)
  - 🗑 Cascader deprecate `dropdownClassName` and provide `popupClassName` instead. [#37089](https://github.com/ant-design/ant-design/pull/37089)
  - 🗑 Select deprecate `dropdownClassName` and provide `popupClassName` instead. [#37091](https://github.com/ant-design/ant-design/pull/37091)
  - 🗑 TreeSelect deprecate `dropdownClassName` and provide `popupClassName` instead. [#37092](https://github.com/ant-design/ant-design/pull/37092)
  - 🗑 DatePicker and TimePicker deprecate `dropdownClassName` and provide `popupClassName` instead. [#37207](https://github.com/ant-design/ant-design/pull/37207)
- 🛠 Refactor styles with CSS-in-JS for all components.
  - 🗑 Remove less and css in package. [#36244](https://github.com/ant-design/ant-design/pull/36244)
- 🛠 Change date library from Moment.js to Day.js, for more: [Use custom date library](https://ant.design/docs/react/use-custom-date-library). [b22815d](https://github.com/ant-design/ant-design/commit/b22815d4d223b80755b472e14d7888beab8dd1da) [@iamkun](https://github.com/iamkun)
- 🛠 React Notification to support React 18 concurrent mode and refactor useNotification hook，which is preferred instead of static function. [#35423](https://github.com/ant-design/ant-design/pull/35423) [#35568](https://github.com/ant-design/ant-design/pull/35568)
- 🛠 Slider props related with Tooltip are unified into `tooltip`. [#37043](https://github.com/ant-design/ant-design/pull/37043) [@yykoypj](https://github.com/yykoypj)
- 🛠 Migrate official site to [dumi@2](https://next.d.umijs.org/). [#38328](https://github.com/ant-design/ant-design/pull/38328)

## 4.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/4.x-stable/CHANGELOG.en-US.md) to read `4.x` change logs.

## 3.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/3.x-stable/CHANGELOG.en-US.md) to read `3.x` change logs.

## 2.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/2.x-stable/CHANGELOG.en-US.md) to read `2.x` change logs.

## 1.11.4

Visit [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md) to read change logs from `0.x` to `1.x`.
