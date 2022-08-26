import { firebaseAdminAuth } from '../firebase/init'

export const checkIdToken = async (idToken: string): Promise<boolean> => {
  const decodedToken = await firebaseAdminAuth.verifyIdToken(idToken)
  return !!decodedToken
}
