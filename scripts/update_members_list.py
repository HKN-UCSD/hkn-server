#
# update_membersList.py 
#
# Update membersList on firestore (who can sign up for a new account)
# 
# Prerequisities:
# 1. member-list.csv
# 2. hkn-editor-credentials.json (Ask current webmaster for access)
#
# Created By    : Kelvin Lui (kelvinluime@gmail.com)
# Created Date  : Jan 1 2019
#

import pandas as pd
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from collections import defaultdict

# Replace with your own paths
CREDENTIALS_JSON='hkn-editor-credentials.json'
MEMBERS_LIST_CSV='members-list.csv'

cred = credentials.Certificate(CREDENTIALS_JSON)
firebase_admin.initialize_app(cred)
db = firestore.client()

df = pd.read_csv(MEMBERS_LIST_CSV)    
df = df.loc[df['UCSD Email'].notnull()] 
members = defaultdict(dict)
for idx, row in df.iterrows(): 
    members[row['UCSD Email']] = {
        u'class' : unicode(row['Class']),
        u'firstName' : unicode(row['First Name']),
        u'lastName' : unicode(row['Last Name'])
    }

emails = defaultdict(bool)
counter = 0
doc_ref = db.collection(u'whitelists').document('members')
for email, info in members.items():
    emails[email] = True
    counter += 1

doc_ref.set(emails)

print('update for %d members done...' % counter)