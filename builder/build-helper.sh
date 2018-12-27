#!/bin/bash -e

set -e
set -x

# This script is executed within the container as root.  It assumes
# that source code with debian packaging files can be found at
# /source-ro and that resulting packages are written to /output after
# succesful build.  These directories are mounted as docker volumes to
# allow files to be exchanged between the host and the container.

# Install extra dependencies that were provided for the build (if any)
# We install files from deps.list first, and then provided *.deb packages.

#   Note: dpkg can fail due to dependencies, ignore errors, and use
#   apt-get to install those afterwards

curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt-get install -y nodejs

# Make read-write copy of source code
cp -a /source-ro /build/src/$PACKAGENAME

export GOPATH=/build
export PATH=$PATH:$GOPATH/bin

cd /build/src/$PACKAGENAME


npm install
npm run build

cp -r build/ /output/

chown -R $USER:$GROUP /output/*
ls -l /output
