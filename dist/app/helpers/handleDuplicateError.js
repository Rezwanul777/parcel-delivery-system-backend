"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = (err) => {
    const matchedArray = err.message.match(/"([^"]*)"/);
    return {
        statusCode: 400,
        message: `Duplicate ${(matchedArray === null || matchedArray === void 0 ? void 0 : matchedArray[1]) || "field"} already exits`
    };
};
exports.handleDuplicateError = handleDuplicateError;
