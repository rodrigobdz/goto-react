"use strict";
import * as vscode from "vscode";
import * as path from "path";

export default class GotoReact {
  private readonly CONTAINER = "container";
  private readonly COMPONENT = "component";

  /**
   * Opens the component/container of the currently active container/component.
   */
  public openCounterpart() {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      return vscode.window.showWarningMessage("There is no active editor.");
    }

    // Get the normalized relative path of the active editor
    const normalizedRelativePath = path.normalize(
      vscode.workspace.asRelativePath(editor.document.fileName)
    );

    // Check (case sensitive) if file is either a component or a container
    const isComponent = normalizedRelativePath.includes(this.COMPONENT);
    const isContainer = normalizedRelativePath.includes(this.CONTAINER);

    if (isContainer) {
      return this.openFile(
        normalizedRelativePath,
        this.CONTAINER,
        this.COMPONENT
      );
    } else if (isComponent) {
      return this.openFile(
        normalizedRelativePath,
        this.COMPONENT,
        this.CONTAINER
      );
    }

    // Error handling when path has a different format than expected.
    return vscode.window.showErrorMessage(
      `Current file is neither a ${this.CONTAINER} nor a ${this.COMPONENT}.`
    );
  }

  /**
   * Helper function to show file if exists.
   * @param filePath Path to the currently open file.
   * @param type component/container.
   * @param replacementType component/container.
   */
  private async openFile(
    filePath: string,
    type: string,
    replacementType: string
  ) {
    // Check if file has counterpart
    const searchPath = filePath.replace(type + "s", replacementType + "s");
    let result = (await vscode.workspace.findFiles(searchPath, null, 1))![0];

    if (!result) {
      return vscode.window.showErrorMessage(
        `No ${replacementType} found for ${type}.`
      );
    }

    vscode.window.showTextDocument(result);
  }
}
