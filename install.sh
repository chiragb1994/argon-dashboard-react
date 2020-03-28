#!/bin/bash -e

npm run build
cd build
aws --profile covid-sos s3 rm --recursive s3://covid-sos/
aws --profile covid-sos s3 cp --recursive . s3://covid-sos
