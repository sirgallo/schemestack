#!/bin/bash

schemedir=$(pwd)
deploypath = "$schemedir/deployAmazonLinux2.sh"
sudo chmod u+x deployAmazonLinux2.sh
echo $deploypath

cd /

sudo systemctl enable $deploypath
sudo bash $deploypath