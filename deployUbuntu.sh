#!/bin/bash

if [[ $(which docker) && $(docker --version) && $(which docker-compose) && $(docker-compose --version)]] then
  echo "Dependencies found, checking docker status..."
  if [ "$(systemctl is-active docker)" = "active"] then
    echo "Docker is already running!"
    sudo docker-compose up --build
  else
    echo "Starting Docker..."
    sudo service docker start
    sudo docker-compose up --build
  fi
else
  echo "Install Dependencies and run Scheme"
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
  sudo apt-get update -y
  curl -fsSL https://get.docker.com -o get-docker.sh; sh get-docker.sh
  sudo systemctl start docker
  sudo systemctl enable docker

  sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose

  sudo docker-compose up --build
fi