import os
import sys
import subprocess
import shutil

def MoveUpdatePackage(oldPath, newPath):
    print("MoveUpdatePackage old" + oldPath)
    print("MoveUpdatePackage new" + newPath)
    for derName, subfolders, filenames in os.walk(oldPath, topdown=False):
        for i in range(len(filenames)):
                if filenames[i].endswith('.jz'):
                    filePath = derName + '\\' + filenames[i]
                    newPath = newPath + '\\' + filenames[i]
                    print("copy src: " + filePath)
                    print("copy dst: " + newPath)
                    shutil.copy(filePath,newPath)
                    
for arg in sys.argv:
    print(arg)

workspace = sys.argv[1]
tgeVersion = sys.argv[2]
gameid = sys.argv[3]
installName = sys.argv[4]
installDir = os.path.join(workspace, "Build")
installPath = os.path.join(installDir, installName + ".exe")
# 构建机安全软件会默认禁止阻止程序的运行，换成固定名称的软件加入白名单
newInstallPath = os.path.join(workspace, "BuildScript", "VirtualCompetitionSetup.exe")
tempInstallDir = r"E:\Temp"
tempInstallPath = os.path.join(tempInstallDir, tgeVersion)
buildUpdateTool = r"E:\PackageTool_1.1.exe"
returnCode = -1
print("installDir:" + installDir)
print("installPath:" + installPath)
print("newInstallPath:" + newInstallPath)
print("tempInstallPath:" + tempInstallPath)

if (os.path.exists(tempInstallDir)):
    shutil.rmtree(tempInstallDir)
os.mkdir(tempInstallDir)

if (os.path.exists(newInstallPath)):
    os.remove(newInstallPath)

shutil.copyfile(installPath, newInstallPath)

if (os.path.exists(newInstallPath)):
    p = subprocess.run([newInstallPath, "/S", "/D="+tempInstallDir])
    returnCode = p.returncode
    if (returnCode == 0):
        if (os.path.exists(tempInstallPath)):
            p = subprocess.run([buildUpdateTool, "package", tgeVersion, tempInstallPath])
            returnCode = p.returncode
            if (returnCode == 0):
                MoveUpdatePackage(tempInstallDir, workspace)
print("returnCode:" + str(returnCode)) 
exit(returnCode)