// lib/prisma.ts

declare global {
  var prisma: PrismaClient; // This must be a `var` and not a `let / const`
}

import { PrismaClient } from "@prisma/client";
let db: PrismaClient;

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  db = global.prisma;
}

export default db;
