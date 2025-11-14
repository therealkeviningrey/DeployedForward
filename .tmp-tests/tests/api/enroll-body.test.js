"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = __importDefault(require("node:test"));
const http_1 = require("../../lib/http");
(0, node_test_1.default)('readRequestData parses JSON body', async () => {
    const request = new Request('http://localhost/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: 'course_123' }),
    });
    const result = await (0, http_1.readRequestData)(request);
    strict_1.default.equal(result.isForm, false);
    strict_1.default.equal(result.data.courseId, 'course_123');
});
(0, node_test_1.default)('readRequestData parses form body', async () => {
    const params = new URLSearchParams({ courseId: 'course_456' });
    const request = new Request('http://localhost/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
    });
    const result = await (0, http_1.readRequestData)(request);
    strict_1.default.equal(result.isForm, true);
    strict_1.default.equal(result.data.courseId, 'course_456');
});
