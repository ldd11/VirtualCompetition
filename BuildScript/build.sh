#!/bin/sh
#设置输入的根目录
PROJECT_DIR=$1
#输出平台
PLATFORM=$2
#版本
VERSION=$3
#是否构建安装包
BUILD_INSTALL=$4

OUTPUT_DIR="$1/build"

#设置Unity3d项目目录
UNITY3D_PROJECT_PATH="$PROJECT_DIR"
#设置Unity3d exe文件路径
UNITY3D_EXE_PATH=$5
#UNITY3D_EXE_PATH="C:\Program Files\Unity\Hub\Editor\2020.3.14f1c1\Editor\Unity.exe"

#是否开启development_build
DEVELOPMENT_BUILD=$6
#exe名称
EXE_NAME=$7

#Unity3d项目打包输出路径
UNITY3D_OUTPUT_PATH="${OUTPUT_DIR}\\${EXE_NAME}.exe"
#Unity3d项目打包输出路径
UNITY3D_MACOS_OUTPUT_PATH="${OUTPUT_DIR}/${EXE_NAME}.app"

#nsis路径
NSIS_PATH="E:\NSIS\makensis.exe"
#NSIS_PATH="C:\Program Files (x86)\NSIS\makensis.exe"
#安装包生成脚本
NSIS_INSTALL_SCRIPT_PATH="$1\install.nsi"


echo "project path: $PROJECT_DIR"
echo "PLATFORM: $PLATFORM"
echo "VERSION: $VERSION"
echo "BUILD_INSTALL: $BUILD_INSTALL"
echo "OUTPUT_DIR: $OUTPUT_DIR"
echo "UNITY3D_PROJECT_PATH: $UNITY3D_PROJECT_PATH"
echo "UNITY3D_EXE_PATH: $UNITY3D_EXE_PATH"
echo "UNITY3D_OUTPUT_PATH: $UNITY3D_OUTPUT_PATH"
echo "UNITY3D_MACOS_OUTPUT_PATH: $UNITY3D_MACOS_OUTPUT_PATH"
echo "NSIS_PATH: $NSIS_PATH"
echo "NSIS_INSTALL_SCRIPT_PATH: $NSIS_INSTALL_SCRIPT_PATH"
echo "DEVELOPMENT_BUILD: $DEVELOPMENT_BUILD"
echo "EXE_NAME: $EXE_NAME"

EXTRA_OPTIONS=""
if [ $DEVELOPMENT_BUILD = "true" ]
then
  EXTRA_OPTIONS="-development"
fi

echo "EXTRA_OPTIONS: $EXTRA_OPTIONS"

if [ $PLATFORM = "windows64" ]
then
  NSIS_INSTALL_SCRIPT_PATH="$1\install-windows-64.nsi"
  "${UNITY3D_EXE_PATH}" -batchmode -quit "${UNITY3D_OUTPUT_PATH}" -projectPath "${UNITY3D_PROJECT_PATH}" -executeMethod TGE.Builder.BuildWin64 "${EXTRA_OPTIONS}"
fi

if [ $PLATFORM = "windows32" ]
then
  NSIS_INSTALL_SCRIPT_PATH="$1\install-windows-32.nsi"
  "${UNITY3D_EXE_PATH}" -batchmode -quit "${UNITY3D_OUTPUT_PATH}" -projectPath "${UNITY3D_PROJECT_PATH}" -executeMethod TGE.Builder.BuildWin32 "${EXTRA_OPTIONS}"
fi

if [ $PLATFORM = "macos" ]
then
  "${UNITY3D_EXE_PATH}" -batchmode -quit "${UNITY3D_MACOS_OUTPUT_PATH}" -projectPath "${UNITY3D_PROJECT_PATH}" -executeMethod TGE.Builder.BuildMac "${EXTRA_OPTIONS}"
fi