"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readRequestData = readRequestData;
async function readRequestData(request) {
    const contentType = request.headers.get('content-type')?.toLowerCase() ?? '';
    if (contentType.includes('application/json')) {
        const data = await request.json();
        return { data, isForm: false };
    }
    if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
        const formData = await request.formData();
        return { data: Object.fromEntries(formData.entries()), isForm: true };
    }
    try {
        const data = await request.json();
        return { data, isForm: false };
    }
    catch {
        const cloned = request.clone();
        const formData = await cloned.formData();
        return { data: Object.fromEntries(formData.entries()), isForm: true };
    }
}
