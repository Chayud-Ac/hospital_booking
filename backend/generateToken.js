import bcrypt from "bcrypt";
import crypto from "crypto";
import fs from "fs";

// Generate a random string
const randomString = crypto.randomBytes(256).toString("base64");
console.log("Random String:", randomString);
