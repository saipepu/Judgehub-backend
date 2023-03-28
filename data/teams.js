exports.teamList = [
  {
    name: 'Jelly Bob',
    fund: 0,
    history: "",
  },
  {
    name: 'Fizzle',
    fund: 0,
    history: "",
  },
  {
    name: 'Blizz',
    fund: 0,
    history: "",
  },
  {
    name: 'Kripz',
    fund: 0,
    history: "",
  },
  {
    name: 'Zeri',
    fund: 0,
    history: "",
  },
  {
    name: 'Profries',
    fund: 0,
    history: "",
  },
  {
    name: 'Haly Bake',
    fund: 0,
    history: "",
  },
  {
    name: 'Fragante',
    fund: 0,
    history: "",
  },
  {
    name: 'K\'otton',
    fund: 0,
    history: "",
  },
  {
    name: 'Day One',
    fund: 0,
    history: "",
  },
  {
    name: 'Locomto',
    fund: 0,
    history: "",
  },
  {
    name: 'Let\'s Plant',
    fund: 0,
    history: "",
  },
  {
    name: 'GottaGO',
    fund: 0,
    history: "",
  },
  {
    name: 'Harn',
    fund: 0,
    history: "",
  },
  {
    name: 'Athena',
    fund: 0,
    history: "",
  },
  {
    name: 'Tagme',
    fund: 0,
    history: "",
  },
  {
    name: 'R-ROI',
    fund: 0,
    history: "",
  },
  {
    name: 'Indicat',
    fund: 0,
    history: "",
  },
  {
    name: 'Yeobo',
    fund: 0,
    history: "",
  },
  {
    name: 'Frescas',
    fund: 0,
    history: "",
  },
  {
    name: 'Giadina',
    fund: 0,
    history: "",
  },
  {
    name: 'CoGrow',
    fund: 0,
    history: "",
  },
  {
    name: 'Wastic',
    fund: 0,
    history: "",
  },
]
const password = ['qires', 'qieos', 'agags', 'agase', 'asdfe', 'asdde', 'asdfd', 'asfda', 'rfdde', 'wtcse', 'wevce', 'wetfe', 'aseed', 'qefds', 'asfed', 'asdfg', 'asdfi', 'asasd', 'asdes', 'asded']

const x = [];
for(let i=1; i<=20; i++) {
  let obj = {};
  obj.login_id = "judge" + i;
  obj.password = password[i-1];
  obj.teamList = this.teamList;
  obj.transactionHistory = "";
  x.push(obj);
}

exports.judgeList = x;