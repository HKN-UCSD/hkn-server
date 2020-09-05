import admin from 'firebase-admin';
import '@firebase/auth';

export const createNewFirebaseUser = async (
  id: number,
  email: string,
  password: string
): Promise<admin.auth.UserRecord | undefined> => {
  try {
    const newFirebaseUser = await admin.auth().createUser({
      uid: id.toString(10),
      email: email,
      password: password,
    });

    return newFirebaseUser;
  } catch {
    return undefined;
  }
};
