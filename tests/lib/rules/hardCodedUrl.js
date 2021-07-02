var rule = require("../../../lib/rules/hardCodedUrl"),
    RuleTester = require("eslint").RuleTester;
 
var ruleTester = new RuleTester();
ruleTester.run("hardCodedUrl", rule, {
  valid: [
    "bar",
    "baz",
    `s = { x: "zcygov" };`,
  ],
  invalid: [
    {
      code: `wss//zcygov.cn`,
      errors: [
        {
          message: "不允许硬编码业务域名",
        },
      ],
    },
    {
      code: `
            var s = {
              x: "http://bidding.zcygov.cn"
            };
            `,
      errors: [
        {
          message: "不允许硬编码业务域名",
        },
      ],
    },
  ],
});