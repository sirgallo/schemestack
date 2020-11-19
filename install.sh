#!/bin/bash

sudo chmod u+x deployAmazonLinux2.sh
sudo systemctl enable run-at-startup.service
sudo bash deployAmazonLinux2.sh