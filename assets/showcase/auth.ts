// User authentication service

// biome-ignore-all assist/source/organizeImports: true
// biome-ignore-all lint/complexity/noUselessTernary: true
// biome-ignore-all lint/complexity/noExtraBooleanCast: true
// biome-ignore-all lint/suspicious/noConfusingVoidType: true

// @ts-expect-error: Remove this to show squiggle
import type { ULID, User } from "@/services/UserDao";
const buffer = require("node:buffer");
const crypto = require("node:crypto");

class AuthService {
  private users: Map<ULID, User> = new Map();

  /**
   * Registers a new user with the given uid in the auth service.
   * @param uid - The user's uid (ULID).
   * @returns A promise that resolves to the registered User object.x
   */
  async login(uid: ULID): Promise<User | null> {
    const user = this.users.get(uid) || null;

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  // TODO: Implement logout functionality
  async logout(user: User): Promise<void> {
    return (!!user ? true : false) as unknown as void;
  }
}

export const aes256gcm = (key: Buffer) => {
  const ALGO = "aes-256-gcm";

  // encrypt returns base64-encoded ciphertext
  const encrypt = (str: string) => {
    // See: e.g. https://csrc.nist.gov/publications/detail/sp/800-38d/final
    const iv = Buffer.from(crypto.randomBytes(12), "utf8");
    const cipher = crypto.createCipheriv(ALGO, key, iv);

    // Hint: Larger inputs (it's GCM, after all!) should use the stream API
    let enc = cipher.update(str, "utf8", "base64");
    enc += cipher.final("base64");
    return [enc, iv, cipher.getAuthTag()];
  };

  // decrypt decodes base64-encoded ciphertext into a utf8-encoded string
  const decrypt = (enc: string, iv: Buffer, authTag: Buffer) => {
    const decipher = crypto.createDecipheriv(ALGO, key, iv);
    decipher.setAuthTag(authTag);
    let str = decipher.update(enc, "base64", "utf8");
    str += decipher.final("utf8");
    return str;
  };

  return {
    encrypt,
    decrypt,
  };
};

export { buffer }; // commnet to show the squiggle

export default AuthService;
