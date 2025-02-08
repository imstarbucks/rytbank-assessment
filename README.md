# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## 🚀 Future Improvements

1. **Loading States & Skeleton UI**

   - Implement loading indicators or skeleton screens for components that fetch data from APIs, such as transaction history and total bank balance. This will enhance user experience by reducing perceived wait times.

2. **Tab Navigation**

   - Introduce a bottom tab navigation system to allow users to easily switch between different sections of the app, improving accessibility and usability.

3. **Unit & Integration Testing**

   - Implement unit tests to verify API responses and ensure correct data rendering on screens.
   - Add integration tests to validate the full user journey, including authentication, navigation, and transaction history retrieval.

4. **Secure User Authentication & Session Management**

   - Store authentication tokens securely using **SecureStore** (for Expo) or **AsyncStorage with encryption** instead of cookies, since React Native does not natively support cookies.
   - Implement session expiration handling to log out inactive users after a set duration, improving security.

5. **Offline Mode Support**
   - Cache transaction history and bank balance data using **React Query or AsyncStorage**, allowing users to access their data even when offline.
