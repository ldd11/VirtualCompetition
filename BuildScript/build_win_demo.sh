#!/bin/sh
#设置输入的根目录
PROJECT_DIR="E:\Deveops\VirtualCompetition"
#输出平台
PLATFORM="windows64"
#版本
VERSION="1.3.0"
#是否构建安装包
BUILD_INSTALL=$4

OUTPUT_DIR="E:\Deveops\VirtualCompetition\build"

echo "project path: $PROJECT_DIR"

#设置Unity3d项目目录
UNITY3D_PROJECT_PATH="$PROJECT_DIR"
#设置Unity3d exe文件路径
UNITY3D_EXE_PATH="E:\Unity\2021.3.26f1c1\Editor\Unity.exe"
#UNITY3D_EXE_PATH="C:\Program Files\Unity\Hub\Editor\2020.3.14f1c1\Editor\Unity.exe"
#Unity3d项目打包输出路径
UNITY3D_OUTPUT_PATH="${OUTPUT_DIR}\VirtualCompetition.exe"
#Unity3d项目打包输出路径
UNITY3D_MACOS_OUTPUT_PATH="${OUTPUT_DIR}\VirtualCompetition.app"
#nsis路径
NSIS_PATH="E:\NSIS\makensis.exe"
#NSIS_PATH="C:\Program Files (x86)\NSIS\makensis.exe"
#安装包生成脚本
NSIS_INSTALL_SCRIPT_PATH="E:\Deveops\VirtualCompetition\build\install.nsi"


if [ $PLATFORM = "windows64" ]
then
  NSIS_INSTALL_SCRIPT_PATH="$1\install-windows-64.nsi"
  "${UNITY3D_EXE_PATH}" -batchmode -buildWindows64Player "${UNITY3D_OUTPUT_PATH}" -projectPath "${UNITY3D_PROJECT_PATH}" -quit
fi

if [ $PLATFORM = "windows32" ]
then
  NSIS_INSTALL_SCRIPT_PATH="$1\install-windows-32.nsi"
  "${UNITY3D_EXE_PATH}" -batchmode -buildWindowsPlayer "${UNITY3D_OUTPUT_PATH}" -projectPath "${UNITY3D_PROJECT_PATH}" -quit
fi

if [ $PLATFORM = "macos" ]
then
  "${UNITY3D_EXE_PATH}" -batchmode -buildOSXUniversalPlayer "${UNITY3D_MACOS_OUTPUT_PATH}" -projectPath "${UNITY3D_PROJECT_PATH}" -quit
fi