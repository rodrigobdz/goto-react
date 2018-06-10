"use strict";
import * as vscode from "vscode";
import GotoReact from "./goto-react";

export function activate(context: vscode.ExtensionContext) {
  const gotoReact = new GotoReact();
  let disposable = vscode.commands.registerCommand(
    "extension.openCounterpart",
    gotoReact.openCounterpart
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
