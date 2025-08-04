"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTrackingId = generateTrackingId;
const crypto_1 = require("crypto");
function generateTrackingId() {
    const now = new Date();
    const timestamp = now.getFullYear().toString() +
        String(now.getMonth() + 1).padStart(2, '0') +
        String(now.getDate()).padStart(2, '0');
    const rand = (0, crypto_1.randomBytes)(3).toString('hex').toUpperCase(); // Generates a 6-char hex string
    return `TRK-${timestamp}-${rand}`;
}
