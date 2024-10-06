// eslint-config-custom/rules/naming-allowed-words.js
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Ensure that TypeScript type aliases and interfaces use only allowed words from the server types, ignoring generics and ignoring interfaces ending with 'Props'. Only analyzes .tsx files.",
      category: "Best Practices",
      recommended: false,
    },
    messages: {
      invalidNaming:
        'The name "{{usedName}}" is not allowed. Use only terms defined in types.gen.ts.',
    },
    schema: [],
  },
  create(context) {
    const fileName = context.getFilename();

    if (!fileName.endsWith(".tsx")) {
      return {};
    }

    const typesGenPath = path.resolve(
      __dirname,
      "../../gomoku-core/src/api/client/types.gen.ts",
    );

    let allowedWords = new Set();

    try {
      const fileContent = fs.readFileSync(typesGenPath, "utf8");
      const sourceFile = ts.createSourceFile(
        "types.gen.ts",
        fileContent,
        ts.ScriptTarget.ES2015,
        true,
      );

      function extractWords(node) {
        if (
          ts.isTypeAliasDeclaration(node) ||
          ts.isInterfaceDeclaration(node)
        ) {
          allowedWords.add(node.name.text);
        } else if (
          ts.isPropertySignature(node) ||
          ts.isPropertyDeclaration(node)
        ) {
          allowedWords.add(node.name.getText());
        }

        ts.forEachChild(node, extractWords);
      }

      ts.forEachChild(sourceFile, extractWords);
    } catch (error) {
      console.error("Error reading or parsing types.gen.ts:", error);
    }

    return {
      TSTypeAliasDeclaration(node) {
        const typeName = node.id.name;

        if (typeName.endsWith("Props")) {
          return;
        }

        if (typeName.endsWith("Item")) {
          return;
        }

        if (!allowedWords.has(typeName)) {
          context.report({
            node: node.id,
            messageId: "invalidNaming",
            data: {
              usedName: typeName,
            },
          });
        }
      },
      TSInterfaceDeclaration(node) {
        const interfaceName = node.id.name;

        if (interfaceName.endsWith("Props")) {
          return;
        }

        if (!allowedWords.has(interfaceName)) {
          context.report({
            node: node.id,
            messageId: "invalidNaming",
            data: {
              usedName: interfaceName,
            },
          });
        }
      },
    };
  },
};
