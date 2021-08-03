npm config set proxy $HTTP_PROXY;
npm install --only=dev;
echo "Printing CA variable";
echo $IAV_CA_BUNDLE;
npm config set cafile $IAV_CA_BUNDLE;
