"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.allUsers = allUsers;
exports.setAvatar = setAvatar;
exports.logout = logout;
const db_1 = require("../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../config/jwt");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        if (!username || !email || !password)
            return res.status(400).json({ error: "All fields required" });
        try {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield db_1.prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                },
            });
            const token = (0, jwt_1.signJwt)({ id: user.id });
            const { password: _ } = user, userSafe = __rest(user, ["password"]);
            res.json({ status: true, user: userSafe, token });
        }
        catch (err) {
            console.error("Register Error:", err);
            if (err.code === 'P2002') {
                return res.status(409).json({ error: "Username or Email already exists" });
            }
            else {
                return res.status(500).json({ error: "Server error", details: err.message });
            }
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        const user = yield db_1.prisma.user.findUnique({ where: { username } });
        if (!user)
            return res.status(400).json({ error: "User not found" });
        const valid = yield bcrypt_1.default.compare(password, user.password);
        if (!valid)
            return res.status(400).json({ error: "Invalid credentials" });
        const token = (0, jwt_1.signJwt)({ id: user.id });
        const { password: _ } = user, userSafe = __rest(user, ["password"]);
        res.json({ status: true, user: userSafe, token });
    });
}
function allUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const users = yield db_1.prisma.user.findMany({
            where: { NOT: { id } },
            select: {
                id: true,
                username: true,
                email: true,
                avatarImage: true,
                isAvatarImageSet: true,
            }
        });
        res.json(users);
    });
}
function setAvatar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.id;
        const { image } = req.body;
        const user = yield db_1.prisma.user.update({
            where: { id: userId },
            data: {
                avatarImage: image,
                isAvatarImageSet: true,
            }
        });
        res.json({ isSet: true, image: user.avatarImage });
    });
}
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // The socket mapping is in-memory; clearing is handled by socket.io.
        res.sendStatus(200);
    });
}
