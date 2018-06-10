"use strict";
import { ExtensionContext, commands } from "vscode";
import GotoReact from "./goto-react";

export function activate(context: ExtensionContext) {
  const gotoReact = new GotoReact();
  let disposable = commands.registerCommand("extension.openCounterpart", () =>
    gotoReact.openCounterpart()
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
