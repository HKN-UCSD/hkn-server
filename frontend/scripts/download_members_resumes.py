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
import os
from firebase_admin import credentials
from firebase_admin import firestore

# Replace with your own paths
CREDENTIALS_JSON='hkn-viewer-credentials.json'
RESUME_FOLDER = 'member-resumes'

try:
    os.mkdir(RESUME_FOLDER)
except OSError as e:
    print('Failed to create directory: %s.' % e)
else:
    print('Successfully created the directory %s.' % RESUME_FOLDER)

cred = credentials.Certificate(CREDENTIALS_JSON)
firebase_admin.initialize_app(cred, {
    'storageBucker' : 'hkn-member-portal.appspot.com/'
})

db = firestore.client()
resumes_count = 0

userDocs = db.collection('users').get()
for doc in userDocs:
    doc_dict = doc.to_dict()

    first_name = doc_dict['firstName']
    last_name = doc_dict['lastName']
    
    try:
        r = requests.get(doc_dict['resumeDownloadURL'])
        resume_title = first_name + ' ' + last_name + ' Resume.pdf'
        f = open(RESUME_FOLDER+'/'+resume_title, 'wb')
        for chunk in r.iter_content(chunk_size=512*1024):
            if chunk:
                f.write(chunk)

        resumes_count += 1
        f.close()
    except KeyError:
        pass

print('%d resumes have been successfully downloaded.' % resumes_count)