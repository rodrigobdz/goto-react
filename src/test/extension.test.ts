// The module 'assert' provides assertion methods from node
import * as assert from "assert";
import GotoReact from "../goto-react";

suite("GotoReact Tests", function() {
  test("defined constants", function() {
    const gotoReact = new GotoReact();
    assert.equal(gotoReact.CONTAINER, "container");
    assert.equal(gotoReact.COMPONENT, "component");
  });
});
