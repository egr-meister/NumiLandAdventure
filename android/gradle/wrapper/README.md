# Gradle Wrapper

The binary `gradle-wrapper.jar` is intentionally not committed to keep the
repository clean. It is generated automatically:

- **CI:** the GitHub Actions workflow runs `gradle wrapper` before building.
- **Local:** run `cd android && gradle wrapper --gradle-version 8.8`
  (needs a local Gradle install), or simply open the `android/` folder in
  Android Studio once — it regenerates the wrapper automatically.
