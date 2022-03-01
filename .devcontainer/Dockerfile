FROM ubuntu:latest

RUN apt-get update

# install required packages for development
RUN apt-get install -y vim git

# install bash-it and use minimal theme.
RUN git clone --depth=1 https://github.com/Bash-it/bash-it.git ~/.bash_it \
  ; ~/.bash_it/install.sh \
  ; sed -i 's/bobby/minimal/' ~/.bashrc