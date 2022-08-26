import * as firebaseAdmin from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'

const admin = firebaseAdmin.initializeApp()
const firebaseAdminAuth = getAuth(admin)

export { firebaseAdminAuth }
