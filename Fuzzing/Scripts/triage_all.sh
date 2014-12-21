#!/bin/bash

find ../../data/shibboleth -path "*crashes/id*" -type f -print0 | while IFS= read -r -d $'\0' testcase; do
        ./triage.sh $testcase
done

find ../../data/shibboleth-full -path "*crashes/id*" -type f -print0 | while IFS= read -r -d $'\0' testcase; do
        ./triage.sh $testcase
done

find ../../data/shibboleth2 -path "*crashes/id*" -type f -print0 | while IFS= read -r -d $'\0' testcase; do
	./triage.sh $testcase
done

find ../../data/shibboleth3 -path "*crashes/id*" -type f -print0 | while IFS= read -r -d $'\0' testcase; do
        ./triage.sh $testcase
done

find ../../data/shibboleth4 -path "*crashes/id*" -type f -print0 | while IFS= read -r -d $'\0' testcase; do
        ./triage.sh $testcase
done
