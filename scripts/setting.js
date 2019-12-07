var GoogleSpreadsheet = require("google-spreadsheet");

var doc = new GoogleSpreadsheet("1V0yILdCOmle772i8nAiuhbzW4IHof7L7vQAjGOabo_4"); // ここはスプレッドシートごとに書き換える必要がある
var sheet;

var time = "10:00";
var name = "飛んで";
var status = "退勤";
var working_time = 6;

function setAuth() {
  return new Promise(function (resolve, reject) {
    var creds = require("../MATTKnock-f8684ee7b88f.json");
    doc.useServiceAccountAuth(creds, function () {
      doc.getInfo(function (err, info) {
        if (err) {
          reject("認証error");
        }
        sheet = info.worksheets[0];
        resolve("認証成功")
      });
    });
  })
}

async function setData() {
  const res = await setAuth()
  console.log(res);
  sheet.addRow(
    {
      現在時刻: time,
      名前: name,
      出勤退勤: status,
      労働時間: working_time
    }
  );
}

setData();