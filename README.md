\*\*

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Testing](#testing)
* [Project Structure](#project-structure)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

---

## Overview

**FoodDev** is an all-in-one developer toolkit tailored for building cross-platform food ordering applications with React Native and Expo. It provides a solid foundation with core configurations, styling, and error monitoring, enabling developers to focus on delivering a seamless user experience.

### Why FoodDev?

This project streamlines mobile app development by integrating essential tools and best practices. The core features include:

* 🧩 **NativeWind & Tailwind CSS Integration:** Effortlessly style your app with utility-first CSS and native styling presets.
* 🚀 **Robust Configuration & Build Setup:** Simplifies project initialization, bundling, and platform-specific adjustments.
* 🛡️ **Error Tracking with Sentry:** Ensures stability with integrated error monitoring during development and production.
* 🔑 **User Authentication via Appwrite:** Seamlessly manage user sign-in, profiles, and sessions.
* ⚙️ **Modular Architecture:** Supports scalable, maintainable code with organized routing, components, and assets.

---

## Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

Ensure you have the following installed:

* **Node.js** (v14 or later)
* **npm** (v6 or later)
* **Expo CLI**: `npm install -g expo-cli`

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/fsagrahari23/FoodDev.git
   ```
2. **Navigate to the project directory:**

   ```sh
   cd FoodDev
   ```
3. **Install dependencies:**

   ```sh
   npm install
   ```

### Usage

Start the development server:

```sh
npm start
```

This will launch the Expo Dev Tools in your browser. You can run the app on an emulator, simulator, or real device using the Expo Go app.

### Testing

FoodDev uses the **Jest** test framework. To run the test suite:

```sh
npm test
```

---

## Project Structure

```
FoodDev/
├── assets/           # Images, fonts, and other static assets
├── src/
│   ├── components/  # Reusable UI components
│   ├── navigation/  # React Navigation routes and config
│   ├── screens/     # App screens
│   ├── services/    # API and Appwrite integration
│   ├── styles/      # Tailwind CSS configuration files
│   └── App.tsx      # Entry point
├── .eslintrc.js      # ESLint configuration
├── app.json          # Expo configuration
└── package.json      # Project metadata and scripts
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

Monu Agrahari - [GitHub Profile](https://github.com/fsagrahari23)
Project Link: [https://github.com/fsagrahari23/FoodDev](https://github.com/fsagrahari23/FoodDev)
