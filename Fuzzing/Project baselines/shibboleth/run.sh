#!/bin/bash

export LD_LIBRARY_PATH=./libs:${LD_LIBRARY_PATH}

FUZZID=`date "+%Y%m%d%H%M%S"`

echo "Fuzz ID: $FUZZID" >&2

export SHIBSP_PREFIX=./data
export SHIBSP_CONFIG=./data/shibboleth.xml
export SHIBSP_SCHEMAS=./data/xmltooling/catalog.xml:./data/opensaml/saml20-catalog.xml:./data/opensaml/saml11-catalog.xml:./data/shibboleth/catalog.xml
export SHIBSP_LOGDIR=./
export SHIBSP_XMLDIR=../data

if [ "$#" -eq 1 ]; then
        if [ "$1" == "-master" ]; then
                ./bin/afl-fuzz -m 1500 -i input -o output -M "$FUZZID" ./bin/shibresponder @@
        else
                ./bin/afl-fuzz -m 1500 -i input -o output -S "$FUZZID" ./bin/shibresponder @@
        fi
else
        ./bin/afl-fuzz -m 1500 -i input -o output -S "$FUZZID" ./bin/shibresponder @@
fi