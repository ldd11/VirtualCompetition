#!/bin/bash

# Set the path to your signing identity
IDENTITY="Developer ID Application: Tencent Technology (Shenzhen) Company Limited (88L2Q4487U)"

# Set the path to your application bundle
BROWSER_PATH="./VirtualCompetition.app/Contents/Frameworks/Chromium Embedded Framework.framework"

echo "------- 签名zfbrowser ---------"

codesign --verbose --force -o runtime --timestamp --entitlements ./browser.entitlements --sign "$IDENTITY" "$BROWSER_PATH"/Libraries/libEGL.dylib
codesign --verbose --force -o runtime --timestamp --entitlements ./browser.entitlements --sign "$IDENTITY" "$BROWSER_PATH"/Libraries/libswiftshader_libEGL.dylib
codesign --verbose --force -o runtime --timestamp --entitlements ./browser.entitlements --sign "$IDENTITY" "$BROWSER_PATH"/Libraries/libGLESv2.dylib
codesign --verbose --force -o runtime --timestamp --entitlements ./browser.entitlements --sign "$IDENTITY" "$BROWSER_PATH"/Libraries/libswiftshader_libGLESv2.dylib
codesign --verbose --force -o runtime --deep --timestamp --entitlements ./browser.entitlements --sign "$IDENTITY" "$BROWSER_PATH"

codesign --verbose --force -o runtime --timestamp --entitlements ./browserhelper.entitlements --sign "Developer ID Application: Tencent Technology (Shenzhen) Company Limited (88L2Q4487U)" VirtualCompetition.app/Contents/Frameworks/ZFGameBrowser.app/Contents/MacOS/ZFGameBrowser 
codesign --verbose --force -o runtime --timestamp --entitlements ./browserhelper.entitlements --sign "Developer ID Application: Tencent Technology (Shenzhen) Company Limited (88L2Q4487U)" VirtualCompetition.app/Contents/Frameworks/ZFGameBrowser.app 
codesign --verbose --force -o runtime --timestamp --entitlements ./browser.entitlements --sign "Developer ID Application: Tencent Technology (Shenzhen) Company Limited (88L2Q4487U)" VirtualCompetition.app/Contents/Resources/browser_assets
codesign --verbose --force -o runtime --timestamp --entitlements ./browser.entitlements --sign "Developer ID Application: Tencent Technology (Shenzhen) Company Limited (88L2Q4487U)" VirtualCompetition.app/Contents/PlugIns/libZFProxyWeb.dylib

