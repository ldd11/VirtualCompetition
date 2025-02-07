import os
import sys
import subprocess
import shutil

for arg in sys.argv:
    print(arg)
    
workspace = sys.argv[1]
tgeVersion = sys.argv[2]
gameid = sys.argv[3]
installName = sys.argv[4]
installDir = os.path.join(workspace, "BuildScript", gameid)
installPath = os.path.join(installDir, installName + ".exe")
# 构建机安全软件会默认禁止阻止程序的运行，换成固定名称的软件加入白名单
newInstallPath = os.path.join(workspace, "BuildScript", "VirtualCompetitionSetup.exe")
tempInstallPath = r"E:\Temp"
uninst = r"uninst.exe"
uninstPath = os.path.join(tempInstallPath, tgeVersion, uninst)
buildDir = os.path.join(workspace, "build")
returnCode = -1
print("installDir:" + installDir)
print("installPath:" + installPath)
print("newInstallPath:" + newInstallPath)
print("uninstPath:" + uninstPath)
print("buildDir:" + buildDir)
os.rename(installPath, newInstallPath)
if (os.path.exists(tempInstallPath)):
    shutil.rmtree(tempInstallPath)
os.mkdir(tempInstallPath)
if (os.path.exists(newInstallPath)):
    p = subprocess.run([newInstallPath, "/S", "/D="+tempInstallPath])
    returnCode = p.returncode
    if (returnCode == 0):
        shutil.copy(uninstPath, buildDir)
else:
    print("newInstallPath don't exist")
print("returnCode:" + str(returnCode))        
exit(returnCode)