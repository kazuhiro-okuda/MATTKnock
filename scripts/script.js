var GoogleSpreadsheet = require("google-spreadsheet");
var async = require("async");

var doc = new GoogleSpreadsheet("1V0yILdCOmle772i8nAiuhbzW4IHof7L7vQAjGOabo_4"); // ここはスプレッドシートごとに書き換える必要がある
var sheet;

// async.series(
//   [
//     function setAuth(step) {
//       console.log(step);
//       var creds = require("../MATTKnock-f8684ee7b88f.json");
//       doc.useServiceAccountAuth(creds, step);
//     },
//     function getInfoAndWorksheets(step) {
//       doc.getInfo(function(err, info) {
//         sheet = info.worksheets[0];
//         step();
//       });
//     },
//     function setData(step) {
//       sheet.addRow(
//         {
//           現在時刻: time,
//           名前: name,
//           出勤退勤: status,
//           労働時間: working_time
//         },
//         function(row) {
//           console.log(row);
//         }
//       );
//       step();
//     },
//     function workingWithCells(step) {
//       const COLUMNS = {
//         current_time: 0,
//         name: 1,
//         status: 2,
//         working_time: 3
//       };
//       sheet.getCells(
//         {
//           "min-row": 1,
//           "max-row": 6,
//           "return-empty": true
//         },
//         function(err, cells) {
//           for (let i = 0; i < cells.length / sheet.colCount; i++) {
//             const current_time =
//               cells[i * sheet.colCount + COLUMNS.current_time].value;
//             const name = cells[i * sheet.colCount + COLUMNS.name].value;
//             const status = cells[i * sheet.colCount + COLUMNS.status].value;
//             const working_time =
//               cells[i * sheet.colCount + COLUMNS.working_time].value;
//             console.log(
//               current_time + " " + name + " " + status + "" + working_time
//             );
//           }
//         }
//       );
//     }
//   ],
//   function(err) {
//     if (err) {
//       console.log("Error: " + err);
//     }
//   }
// );

module.exports = robot => {
  robot.hear(/出勤|退勤/i, res => {
    var name = res.envelope.user.real_name;
    var status;
    var working_time = 6;
    var time = new Date();
    let hour = time.getHours();
    let minutes = time.getMinutes();
    time = hour + ":" + minutes;
    status = res.message.text.split(" ")[1];
    async.series(
      [
        function setAuth(step) {
          console.log(step);
          var creds = require("../MATTKnock-f8684ee7b88f.json");
          doc.useServiceAccountAuth(creds, step);
        },
        function getInfoAndWorksheets(step) {
          doc.getInfo(function(err, info) {
            sheet = info.worksheets[0];
            step();
          });
        },
        function setData(step) {
          sheet.addRow(
            {
              現在時刻: time,
              名前: name,
              出勤退勤: status,
              労働時間: working_time
            },
            function(row) {
              console.log(row);
            }
          );
          step();
        },
        function workingWithCells(step) {
          const COLUMNS = {
            current_time: 0,
            name: 1,
            status: 2,
            working_time: 3
          };
          sheet.getCells(
            {
              "min-row": 1,
              "max-row": 6,
              "return-empty": true
            },
            function(err, cells) {
              for (let i = 0; i < cells.length / sheet.colCount; i++) {
                const current_time =
                  cells[i * sheet.colCount + COLUMNS.current_time].value;
                const name = cells[i * sheet.colCount + COLUMNS.name].value;
                const status = cells[i * sheet.colCount + COLUMNS.status].value;
                const working_time =
                  cells[i * sheet.colCount + COLUMNS.working_time].value;
                console.log(
                  current_time + " " + name + " " + status + "" + working_time
                );
              }
            }
          );
        }
      ],
      function(err) {
        if (err) {
          console.log("Error: " + err);
        }
      }
    );
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
