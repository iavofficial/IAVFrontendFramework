npm config set proxy $HTTP_PROXY;
echo "Printing CA variable";
echo $IAV_CA_BUNDLE;
npm config set cafile $IAV_CA_BUNDLE;
npm install --only=dev;
