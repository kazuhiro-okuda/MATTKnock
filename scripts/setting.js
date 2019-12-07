var GoogleSpreadsheet = require("google-spreadsheet");

var doc = new GoogleSpreadsheet("1V0yILdCOmle772i8nAiuhbzW4IHof7L7vQAjGOabo_4"); // ここはスプレッドシートごとに書き換える必要がある
var sheet;

const sampleData = { current_time: "23:00", name: "ブラック退勤", status: "退勤", working_time: "00:00" }

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

module.exports = async function setData(data) {
  const res = await setAuth()
  console.log(res);
  const { current_time, name, status, working_time } = data
  sheet.addRow(
    {
      現在時刻: current_time,
      名前: name,
      出勤退勤: status,
      労働時間: working_time
    },
    function () {
      console.log("送信完了");
    }
  );
}

setData(sampleData);