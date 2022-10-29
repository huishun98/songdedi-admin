# Song Dedication (Admin site)

Where the requested songs come together to form a playlist.

![Admin site web view](https://github.com/huishun98/songdedi-admin/blob/master/src/assets/screenshot3.png)

This site is to be set up with the request site. 

![Request site web view](https://github.com/huishun98/songdedi-admin/blob/master/src/assets/screenshot4.png)

Request site repository: https://github.com/huishun98/songdedi-requests.git


## Local Development Server
1. Create .env.local file with following environnment variables. These environment variables are from Firebase.
- VUE_APP_apiKey
- VUE_APP_authDomain
- VUE_APP_databaseURL
- VUE_APP_projectId
- VUE_APP_storageBucket
- VUE_APP_messagingSenderId
- VUE_APP_appId
- VUE_APP_measurementId

2. Set up Vue Project
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
