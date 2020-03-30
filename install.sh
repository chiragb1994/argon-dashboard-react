#!/bin/bash -e

npm run build
cd build
ssh -tt -n -i ~/.ssh/covid/covid19_sos.pem ubuntu@3.6.230.117 "rm -rf /var/www/html/*"
scp -r -i ~/.ssh/covid/covid19_sos.pem * ubuntu@3.6.230.117:/var/www/html/
#aws --profile covid-sos s3 rm --recursive s3://covid-sos/
#aws --profile covid-sos s3 cp --recursive . s3://covid-sos

echo ""
echo ""
echo "Link: https://covidsos.thebangaloreguy.com"
echo ""
echo ""
