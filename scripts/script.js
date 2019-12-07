var GoogleSpreadsheet = require("google-spreadsheet");

var doc = new GoogleSpreadsheet("1V0yILdCOmle772i8nAiuhbzW4IHof7L7vQAjGOabo_4"); // ここはスプレッドシートごとに書き換える必要がある
var sheet;

const setData = require("./setting.js")

module.exports = robot => {
  robot.hear(/出勤|退勤/i, res => {
    var time = new Date();
    let hour = time.getHours();
    let minutes = time.getMinutes();
    time = hour + ":" + minutes;
    const userInfo = { current_time: time, name: res.envelope.user.real_name, status: res.message.text.split(" ")[1], working_time: "00:00" }
    setData(userInfo)
    res.send("Hello!");
  });

  robot.hear(/遅刻/i, res => {
    res.send("減給しますよ！");
  });

  robot.hear(/出勤/i, res => {
    res.send("出勤を確認しました！今日も一日頑張りましょう！");
  });

  robot.hear(/退勤/i, res => {
    res.send("退勤を確認しました！今日も一日お疲れ様でした！");
  });

  robot.hear(/現在時刻/i, res => {
    var now = new Date();
    var n = now.toString();
    res.send(n);
  });

  robot.hear(/名前/i, res => {
    // console.log(Object.keys(req.envelope.user.name));
    res.send(res.envelope.user.real_name);
  });
};
