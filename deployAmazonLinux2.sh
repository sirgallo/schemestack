#!/bin/bash

if [[ $(which docker) && $(docker --version) && $(which docker-compose) && $(docker-compose --version) ]]; then
  echo "Dependencies found, checking docker status..."
  if [ "$(systemctl is-active docker)" = "active" ]; then
    echo "Docker is already running!"
    sudo docker-compose up --build
  else
    echo "Starting Docker..."
    sudo service docker start
    sudo docker-compose up --build
  fi
else
  echo "Install Dependencies and run Scheme"
  sudo yum install docker
  sudo service docker start
  sudo usermod -a -G docker ec2-user
  sudo systemctl enable docker

  sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose

  sudo docker-compose up --build
fi