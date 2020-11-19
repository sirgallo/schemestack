#!/bin/bash

echo "Get current application path.."
schemedir=$(pwd)
echo $schemedir
bashscript="/deployAmazonLinux2.sh"
deploypath=$schemedir$bascript
echo "Give executable permissions to deployment script"
sudo chmod u+x deployAmazonLinux2.sh
echo "Path of deployment"
echo $deploypath

cd /

echo "Enable application on application"
sudo systemctl enable $deploypath
sudo bash $deploypath