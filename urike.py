from flask import Flask, render_template, redirect, url_for, request, flash
from supabase import create_client

app = Flask(__name__)

app.secret_key = 'daddy1810'

tasks = []
descs = []
dls = []
curr_user = "gshvamsi@gmail.com"

supabase_url = 'https://rprpfogbzweynochfbwk.supabase.co/'
supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwcnBmb2diendleW5vY2hmYndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyMjE5MzMsImV4cCI6MjAyMDc5NzkzM30.guuLDU-xv6Heoe9cjwtnL1eBAZbDupB5nFcfn0vko8U'
lowda = create_client(supabase_url, supabase_key)

why= 'a'
what='b'
when = 'mg'
#response = lowda.table('random').insert([{'why':why, 'what':what, 'when':when}]).execute()
resp = lowda.table('todo').select('*').execute().data
#print(resp)
for x in resp:
    if x['email'] == curr_user:
        tasks.append(x['task'])
        descs.append(x['description'])
        dls.append(x['deadline'])
print(tasks)
print(descs)
print(dls)