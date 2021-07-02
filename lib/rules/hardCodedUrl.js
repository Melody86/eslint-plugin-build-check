module.exports = {
    meta: {
      type: "suggestion",
      docs: {
        description: "不允许硬编码业务域名, 请进行配置化！",
      },
      fixable: "code",
    },
   
    create: function (context) {
      const sourceCode = context.getSourceCode();
   
      function checkDomain(node) {
        // 匹配硬编码的业务域名的正则
        const proto = "^(((http(s)?:\/\/)|(ws(s)?):\/\/)|(www.)|(file:\/\/))";
        const host = "(([a-zA-z0-9][-a-zA-z0-9]{1,62})|(\.[a-zA-z0-9][-a-zA-z0-9]{0,62})+)(:\d+)*";

        const Reg = new RegExp(proto + host);
        const content =
          (node.type === "Literal" && node.value) ||
          (node.type === "TemplateLiteral" && node.quasis[0].value.cooked);
   
        const domainNode =
          (node.type === "Literal" && node) ||
          (node.type === "TemplateLiteral" && node.quasis[0]);
   
        console.log('content', content);
        if (/^(((http(s)?:\/\/)|(ws(s)?):\/\/)|(www.)|(file:\/\/))(([a-zA-z0-9][-a-zA-z0-9]{1,62})|(\.[a-zA-z0-9][-a-zA-z0-9]{0,62})+)(:\d+)*/.test(content)) {
            console.log('reg pass::::::::::');
          context.report({
            node,
            // 错误/警告提示信息
            message: "不允许硬编码业务域名, 请进行配置化！",
            // 修复
            fix(fixer) {
              
              const fixes = [];
              
              let domainKey = content.match(Reg)[2];
              domainKey = domainKey
                ? domainKey.substr(0, domainKey.length - 1)
                : "";
   
              if (node.type === "Literal") {
                fixes.push(
                  fixer.replaceTextRange(
                    [domainNode.start + 1, domainNode.end - 1],
                    content.replace(Reg, `$4`)
                  )
                );
              }
   
              if (node.type === "TemplateLiteral") {
                fixes.push(
                  fixer.replaceTextRange(
                    [domainNode.start, domainNode.end],
                    content.replace(Reg, `$4`)
                  )
                );
              }
               
              if (
                node.type === "Literal" &&
                node.parent.type === "JSXAttribute"
              ) {
                fixes.push(fixer.insertTextBefore(node, "{"));
                fixes.push(fixer.insertTextAfter(node, "}"));
              }
   
              fixes.push(
                fixer.insertTextBefore(
                  node,
                  `window.getDomain('${domainKey}') + `
                )
              );
   
              return fixes;
            },
          });
        }
      }
      return {
        // 文本
        Literal: checkDomain,
        // 模板字符串
        TemplateLiteral: checkDomain,
      };
    },
  };
