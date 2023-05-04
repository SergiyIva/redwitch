import _ from "lodash";

const data = [
  {
    day: 1,
    year: 2021,
    hits: 15
  },
  {
    day: 2,
    year: 2020,
    hits: 10
  },
  {
    day: 3,
    year: 2020,
    hits: 5
  },
  {
    day: 1,
    year: 2020,
    kits: 25
  },
  {
    day: 1,
    year: 2020,
    hits: 15
  },
  {
    day: 2,
    year: 2020,
    kits: 5
  }
];
_.concat();
const yearAndDay = (obj) => `${obj.year}/${obj.day}`;
console.log(
  _(data)
    .groupBy(yearAndDay)
    .values()
    .map((arr) => _.reduce(arr, _.merge, {}))
    .value()
);
// console.log(_.uniqueId());
// console.log(_.uniqueId());
// console.log(_.uniqueId());
// console.log(_.uniqueId());
// console.log(_.uniqueId());
