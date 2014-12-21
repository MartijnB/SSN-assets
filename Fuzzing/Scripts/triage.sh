#!/bin/bash

crash=$1
BIN="./bin/shibresponder"

id=`basename -- "$crash" | cut -d, -f1 | cut -d: -f2`
sig=`basename -- "$crash" | cut -d, -f2 | cut -d: -f2`

echo "+++ ID $id, SIGNAL $sig +++"
echo

export LD_LIBRARY_PATH=./libs:${LD_LIBRARY_PATH}

export SHIBSP_PREFIX=./data
export SHIBSP_CONFIG=./data/shibboleth.xml
export SHIBSP_SCHEMAS=./data/xmltooling/catalog.xml:./data/opensaml/saml20-catalog.xml:./data/opensaml/saml11-catalog.xml:./data/shibboleth/catalog.xml
export SHIBSP_LOGDIR=./
export SHIBSP_XMLDIR=../data

crashlog="$crash.crash"

if [ -f $crashlog ];
then
	rm $crashlog
fi

#echo $crashlog

gdb --batch -q --ex "set logging on"  --ex "set logging file $crashlog"  --ex "r $crash" --ex 'back' --ex 'disass $eip, $eip+16' --ex 'info reg' --ex 'quit' "$BIN" > $crashlog

#valgrind $BIN $crash

cat $crashlog
