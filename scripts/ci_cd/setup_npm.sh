npm config set proxy $HTTP_PROXY;
npm install --only=dev;
echo $IAV_CA_BUNDLE;
npm config set cafile $IAV_CA_BUNDLE;
