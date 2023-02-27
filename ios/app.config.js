module.exports = {
  "expo": {
    "name": "Timestack",
    "slug": "timestack",
    "scheme": "timestack",
    "version": "0.0.12",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "plugins": [ [
      "@config-plugins/ffmpeg-kit-react-native",
      {
        "package": "min-gpl",
        "ios": {
          "package": "min-gpl",
        }
      }
    ]],
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.timestack.timestack",
      "config": {
        "usesNonExemptEncryption": false
      },
      "infoPlist": {
        "UIBackgroundModes": [
          "location",
          "fetch"
        ]
      }
    },
    "android": {
      "package": "com.timestack.timestack",
      "versionCode": 12,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "permissions": [
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "frontendUrl": process.env.FRONTEND_URL ? process.env.FRONTEND_URL : "https://timestack.world",
      "apiUrl": process.env.API_URL ? process.env.API_URL : "https://edge.timestack.world",
      "eas": {
        "projectId": "aa3c70a4-d2ff-4a95-a002-74668153f9d8"
      },
    },
    "updates": {
      "url": "https://u.expo.dev/aa3c70a4-d2ff-4a95-a002-74668153f9d8",
      "fallbackToCacheTimeout": 0
    },
    "runtimeVersion": {
      "policy": "sdkVersion",
    }
  }
}
