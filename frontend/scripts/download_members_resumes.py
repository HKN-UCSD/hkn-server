#
# download_members_resumes.py
#
# Download all members' resumes from the database and compress into a .zip file
# 
# Prerequisities:
# 1. hkn-viewer-credentials.json (Ask current webmaster for access)
#
# Created By    : Kelvin Lui (kelvinluime@gmail.com)
# Created Date  : Jan 6 2019
#

import firebase_admin
import requests
from firebase_admin import credentials
from firebase_admin import firestore

# Replace with your own paths
CREDENTIALS_JSON='hkn-viewer-credentials.json'
SAVE_FOLDER = './member-resumes'

cred = credentials.Certificate(CREDENTIALS_JSON)
firebase_admin.initialize_app(cred, {
    'storageBucker' : 'hkn-member-portal.appspot.com/'
})

db = firestore.client()

userDocs = db.collection('users').get()
for doc in userDocs:
    doc_dict = doc.to_dict()

    r = response = requests.get(doc_dict['resumeDownloadURL'])
    print(r.content)