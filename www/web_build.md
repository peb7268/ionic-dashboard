
#Instructions on how to build and deploy the app

###Web

1. First, need to move the contents of www to some arbitrary folder.
2. Remove cordova.js from the index.html
3. Rearrange the dir structure a bit so it looks like this: 

.
├── Procfile
├── app.js
├── package.json
└── www
    ├── build
    │   ├── charts
    │   ├── css
    │   ├── dashboard
    │   ├── js
    │   └── //other assets...
    └── index.htm

4. Lastly, commit and deploy
git init
git add .
git commit -m 'wip'
git remote add origin https://github.com/intengodev/dash.git
git push -f -u origin master

heroku git:remote intengo-dash

git push heroku //maybe need a -f