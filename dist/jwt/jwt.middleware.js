"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtMiddleWare = void 0;
function jwtMiddleWare(req, res, next) {
    console.log(req.headers);
    next();
}
exports.jwtMiddleWare = jwtMiddleWare;
//# sourceMappingURL=jwt.middleware.js.map