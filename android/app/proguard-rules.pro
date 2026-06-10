# Base ProGuard rules for a React Native + Hermes release build.
# Goal: standard optimization and shrinking for the release artifact.

# --- React Native core ---
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
}

-keep class com.facebook.react.** { *; }
-keep class com.facebook.jni.** { *; }
-dontwarn com.facebook.react.**

# --- Hermes ---
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

# --- JavaScript interface / native modules ---
-keepclassmembers class * {
    @com.facebook.react.bridge.ReactMethod <methods>;
}
-keep class * extends com.facebook.react.bridge.NativeModule { *; }
-keep class * extends com.facebook.react.bridge.JavaScriptModule { *; }
-keepclassmembers,includedescriptorclasses class * { native <methods>; }

# --- AsyncStorage ---
-keep class com.reactnativecommunity.asyncstorage.** { *; }

# --- Kotlin ---
-keep class kotlin.** { *; }
-dontwarn kotlin.**

# Keep annotations and generic signatures used via reflection
-keepattributes *Annotation*,Signature,InnerClasses,EnclosingMethod
