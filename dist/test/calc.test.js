"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calc_1 = require("../calc");
test("Deve somar 2 números", () => {
    expect((0, calc_1.soma)(1, 2)).toBe(3);
});
