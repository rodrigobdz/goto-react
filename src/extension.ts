"use strict";
import * as vscode from "vscode";
import * as path from "path";

/**
 * Opens the component/container of the currently active container/component in VSCode.
 */
function openCounterpart() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return vscode.window.showWarningMessage("There is no active editor.");
  }

  const CONTAINER = "container";
  const COMPONENT = "component";

  const normalizedRelativePath = path.normalize(
    vscode.workspace.asRelativePath(editor.document.fileName)
  );

  const isComponent = normalizedRelativePath.includes(COMPONENT);
  const isContainer = normalizedRelativePath.includes(CONTAINER);

  if (isContainer) {
    return openFile(normalizedRelativePath, CONTAINER, COMPONENT);
  } else if (isComponent) {
    return openFile(normalizedRelativePath, COMPONENT, CONTAINER);
  }

  vscode.window.showErrorMessage(
    `Current file is neither a ${CONTAINER} nor a ${COMPONENT}.`
  );
}

/**
 * Helper function to show file if exists.
 * @param filePath Path to the currently open file.
 * @param type component/container.
 * @param replacementType component/container.
 */
async function openFile(
  filePath: string,
  type: string,
  replacementType: string
) {
  const searchPath = filePath.replace(type + "s", replacementType + "s");
  let result = (await vscode.workspace.findFiles(searchPath, null, 1))![0];

  if (!result) {
    vscode.window.showErrorMessage(`No ${replacementType} found for ${type}.`);
  }

  vscode.window.showTextDocument(result);
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.openCounterpart",
    openCounterpart
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
