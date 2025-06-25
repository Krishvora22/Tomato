import * as bcrypt from 'bcrypt';

export async function encrypt(plainString: string) {
  const saltRounds = 10;
  const hashedString = await bcrypt.hash(plainString, saltRounds);
  return hashedString;
}

export async function compare(password: string, hashedString: string) {
  const isMatch = await bcrypt.compare(password, hashedString);
  return isMatch;
}
