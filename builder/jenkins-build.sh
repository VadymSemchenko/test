#!/bin/bash

set -e
set -x

cd $WORKSPACE

$WORKSPACE/builder/build -i ubuntu-deb-builder:18.04 \
    -o $WORKSPACE/output \
    -p wedge \
    $WORKSPACE/

cd $WORKSPACE/output
