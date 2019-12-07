var GoogleSpreadsheet = require("google-spreadsheet");
var async = require("async");

var doc = new GoogleSpreadsheet("1V0yILdCOmle772i8nAiuhbzW4IHof7L7vQAjGOabo_4"); // ここはスプレッドシートごとに書き換える必要がある
var sheet;

async.series(
  [
    function setAuth(step) {
      console.log(step);
      var creds = require("../MATTKnock-f8684ee7b88f.json");
      doc.useServiceAccountAuth(creds, step);
    },
    function getInfoAndWorksheets(step) {
      doc.getInfo(function(err, info) {
        // console.log(info);
        sheet = info.worksheets[0];
        step();
      });
    },
    function workingWithCells(step) {
      const COLUMNS = {
        current_time: 0,
        name: 1,
        status: 2,
        working_time: 3
      };
      // sheet.getCells(
      //   {
      //     "min-row": 1,
      //     "max-row": 6,
      //     "return-empty": true
      //   },
      //   function(err, cells) {
      //     // console.log(cells.length);
      //     // console.log(sheet.colCount);
      //     for (let i = 0; i < cells.length / sheet.colCount; i++) {
      //       const current_time =
      //         cells[i * sheet.colCount + COLUMNS.current_time].value;
      //       const name = cells[i * sheet.colCount + COLUMNS.name].value;
      //       const status = cells[i * sheet.colCount + COLUMNS.status].value;
      //       const working_time =
      //         cells[i * sheet.colCount + COLUMNS.working_time].value;
      //       console.log(
      //         current_time + " " + name + " " + status + "" + working_time
      //       );
      //     }
      //   }
      // );
      sheet.getCells(
        {
          "min-row": 1,
          "max-row": 2,
          "return-empty": true
        },
        function(err, cells) {
          var cell = cells[0];
          var cell2 = cells[1];
          cell.value = "test";
          cell2.value = "test2";
          cell.save();
          cell2.save();
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
